import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';
import { Logo } from '../components/Logo';
import { CATEGORIES } from '../data/products';
import { Category, Screen } from '../types';

interface HomeScreenProps {
  setScreen: (s: Screen) => void;
  onCategorySelect: (cat: Category) => void;
}

export const HomeScreen = ({ setScreen, onCategorySelect }: HomeScreenProps) => {
  const featured = CATEGORIES.slice(0, 6);

  return (
    <div className="min-h-[100dvh] bg-white pb-nav overflow-y-auto">
      {/* Hero header */}
      <div className="relative bg-black px-6 pt-16 pb-10 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <Logo className="w-10 h-10" invert />
            <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
          </div>
          <p className="font-ui text-brand text-[11px] font-black uppercase tracking-[0.3em] mb-3">Factor LED</p>
          <h1 className="font-headline text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            Light<br />Redefined.
          </h1>
          <p className="font-ui text-white/50 text-sm leading-relaxed max-w-[280px]">
            Premium LED solutions for architects, designers, and engineers.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-brand px-6 py-5 flex justify-between">
        {[['16', 'Categories'], ['50+', 'Products'], ['IP66', 'Rated']].map(([val, label]) => (
          <div key={label} className="flex flex-col items-center">
            <span className="font-headline text-2xl font-black text-white">{val}</span>
            <span className="font-ui text-[10px] text-white/70 uppercase tracking-widest">{label}</span>
          </div>
        ))}
      </div>

      {/* Category grid */}
      <div className="px-6 pt-10 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline text-2xl font-black text-black uppercase tracking-tight">Categories</h2>
          <button
            onClick={() => setScreen('catalog')}
            className="flex items-center gap-1 text-brand font-ui text-xs font-black uppercase tracking-widest"
          >
            All <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {featured.map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.07, duration: 0.5 }}
              onClick={() => { onCategorySelect(cat); setScreen('catalog'); }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 group"
            >
              {cat.thumbnail ? (
                <img src={cat.thumbnail} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Zap size={32} className="text-gray-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="font-headline text-sm font-black text-white uppercase tracking-tight leading-tight">{cat.name}</p>
                <p className="font-ui text-[10px] text-white/60">{cat.products.length} products</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-4">
        <button
          onClick={() => setScreen('catalog')}
          className="w-full h-16 bg-black text-white font-ui font-black rounded-2xl flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
        >
          Browse Full Catalog <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
