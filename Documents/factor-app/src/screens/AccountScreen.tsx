import { Globe, Mail, Phone } from 'lucide-react';
import { Logo } from '../components/Logo';

export const AccountScreen = () => (
  <div className="min-h-[100dvh] bg-white pb-nav">
    <header className="shell-fixed top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-50 px-6 py-5 flex items-center gap-3">
      <Logo className="w-9 h-9" />
      <span className="font-headline text-lg font-black uppercase tracking-tighter text-black">Account</span>
    </header>

    <div className="pt-[72px] px-6">
      <h1 className="font-headline text-5xl font-black text-black mt-6 mb-8 tracking-tighter leading-none">
        Account
      </h1>

      {/* Brand info card */}
      <div className="bg-black rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-brand/20 blur-2xl" />
        <Logo className="w-14 h-14 mb-6" invert />
        <h2 className="font-headline text-2xl font-black text-white uppercase tracking-tight mb-1">Factor LED</h2>
        <p className="font-ui text-white/50 text-sm">Premium LED Lighting Solutions</p>
      </div>

      {/* Contact info */}
      <div className="flex flex-col gap-3">
        {[
          { icon: Globe, label: 'Website', value: 'www.factorled.pk' },
          { icon: Mail, label: 'Email', value: 'info@factorled.pk' },
          { icon: Phone, label: 'Phone', value: '+92 300 0000000' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
              <Icon size={18} className="text-brand" />
            </div>
            <div>
              <p className="font-ui text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
              <p className="font-ui text-sm font-semibold text-black">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
