import { useMemo, useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const items = [
  { id: "u1", type: "alert", title: "Roadworks near Salima", meta: "2h ago", summary: "Expect delays on M5 due to maintenance." },
  { id: "u2", type: "news", title: "New direct flight announced", meta: "1d ago", summary: "Airline adds Lilongwe weekly route." },
  { id: "u3", type: "review", title: "Great stay at Lakeview", meta: "3d ago", summary: "Fast Wi‑Fi and friendly staff." },
];

export default function UpdatesPage() {
  useSEO({ title: "Updates • Malawi Tourism App", description: "Connectivity, news, and reviews feed with posting.", canonical: "/app/updates" });
  const [sort, setSort] = useState("recent");

  const feed = useMemo(() => {
    return sort === "recent" ? items : [...items].reverse();
  }, [sort]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 pb-28 md:pb-8 relative">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Connectivity & Updates</h1>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Sort by" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most recent</SelectItem>
            <SelectItem value="popular">Most popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {feed.map((i) => (
          <Card key={i.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{i.title}</h3>
                <span className="text-xs text-muted-foreground">{i.meta}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{i.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6">
        <Button className="shadow-lg" onClick={() => toast({ title: "Compose update", description: "Posting flow coming soon." })}>Post Update</Button>
      </div>
    </div>
  );
}
