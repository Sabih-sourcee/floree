import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';
import { Logo } from '../components/Logo';
import { CATEGORIES } from '../data/products';
import { Category, Screen } from '../types';

interface HomeScreenProps {
  setScreen: (s: Screen) => void;
  onCategorySelect: (cat: Category) => void;
}

const MARQUEE_ITEMS = [
  'Downlights', 'Track Lights', 'Flood Lights', 'Street Lights',
  'Panel Lights', 'Industrial', 'LED Bulbs', 'Tubelights',
  'Architectural', 'COB Series', 'DC Series', 'Premium',
];

const CountUp = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const frames = 50;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round((frame / frames) * to));
      if (frame >= frames) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const HomeScreen = ({ setScreen, onCategorySelect }: HomeScreenProps) => {
  const featured = CATEGORIES.slice(0, 6);

  return (
    <div className="min-h-[100dvh] bg-white pb-nav overflow-y-auto">
      {/* Hero header */}
      <div className="relative bg-black px-6 pt-16 pb-10 overflow-hidden noise-overlay">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand/8 blur-[80px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-brand/20" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <Logo className="w-10 h-10" invert />
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="w-1.5 h-1.5 rounded-full bg-brand"
              />
              <span className="font-ui text-[10px] text-white/30 uppercase tracking-widest">Live</span>
            </div>
          </div>
          <motion.p
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-ui text-brand text-[10px] font-black uppercase tracking-[0.35em] mb-3"
          >
            factorled.pk
          </motion.p>
          <h1 className="font-headline text-[52px] font-black text-white uppercase tracking-tighter leading-none mb-5">
            {'Pakistan\'s\nLED Brand'.split('\n').map((line, i) => (
              <motion.span
                key={i}
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {i === 1 ? <><span className="text-brand">{line.split(' ')[0]}</span>{' '}{line.split(' ').slice(1).join(' ')}</> : line}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-ui text-white/40 text-sm leading-relaxed max-w-[260px]"
          >
            16 categories. Trusted by contractors and designers across Pakistan.
          </motion.p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-brand px-6 py-5 flex justify-between">
        {([
          { val: 16, suffix: '', label: 'Categories' },
          { val: 50, suffix: '+', label: 'Products' },
          { val: 5, suffix: ' yr', label: 'Warranty' },
        ] as const).map(({ val, suffix, label }) => (
          <div key={label} className="flex flex-col items-center">
            <span className="font-headline text-2xl font-black text-white">
              <CountUp to={val} suffix={suffix} />
            </span>
            <span className="font-ui text-[10px] text-white/70 uppercase tracking-widest">{label}</span>
          </div>
        ))}
      </div>

      {/* Marquee strip */}
      <div className="overflow-hidden bg-black py-3.5 border-b border-white/[0.06]">
        <div className="flex animate-marquee whitespace-nowrap w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-ui text-[10px] font-black text-white/35 uppercase tracking-[0.28em] px-5">
              {item}<span className="text-brand ml-5">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Category grid */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline text-2xl font-black text-black uppercase tracking-tight">Categories</h2>
          <button
            onClick={() => setScreen('catalog')}
            className="flex items-center gap-1 text-brand font-ui text-xs font-black uppercase tracking-widest"
          >
            All <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* First card — full width featured */}
          {featured.slice(0, 1).map((cat) => (
            <motion.button
              key={cat.id}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              onClick={() => { onCategorySelect(cat); setScreen('catalog'); }}
              className="col-span-2 relative h-44 rounded-3xl overflow-hidden bg-gray-100 group"
            >
              {cat.thumbnail ? (
                <img src={cat.thumbnail} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Zap size={32} className="text-gray-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="font-ui text-[9px] font-black text-brand uppercase tracking-[0.3em] mb-1">{cat.products.length} products</p>
                <p className="font-headline text-2xl font-black text-white uppercase tracking-tight leading-none">{cat.name}</p>
              </div>
              <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <ArrowRight size={16} className="text-white" />
              </div>
            </motion.button>
          ))}

          {/* Remaining cards — 2-col grid */}
          {featured.slice(1).map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + idx * 0.07, duration: 0.5 }}
              onClick={() => { onCategorySelect(cat); setScreen('catalog'); }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group"
            >
              {cat.thumbnail ? (
                <img src={cat.thumbnail} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Zap size={24} className="text-gray-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="font-headline text-sm font-black text-white uppercase tracking-tight leading-tight">{cat.name}</p>
                <p className="font-ui text-[9px] text-white/50 mt-0.5">{cat.products.length} products</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-4">
        <button
          onClick={() => setScreen('catalog')}
          className="w-full h-16 bg-black text-white font-ui font-black rounded-2xl flex items-center justify-center gap-3 text-sm uppercase tracking-widest group"
        >
          Browse Full Catalog
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ArrowRight size={18} />
          </motion.span>
        </button>
      </div>
    </div>
  );
};
