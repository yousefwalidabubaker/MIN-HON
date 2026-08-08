import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { products, collectionLabels } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ArrowLeft, ArrowRight, Pencil, Clock } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const productIndex = products.findIndex(p => p.id === id);
  const prevProduct = productIndex > 0 ? products[productIndex - 1] : null;
  const nextProduct = productIndex < products.length - 1 ? products[productIndex + 1] : null;

  const { addItem } = useCart();
  const { toast } = useToast();
  const recentlyViewed = useRecentlyViewed(id);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedSize("");
    setImageLoaded(false);
  }, [id]);

  if (!product) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        <p className="font-serif text-3xl text-muted-foreground">Product not found.</p>
        <Link href="/collections" className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
          <ArrowLeft className="w-3 h-3" /> Back to Shop
        </Link>
      </div>
    );
  }

  const hasSizes = product.sizes && product.sizes.length > 0;
  const canAddToCart = !hasSizes || selectedSize !== "";

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    setIsAdding(true);
    addItem(product, selectedSize || "One Size");

    setTimeout(() => {
      setIsAdding(false);
      toast({
        title: "Added to Cart",
        description: `${product.nameEn}${selectedSize ? ` — Size ${selectedSize}` : ""}`,
        duration: 3000,
      });
    }, 600);
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-5 border-b border-border/50">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          <Link href="/collections" className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-collections">Shop</Link>
          <span>/</span>
          <Link href={`/collections?c=${product.collection}`} className="hover:text-foreground transition-colors">
            {collectionLabels[product.collection].en}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[120px]">{product.nameEn}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20">

          {/* Image */}
          <div className="relative">
            <div className={`aspect-[3/4] bg-secondary w-full overflow-hidden ${!imageLoaded ? "bg-secondary animate-pulse" : ""}`}>
              <img
                src={product.image}
                alt={product.nameEn}
                className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
                data-testid={`img-product-${product.id}`}
              />
            </div>
            {product.limited && product.editionOf && (
              <div className="absolute top-4 left-4 bg-background/90 border border-border/40 px-3 py-1.5">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">Limited Edition / {product.editionOf}</span>
              </div>
            )}
            <div className="flex justify-between mt-4">
              {prevProduct ? (
                <Link href={`/product/${prevProduct.id}`} className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors group" data-testid="link-prev-product">
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                  Prev
                </Link>
              ) : <div />}
              {nextProduct ? (
                <Link href={`/product/${nextProduct.id}`} className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors group" data-testid="link-next-product">
                  Next
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : <div />}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-start lg:pt-4">
            <p className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-3">
              {collectionLabels[product.collection].en} · {collectionLabels[product.collection].ar}
            </p>

            <p className="font-arabic text-xl text-foreground/70 mb-1" dir="rtl">{product.name}</p>
            <h1 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] leading-tight mb-3" data-testid={`text-product-name-${product.id}`}>
              {product.nameEn}
            </h1>

            {product.tagline && (
              <p className="font-arabic text-primary text-sm mb-4" dir="rtl">{product.tagline}</p>
            )}

            <p className="text-2xl font-medium tracking-tight mb-8 tabular-nums" data-testid={`text-price-${product.id}`}>
              ₪{product.price.toLocaleString()}
            </p>

            {/* Size Selector */}
            {hasSizes && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">Select Size</span>
                  <button className="text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-wide underline underline-offset-4 decoration-border">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes!.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      data-testid={`button-size-${size}`}
                      className={`min-w-[48px] h-12 px-3 border flex items-center justify-center text-xs tracking-wider font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground scale-105"
                          : "border-border hover:border-foreground/60 bg-background"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-[10px] text-muted-foreground/60 mt-2 tracking-wide">Please select a size to continue</p>
                )}
              </div>
            )}

            {/* Customizable Callout */}
            {product.customizable && (
              <div className="mb-6 p-4 border border-primary/30 bg-primary/5 flex items-start gap-3">
                <Pencil className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-1">Customizable Piece</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Add your name, a sentence, or choose a unique design. Each piece will be numbered and made for you.</p>
                  <Link href="/customize" className="text-[10px] uppercase tracking-[0.2em] text-primary underline underline-offset-4 mt-1 inline-block hover:text-primary/70 transition-colors">
                    Start Customizing →
                  </Link>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mb-8 space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart || isAdding}
                data-testid="button-add-to-cart"
                className={`w-full h-14 text-[11px] tracking-[0.35em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  !canAddToCart
                    ? "bg-secondary text-muted-foreground cursor-not-allowed"
                    : isAdding
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {isAdding ? (
                  <><Check className="w-4 h-4" />Added to Cart</>
                ) : (
                  `Add to Cart — ₪${product.price}`
                )}
              </button>
              {product.customizable && (
                <Link href="/customize">
                  <button className="w-full h-12 text-[11px] tracking-[0.35em] uppercase font-semibold border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 flex items-center justify-center gap-2">
                    <Pencil className="w-3.5 h-3.5" />
                    Customize This Piece
                  </button>
                </Link>
              )}
            </div>

            {/* Features strip */}
            <div className="flex items-center divide-x divide-border mb-8">
              {["Free Shipping", "Limited Edition", "Authenticity Cert."].map((feat) => (
                <span key={feat} className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground px-3 first:pl-0 last:pr-0">
                  {feat}
                </span>
              ))}
            </div>

            {/* Accordion */}
            <Accordion type="single" collapsible className="w-full" defaultValue="description">
              <AccordionItem value="description" className="border-t border-border">
                <AccordionTrigger className="text-[11px] uppercase tracking-[0.22em] hover:no-underline font-medium py-5">
                  Description
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5 space-y-4">
                  <p>{product.description}</p>
                  <p className="font-arabic text-sm leading-loose border-r-2 border-primary pr-4" dir="rtl">
                    {product.descriptionAr}
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="materials" className="border-border">
                <AccordionTrigger className="text-[11px] uppercase tracking-[0.22em] hover:no-underline font-medium py-5">
                  Materials &amp; Care
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5">
                  <p className="mb-3">{product.materials}</p>
                  <p className="text-xs text-muted-foreground/70">For fabric pieces: gentle hand wash or dry clean. For metal pieces: polish with a dry cloth.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-border">
                <AccordionTrigger className="text-[11px] uppercase tracking-[0.22em] hover:no-underline font-medium py-5">
                  Shipping &amp; Returns
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5">
                  <p className="mb-3">Free shipping worldwide. Orders are processed within 3–5 business days. Custom pieces take 7–14 business days to craft.</p>
                  <p>Returns accepted within 14 days for non-customized pieces. Custom orders are final sale.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="bg-secondary/50 py-20 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-2xl">You May Also Like</h2>
            <Link href="/collections" className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
              All Pieces <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              ...products.filter(p => p.id !== product.id && p.collection === product.collection),
              ...products.filter(p => p.id !== product.id && p.collection !== product.collection),
            ].slice(0, 4).map(p => (
              <Link key={p.id} href={`/product/${p.id}`} className="group block" data-testid={`card-related-${p.id}`}>
                <div className="aspect-[3/4] overflow-hidden bg-secondary mb-3">
                  <img src={p.image} alt={p.nameEn} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <p className="font-arabic text-xs text-muted-foreground mb-0.5" dir="rtl">{p.name}</p>
                <h4 className="font-serif text-sm font-medium leading-snug group-hover:text-primary transition-colors">{p.nameEn}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">₪{p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="py-16 border-t border-border/50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-muted-foreground/50" />
                <div>
                  <span className="section-label !mb-0">Recently Viewed</span>
                </div>
              </div>
              <Link
                href="/collections"
                className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
              >
                Browse All <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {recentlyViewed.slice(0, 6).map((p, i) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="group shrink-0 w-[150px] sm:w-[170px] fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                  data-testid={`card-recently-viewed-${p.id}`}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-secondary mb-2.5 border border-transparent group-hover:border-border/60 transition-colors duration-300">
                    <img
                      src={p.image}
                      alt={p.nameEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-arabic text-[11px] text-muted-foreground/60 leading-snug mb-0.5 truncate" dir="rtl">
                    {p.name}
                  </p>
                  <h4 className="font-serif text-sm font-medium leading-snug group-hover:text-primary transition-colors truncate">
                    {p.nameEn}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">₪{p.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
