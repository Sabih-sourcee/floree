import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, CheckCircle2, Camera, Plus, FileText } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Product } from '../types';

interface ARSimulationProps {
  product: Product | null;
  onClose: () => void;
}

export const ARSimulation = ({ product, onClose }: ARSimulationProps) => {
  const [placed, setPlaced] = useState(false);

  const productImage = product?.images[0] ?? '/image_1.png';
  const productName = product?.name ?? 'Factor LED Product';
  const productCategory = product?.categoryName ?? 'Factor LED';

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      {/* AR background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=2000"
          alt="room"
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>

      {/* Header */}
      <header className="absolute top-0 w-full z-10 px-6 pt-14 pb-4 flex justify-between items-center">
        <Logo className="w-8 h-8" invert />
        <div className="flex gap-3">
          <button
            onClick={() => setPlaced(false)}
            className="w-11 h-11 rounded-full glass flex items-center justify-center"
          >
            <RotateCcw size={18} className="text-white" />
          </button>
          <button onClick={onClose} className="w-11 h-11 rounded-full glass flex items-center justify-center">
            <X size={18} className="text-white" />
          </button>
        </div>
      </header>

      {/* Scanning / placement UI */}
      {!placed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-none z-10">
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            style={{ transform: 'rotate(45deg)' }}
            className="w-44 h-44 border-2 border-brand/60 flex items-center justify-center"
          >
            <div className="w-5 h-5 bg-brand rounded-full brand-glow" style={{ transform: 'rotate(-45deg)' }} />
          </motion.div>
          <p className="font-ui text-[11px] text-white font-black uppercase tracking-[0.35em]">
            Detecting Surface…
          </p>
          <button
            onClick={() => setPlaced(true)}
            className="pointer-events-auto bg-brand text-white px-12 py-5 font-ui font-black rounded-full brand-glow-sm text-sm uppercase tracking-widest"
          >
            Place Here
          </button>
        </div>
      )}

      {/* Placed product overlay */}
      {placed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="w-60 h-60 relative">
            <div className="absolute inset-0 bg-brand/20 blur-[50px] rounded-full animate-pulse" />
            <img src={productImage} alt={productName} className="w-full h-full object-contain relative z-10 drop-shadow-2xl" />
          </div>
        </motion.div>
      )}

      {/* Bottom action sheet */}
      <AnimatePresence>
        {placed && (
          <motion.div
            initial={{ y: 280, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 280, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="absolute bottom-0 w-full z-20 bg-white rounded-t-[48px] px-8 pt-10 pb-safe flex flex-col gap-5"
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-200 rounded-full" />

            <div>
              <div className="flex items-center gap-2 text-brand mb-1">
                <CheckCircle2 size={16} />
                <span className="font-ui text-[11px] font-black uppercase tracking-widest">{productName} Placed</span>
              </div>
              <h2 className="font-headline text-2xl font-black text-black uppercase tracking-tight">{productName}</h2>
              <p className="font-ui text-gray-400 text-sm mt-1">{productCategory}</p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 h-16 bg-gray-100 text-black font-ui font-black rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                <Camera size={20} /> Snapshot
              </button>
              <button
                onClick={() => setPlaced(false)}
                className="flex-1 h-16 border-2 border-brand text-brand font-ui font-black rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
              >
                <Plus size={20} /> Relocate
              </button>
            </div>
            <button className="h-16 bg-black text-white font-ui font-black rounded-2xl flex items-center justify-center gap-3 text-sm uppercase tracking-widest">
              <FileText size={20} /> Request Quotation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
