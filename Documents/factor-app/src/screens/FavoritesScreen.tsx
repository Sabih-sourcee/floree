import { motion } from 'motion/react';
import { Heart, Trash2 } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Product } from '../types';

interface FavoritesScreenProps {
  favorites: Product[];
  onProductSelect: (p: Product) => void;
  onRemove: (id: string) => void;
}

export const FavoritesScreen = ({ favorites, onProductSelect, onRemove }: FavoritesScreenProps) => (
  <div className="min-h-[100dvh] bg-white pb-nav">
    <header className="shell-fixed top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-50 px-6 py-5 flex items-center gap-3">
      <Logo className="w-9 h-9" />
      <span className="font-headline text-lg font-black uppercase tracking-tighter text-black">Saved</span>
    </header>

    <div className="pt-[72px] px-6">
      <h1 className="font-headline text-5xl font-black text-black mt-6 mb-8 tracking-tighter leading-none">
        Favorites
      </h1>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center">
            <Heart size={32} className="text-brand" />
          </div>
          <p className="font-headline text-xl font-black text-black uppercase tracking-tight">Nothing saved yet</p>
          <p className="font-ui text-gray-400 text-sm text-center">
            Tap the heart icon on any product to save it here.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {favorites.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.06 }}
              className="flex flex-col group cursor-pointer"
              onClick={() => onProductSelect(product)}
            >
              <div className="aspect-[4/3] bg-gray-50 rounded-3xl mb-4 overflow-hidden relative border border-gray-100 p-6 flex items-center justify-center">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                />
                <button
                  onClick={e => { e.stopPropagation(); onRemove(product.id); }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="px-1">
                <h3 className="font-headline text-xl font-black text-black tracking-tight uppercase">{product.name}</h3>
                <p className="font-ui text-brand font-black text-xs tracking-widest uppercase mt-1">{product.categoryName}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </div>
);
