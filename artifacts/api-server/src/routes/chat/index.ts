import { Router } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

const SYSTEM_PROMPT = `You are the MIN HON (من هون) concierge — a warm, knowledgeable assistant for a Palestinian heritage brand. MIN HON means "From Here" in Palestinian Arabic.

PRODUCTS:
- **Watches** (Waqt Shahid): watch-01 = الوقت شاهد Classic (ltd 500, ₪299), watch-02 = Heritage Green (₪319), watch-03 = Midnight (₪329), watch-04 = Pearl Edition (₪349). Japanese movement, tatreez strap.
- **Rings** (Sardiyet Al-Ard): ring-01 = صامد Samid (₪145), ring-02 = عائدون A'idoun (₪155), ring-03 = القدس Jerusalem (₪165). Hand-engraved sterling silver, ltd 500.
- **Clothing**: tshirt-01 (₪45), tshirt-02 (₪48), tshirt-03 (₪52), hoodie-01 = Jerusalem Hoodie (₪85). Palestinian cotton with tatreez motifs.
- **Accessories**: bracelet-01 = Tatreez Bracelet (₪38), belt-01 = Canvas Belt (₪52), pin-01 = Watermelon Pin (₪12), cap-01 = Heritage Cap (₪42).
- **Heritage**: journal-01 = Leather Journal (₪95, 112/300), board-01 = Olive Wood Board (₪78).

CUSTOMIZATION: Pick any piece → choose tatreez pattern → add Arabic/English text → we hand-craft and number it. 7–14 business days.
SHIPPING: Free worldwide. Standard 3–5 days. Ships to Palestine, Jordan, everywhere. Cash on delivery or card.
SIZING: T-shirts/hoodies — relaxed fit, size up if between sizes. Rings — sizes 6–12 US.
CARE: Fabric — gentle hand wash cold. Silver — soft cloth, no chemicals. Leather — natural balm monthly. Olive wood — damp cloth + food-safe mineral oil.
TONE: Warm, proud of Palestinian heritage, bilingual (weave in Arabic naturally). Concise.

RESPONSE FORMAT — you MUST always reply with valid JSON only, no extra text:
{
  "reply": "Your message. Use \\n\\n between paragraphs. Use \\n for line breaks within a section. Use **word** to bold key names.",
  "productIds": ["id1", "id2"]
}
- productIds: include IDs (from the list above) only when you are recommending specific products. Use empty array [] otherwise.
- When recommending products, keep the reply text SHORT — the product cards will show the details.`;

router.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "messages array required" });
      return;
    }

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_completion_tokens: 500,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
    });

    let fullReply = "";
    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) fullReply += content;
    }

    try {
      const parsed = JSON.parse(fullReply) as { reply?: string; productIds?: string[] };
      res.json({
        reply: parsed.reply || "مرحباً! How can I help you today?",
        productIds: Array.isArray(parsed.productIds) ? parsed.productIds : [],
      });
    } catch {
      res.json({ reply: fullReply || "مرحباً! How can I help you today?", productIds: [] });
    }
  } catch (err) {
    req.log.error(err, "chat error");
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to get response" });
    }
  }
});

export default router;
