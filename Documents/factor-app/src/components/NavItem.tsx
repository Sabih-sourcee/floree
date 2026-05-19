import { motion } from 'motion/react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

export const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className="relative flex flex-col items-center justify-center gap-1 min-w-[56px]"
    aria-current={active ? 'page' : undefined}
  >
    {active && (
      <motion.div
        layoutId="nav-pill"
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-brand"
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    )}
    <div className={`transition-all duration-300 ${active ? 'text-brand scale-110' : 'text-gray-300'}`}>
      {icon}
    </div>
    <span className={`font-ui text-[10px] font-bold uppercase tracking-widest transition-colors ${active ? 'text-brand' : 'text-gray-300'}`}>
      {label}
    </span>
  </button>
);
