import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Heart, Box, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  isFavorite: boolean;
  onBack: () => void;
  onAR: () => void;
  onToggleFavorite: (id: string) => void;
}

export const ProductDetail = ({ product, isFavorite, onBack, onAR, onToggleFavorite }: ProductDetailProps) => {
  const [activeImg, setActiveImg] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);

  const images = product.variants ? product.variants[activeVariant].images : product.images;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, text: product.description ?? '', url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // user cancelled share
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="max-w-[440px] mx-auto min-h-[100dvh] relative">
        {/* Header */}
        <header className="sticky top-0 z-20 px-6 py-5 flex justify-between items-center bg-white/80 backdrop-blur">
          <button onClick={onBack} className="w-11 h-11 flex items-center justify-center bg-gray-100 rounded-full">
            <ArrowLeft size={22} />
          </button>
          <div className="flex gap-3">
            <button onClick={handleShare} className="w-11 h-11 flex items-center justify-center bg-gray-100 rounded-full">
              <Share2 size={20} />
            </button>
            <button
              onClick={() => onToggleFavorite(product.id)}
              className={`w-11 h-11 flex items-center justify-center rounded-full transition-all ${isFavorite ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </header>

        {/* Image carousel */}
        <div className="relative bg-gray-50 mx-6 rounded-3xl overflow-hidden mb-8" style={{ aspectRatio: '4/3' }}>
          <motion.img
            key={`${activeVariant}-${activeImg}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={images[activeImg]}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply p-6"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImg(i => Math.max(i - 1, 0))}
                disabled={activeImg === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setActiveImg(i => Math.min(i + 1, images.length - 1))}
                disabled={activeImg === images.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`h-1.5 rounded-full transition-all ${i === activeImg ? 'w-5 bg-brand' : 'w-1.5 bg-gray-300'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product info */}
        <div className="px-6">
          <div className="inline-flex px-3 py-1.5 mb-4 bg-brand/10 border border-brand/20 rounded-full">
            <span className="font-ui text-[10px] font-black text-brand uppercase tracking-[0.2em]">
              {product.categoryName}
            </span>
          </div>
          <h1 className="font-headline text-4xl font-black uppercase tracking-tighter leading-none mb-4">
            {product.name}
          </h1>
          {product.description && (
            <p className="font-ui text-gray-500 text-base leading-relaxed mb-8">{product.description}</p>
          )}

          {/* Wattage variants */}
          {product.variants && (
            <div className="mb-8">
              <p className="font-ui text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Wattage</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.wattage}
                    onClick={() => { setActiveVariant(i); setActiveImg(0); }}
                    className={`px-5 py-2.5 rounded-full font-ui font-black text-xs uppercase tracking-widest transition-all ${
                      activeVariant === i ? 'bg-brand text-white brand-glow-sm' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {v.wattage}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3 mb-24">
            <motion.button
              onClick={onAR}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-brand text-white font-ui font-black h-16 rounded-2xl flex items-center justify-center gap-3 brand-glow-sm text-sm uppercase tracking-widest"
            >
              <Box size={22} /> Launch AR View
            </motion.button>
            <motion.button
              onClick={() => onToggleFavorite(product.id)}
              whileTap={{ scale: 0.97 }}
              className={`w-full border-2 font-ui font-black h-16 rounded-2xl flex items-center justify-center gap-3 text-sm uppercase tracking-widest transition-all ${
                isFavorite
                  ? 'border-brand bg-brand text-white'
                  : 'border-brand text-brand hover:bg-brand/5'
              }`}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              {isFavorite ? 'Saved to Favorites' : 'Save to Favorites'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
