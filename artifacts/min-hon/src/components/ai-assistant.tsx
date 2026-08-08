import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Sparkles, ChevronDown, ExternalLink, Bot } from 'lucide-react';
import { products } from '@/data/products';
import type { Product } from '@/data/products';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  productIds?: string[];
  timestamp: string;
};

function getTime() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function FormattedText({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <span>
      {paragraphs.map((para, pi) => {
        const lines = para.split('\n');
        return (
          <span key={pi}>
            {pi > 0 && <><br /><br /></>}
            {lines.map((line, li) => {
              if (li > 0) return <span key={li}><br />{renderLine(line)}</span>;
              return <span key={li}>{renderLine(line)}</span>;
            })}
          </span>
        );
      })}
    </span>
  );
}

function renderLine(line: string) {
  const isBullet = line.trimStart().startsWith('- ') || line.trimStart().startsWith('• ') || /^\d+\.\s/.test(line.trimStart());
  const cleanLine = isBullet ? line.replace(/^[\s]*[-•]\s|^\d+\.\s/, '') : line;
  const parts = cleanLine.split(/(\*\*[^*]+\*\*)/g);
  const rendered = parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
  if (isBullet) return <span className="flex items-start gap-1.5"><span className="text-primary mt-0.5 shrink-0">·</span><span>{rendered}</span></span>;
  return <span>{rendered}</span>;
}

function ProductMiniCard({ product }: { product: Product }) {
  return (
    <a
      href={`/collections/${product.id}`}
      className="flex flex-col shrink-0 w-[130px] border border-border hover:border-primary transition-all duration-200 bg-card group"
    >
      <div className="w-full h-[96px] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.nameEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-2.5 flex flex-col gap-0.5">
        <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground leading-none">{product.collection}</p>
        <p className="text-[11px] font-medium leading-tight text-foreground line-clamp-1 mt-0.5">{product.nameEn}</p>
        <p className="font-arabic text-[10px] text-muted-foreground/70 leading-snug" dir="rtl">{product.name}</p>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-[11px] text-primary font-semibold">₪{product.price}</p>
          <ExternalLink className="w-2.5 h-2.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </a>
  );
}

const QUICK_PROMPTS = [
  { label: "Gift ideas", text: "I want a gift for someone special" },
  { label: "Watches", text: "Show me your watches" },
  { label: "Customize", text: "How does customization work?" },
  { label: "About tatreez", text: "Tell me about tatreez" },
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'مرحباً!\n\nWelcome to MIN HON — Palestinian heritage, worn with pride.\n\nI can help you find the perfect piece, tell you about our tatreez designs, or guide you through customization.\n\nكيف أقدر أساعدك؟',
      timestamp: getTime(),
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 350);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const msgText = (text ?? input).trim();
    if (!msgText || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: msgText,
      timestamp: getTime(),
    };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsTyping(true);

    try {
      const apiMessages = nextMessages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error('Failed to reach concierge');
      const data = await res.json() as { reply?: string; productIds?: string[]; error?: string };
      const reply = data.reply ?? 'Sorry, I had trouble connecting. Please try again.';
      const productIds = data.productIds ?? [];

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        productIds,
        timestamp: getTime(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I had trouble connecting. Please try again in a moment.',
        timestamp: getTime(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasUserMessaged = messages.some(m => m.role === 'user');

  return (
    <>
      {/* Trigger Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-400 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          data-testid="button-open-ai-assistant"
          aria-label="Open MIN HON concierge"
          className="group relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/25 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
        >
          <Sparkles className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-background" />
          <span className="absolute -top-11 right-0 bg-[#1C1208] text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
            Ask MIN HON
          </span>
        </button>
      </div>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[385px] max-w-[calc(100vw-1.5rem)] flex flex-col bg-card border border-border/80 shadow-2xl shadow-black/15 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-bottom-right ${
          isOpen
            ? 'scale-100 opacity-100 translate-y-0 h-[650px]'
            : 'scale-90 opacity-0 translate-y-4 h-0 pointer-events-none'
        }`}
        data-testid="ai-assistant-panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 shrink-0 bg-[#1C1208]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-medium leading-none mb-1 text-white">MIN HON Concierge</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[9px] tracking-[0.2em] uppercase text-white/50">Online · Responds instantly</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            data-testid="button-close-ai-assistant"
            aria-label="Close concierge"
            className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-background/40" data-testid="ai-messages-container">
          {messages.map((msg) => {
            const suggestedProducts = (msg.productIds ?? [])
              .map(id => products.find(p => p.id === id))
              .filter((p): p is Product => !!p);

            return (
              <div
                key={msg.id}
                className={`flex flex-col message-in ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                data-testid={`message-${msg.role}-${msg.id}`}
              >
                <div className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5 mr-2 shadow-sm">
                      <Sparkles className="w-2.5 h-2.5 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`max-w-[82%] px-3.5 py-3 text-[13px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-card border border-border/60 text-foreground shadow-sm'
                  }`}>
                    <FormattedText text={msg.content} />
                  </div>
                </div>

                {/* Timestamp */}
                <p className={`text-[9px] text-muted-foreground/40 mt-1 tracking-wide ${msg.role === 'user' ? 'mr-1 text-right' : 'ml-8 text-left'}`}>
                  {msg.timestamp}
                </p>

                {suggestedProducts.length > 0 && (
                  <div className="mt-2.5 ml-8 w-[calc(100%-2rem)]">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-2">Suggested Pieces</p>
                    <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                      {suggestedProducts.map(product => (
                        <ProductMiniCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-2 message-in">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Sparkles className="w-2.5 h-2.5 text-primary-foreground" />
              </div>
              <div className="bg-card border border-border/60 px-4 py-3 flex items-center gap-3 shadow-sm">
                <div className="flex items-center gap-1">
                  <span className="typing-dot bg-muted-foreground/60" />
                  <span className="typing-dot bg-muted-foreground/60" />
                  <span className="typing-dot bg-muted-foreground/60" />
                </div>
                <span className="text-[10px] text-muted-foreground/60 tracking-wide">Thinking…</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts — shown before first message */}
        {!hasUserMessaged && (
          <div className="px-4 pt-3 pb-0 border-t border-border/40 shrink-0">
            <p className="text-[8px] tracking-[0.25em] uppercase text-muted-foreground/60 mb-2">Quick questions</p>
            <div className="flex gap-1.5 flex-wrap pb-3">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => handleSend(p.text)}
                  className="text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 border border-border hover:border-primary hover:text-primary hover:bg-primary/5 text-muted-foreground transition-all duration-200 whitespace-nowrap"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="px-4 py-3.5 border-t border-border/60 flex items-center gap-3 shrink-0 bg-card/80"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about pieces, sizing, gifting…"
            data-testid="input-ai-message"
            maxLength={300}
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/40 text-foreground py-1"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            data-testid="button-send-ai-message"
            aria-label="Send message"
            className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground disabled:opacity-25 disabled:cursor-not-allowed hover:bg-primary/90 transition-all duration-200 shrink-0 rounded-full"
          >
            <Send className="w-3 h-3" />
          </button>
        </form>

        {/* Chat Footer */}
        <div className="px-4 py-2 border-t border-border/30 flex items-center justify-between shrink-0 bg-card/50">
          <div className="flex items-center gap-1.5">
            <Bot className="w-2.5 h-2.5 text-muted-foreground/40" />
            <p className="text-[8px] text-muted-foreground/40 tracking-[0.15em] uppercase">AI Concierge · MIN HON</p>
          </div>
          {input.length > 0 && (
            <p className="text-[9px] text-muted-foreground/40">{input.length}/300</p>
          )}
        </div>
      </div>
    </>
  );
}
