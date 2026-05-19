import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    title: 'Luminous Precision',
    desc: 'Architectural lighting that redefines space and depth with industrial excellence.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=90&w=1200',
    accent: 'Quality',
  },
  {
    title: 'See it Before You Buy',
    desc: 'Experience products in your own space using our advanced AR visualization tool.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=1200',
    accent: 'Innovation',
  },
  {
    title: 'Crafted Authority',
    desc: 'Join thousands of architects and designers choosing Factor for their boldest projects.',
    img: 'https://images.unsplash.com/photo-1518005020451-aba3a5a401c4?auto=format&fit=crop&q=90&w=1200',
    accent: 'Trust',
  },
];

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
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${SLIDES[step].img}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/80" />
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
        <div className="absolute top-16 left-0 right-0 flex justify-center gap-2 z-10">
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
          transition={{ delay: 0.3 }}
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
            transition={{ duration: 0.45 }}
          >
            <h2 className="font-headline text-4xl font-black text-black uppercase tracking-tighter leading-none mb-4">
              {SLIDES[step].title}
            </h2>
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
