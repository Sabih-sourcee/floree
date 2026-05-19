export const Logo = ({ className = 'w-8 h-8', invert = false }: { className?: string; invert?: boolean }) => (
  <img
    src="/image_1.png"
    alt="Factor LED"
    className={`${className} object-contain${invert ? ' invert brightness-200' : ''}`}
    referrerPolicy="no-referrer"
  />
);
