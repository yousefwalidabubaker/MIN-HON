import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Package, Star, Pen, Globe } from "lucide-react";
import { products, collectionLabels } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import heroImg from "@assets/ffe4b7d9-74b9-4d85-a881-9de44802c3ef_1777803965556.JPG";
import storyImg from "@assets/5e63c470-cf2e-4021-b548-8873cfb87929_1777803792974.JPG";

function TatreezDivider() {
  return <div className="tatreez-strip h-[6px] w-full" />;
}

const trustItems = [
  { icon: Package, en: "Free Worldwide Shipping", ar: "شحن مجاني" },
  { icon: Star, en: "Limited & Numbered Editions", ar: "إصدارات محدودة" },
  { icon: Pen, en: "Fully Customizable Pieces", ar: "قطع قابلة للتخصيص" },
  { icon: Globe, en: "Ships to Palestine & Diaspora", ar: "لكل فلسطيني في العالم" },
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const promiseRef = useScrollReveal<HTMLElement>();
  const trustRef = useScrollReveal<HTMLElement>();
  const featuredRef = useScrollReveal<HTMLElement>();
  const ctaRef = useScrollReveal<HTMLElement>();
  const newsletterRef = useScrollReveal<HTMLElement>();

  const featured = [
    products.find(p => p.id === "watch-01")!,
    products.find(p => p.id === "ring-01")!,
    products.find(p => p.id === "tshirt-01")!,
    products.find(p => p.id === "bracelet-01")!,
  ];

  const categories = [
    { id: "Watches", img: products.find(p => p.collection === "Watches")!.image, ar: "الوقت شاهد", count: 4 },
    { id: "Rings", img: products.find(p => p.collection === "Rings")!.image, ar: "سرديات الأرض", count: 3 },
    { id: "Clothing", img: products.find(p => p.collection === "Clothing")!.image, ar: "القميص والكنزة", count: 4 },
    { id: "Accessories", img: products.find(p => p.collection === "Accessories")!.image, ar: "الإكسسوارات", count: 4 },
    { id: "Heritage", img: products.find(p => p.collection === "Heritage")!.image, ar: "التراث", count: 2 },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-[#1A1208]">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="MIN HON — الوقت شاهد"
            className={`w-full h-full object-cover transition-all duration-[2.5s] ease-out ${loaded ? "scale-100 opacity-55" : "scale-106 opacity-0"}`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/75" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <div className={`transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex items-center gap-4 justify-center mb-8">
              <span className="h-px w-10 bg-[#B83030]/80" />
              <span className="text-[9px] tracking-[0.5em] uppercase text-white/55 font-light">من هون · Since Palestine</span>
              <span className="h-px w-10 bg-[#B83030]/80" />
            </div>
          </div>

          <p
            className={`font-arabic text-[clamp(2.2rem,7.5vw,5rem)] font-normal leading-tight mb-3 text-white transition-all duration-1000 delay-350 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            dir="rtl"
          >
            أنت جزء من القصة
          </p>
          <p
            className={`font-serif text-[clamp(0.8rem,2.2vw,1.1rem)] text-white/50 mb-14 tracking-[0.12em] italic transition-all duration-700 delay-600 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            You Are Part of the Story
          </p>

          <div className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-800 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/customize">
              <button
                data-testid="button-start-creating"
                className="group px-10 py-4 text-[11px] tracking-[0.4em] uppercase font-semibold text-white bg-[#B83030] hover:bg-[#9a2828] transition-all duration-300 flex items-center gap-3"
              >
                Start Creating
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/collections">
              <button className="px-10 py-4 text-[11px] tracking-[0.4em] uppercase font-semibold text-white/80 border border-white/25 hover:border-white/60 hover:text-white hover:bg-white/8 transition-all duration-300">
                Explore Shop
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-1200 ${loaded ? "opacity-50" : "opacity-0"}`}>
          <p className="text-[8px] tracking-[0.5em] uppercase text-white">Scroll</p>
          <div className="w-px h-10 bg-gradient-to-b from-white/80 to-white/0 animate-pulse" />
        </div>
      </section>

      {/* Tatreez Strip */}
      <TatreezDivider />

      {/* Trust Strip */}
      <section
        ref={trustRef}
        className="reveal border-b border-border/50"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
            {trustItems.map((item, i) => (
              <div
                key={item.en}
                className="px-5 py-5 flex items-center gap-3 reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <item.icon className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-foreground leading-none mb-0.5">{item.en}</p>
                  <p className="font-arabic text-[11px] text-muted-foreground" dir="rtl">{item.ar}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Promise */}
      <section ref={promiseRef} className="reveal py-24 px-6 container mx-auto max-w-2xl text-center">
        <span className="section-label">The Promise</span>
        <h2 className="font-serif text-[clamp(1.5rem,4vw,2.4rem)] leading-[1.45] text-foreground mb-8 text-balance">
          Every piece we make carries a story from Palestine — a heritage embroidered in every stitch, engraved in every ring, worn in every moment.
        </h2>
        <div className="tatreez-strip h-[4px] w-16 mx-auto mb-8" />
        <p className="font-arabic text-muted-foreground text-xl leading-loose mb-8" dir="rtl">
          من جذورنا... كرمنا
        </p>
        <Link href="/about" className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase font-medium text-primary group">
          <span className="link-underline">Discover Our Story</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* Featured Products */}
      <section ref={featuredRef} className="reveal pb-20 container mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="section-label">Featured Pieces</span>
            <h2 className="font-serif text-2xl md:text-3xl">From the Collection</h2>
          </div>
          <Link href="/collections" className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
            View All <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map((product, i) => (
            <div key={product.id} className="fade-up" style={{ animationDelay: `${i * 90}ms` }}>
              <ProductCard product={product} priority={i < 2} />
            </div>
          ))}
        </div>
      </section>

      <TatreezDivider />

      {/* Brand Story / Heritage section */}
      <section className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">
          <div className="relative overflow-hidden min-h-[300px]">
            <img src={storyImg} alt="MIN HON Heritage" className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-[#1A1208]/15" />
          </div>
          <div className="bg-secondary flex flex-col justify-center px-10 py-16 md:px-16">
            <span className="section-label">Our Heritage</span>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 leading-tight">
              From Here.<br />
              <span className="font-arabic text-primary" dir="rtl">من هون.</span>
            </h2>
            <div className="w-10 h-px bg-primary mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">
              MIN HON — "From Here" — is more than a brand. It is a declaration of origin. Every product is designed to carry the weight of Palestinian heritage and the lightness of belonging.
            </p>
            <p className="font-arabic text-muted-foreground leading-loose text-sm border-r-2 border-primary/40 pr-4" dir="rtl">
              من هون هو أكثر من علامة تجارية — إنه تصريح بالانتماء.
            </p>
            <div className="mt-8">
              <Link href="/about" className="btn-outline inline-block text-center">
                Our Full Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TatreezDivider />

      {/* Categories */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label">Browse by Category</span>
          <h2 className="font-serif text-3xl md:text-4xl">Pick Your Piece</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/collections?c=${cat.id}`}
              data-testid={`link-category-${cat.id.toLowerCase()}`}
              className="group relative overflow-hidden bg-secondary block aspect-[3/4]"
            >
              <img
                src={cat.img}
                alt={cat.id}
                className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.07]"
                loading={i < 2 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-arabic text-sm leading-snug mb-0.5" dir="rtl">{cat.ar}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/60">{cat.id}</p>
                  <p className="text-[9px] tracking-[0.15em] uppercase text-white/40">{cat.count} pieces</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Start Creating CTA */}
      <section ref={ctaRef} className="reveal bg-[#1C1208] text-white py-28">
        <div className="container mx-auto px-6 text-center max-w-xl">
          <span className="text-[10px] tracking-[0.45em] uppercase text-white/40 block mb-5">Customization · تخصيص</span>
          <h2 className="font-serif text-3xl md:text-[2.4rem] mb-3 text-balance leading-tight">Create Your Own Piece</h2>
          <p className="font-arabic text-xl text-white/50 mb-8" dir="rtl">صمّم قطعتك</p>
          <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
            Choose your product, select a tatreez design, add your name or a sentence in Arabic or English — and we'll craft it for you. Each piece numbered and signed with a certificate of authenticity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/customize">
              <button className="group px-10 py-4 text-[11px] tracking-[0.4em] uppercase font-semibold text-white bg-[#B83030] hover:bg-[#9a2828] transition-all duration-300 flex items-center gap-3">
                Start Creating
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/collections">
              <button className="px-10 py-4 text-[11px] tracking-[0.4em] uppercase font-semibold text-white/60 border border-white/20 hover:border-white/50 hover:text-white transition-all duration-300">
                Browse First
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Limited Editions Strip */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="section-label">Limited Editions</span>
            <h2 className="font-serif text-2xl md:text-3xl">Numbered Pieces</h2>
          </div>
          <Link href="/collections" className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
            All Editions <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.filter(p => p.limited).slice(0, 4).map((product, i) => (
            <div key={product.id} className="fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <div className="tatreez-strip h-[6px] w-full" />
      <section ref={newsletterRef} className="reveal py-20 bg-secondary">
        <div className="container mx-auto px-6 max-w-md text-center">
          <span className="section-label">Stay Connected</span>
          <h2 className="font-serif text-3xl mb-2">Join the Inner Circle</h2>
          <p className="font-arabic text-muted-foreground mb-6" dir="rtl">انضم إلى الدائرة الداخلية</p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs mx-auto">
            Be the first to know about new collections, limited editions, and stories from Palestine.
          </p>
          <form className="flex gap-0 border-b-2 border-foreground/20 hover:border-primary focus-within:border-primary transition-colors pb-3 mb-4" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/40 text-sm px-1"
              data-testid="input-newsletter"
              required
            />
            <button type="submit" className="text-[10px] tracking-[0.3em] uppercase font-semibold px-4 text-primary hover:text-primary/70 transition-colors" data-testid="button-subscribe">
              Subscribe
            </button>
          </form>
          <p className="text-[10px] text-muted-foreground/50 tracking-wide">No spam. Stories, drops, and heritage. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
