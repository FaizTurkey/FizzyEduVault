import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Download, ExternalLink, Loader2 } from 'lucide-react';

interface DownloadToastProps {
  status: 'idle' | 'downloading' | 'done';
  fileName: string;
  fileUrl?: string;
}

export const DownloadToast: React.FC<DownloadToastProps> = ({
  status,
  fileName,
  fileUrl,
}) => {
  const isDownloading = status === 'downloading';

  return (
    <AnimatePresence>
      {status !== 'idle' && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="pointer-events-auto relative w-full max-w-sm"
          >
            {/* Ambient Glow */}
            <div
              className={`pointer-events-none absolute -inset-0.5 rounded-2xl blur-md transition-colors duration-500 ${
                isDownloading
                  ? 'bg-gradient-to-r from-blue-600/40 via-cyan-500/40 to-indigo-600/40'
                  : 'bg-gradient-to-r from-emerald-500/35 via-teal-400/35 to-cyan-500/35'
              }`}
            />

            {/* Main Glassmorphic Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#091022]/95 px-4 py-3.5 text-white shadow-2xl shadow-black/60 backdrop-blur-xl">
              <div className="flex items-center gap-3.5">
                {/* Icon */}
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1 transition-colors duration-300 ${
                    isDownloading
                      ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-cyan-400 ring-cyan-400/30'
                      : 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 ring-emerald-400/30'
                  }`}
                >
                  {isDownloading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5" />
                  )}
                </div>

                {/* Text + Clickable Open PDF Button */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold tracking-wide text-white">
                      {isDownloading ? 'Downloading Paper...' : 'Download Ready!'}
                    </p>

                    {isDownloading ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                        <Download className="h-2.5 w-2.5" />
                        Saving
                      </span>
                    ) : fileUrl ? (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-300 ring-1 ring-emerald-400/40 transition hover:bg-emerald-500/30 active:scale-95"
                      >
                        Open PDF
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                        Done
                      </span>
                    )}
                  </div>

                  <p className="mt-0.5 truncate text-[11px] text-slate-400">
                    {isDownloading
                      ? fileName
                      : 'Tap "Open PDF" to view immediately'}
                  </p>
                </div>
              </div>

              {/* Bottom Progress Bar */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/5">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: isDownloading ? '75%' : '100%' }}
                  transition={{
                    duration: isDownloading ? 1.4 : 0.35,
                    ease: 'easeOut',
                  }}
                  className={`h-full transition-colors duration-300 ${
                    isDownloading
                      ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500'
                      : 'bg-gradient-to-r from-emerald-400 to-cyan-400'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};