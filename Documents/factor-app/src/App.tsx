import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Screen, NavTab, Product, Category } from './types';
import { ALL_PRODUCTS } from './data/products';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './screens/SplashScreen';
import { Onboarding } from './screens/Onboarding';
import { HomeScreen } from './screens/HomeScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { ProductDetail } from './screens/ProductDetail';
import { ARSimulation } from './screens/ARSimulation';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { AccountScreen } from './screens/AccountScreen';

const NAV_SCREENS: Screen[] = ['home', 'catalog', 'ar', 'favorites', 'account'];

const screenToTab: Partial<Record<Screen, NavTab>> = {
  home: 'home',
  catalog: 'catalog',
  ar: 'ar',
  favorites: 'favorites',
  account: 'account',
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [prevScreen, setPrevScreen] = useState<Screen>('catalog');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [initialCategoryId, setInitialCategoryId] = useState<string | undefined>(undefined);

  const navigate = useCallback((s: Screen) => {
    if (NAV_SCREENS.includes(screen)) setPrevScreen(screen);
    setScreen(s);
  }, [screen]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleProductSelect = useCallback((p: Product) => {
    setSelectedProduct(p);
    navigate('detail');
  }, [navigate]);

  const handleCategorySelect = useCallback((cat: Category) => {
    setInitialCategoryId(cat.id);
  }, []);

  const activeTab = screenToTab[screen] ?? 'home';
  const showNav = NAV_SCREENS.includes(screen);
  const favoriteProducts = ALL_PRODUCTS.filter(p => favorites.has(p.id));

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <motion.div key="splash" exit={{ opacity: 0 }}>
            <SplashScreen onComplete={() => setScreen('onboarding')} />
          </motion.div>
        )}

        {screen === 'onboarding' && (
          <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Onboarding onNext={() => setScreen('home')} />
          </motion.div>
        )}

        {screen === 'home' && (
          <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <HomeScreen setScreen={navigate} onCategorySelect={handleCategorySelect} />
          </motion.div>
        )}

        {screen === 'catalog' && (
          <motion.div key="catalog" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
            <CatalogScreen initialCategoryId={initialCategoryId} onProductSelect={handleProductSelect} />
          </motion.div>
        )}

        {screen === 'detail' && selectedProduct && (
          <motion.div
            key={`detail-${selectedProduct.id}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 200 }}
          >
            <ProductDetail
              product={selectedProduct}
              isFavorite={favorites.has(selectedProduct.id)}
              onBack={() => setScreen(prevScreen)}
              onAR={() => navigate('ar')}
              onToggleFavorite={toggleFavorite}
            />
          </motion.div>
        )}

        {screen === 'ar' && (
          <motion.div key="ar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ARSimulation
              product={selectedProduct}
              onClose={() => setScreen(selectedProduct ? 'detail' : 'catalog')}
            />
          </motion.div>
        )}

        {screen === 'favorites' && (
          <motion.div key="favorites" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <FavoritesScreen
              favorites={favoriteProducts}
              onProductSelect={handleProductSelect}
              onRemove={toggleFavorite}
            />
          </motion.div>
        )}

        {screen === 'account' && (
          <motion.div key="account" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <AccountScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {showNav && (
        <BottomNav active={activeTab} setScreen={navigate} />
      )}
    </div>
  );
}
