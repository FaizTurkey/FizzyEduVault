import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Don't show if already installed (standalone mode)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true;

    if (isStandalone) return;

    // 2. Don't annoy users who dismissed it recently (24 hours)
    const dismissedAt = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissedAt && Date.now() - Number(dismissedAt) < 24 * 60 * 60 * 1000) {
      return;
    }

    // 3. Detect iOS Safari (doesn't support beforeinstallprompt)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !/crios|fxios/.test(userAgent);

    if (isIOSDevice && isSafari) {
      setIsIOS(true);
      const timer = setTimeout(() => setShowPrompt(true), 2500);
      return () => clearTimeout(timer);
    }

    // 4. Agar event pehle hi main.tsx mein capture ho chuka hai:
    if (window.deferredPWAPrompt) {
      setDeferredPrompt(window.deferredPWAPrompt as BeforeInstallPromptEvent);
      setTimeout(() => setShowPrompt(true), 1500);
    }

    // Aur agar baad mein fire ho:
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      window.deferredPWAPrompt = e;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowPrompt(true), 1500);
    };

    const handleAppInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
      window.deferredPWAPrompt = undefined;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', String(Date.now()));
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-bounce-once">
      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white/95 p-4 shadow-2xl shadow-blue-900/15 backdrop-blur-md">
        {/* Top Accent Bar */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600" />

        <div className="flex items-start gap-3.5">
          {/* App Icon */}
          <img
            src="/favicon.svg"
            alt="FizzyEducation"
            className="h-12 w-12 shrink-0 rounded-xl shadow-sm ring-1 ring-black/5"
          />

          {/* Text Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Install FizzyEducation
              </h3>
              <button
                onClick={handleDismiss}
                aria-label="Close install popup"
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {isIOS ? (
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Install this app on your iPhone: tap the{' '}
                <span className="font-semibold text-blue-600">Share</span> icon
                below and select{' '}
                <span className="font-semibold text-slate-900">
                  Add to Home Screen
                </span>
                .
              </p>
            ) : (
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Get faster access to papers & notes directly from your home
                screen—works like a native app.
              </p>
            )}

            {/* Action Buttons (Android / Chrome) */}
            {!isIOS && (
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-600/30 transition hover:bg-blue-700 active:scale-[0.98]"
                >
                  Install App
                </button>
                <button
                  onClick={handleDismiss}
                  className="rounded-xl px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  Later
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};