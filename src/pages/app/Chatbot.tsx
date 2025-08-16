import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import MistralClient from "@mistralai/mistralai";

const mistralClient = new MistralClient(import.meta.env.VITE_MISTRAL_API_KEY);

export default function ChatbotPage() {
  useSEO({
    title: "Chatbot • Malawi Tourism App",
    description: "Ask our AI chatbot anything about Malawi tourism, culture, and travel tips.",
    canonical: "/app/chatbot"
  });

  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await mistralClient.chat({
        model: "mistral-tiny",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant focused only on Malawi tourism. Answer questions only about Malawi tourism, culture, places to visit, and travel tips. If the question is not related, politely say you only answer about Malawi tourism."
          },
          ...messages,
          userMessage
        ],
      });

      const botMessage = { role: "assistant", content: response.choices[0].message.content };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't fetch an answer. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 pb-20 md:pb-8">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Malawi Tourism Chatbot</h1>
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <ScrollArea className="h-[400px] w-full pr-4">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block p-3 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardContent className="p-4 pt-0 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about Malawi tourism..."
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-accent/20 to-primary/10 mt-4">
        <CardContent className="p-4">
          <h3 className="font-medium">Need Help?</h3>
          <p className="text-sm text-muted-foreground">
            Our chatbot is here to answer all your questions about Malawi tourism.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
