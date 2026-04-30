"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, User, Bot, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Eu sou seu personal trainer IA. Como posso te ajudar a montar seu treino hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error("Erro na resposta da IA");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          
          // O stream da Vercel AI SDK envia texto puro no TextStreamResponse
          assistantContent += chunk;
          
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last.role === "assistant") {
              return [...prev.slice(0, -1), { ...last, content: assistantContent }];
            }
            return prev;
          });
        }
      }
    } catch (error) {
      console.error("Erro no chat:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Ops, tive um probleminha. Pode tentar de novo?" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-svh bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ChevronLeft className="size-6" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Sparkles className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-semibold leading-none">Fit.ai Personal</h1>
            <p className="text-xs text-muted-foreground mt-1">Online agora</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex w-full gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div className={cn(
              "size-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              {message.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
            </div>
            <div className={cn(
              "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
              message.role === "user" 
                ? "bg-primary text-primary-foreground rounded-tr-none" 
                : "bg-muted text-foreground rounded-tl-none"
            )}>
              {message.content || (isLoading && index === messages.length - 1 ? "Digitando..." : "")}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-5 border-t border-border bg-background">
        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mensagem para o Fit.ai..."
            className="w-full bg-muted rounded-full px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pr-14"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            size="icon"
            className="absolute right-1.5 size-11 rounded-full shadow-lg transition-transform active:scale-95"
          >
            <Send className="size-5" />
          </Button>
        </form>
        <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-wider font-semibold opacity-50">
          A IA pode cometer erros. Revise o treino antes de começar.
        </p>
      </div>
    </div>
  );
}
