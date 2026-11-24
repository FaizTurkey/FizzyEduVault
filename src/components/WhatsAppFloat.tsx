import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';


const WHATSAPP_NUMBER = '917017433962';
const DEFAULT_MESSAGE =
  'Hi FizzyEduVault! Mujhe question papers / assignments ke regarding help chahiye.';

export const WhatsAppFloat: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full border border-emerald-400/35 bg-[#091022]/90 p-3.5 text-white shadow-2xl shadow-emerald-950/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/70 hover:bg-emerald-950/90 hover:shadow-emerald-500/25 sm:px-4 sm:py-3"
    >
      {/* Subtle Ambient Glow */}
      <span className="pointer-events-none absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 blur-md transition-opacity duration-300 group-hover:opacity-100" />

      {/* WhatsApp / Chat Icon */}
      <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 shadow-sm">
        <MessageCircle className="h-3.5 w-3.5 fill-current" />
      </span>

      {/* Desktop Hover / Label Text */}
      <span className="hidden pr-0.5 text-xs font-semibold tracking-wide text-emerald-100 sm:inline">
        WhatsApp Help
      </span>
    </motion.a>
  );
};