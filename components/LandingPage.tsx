'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Content {
  site: Record<string, string>;
  navbar: { links: Array<{ label: string; href: string }>; ctaText: string };
  ticker: string[];
  hero: Record<string, string>;
  values: { tag: string; title: string; titleHighlight: string; subtitle: string; items: Array<{ icon: string; title: string; desc: string }> };
  categories: { tag: string; title: string; titleHighlight: string; viewAllText: string; items: Array<{ label: string; name: string; image: string; btnText: string }> };
  bestsellers: {
    tag: string; title: string; titleHighlight: string; viewAllText: string;
    products: Array<{
      id: string; badge: string; badgeType: string; category: string; name: string;
      description: string; rating: string; reviewCount: string; price: string;
      oldPrice: string; discount: string; sizes: string[]; image: string; featured: boolean;
    }>;
  };
  benefits: { tag: string; title: string; titleHighlight: string; subtitle: string; image: string; items: Array<{ icon: string; title: string; desc: string }> };
  reviews: {
    tag: string; title: string; titleHighlight: string; overallRating: string;
    reviewCount: string; subtitle: string; collageImage: string;
    items: Array<{ initials: string; avatarGradient: string; name: string; location: string; time: string; stars: number; text: string; product: string }>;
  };
  cta: Record<string, string | number>;
  newsletter: { tag: string; title: string; titleHighlight: string; subtitle: string; perks: Array<{ icon: string; text: string }>; btnText: string; privacyText: string };
  footer: { description: string; socials: Array<{ icon: string; label: string; url: string }>; productLinks: string[]; supportLinks: string[]; paymentMethods: string[]; copyright: string };
}

export default function LandingPage({ content }: { content: Content }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState({ h: '08', m: '47', s: '23' });
  const [cartCount, setCartCount] = useState(3);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const key = 'fitmax_sale_end';
    let target: number;
    const stored = localStorage.getItem(key);
    if (stored) {
      target = parseInt(stored);
      if (target < Date.now()) { target = Date.now() + 8 * 3600000 + 47 * 60000 + 23000; localStorage.setItem(key, target.toString()); }
    } else {
      target = Date.now() + 8 * 3600000 + 47 * 60000 + 23000;
      localStorage.setItem(key, target.toString());
    }
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setCountdown({ h: '00', m: '00', s: '00' }); return; }
      setCountdown({
        h: String(Math.floor(diff / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const addToCart = () => setCartCount(c => c + 1);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const { site, navbar, ticker, hero, values, categories, bestsellers, benefits, reviews, cta, newsletter, footer } = content;

  const badgeClass = (type: string) => {
    if (type === 'hot') return 'bg-[#FF4D00] text-white';
    if (type === 'new') return 'bg-[#FFD700] text-black';
    return 'bg-green-500 text-white';
  };

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[rgba(5,5,5,0.88)] backdrop-blur-xl border-b border-white/10 py-3' : 'py-5'}`}>
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <a href="#" className="text-2xl font-black tracking-tight no-underline text-white">
            {site.logo?.slice(0, 3)}<span className="text-[#FF4D00]">{site.logo?.slice(3)}</span>
          </a>
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {navbar.links.map((l, i) => (
              <li key={i}><a href={l.href} className="text-white/70 hover:text-white text-sm font-medium transition-colors no-underline">{l.label}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#bestsellers" className="relative w-11 h-11 bg-white/5 border border-white/10 text-white rounded-full flex items-center justify-center text-lg hover:bg-[#FF4D00] hover:border-[#FF4D00] transition-all no-underline">
              🛒
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4D00] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
            </a>
            <a href="#bestsellers" className="hidden md:flex items-center gap-2 bg-[#FF4D00] text-white text-sm font-bold px-6 py-3 rounded-full hover:shadow-[0_12px_40px_rgba(255,77,0,0.4)] hover:-translate-y-0.5 transition-all no-underline">
              {navbar.ctaText}
            </a>
            <button onClick={() => setMenuOpen(true)} className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-none border-none p-1" aria-label="Menu">
              {[0,1,2].map(i => <span key={i} className="block w-6 h-0.5 bg-white rounded" />)}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[rgba(5,5,5,0.97)] backdrop-blur-xl z-[999] flex flex-col items-center justify-center gap-8">
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 bg-none border-none text-white text-3xl cursor-pointer">✕</button>
          {navbar.links.map((l, i) => (
            <a key={i} href={l.href} onClick={() => setMenuOpen(false)} className="text-3xl font-black text-white hover:text-[#FF4D00] transition-colors no-underline">{l.label}</a>
          ))}
          <a href="#bestsellers" onClick={() => setMenuOpen(false)} className="bg-[#FF4D00] text-white font-bold text-lg px-8 py-4 rounded-full no-underline">Mua Ngay ⚡</a>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 50%,rgba(255,77,0,.12) 0%,transparent 70%),radial-gradient(ellipse 40% 60% at 10% 80%,rgba(255,77,0,.08) 0%,transparent 60%),#050505' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-6xl mx-auto px-5 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[rgba(255,77,0,0.1)] border border-[rgba(255,77,0,0.25)] text-[#FF4D00] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-full animate-pulse-dot" />
                {hero.badge}
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-5">
                <span className="block">{hero.title1}</span>
                <span className="block text-[#FF4D00]">{hero.title2}</span>
                <span className="block">{hero.title3}</span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed mb-9 max-w-md">{hero.description}</p>
              <div className="flex items-center gap-4 flex-wrap mb-12">
                <a href="#bestsellers" className="inline-flex items-center gap-2 bg-[#FF4D00] text-white font-bold px-8 py-4 rounded-full hover:shadow-[0_12px_40px_rgba(255,77,0,0.4)] hover:-translate-y-0.5 transition-all no-underline">{hero.ctaPrimary}</a>
                <a href="#social-proof" className="inline-flex items-center gap-2 border border-white/20 text-white font-bold px-8 py-4 rounded-full backdrop-blur-sm hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all no-underline">{hero.ctaSecondary}</a>
              </div>
              <div className="flex gap-8">
                {[
                  { num: hero.stat1Num, label: hero.stat1Label },
                  { num: hero.stat2Num, label: hero.stat2Label },
                  { num: hero.stat3Num, label: hero.stat3Label },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-white">{s.num}</div>
                    <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[520px] md:h-[580px]">
              <Image src={hero.heroMaleImage} alt="FITMAX male model" fill className="object-cover rounded-2xl shadow-2xl" style={{ right: 0, left: 'auto', width: '55%' }} />
              <Image src={hero.heroFemaleImage} alt="FITMAX female model" fill className="object-cover rounded-2xl border border-white/10 shadow-2xl" style={{ left: 0, top: 'auto', bottom: '60px', width: '50%', height: '70%' }} />
              <div className="absolute top-10 right-[44%] bg-[rgba(20,20,20,0.85)] backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 animate-float">
                <div className="text-xs text-gray-400 mb-0.5">Đơn hàng vừa đặt</div>
                <div className="text-base font-black text-white">{hero.floatCard1}</div>
              </div>
              <div className="absolute bottom-5 right-2 bg-[rgba(20,20,20,0.85)] backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 animate-float-delay">
                <div className="text-xs text-gray-400 mb-0.5">Đánh giá mới nhất</div>
                <div className="text-base font-black text-white">{hero.floatCard2}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="bg-[#FF4D00] py-3.5 overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-ticker">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-8 text-xs font-bold tracking-widest uppercase text-white">
              {item}
              <span className="w-1 h-1 bg-white/50 rounded-full" />
            </span>
          ))}
        </div>
      </div>

      {/* ── VALUES ── */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block bg-[rgba(255,77,0,0.15)] border border-[rgba(255,77,0,0.3)] text-[#FF4D00] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">{values.tag}</span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">{values.title} <span className="text-[#FF4D00]">{values.titleHighlight}</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">{values.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.items.map((v, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:-translate-y-1.5 hover:border-[rgba(255,77,0,0.3)] hover:shadow-[0_20px_60px_rgba(255,77,0,0.1)] transition-all group">
                <div className="w-14 h-14 bg-[rgba(255,77,0,0.1)] border border-[rgba(255,77,0,0.2)] rounded-xl flex items-center justify-center text-2xl mx-auto mb-5 group-hover:scale-110 transition-transform">{v.icon}</div>
                <div className="font-black text-lg mb-2">{v.title}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="py-24 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="inline-block bg-[rgba(255,77,0,0.15)] border border-[rgba(255,77,0,0.3)] text-[#FF4D00] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">{categories.tag}</span>
              <h2 className="text-4xl md:text-5xl font-black">{categories.title} <span className="text-[#FF4D00]">{categories.titleHighlight}</span></h2>
            </div>
            <a href="#bestsellers" className="border border-white/20 text-white font-bold px-6 py-3 rounded-full hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all no-underline hidden md:block">{categories.viewAllText}</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {categories.items.map((cat, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden cursor-pointer group ${i === 0 ? 'md:row-span-2' : ''}`}>
                <div className={`relative w-full overflow-hidden ${i === 0 ? 'h-[400px] md:h-full min-h-[400px]' : 'h-64'}`}>
                  <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent flex flex-col justify-end p-7">
                  <div className="text-xs font-bold tracking-widest uppercase text-[#FF4D00] mb-1.5">{cat.label}</div>
                  <div className="text-xl font-black mb-3">{cat.name}</div>
                  <a href="#bestsellers" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-5 py-2.5 rounded-full opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-[#FF4D00] hover:border-[#FF4D00] no-underline w-fit">{cat.btnText}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      <section id="bestsellers" className="py-24 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="inline-block bg-[rgba(255,77,0,0.15)] border border-[rgba(255,77,0,0.3)] text-[#FF4D00] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">{bestsellers.tag}</span>
              <h2 className="text-4xl md:text-5xl font-black">{bestsellers.title} <span className="text-[#FF4D00]">{bestsellers.titleHighlight}</span></h2>
            </div>
            <a href="#" className="border border-white/20 text-white font-bold px-6 py-3 rounded-full hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all no-underline hidden md:block">{bestsellers.viewAllText}</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {bestsellers.products.map((p) => (
              <div key={p.id} className={`bg-[#141414] border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:border-[rgba(255,77,0,0.3)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition-all cursor-pointer group ${p.featured ? 'md:col-span-2 md:grid md:grid-cols-2' : ''}`}>
                <div className={`relative overflow-hidden bg-[#0a0a0a] ${p.featured ? 'min-h-[280px]' : 'h-56'}`}>
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className={`absolute top-3.5 left-3.5 text-xs font-black tracking-wide uppercase px-3 py-1.5 rounded-full ${badgeClass(p.badgeType)}`}>{p.badge}</span>
                  <button className="absolute top-3.5 right-3.5 w-9 h-9 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-base hover:bg-[rgba(255,77,0,0.8)] transition-all" aria-label="Wishlist">🤍</button>
                </div>
                <div className={`p-5 ${p.featured ? 'flex flex-col justify-center p-8' : ''}`}>
                  <div className="text-xs font-bold tracking-widest uppercase text-[#FF4D00] mb-2">{p.category}</div>
                  <h3 className={`font-black leading-tight mb-2 ${p.featured ? 'text-2xl mb-3' : 'text-base'}`}>{p.name}</h3>
                  {p.description && <p className="text-xs text-gray-400 leading-relaxed mb-5">{p.description}</p>}
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-[#FFD700] text-xs tracking-wide">{'★'.repeat(Math.floor(parseFloat(p.rating)))}</span>
                    <span className="text-xs text-gray-400">{p.rating} ({p.reviewCount})</span>
                  </div>
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {p.sizes.map((s, si) => (
                      <button key={si} className="bg-white/5 border border-white/10 text-white/60 text-xs font-bold px-2.5 py-1 rounded-lg hover:bg-[rgba(255,77,0,0.15)] hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all">{s}</button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className={`font-black text-[#FF4D00] ${p.featured ? 'text-3xl' : 'text-xl'}`}>{p.price}</span>
                    <span className="text-sm text-gray-400 line-through">{p.oldPrice}</span>
                    <span className="text-xs font-bold bg-green-500/15 text-green-400 px-2 py-1 rounded">{p.discount}</span>
                  </div>
                  <button onClick={addToCart} className="w-full bg-[#FF4D00] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#FF6B2B] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(255,77,0,0.3)] transition-all">🛒 Thêm Vào Giỏ</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section id="benefits" className="py-24 bg-[#050505] overflow-hidden">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-15 -left-15 w-72 h-72 bg-[radial-gradient(circle,rgba(255,77,0,0.3),transparent_70%)] rounded-full blur-[40px] pointer-events-none" />
              <Image src={benefits.image} alt="FITMAX fabric technology" width={600} height={700} className="w-full rounded-2xl shadow-2xl relative z-10" />
            </div>
            <div>
              <span className="inline-block bg-[rgba(255,77,0,0.15)] border border-[rgba(255,77,0,0.3)] text-[#FF4D00] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">{benefits.tag}</span>
              <h2 className="text-4xl md:text-5xl font-black mb-3">{benefits.title} <span className="text-[#FF4D00]">{benefits.titleHighlight}</span></h2>
              <p className="text-gray-400 mb-8">{benefits.subtitle}</p>
              <div className="flex flex-col gap-5">
                {benefits.items.map((b, i) => (
                  <div key={i} className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[rgba(255,77,0,0.3)] hover:translate-x-1.5 transition-all">
                    <div className="w-12 h-12 bg-[rgba(255,77,0,0.1)] rounded-xl flex items-center justify-center text-2xl shrink-0">{b.icon}</div>
                    <div>
                      <div className="font-black text-base mb-1">{b.title}</div>
                      <p className="text-xs text-gray-400 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section id="social-proof" className="py-24 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block bg-[rgba(255,77,0,0.15)] border border-[rgba(255,77,0,0.3)] text-[#FF4D00] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">{reviews.tag}</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4">{reviews.title} <span className="text-[#FF4D00]">{reviews.titleHighlight}</span></h2>
            <div className="flex items-center justify-center gap-6 my-6">
              <div className="text-7xl font-black leading-none">{reviews.overallRating}</div>
              <div>
                <div className="text-2xl text-[#FFD700] tracking-widest mb-1.5">★★★★★</div>
                <div className="text-sm text-gray-400">Dựa trên {reviews.reviewCount} đánh giá</div>
              </div>
            </div>
            <p className="text-gray-400 max-w-xl mx-auto">{reviews.subtitle}</p>
          </div>
          <Image src={reviews.collageImage} alt="FITMAX customer community" width={1200} height={500} className="w-full rounded-2xl shadow-2xl mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.items.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:-translate-y-1 hover:border-[rgba(255,77,0,0.25)] transition-all">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black text-white shrink-0" style={{ background: r.avatarGradient }}>{r.initials}</div>
                  <div>
                    <div className="font-black text-sm">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.location} · {r.time}</div>
                  </div>
                </div>
                <div className="text-[#FFD700] text-sm tracking-wide mb-3">{'★'.repeat(r.stars)}</div>
                <p className="text-sm text-white/75 leading-relaxed">"{r.text}"</p>
                <div className="mt-3.5 text-xs text-[#FF4D00] font-semibold">✓ Mua: {r.product}</div>
                <div className="mt-2.5 text-xs text-green-400 font-bold flex items-center gap-1">✓ Đã xác minh mua hàng</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="py-24 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="relative rounded-[32px] overflow-hidden text-center px-6 py-20 md:py-24 border border-[rgba(255,77,0,0.2)]" style={{ background: 'linear-gradient(135deg,#1a0a00,#0D0D0D)' }}>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[radial-gradient(circle,rgba(255,77,0,0.2),transparent_70%)] rounded-full blur-[60px]" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,rgba(255,77,0,0.15),transparent_70%)] rounded-full blur-[60px]" />
            <div className="relative z-10">
              <span className="inline-block bg-[rgba(255,77,0,0.15)] border border-[rgba(255,77,0,0.3)] text-[#FF4D00] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">{String(cta.tag)}</span>
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-4">
                {String(cta.title)} <span className="text-[#FF4D00]">{String(cta.titleHighlight)}</span><br/>{String(cta.titleSuffix)}
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">{String(cta.subtitle)}</p>
              <div className="flex justify-center gap-5 mb-10">
                {[
                  { val: countdown.h, label: 'Giờ' },
                  { val: countdown.m, label: 'Phút' },
                  { val: countdown.s, label: 'Giây' },
                ].map((c, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 min-w-[70px] text-center">
                    <div className="text-4xl font-black text-[#FF4D00] leading-none">{c.val}</div>
                    <div className="text-xs font-semibold tracking-widest text-gray-400 mt-1 uppercase">{c.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 flex-wrap">
                <a href="#bestsellers" className="bg-[#FF4D00] text-white font-bold text-base px-10 py-5 rounded-full hover:shadow-[0_12px_40px_rgba(255,77,0,0.4)] hover:-translate-y-0.5 transition-all no-underline">{String(cta.primaryBtn)}</a>
                <a href="#categories" className="border border-white/20 text-white font-bold text-base px-10 py-5 rounded-full hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all no-underline">{String(cta.secondaryBtn)}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section id="newsletter" className="py-24 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="rounded-[32px] px-6 py-16 md:py-20 text-center border border-[rgba(255,77,0,0.15)]" style={{ background: 'linear-gradient(135deg,rgba(255,77,0,0.08),rgba(255,77,0,0.03))' }}>
            <span className="inline-block bg-[rgba(255,77,0,0.15)] border border-[rgba(255,77,0,0.3)] text-[#FF4D00] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">{newsletter.tag}</span>
            <h2 className="text-4xl md:text-5xl font-black mb-2">{newsletter.title} <span className="text-[#FF4D00]">{newsletter.titleHighlight}</span></h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">{newsletter.subtitle}</p>
            <div className="flex justify-center gap-8 mb-8 flex-wrap">
              {newsletter.perks.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-lg">{p.icon}</span> {p.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-lg mx-auto flex-col sm:flex-row">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Nhập email của bạn..." required
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder-gray-500 outline-none focus:border-[#FF4D00] transition-colors text-sm" />
              <button type="submit" className={`font-bold px-8 py-4 rounded-full transition-all ${subscribed ? 'bg-green-500 text-white' : 'bg-[#FF4D00] text-white hover:shadow-[0_12px_40px_rgba(255,77,0,0.4)]'}`}>
                {subscribed ? '✓ Đã Đăng Ký!' : newsletter.btnText}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">{newsletter.privacyText}</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="footer" className="bg-[#030303] border-t border-white/10 pt-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
            <div>
              <a href="#" className="text-2xl font-black no-underline text-white">{site.logo?.slice(0,3)}<span className="text-[#FF4D00]">{site.logo?.slice(3)}</span></a>
              <p className="text-sm text-gray-400 leading-relaxed my-4 max-w-[260px]">{footer.description}</p>
              <div className="flex gap-3">
                {footer.socials.map((s, i) => (
                  <a key={i} href={s.url} aria-label={s.label} className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-base hover:bg-[#FF4D00] hover:border-[#FF4D00] hover:-translate-y-0.5 transition-all no-underline">{s.icon}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-black tracking-widest uppercase mb-6">Sản Phẩm</div>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {footer.productLinks.map((l, i) => <li key={i}><a href="#categories" className="text-sm text-gray-400 hover:text-[#FF4D00] transition-colors no-underline">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <div className="text-xs font-black tracking-widest uppercase mb-6">Hỗ Trợ</div>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {footer.supportLinks.map((l, i) => <li key={i}><a href="#" className="text-sm text-gray-400 hover:text-[#FF4D00] transition-colors no-underline">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <div className="text-xs font-black tracking-widest uppercase mb-6">Liên Hệ</div>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                <li><a href={`tel:${site.phone}`} className="text-sm text-gray-400 hover:text-[#FF4D00] transition-colors no-underline">📞 {site.phone}</a></li>
                <li><a href={`mailto:${site.email}`} className="text-sm text-gray-400 hover:text-[#FF4D00] transition-colors no-underline">✉️ {site.email}</a></li>
                <li><span className="text-sm text-gray-400">📍 {site.address}</span></li>
                <li><span className="text-sm text-gray-400">⏰ {site.workingHours}</span></li>
              </ul>
              <div className="mt-5">
                <div className="text-xs font-black tracking-widest uppercase mb-3">Thanh Toán</div>
                <div className="flex gap-2 flex-wrap">
                  {footer.paymentMethods.map((m, i) => (
                    <span key={i} className="bg-white/6 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-400">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center py-7 flex-wrap gap-3">
            <div className="text-xs text-gray-500">{footer.copyright}</div>
            <div className="flex gap-5">
              {['Điều Khoản','Bảo Mật','Cookie'].map((l, i) => <a key={i} href="#" className="text-xs text-gray-500 hover:text-[#FF4D00] transition-colors no-underline">{l}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
