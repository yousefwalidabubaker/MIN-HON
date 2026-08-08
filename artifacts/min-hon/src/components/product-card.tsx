import { Link } from "wouter";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className={cn("group block", className)}
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4 border border-transparent group-hover:border-border/60 transition-colors duration-500">
        <img
          src={product.image}
          alt={product.nameEn}
          className="object-cover w-full h-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.06]"
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />

        {/* Limited edition badge */}
        {product.limited && product.editionOf && (
          <div className="absolute top-3 left-3">
            <span className="text-[8.5px] tracking-[0.18em] uppercase font-semibold bg-background/92 text-foreground px-2 py-1 border border-border/30 shadow-sm">
              Ltd. Ed. / {product.editionOf}
            </span>
          </div>
        )}

        {/* Customizable badge */}
        {product.customizable && (
          <div className="absolute top-3 right-3">
            <span className="text-[8.5px] tracking-[0.12em] uppercase font-semibold bg-primary text-primary-foreground px-2 py-1">
              Custom
            </span>
          </div>
        )}

        {/* Hover CTA */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-3">
          <span className="block w-full text-center text-[10px] tracking-[0.28em] uppercase font-semibold text-white bg-[#1C1208]/88 backdrop-blur-sm py-3">
            {product.customizable ? "View & Customize" : "View Piece"}
          </span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-start gap-2 mb-0.5">
          <div className="min-w-0">
            <p className="font-arabic text-xs leading-snug text-muted-foreground/70" dir="rtl">{product.name}</p>
            <h3
              className="font-serif text-base font-medium leading-snug group-hover:text-primary transition-colors duration-200 truncate"
              data-testid={`text-product-name-${product.id}`}
            >
              {product.nameEn}
            </h3>
          </div>
          <p
            className="font-medium text-sm tracking-tight shrink-0 tabular-nums text-foreground mt-0.5"
            data-testid={`text-price-${product.id}`}
          >
            ₪{product.price}
          </p>
        </div>
        <p className="text-[9.5px] text-muted-foreground/60 tracking-[0.2em] uppercase mt-1">{product.collection}</p>
        {product.tagline && (
          <p className="font-arabic text-[11px] text-primary/65 mt-1 leading-snug line-clamp-1" dir="rtl">
            {product.tagline}
          </p>
        )}
      </div>
    </Link>
  );
}
