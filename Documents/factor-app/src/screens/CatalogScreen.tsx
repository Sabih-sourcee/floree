import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Zap } from 'lucide-react';
import { Logo } from '../components/Logo';
import { CATEGORIES, ALL_PRODUCTS } from '../data/products';
import { Product } from '../types';

interface CatalogScreenProps {
  initialCategoryId?: string;
  onProductSelect: (p: Product) => void;
}

export const CatalogScreen = ({ initialCategoryId, onProductSelect }: CatalogScreenProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState(initialCategoryId ?? CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    return () => {
      if (el) sessionStorage.setItem('catalog-scroll', String(el.scrollTop));
    };
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem('catalog-scroll');
    if (saved && containerRef.current) {
      containerRef.current.scrollTop = Number(saved);
    }
  }, []);

  const handleImageLoad = (id: string) =>
    setImagesLoaded(prev => new Set([...prev, id]));

  const isSearching = searchQuery.trim().length > 0;

  const displayedProducts = useMemo(() => {
    if (isSearching) {
      const q = searchQuery.toLowerCase();
      return ALL_PRODUCTS.filter(
        p => p.name.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q)
      );
    }
    return CATEGORIES.find(c => c.id === activeCategoryId)?.products ?? [];
  }, [searchQuery, activeCategoryId, isSearching]);

  return (
    <div ref={containerRef} className="h-[100dvh] bg-white pb-nav overflow-y-auto">
      {/* Fixed header */}
      <header className="shell-fixed top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-50 px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo className="w-9 h-9" />
          <span className="font-headline text-lg font-black uppercase tracking-tighter text-black">Factor LED</span>
        </div>
      </header>

      <div className="pt-[72px] px-6">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-headline text-5xl font-black text-black mt-6 mb-6 tracking-tighter leading-none"
        >
          {isSearching ? 'Results' : 'Catalog'}
        </motion.h1>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search products or categories..."
            className="w-full bg-gray-50 rounded-full py-4 pl-12 pr-12 outline-none font-ui text-sm font-medium text-black placeholder:text-gray-300 focus:ring-2 focus:ring-brand/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Category pills */}
        <AnimatePresence>
          {!isSearching && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-2 overflow-x-auto scrollbar-hide -mx-6 px-6 mb-8 pb-1"
            >
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full font-ui font-black uppercase tracking-widest text-[10px] transition-all flex-shrink-0 ${
                    activeCategoryId === cat.id
                      ? 'bg-brand text-white brand-glow-sm'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result count during search */}
        {isSearching && (
          <p className="font-ui text-xs text-gray-400 mb-6 uppercase tracking-widest">
            {displayedProducts.length} product{displayedProducts.length !== 1 ? 's' : ''} found
          </p>
        )}

        {/* Product grid or empty state */}
        {displayedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Zap size={28} className="text-gray-300" />
            </div>
            <p className="font-headline text-xl font-black text-black uppercase tracking-tight">No products found</p>
            <p className="font-ui text-gray-400 text-sm text-center">
              {isSearching ? `No results for "${searchQuery}"` : 'No products in this category yet.'}
            </p>
            {isSearching && (
              <button onClick={() => setSearchQuery('')} className="text-brand font-ui font-black text-sm uppercase tracking-widest">
                Clear search
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-10 pb-6">
            {displayedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: Math.min(idx * 0.06, 0.4), duration: 0.5 }}
                className="flex flex-col group cursor-pointer"
                onClick={() => onProductSelect(product)}
              >
                <div className="aspect-[4/3] bg-gray-50 rounded-3xl mb-5 overflow-hidden relative border border-gray-100 p-6 flex items-center justify-center">
                  {!imagesLoaded.has(product.id) && (
                    <div className="absolute inset-0 skeleton rounded-3xl" />
                  )}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    onLoad={() => handleImageLoad(product.id)}
                    className={`w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ${imagesLoaded.has(product.id) ? 'opacity-100' : 'opacity-0'}`}
                  />
                  {isSearching && (
                    <div className="absolute top-4 left-4">
                      <span className="font-ui text-[10px] font-black text-brand bg-brand/10 border border-brand/20 px-2.5 py-1 rounded-full uppercase tracking-widest">
                        {product.categoryName}
                      </span>
                    </div>
                  )}
                </div>

                <div className="px-1">
                  <h3 className="font-headline text-xl font-black text-black tracking-tight uppercase leading-tight">
                    {product.name}
                  </h3>
                  <p className="font-ui text-brand font-black mt-1 text-xs tracking-widest uppercase">
                    {product.categoryName}
                    {product.variants ? ` · ${product.variants.length} variants` : ''}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
