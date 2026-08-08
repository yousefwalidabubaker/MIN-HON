import watch01 from "@assets/b52d3550-c3b1-4d4e-b054-8e11606ab1cf_1777803929833.JPG";
import watch02 from "@assets/73bf52c8-fe47-489d-9494-466c132e773f_1777803792980.JPG";
import watch03 from "@assets/26412661-b38e-4cd9-a3a3-a350ab1d7944_1777803792970.JPG";
import watch04 from "@assets/afa7ee6b-71b1-4461-bffa-51e03aace230_1777803929842.JPG";
import ring01 from "@assets/98b62a98-8f10-454e-99fc-aa3072e0e545_1777803792980.JPG";
import ring02 from "@assets/efa4a8f6-171a-4cb4-9b31-b4a882d9d409_1777803929839.JPG";
import ring03 from "@assets/d021be7e-87b7-418d-a402-1d5ee29d64be_1777803929834.JPG";
import tshirtsImg from "@assets/e75d834c-e70c-400a-a5e7-d6a92eb579e0_1777803929836.JPG";
import hoodieImg from "@assets/d55dfe8a-9e2b-4fb3-97b5-a0dda0ac7c64_1777803929835.JPG";
import braceletImg from "@assets/0a25bc24-ddfa-4c41-a83b-db1c866d563c_1777803792973.JPG";
import beltImg from "@assets/66fa0f6e-f559-4d66-8b4c-c17374affea6_1777803792978.JPG";
import pinImg from "@assets/f0591130-6e01-4dbc-9635-ab176439443f_1777803929841.JPG";
import capImg from "@assets/292589e4-8607-4ba6-818c-f26ae20f403e_1777803792968.JPG";
import heritageImg from "@assets/53fdb05b-79b7-4915-b9fe-7d183dfb9b7c_1777803792977.JPG";
import watchDetailsImg from "@assets/1516bd59-1312-446e-a021-43ed736f28d1_1777803792982.JPG";

export type CollectionType = "Watches" | "Rings" | "Clothing" | "Accessories" | "Heritage";

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  collection: CollectionType;
  price: number;
  sizes?: string[];
  description: string;
  descriptionAr: string;
  materials: string;
  image: string;
  limited?: boolean;
  editionOf?: number;
  customizable?: boolean;
  tagline?: string;
}

export const products: Product[] = [
  {
    id: "watch-01",
    name: "الوقت شاهد — الكلاسيكي",
    nameEn: "Time Witness — Classic Edition",
    collection: "Watches",
    price: 299,
    description: "A timekeeping heirloom carrying the soul of Palestine. The cream dial bears the MIN HON emblem surrounded by tatreez motifs. Strap handwoven with authentic Palestinian cross-stitch in red and green.",
    descriptionAr: "ساعة تحمل روح فلسطين. القرص الكريمي يحمل شعار من هون محاطاً بنقوش التطريز. الحزام منسوج يدوياً بالتطريز الفلسطيني الأصيل.",
    materials: "Stainless steel case · Japanese movement · Handwoven tatreez fabric strap · Water-resistant 50M · Sapphire crystal glass",
    image: watch01,
    limited: true,
    editionOf: 500,
    tagline: "مهما مرّ الزمن أو عكك تنسى",
  },
  {
    id: "watch-02",
    name: "الوقت شاهد — التراث الأخضر",
    nameEn: "Time Witness — Heritage Green",
    collection: "Watches",
    price: 319,
    description: "The Heritage Green edition — deep forest green dial evoking the eternal olive tree. Presented in a linen-wrapped box with a handwritten card from Palestine.",
    descriptionAr: "إصدار التراث الأخضر — قرص أخضر عميق يستحضر شجرة الزيتون الأبدية. يُقدَّم في صندوق مكسو بالكتان مع بطاقة مكتوبة بخط اليد من فلسطين.",
    materials: "Stainless steel case · Japanese movement · Genuine leather strap · Water-resistant 50M",
    image: watch02,
    limited: true,
    editionOf: 300,
    tagline: "أبدية كأشجار الزيتون",
  },
  {
    id: "watch-03",
    name: "الوقت شاهد — منتصف الليل",
    nameEn: "Time Witness — Midnight",
    collection: "Watches",
    price: 299,
    description: "The Midnight edition speaks in darkness. Black dial, minimalist face, a quiet statement of steadfast resistance. Packaged in a deep navy velvet presentation box.",
    descriptionAr: "إصدار منتصف الليل يتحدث في الظلام. قرص أسود، واجهة بسيطة، تصريح هادئ بالصمود.",
    materials: "Stainless steel case · Japanese movement · Black leather strap · Water-resistant 50M",
    image: watch03,
    limited: true,
    editionOf: 500,
    tagline: "ظلوا قائمين",
  },
  {
    id: "watch-04",
    name: "الوقت شاهد — اللؤلؤ",
    nameEn: "Time Witness — Pearl Edition",
    collection: "Watches",
    price: 349,
    description: "The most refined edition. Pearl-white mother-of-pearl dial with tatreez-embroidered canvas strap. Each piece individually numbered and signed.",
    descriptionAr: "الإصدار الأكثر رقياً. قرص صدف أبيض مع حزام قماشي مطرّز بالتطريز. كل قطعة مرقمة وموقعة بشكل فردي.",
    materials: "Stainless steel case · Swiss movement · Tatreez canvas strap · Water-resistant 80M",
    image: watchDetailsImg,
    limited: true,
    editionOf: 200,
    tagline: "أنت جزء من القصة",
  },
  {
    id: "ring-01",
    name: "خاتم صامد",
    nameEn: "Samid Ring — Steadfast",
    collection: "Rings",
    price: 89,
    description: "Engraved with صامد (Samid — steadfast, enduring) on the inner band. Outer band features traditional Palestinian geometric tatreez patterns etched in silver. Each ring numbered.",
    descriptionAr: "منقوش بكلمة 'صامد' على الجانب الداخلي. الجانب الخارجي يحمل أنماط التطريز الهندسية الفلسطينية التقليدية المنقوشة بالفضة.",
    materials: "Sterling silver · Hand-engraved · Sizes 6–12 · Numbered 042/500",
    image: ring01,
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    limited: true,
    editionOf: 500,
    tagline: "صامد",
  },
  {
    id: "ring-02",
    name: "خاتم عائدون",
    nameEn: "Aedoun Ring — We Will Return",
    collection: "Rings",
    price: 95,
    description: "عائدون (We Will Return). A promise worn on the finger. The band carries this declaration in Arabic calligraphy, repeated around the circumference. Wide band with kufic-inspired tatreez borders.",
    descriptionAr: "عائدون — وعد يُحمل على الإصبع. الحزام يحمل هذا الإعلان بالخط العربي حول المحيط.",
    materials: "Sterling silver · Wide band 10mm · Hand-engraved Arabic calligraphy",
    image: ring02,
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    limited: true,
    editionOf: 500,
    tagline: "عائدون",
  },
  {
    id: "ring-03",
    name: "خاتم القدس",
    nameEn: "Al-Quds Ring — Jerusalem",
    collection: "Rings",
    price: 95,
    description: "Jerusalem etched in silver. The dome of Al-Aqsa and the key of return — the miftah — engraved side by side on this wide silver band. Presented on olive wood.",
    descriptionAr: "القدس منقوشة في الفضة. قبة الأقصى ومفتاح العودة منقوشان جنباً إلى جنب على هذا الحزام الفضي العريض.",
    materials: "Sterling silver · Wide band 12mm · Hand-engraved · Olive wood presentation",
    image: ring03,
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    limited: true,
    editionOf: 500,
    tagline: "إحداثيات العودة: 32.2211°N 35.2544°E",
  },
  {
    id: "tshirt-01",
    name: "باقون كشجر الزيتون",
    nameEn: "Steadfast Like Olive Trees",
    collection: "Clothing",
    price: 49,
    description: "Heavyweight 100% organic cotton in natural cream. Features a hand-drawn olive tree illustration with the MIN HON emblem. Tatreez accent stripe on the left sleeve. Numbered edition.",
    descriptionAr: "قطن عضوي 100% ثقيل الوزن باللون الكريمي الطبيعي. يتميز برسم يد لشجرة الزيتون مع شعار من هون.",
    materials: "100% Organic cotton · 240 GSM · Unisex · Cream natural dye",
    image: tshirtsImg,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    customizable: true,
    limited: true,
    editionOf: 500,
    tagline: "باقون كشجر الزيتون",
  },
  {
    id: "tshirt-02",
    name: "عمّار يا نابلس",
    nameEn: "Long Live Nablus",
    collection: "Clothing",
    price: 49,
    description: "A tribute to the eternal city of Nablus. Features an ink-line illustration of the old city's arches with عمّار يا نابلس in bold Arabic calligraphy. Tatreez sleeve stripe.",
    descriptionAr: "تحية لمدينة نابلس الأبدية. يتميز برسم خطي لأقواس المدينة القديمة مع خط عربي جريء.",
    materials: "100% Organic cotton · 240 GSM · Unisex · Cream natural dye",
    image: tshirtsImg,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    customizable: true,
    limited: true,
    editionOf: 500,
    tagline: "عمّار يا نابلس",
  },
  {
    id: "tshirt-03",
    name: "الدار دارنا",
    nameEn: "Our Home is Ours",
    collection: "Clothing",
    price: 49,
    description: "The key of return. A bold illustration of the miftah (key) with الدار دارنا — Our Home is Ours — in classical Arabic script. A wearable declaration.",
    descriptionAr: "مفتاح العودة. رسم جريء للمفتاح مع 'الدار دارنا' بالخط العربي الكلاسيكي.",
    materials: "100% Organic cotton · 240 GSM · Unisex · Cream natural dye",
    image: tshirtsImg,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    customizable: true,
    limited: true,
    editionOf: 312,
    tagline: "الدار دارنا",
  },
  {
    id: "hoodie-01",
    name: "كنزة القدس",
    nameEn: "Jerusalem Hoodie",
    collection: "Clothing",
    price: 79,
    description: "The most beloved piece in the MIN HON collection. Jerusalem's old city gates illustrated across the chest, tatreez stripe running down both sleeves. Heavyweight, premium comfort.",
    descriptionAr: "القطعة الأكثر محبة في مجموعة من هون. أبواب مدينة القدس القديمة مرسومة على الصدر، وشريط تطريز يمتد على كلا الكمين.",
    materials: "80% Organic cotton, 20% recycled polyester · 320 GSM · Brushed fleece interior",
    image: hoodieImg,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    customizable: true,
    limited: true,
    editionOf: 500,
    tagline: "من هون وهناك",
  },
  {
    id: "bracelet-01",
    name: "سوار التطريز",
    nameEn: "Tatreez Embroidered Bracelet",
    collection: "Accessories",
    price: 29,
    description: "Handwoven by Palestinian women artisans using traditional cross-stitch techniques. Each bracelet features classic Palestinian tatreez motifs in deep red and forest green on natural cream linen.",
    descriptionAr: "منسوج يدوياً من قبل حرفيات فلسطينيات باستخدام تقنيات التطريز التقليدية.",
    materials: "100% natural linen · Hand-embroidered · Adjustable tie closure",
    image: braceletImg,
    tagline: "حُرفة الأمهات",
  },
  {
    id: "belt-01",
    name: "حزام التطريز",
    nameEn: "Tatreez Canvas Belt",
    collection: "Accessories",
    price: 45,
    description: "Canvas belt with embroidered MIN HON logo patch and tatreez accent strap. The wearable reminder of where you come from.",
    descriptionAr: "حزام قماشي مع رقعة شعار من هون المطرزة وحزام تطريز مزين.",
    materials: "100% cotton canvas · Embroidered patch · Metal buckle · Adjustable",
    image: beltImg,
    sizes: ["S/M", "L/XL"],
    tagline: "من هون",
  },
  {
    id: "pin-01",
    name: "بروش البطيخ",
    nameEn: "Watermelon Pin Badge",
    collection: "Accessories",
    price: 15,
    description: "The watermelon — a quiet symbol, embroidered in tatreez style on a cream linen pin. Red, green, white. Wear your story.",
    descriptionAr: "البطيخة — رمز هادئ، مطرّز بأسلوب التطريز على دبوس كتان كريمي.",
    materials: "Linen fabric · Steel pin back · Embroidered · 38mm diameter",
    image: pinImg,
    tagline: "اقرأ الرموز",
  },
  {
    id: "cap-01",
    name: "قبعة التطريز",
    nameEn: "Tatreez Embroidered Cap",
    collection: "Accessories",
    price: 35,
    description: "Cream unstructured baseball cap with the full MIN HON emblem embroidered on the front panel. Tatreez band detail on the brim lining.",
    descriptionAr: "قبعة بيسبول كريمية غير منظمة مع شعار من هون الكامل مطرزاً على اللوحة الأمامية.",
    materials: "100% washed cotton · Adjustable strap · Unstructured 6-panel",
    image: capImg,
    tagline: "من هون",
  },
  {
    id: "journal-01",
    name: "مفكرة من هون",
    nameEn: "Min Hon Leather Journal",
    collection: "Heritage",
    price: 65,
    description: "Hand-tooled full-grain leather cover with map of Palestine engraved. Each journal numbered (112/300). Inside front cover reads: اكتب حكايتك... لا تقل (Write your story... don't stop). Includes a handwritten message from Palestine.",
    descriptionAr: "غلاف جلد كامل الحبوب منقوش يدوياً مع خريطة فلسطين. كل مفكرة مرقمة. تتضمن رسالة مكتوبة بخط اليد من فلسطين.",
    materials: "Full-grain leather · 240 cream pages · Lay-flat binding · Leather tie closure",
    image: heritageImg,
    limited: true,
    editionOf: 300,
    tagline: "اكتب حكايتك... لا تقل",
  },
  {
    id: "board-01",
    name: "لوح الزيتون",
    nameEn: "Olive Wood Heritage Board",
    collection: "Heritage",
    price: 89,
    description: "Carved from centuries-old Palestinian olive wood. Laser-engraved with olive trees and the inscription من جذورنا... كرمنا (From our roots... our generosity). Each board is unique — no two pieces of olive wood are alike.",
    descriptionAr: "منحوت من خشب زيتون فلسطيني عمره قرون. منقوش بالليزر بأشجار الزيتون ونقش 'من جذورنا... كرمنا'.",
    materials: "Palestinian olive wood · Laser engraved · Food-safe oil finish · Certificate of origin",
    image: heritageImg,
    limited: true,
    editionOf: 100,
    tagline: "من جذورنا... كرمنا",
  },
];

export const collections: CollectionType[] = ["Watches", "Rings", "Clothing", "Accessories", "Heritage"];

export const collectionLabels: Record<CollectionType, { en: string; ar: string }> = {
  Watches: { en: "Watches", ar: "الوقت شاهد" },
  Rings: { en: "Rings", ar: "سرديات الأرض" },
  Clothing: { en: "Clothing", ar: "القميص والكنزة" },
  Accessories: { en: "Accessories", ar: "الإكسسوارات" },
  Heritage: { en: "Heritage", ar: "التراث" },
};
