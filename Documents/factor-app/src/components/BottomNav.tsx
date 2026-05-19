import { Home, BookOpen, Box, Heart, User } from 'lucide-react';
import { NavItem } from './NavItem';
import { NavTab, Screen } from '../types';

interface BottomNavProps {
  active: NavTab;
  setScreen: (s: Screen) => void;
}

export const BottomNav = ({ active, setScreen }: BottomNavProps) => (
  <nav className="shell-fixed bottom-0 z-50 flex justify-around items-center h-20 pb-safe bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
    <NavItem icon={<Home size={22} />} label="Home" active={active === 'home'} onClick={() => setScreen('home')} />
    <NavItem icon={<BookOpen size={22} />} label="Catalog" active={active === 'catalog'} onClick={() => setScreen('catalog')} />
    <NavItem icon={<Box size={22} />} label="AR" active={active === 'ar'} onClick={() => setScreen('ar')} />
    <NavItem icon={<Heart size={22} />} label="Saved" active={active === 'favorites'} onClick={() => setScreen('favorites')} />
    <NavItem icon={<User size={22} />} label="Account" active={active === 'account'} onClick={() => setScreen('account')} />
  </nav>
);
