import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Logo } from '../components/Logo';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onComplete, 3200);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Radial turquoise glow background */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 4, opacity: 0.15 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        className="absolute w-64 h-64 rounded-full bg-brand"
      />

      {/* Pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        className="absolute w-48 h-48 rounded-full border border-brand/40"
      />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-10"
      >
        <Logo className="w-28 h-28" invert />
      </motion.div>

      {/* Brand name */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-4"
      >
        <h1 className="font-headline text-5xl font-black tracking-tighter text-white uppercase">
          Factor LED
        </h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="h-0.5 w-16 bg-brand origin-left"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="font-ui text-[11px] text-white/40 uppercase tracking-[0.4em]"
        >
          Illuminate Excellence
        </motion.p>
      </motion.div>
    </div>
  );
};
