import { useState } from "react";
import { Link } from "wouter";
import { Check, ChevronRight, Pencil, ShoppingBag } from "lucide-react";
import tshirtImg from "@assets/e75d834c-e70c-400a-a5e7-d6a92eb579e0_1777803929836.JPG";
import hoodieImg from "@assets/d55dfe8a-9e2b-4fb3-97b5-a0dda0ac7c64_1777803929835.JPG";
import mugImg from "@assets/d55dfe8a-9e2b-4fb3-97b5-a0dda0ac7c64_1777803929835.JPG";
import braceletImg from "@assets/0a25bc24-ddfa-4c41-a83b-db1c866d563c_1777803792973.JPG";
import capImg from "@assets/292589e4-8607-4ba6-818c-f26ae20f403e_1777803792968.JPG";
import watchImg from "@assets/b52d3550-c3b1-4d4e-b054-8e11606ab1cf_1777803929833.JPG";
import { useCart } from "@/hooks/use-cart";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const productTypes = [
  { id: "tshirt", name: "T-Shirt", nameAr: "تيشيرت", image: tshirtImg, price: 59, baseProduct: "tshirt-01" },
  { id: "hoodie", name: "Hoodie", nameAr: "هودي", image: hoodieImg, price: 89, baseProduct: "hoodie-01" },
  { id: "bracelet", name: "Bracelet", nameAr: "سوار", image: braceletImg, price: 39, baseProduct: "bracelet-01" },
  { id: "cap", name: "Cap", nameAr: "قبعة", image: capImg, price: 45, baseProduct: "cap-01" },
  { id: "mug", name: "Mug", nameAr: "كوب", image: mugImg, price: 35, baseProduct: "mug-01" },
  { id: "watch", name: "Watch Strap", nameAr: "حزام ساعة", image: watchImg, price: 49, baseProduct: "watch-01" },
];

const designs = [
  { id: "tatreez", name: "Tatreez Pattern", nameAr: "نمط التطريز", symbol: "❋", description: "Classic Palestinian cross-stitch geometric motif" },
  { id: "olive", name: "Olive Tree", nameAr: "شجرة الزيتون", symbol: "🌿", description: "The eternal symbol of rootedness and peace" },
  { id: "key", name: "The Key", nameAr: "المفتاح", symbol: "🗝", description: "مفتاح العودة — Key of Return" },
  { id: "quds", name: "Al-Quds Dome", nameAr: "قبة القدس", symbol: "◉", description: "The Al-Aqsa Mosque dome illustration" },
  { id: "map", name: "Palestine Map", nameAr: "خريطة فلسطين", symbol: "◈", description: "Outline of historic Palestine" },
  { id: "custom", name: "Custom Upload", nameAr: "رفع تصميم", symbol: "↑", description: "Upload your own artwork or design" },
];

const STEPS = [
  { id: 1, label: "Pick Your Piece", labelAr: "اختر قطعتك" },
  { id: 2, label: "Choose Design", labelAr: "اختر التصميم" },
  { id: 3, label: "Add Your Text", labelAr: "أضف نصك" },
  { id: 4, label: "Preview", labelAr: "المعاينة" },
];

export default function Customize() {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<typeof productTypes[0] | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<typeof designs[0] | null>(null);
  const [arabicText, setArabicText] = useState("");
  const [englishText, setEnglishText] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [done, setDone] = useState(false);

  const { addItem } = useCart();
  const { toast } = useToast();

  const canProceed = () => {
    if (step === 1) return selectedProduct !== null;
    if (step === 2) return selectedDesign !== null;
    if (step === 3) return true;
    return true;
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const base = products.find(p => p.id === selectedProduct.baseProduct);
    if (base) {
      addItem(base, selectedSize || "Custom");
      toast({
        title: "Custom Piece Added",
        description: `${selectedProduct.name} · ${selectedDesign?.name || ""} ${arabicText ? `· "${arabicText}"` : ""}`,
        duration: 4000,
      });
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-8">
          <Check className="w-7 h-7 text-primary" />
        </div>
        <div className="tatreez-strip h-[5px] w-20 mx-auto mb-8" />
        <h1 className="font-serif text-4xl mb-3">Your Piece is Being Crafted</h1>
        <p className="font-arabic text-muted-foreground text-xl mb-6" dir="rtl">قطعتك قيد التصنيع</p>
        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-12">
          Your custom {selectedProduct?.name} has been added to cart. Estimated crafting time: 7–14 business days. Each piece is numbered and signed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/cart">
            <button className="btn-primary flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> View Cart
            </button>
          </Link>
          <button
            onClick={() => { setStep(1); setSelectedProduct(null); setSelectedDesign(null); setArabicText(""); setEnglishText(""); setDone(false); }}
            className="btn-outline"
          >
            Create Another Piece
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="pt-12 pb-10 container mx-auto px-6 text-center max-w-xl">
        <span className="section-label">Customization · تخصيص</span>
        <h1 className="font-serif text-4xl md:text-5xl mb-3">Start Creating</h1>
        <p className="font-arabic text-muted-foreground text-lg mb-1" dir="rtl">صمّم قطعتك</p>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Each custom piece is numbered, signed, and crafted by Palestinian artisans.
        </p>
      </section>

      {/* Steps Progress */}
      <div className="container mx-auto px-6 mb-10">
        <div className="flex items-center justify-center gap-0 max-w-2xl mx-auto">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center w-full">
                <div
                  onClick={() => step > s.id && setStep(s.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 mb-2 transition-all duration-300 ${
                    step > s.id
                      ? "bg-accent border-accent text-white cursor-pointer"
                      : step === s.id
                      ? "bg-primary border-primary text-white"
                      : "bg-background border-border text-muted-foreground"
                  }`}
                >
                  {step > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}
                </div>
                <p className={`text-[9px] tracking-[0.15em] uppercase font-medium text-center hidden sm:block ${step === s.id ? "text-primary" : "text-muted-foreground"}`}>
                  {s.label}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mb-5 transition-colors duration-300 ${step > s.id ? "bg-accent" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl">
        {/* Step 1: Pick Product */}
        {step === 1 && (
          <div className="fade-up">
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl md:text-3xl mb-2">Pick Your Piece</h2>
              <p className="font-arabic text-muted-foreground" dir="rtl">اختر قطعتك</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {productTypes.map(pt => (
                <button
                  key={pt.id}
                  onClick={() => setSelectedProduct(pt)}
                  className={`group relative border-2 transition-all duration-200 text-left overflow-hidden ${
                    selectedProduct?.id === pt.id
                      ? "border-primary"
                      : "border-border hover:border-foreground/40"
                  }`}
                  data-testid={`customize-product-${pt.id}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={pt.image} alt={pt.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-3 bg-background">
                    <p className="font-arabic text-xs text-muted-foreground mb-0.5" dir="rtl">{pt.nameAr}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-serif text-sm font-medium">{pt.name}</p>
                      <p className="text-xs text-muted-foreground">₪{pt.price}</p>
                    </div>
                  </div>
                  {selectedProduct?.id === pt.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Design */}
        {step === 2 && (
          <div className="fade-up">
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl md:text-3xl mb-2">Choose Your Design</h2>
              <p className="font-arabic text-muted-foreground" dir="rtl">اختر التصميم</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {designs.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDesign(d)}
                  className={`border-2 p-6 text-left transition-all duration-200 ${
                    selectedDesign?.id === d.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-foreground/40 bg-background"
                  }`}
                  data-testid={`customize-design-${d.id}`}
                >
                  <div className="text-3xl mb-3">{d.symbol}</div>
                  <p className="font-arabic text-xs text-primary mb-1" dir="rtl">{d.nameAr}</p>
                  <p className="font-serif text-sm font-medium mb-2">{d.name}</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{d.description}</p>
                  {selectedDesign?.id === d.id && (
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] text-primary font-semibold">
                      <Check className="w-3 h-3" /> Selected
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Add Text */}
        {step === 3 && (
          <div className="fade-up max-w-lg mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl md:text-3xl mb-2">Add Your Text</h2>
              <p className="font-arabic text-muted-foreground" dir="rtl">أضف نصك</p>
            </div>
            <div className="space-y-8">
              <div className="bg-secondary/50 border border-border p-5 rounded-sm">
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1">Piece</p>
                <p className="font-serif text-sm">{selectedProduct?.name}</p>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
                  Arabic Text · النص العربي
                </label>
                <input
                  type="text"
                  value={arabicText}
                  onChange={e => setArabicText(e.target.value)}
                  placeholder="مثال: صامد، اسمك، جملة مفضلة"
                  dir="rtl"
                  data-testid="input-arabic-text"
                  className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-3 text-base font-arabic placeholder:text-muted-foreground/40 transition-colors"
                  maxLength={40}
                />
                <p className="text-[10px] text-muted-foreground/60 mt-2 text-right">{arabicText.length}/40</p>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
                  English Text (Optional)
                </label>
                <input
                  type="text"
                  value={englishText}
                  onChange={e => setEnglishText(e.target.value)}
                  placeholder="Your name, a word, a sentence..."
                  data-testid="input-english-text"
                  className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-3 text-sm placeholder:text-muted-foreground/40 transition-colors"
                  maxLength={40}
                />
                <p className="text-[10px] text-muted-foreground/60 mt-2 text-right">{englishText.length}/40</p>
              </div>
              {(selectedProduct?.id === "tshirt" || selectedProduct?.id === "hoodie") && (
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">Size</label>
                  <div className="flex gap-2 flex-wrap">
                    {["XS", "S", "M", "L", "XL", "XXL"].map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-12 h-12 border text-xs font-medium transition-all ${
                          selectedSize === s ? "border-primary bg-primary text-white" : "border-border hover:border-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Preview */}
        {step === 4 && selectedProduct && (
          <div className="fade-up">
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl md:text-3xl mb-2">Your Custom Piece</h2>
              <p className="font-arabic text-muted-foreground" dir="rtl">معاينة قطعتك</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden bg-secondary">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  {/* Overlay text preview */}
                  {(arabicText || englishText) && (
                    <div className="absolute bottom-8 left-0 right-0 text-center">
                      {arabicText && <p className="font-arabic text-2xl text-white drop-shadow-lg" dir="rtl">{arabicText}</p>}
                      {englishText && <p className="text-sm text-white/90 tracking-widest uppercase drop-shadow-lg mt-1">{englishText}</p>}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-background/90 border border-border px-2 py-1">
                    <p className="text-[9px] tracking-[0.2em] uppercase font-semibold">Limited · 001/{selectedProduct.id === "watch" ? "300" : "500"}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-2xl">{selectedProduct.name}</h3>
                <p className="font-arabic text-muted-foreground" dir="rtl">{selectedProduct.nameAr}</p>
                <div className="border border-border divide-y divide-border">
                  <div className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">Design</span>
                    <span className="font-medium">{selectedDesign?.name || "—"}</span>
                  </div>
                  <div className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">Arabic Text</span>
                    <span className="font-arabic font-medium" dir="rtl">{arabicText || "—"}</span>
                  </div>
                  <div className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">English Text</span>
                    <span className="font-medium">{englishText || "—"}</span>
                  </div>
                  {selectedSize && <div className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-medium">{selectedSize}</span>
                  </div>}
                  <div className="flex justify-between px-4 py-3">
                    <span className="text-muted-foreground text-sm">Total</span>
                    <span className="font-serif text-lg font-medium text-primary">₪{selectedProduct.price}</span>
                  </div>
                </div>
                <div className="bg-secondary/60 border border-border p-4 text-xs text-muted-foreground leading-relaxed">
                  <Pencil className="w-3.5 h-3.5 inline mr-2 text-primary" />
                  Your piece will be individually crafted by our artisan team. Delivery in 7–14 business days. Numbered and signed with a certificate of authenticity.
                </div>
                <button
                  onClick={handleAddToCart}
                  data-testid="button-add-custom-to-cart"
                  className="w-full h-14 bg-primary text-primary-foreground text-[11px] tracking-[0.35em] uppercase font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart — ₪{selectedProduct.price}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
          >
            ← Back
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              data-testid="button-next-step"
              className={`flex items-center gap-2 px-8 py-3 text-[11px] tracking-[0.3em] uppercase font-semibold transition-all ${
                canProceed()
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-muted-foreground cursor-not-allowed"
              }`}
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
