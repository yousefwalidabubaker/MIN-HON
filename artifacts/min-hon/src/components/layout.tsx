import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { AIAssistant } from "./ai-assistant";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import logoImg from "@/assets/logo-transparent.png";

const navLinks = [
  { href: "/collections", label: "Shop", ar: "المتجر" },
  { href: "/customize", label: "Start Creating", ar: "صمّم قطعتك" },
  { href: "/about", label: "Our Story", ar: "قصتنا" },
  { href: "/blog", label: "Blog", ar: "المدونة" },
  { href: "/contact", label: "Contact", ar: "تواصل" },
];

const ANNOUNCEMENTS = [
  { en: "Free Worldwide Shipping", ar: "شحن مجاني لجميع دول العالم" },
  { en: "Limited Editions — Each Piece Numbered & Signed", ar: "إصدارات محدودة" },
  { en: "Handcrafted by Palestinian Artisans", ar: "من هون · صُنع في فلسطين" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [announcementFading, setAnnouncementFading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementFading(true);
      setTimeout(() => {
        setAnnouncementIdx(i => (i + 1) % ANNOUNCEMENTS.length);
        setAnnouncementFading(false);
      }, 350);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isHome = location === "/";
  const ann = ANNOUNCEMENTS[announcementIdx];
  const topOffset = announcementVisible ? 41 : 5;
  const mainPadding = topOffset + 58;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">

      {/* Fixed top stack */}
      <div className="fixed top-0 z-50 w-full">
        {/* Tatreez Strip */}
        <div className="tatreez-strip h-[5px] w-full" />

        {/* Announcement Bar */}
        <div
          className={`w-full bg-[#1C1208] text-white overflow-hidden transition-all duration-500 ${
            announcementVisible ? "h-9" : "h-0"
          }`}
        >
          <div className="h-9 flex items-center justify-center px-10 relative">
            <p
              className={`text-[10px] tracking-[0.3em] uppercase text-center transition-opacity duration-300 ${
                announcementFading ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="text-white/90">{ann.en}</span>
              <span className="mx-3 text-[#B83030]">·</span>
              <span className="font-arabic text-white/60 tracking-normal text-xs">{ann.ar}</span>
            </p>
            <button
              onClick={() => setAnnouncementVisible(false)}
              className="absolute right-4 text-white/40 hover:text-white/80 transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Header */}
        <header
          className={`w-full transition-all duration-500 ${
            scrolled || !isHome
              ? "bg-background/96 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
              : "bg-transparent border-b border-transparent"
          }`}
        >
          <div className="container mx-auto px-5 h-[58px] flex items-center justify-between">
            {/* Desktop Nav Left */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-200 relative group pb-px ${
                    location === link.href
                      ? "text-primary"
                      : scrolled || !isHome
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-300 ${
                    location === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center hover:opacity-75 transition-opacity duration-300">
              <img
                src={logoImg}
                alt="MIN HON"
                className={`w-auto drop-shadow-sm transition-all duration-300 ${scrolled ? "h-11" : "h-14"}`}
              />
            </Link>

            {/* Desktop Nav Right */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-200 relative group pb-px ${
                    location === link.href
                      ? "text-primary"
                      : scrolled || !isHome
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-300 ${
                    location === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              ))}
              <Link
                href="/cart"
                data-testid="link-cart"
                className={`flex items-center gap-1.5 transition-colors duration-200 ${scrolled || !isHome ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
              >
                <div className="relative">
                  <ShoppingBag className="w-[18px] h-[18px]" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-semibold scale-in">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>
            </nav>

            {/* Mobile: Cart + Burger */}
            <div className="flex md:hidden items-center gap-4 ml-auto">
              <Link href="/cart" className={`relative ${scrolled || !isHome ? "text-foreground" : "text-white"}`}>
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`transition-colors duration-200 ${scrolled || !isHome ? "text-foreground" : "text-white"}`}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden bg-background/98 backdrop-blur-xl border-t border-border overflow-hidden transition-all duration-400 ease-out ${
              menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="container mx-auto px-5 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between py-3 border-b border-border/30 transition-all duration-200 ${
                    location === link.href ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                  style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                >
                  <span className="text-sm font-medium tracking-wide">{link.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-arabic text-muted-foreground text-sm">{link.ar}</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </header>
      </div>

      <main
        className="flex-1"
        style={isHome ? {} : { paddingTop: `${mainPadding}px` }}
      >
        {children}
      </main>

      {/* Footer */}
      <div className="tatreez-strip h-[5px] w-full mt-16" />
      <footer className="bg-background pt-16 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
            {/* Brand */}
            <div className="md:col-span-5">
              <img src={logoImg} alt="MIN HON" className="h-16 w-auto mb-5" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-3">
                Carrying Palestinian heritage forward, one piece at a time. Every product is a story, every purchase a declaration.
              </p>
              <p className="font-arabic text-muted-foreground/70 text-sm leading-relaxed mb-6" dir="rtl">
                أنت جزء من القصة
              </p>
              <div className="flex gap-4">
                {[
                  { label: "Instagram", href: "https://instagram.com/minhon.ps" },
                  { label: "TikTok", href: "#" },
                  { label: "WhatsApp", href: "https://wa.me/970" },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 md:col-start-7">
              <h4 className="text-[10px] font-semibold tracking-[0.22em] uppercase text-foreground mb-5">Shop</h4>
              <ul className="space-y-3">
                {[
                  { label: "Watches · الوقت شاهد", href: "/collections?c=Watches" },
                  { label: "Rings · السرديات", href: "/collections?c=Rings" },
                  { label: "Clothing · الملابس", href: "/collections?c=Clothing" },
                  { label: "Accessories", href: "/collections?c=Accessories" },
                  { label: "Heritage", href: "/collections?c=Heritage" },
                ].map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[10px] font-semibold tracking-[0.22em] uppercase text-foreground mb-5">Maison</h4>
              <ul className="space-y-3">
                {[
                  { label: "Our Story", href: "/about" },
                  { label: "Start Creating", href: "/customize" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[10px] font-semibold tracking-[0.22em] uppercase text-foreground mb-5">Support</h4>
              <ul className="space-y-3">
                {["Shipping Info", "Returns & Exchanges", "Size Guide", "Care Guide", "Wholesale"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[11px] text-muted-foreground/60 tracking-wider">
                &copy; {new Date().getFullYear()} MIN HON · من هون · Palestine
              </p>
              <p className="text-[10px] text-muted-foreground/40 mt-1 tracking-wider">
                Privacy Policy · Terms of Service · Authenticity Guarantee
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">All orders ship from Palestine</p>
            </div>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
}
