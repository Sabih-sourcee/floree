import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    title: 'Built For Pakistan',
    desc: 'From street lights to downlights — 16 product categories engineered for Pakistan\'s climate and construction standards.',
    img: '/Assets/events/final1.jpg.jpeg',
    accent: 'Local',
  },
  {
    title: 'See It In Your Space',
    desc: 'Place any product in your room before you buy. No guesswork — just a clear picture of how it fits.',
    img: '/Assets/events/final2.jpg.jpeg',
    accent: 'AR Preview',
  },
  {
    title: 'Trusted By Builders',
    desc: 'Contractors, architects, and interior designers across Pakistan choose Factor LED for every project.',
    img: '/Assets/events/final3.jpg.jpeg',
    accent: 'Trusted',
  },
];

const WordReveal = ({ text, step }: { text: string; step: number }) => (
  <h2 className="font-headline text-4xl font-black text-black uppercase tracking-tighter leading-none mb-4 overflow-hidden">
    {text.split(' ').map((word, i) => (
      <motion.span
        key={`${step}-${i}`}
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 + i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block mr-[0.25em] last:mr-0"
      >
        {word}
      </motion.span>
    ))}
  </h2>
);

export const Onboarding = ({ onNext }: { onNext: () => void }) => {
  const [step, setStep] = useState(0);

  const advance = () => (step < SLIDES.length - 1 ? setStep(s => s + 1) : onNext());

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-black overflow-hidden">
      {/* Full-screen image */}
      <div className="relative flex-1 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${SLIDES[step].img}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/80" />
          </motion.div>
        </AnimatePresence>

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 px-8 pt-14 flex justify-between items-start z-10">
          <img src="/image_1.png" alt="Factor LED" className="w-10 h-10 object-contain invert brightness-200" />
          <button onClick={onNext} className="font-ui text-[11px] font-bold text-white/50 uppercase tracking-widest">
            Skip
          </button>
        </div>

        {/* Step indicators */}
        <div className="absolute top-16 left-0 right-0 flex justify-center gap-2 z-10 pointer-events-none">
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: step === i ? 32 : 8, opacity: step >= i ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
              className="h-1 rounded-full bg-brand"
            />
          ))}
        </div>

        {/* Accent tag */}
        <motion.div
          key={`tag-${step}`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="absolute bottom-12 left-8 z-10"
        >
          <span className="font-ui text-[10px] font-black text-brand uppercase tracking-[0.3em] bg-brand/10 border border-brand/30 px-3 py-1.5 rounded-full">
            {SLIDES[step].accent}
          </span>
        </motion.div>
      </div>

      {/* Text panel */}
      <div className="bg-white px-8 pt-10 pb-12 flex flex-col gap-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <WordReveal text={SLIDES[step].title} step={step} />
            <p className="font-ui text-gray-500 leading-relaxed text-base">
              {SLIDES[step].desc}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {SLIDES.map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: step === i ? 1.2 : 1 }}
                className={`w-2 h-2 rounded-full transition-colors ${step === i ? 'bg-brand' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <motion.button
            onClick={advance}
            whileTap={{ scale: 0.92 }}
            className="bg-brand text-white w-16 h-16 rounded-full flex items-center justify-center brand-glow-sm"
          >
            <ChevronRight size={28} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
