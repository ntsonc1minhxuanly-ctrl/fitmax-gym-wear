'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Đăng nhập thất bại');
      }
    } catch {
      setError('Lỗi kết nối. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 40%,rgba(255,77,0,0.1) 0%,transparent 70%),#050505' }}>
      {/* Grid lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Glow orbs */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-[radial-gradient(circle,rgba(255,77,0,0.15),transparent_70%)] rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-[radial-gradient(circle,rgba(255,77,0,0.1),transparent_70%)] rounded-full blur-[50px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto px-5">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="text-3xl font-black no-underline text-white">FIT<span className="text-[#FF4D00]">MAX</span></a>
          <div className="mt-2 text-sm text-gray-400 font-medium tracking-widest uppercase">Admin Control Panel</div>
        </div>

        {/* Card */}
        <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-2xl font-black mb-1.5">Đăng Nhập Admin</h1>
          <p className="text-sm text-gray-400 mb-8">Quản lý nội dung website FITMAX GYM WEAR</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-2 tracking-widest uppercase">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="admin@fitmax.vn"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm outline-none focus:border-[#FF4D00] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-2 tracking-widest uppercase">Mật Khẩu</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm outline-none focus:border-[#FF4D00] transition-colors"
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#FF4D00] text-white font-bold py-4 rounded-xl text-base mt-2 hover:bg-[#FF6B2B] hover:shadow-[0_12px_40px_rgba(255,77,0,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Đang đăng nhập...</>
              ) : '🔐 Đăng Nhập'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <a href="/" className="text-xs text-gray-500 hover:text-[#FF4D00] transition-colors no-underline">← Quay về trang chủ</a>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">FITMAX GYM WEAR Admin Panel © 2025</p>
      </div>
    </div>
  );
}
