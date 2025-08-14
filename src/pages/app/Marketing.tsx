import { useEffect, useMemo, useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const domestic = [
  { id: "d1", title: "Lake Malawi Weekend Deals", desc: "Special rates for locals this weekend." },
  { id: "d2", title: "Mzuzu Food Festival", desc: "Taste northern flavors this month." },
];
const international = [
  { id: "i1", title: "Fly Malawi: Seasonal Discounts", desc: "Save on flights into Lilongwe and Blantyre." },
  { id: "i2", title: "Safari + Lake Combo", desc: "Combine Liwonde safari with lake relaxation." },
];

export default function MarketingPage() {
  useSEO({ title: "Marketing • Malawi Tourism App", description: "Geo-targeted promotions for domestic and international audiences.", canonical: "/app/marketing" });

  const [visible, setVisible] = useState<"domestic" | "international">("international");

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === "Africa/Blantyre") setVisible("domestic");
    } catch {}
  }, []);

  const feed = useMemo(() => (visible === "domestic" ? domestic : international), [visible]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 pb-20 md:pb-8">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Marketing</h1>
        <Tabs value={visible} onValueChange={(v) => setVisible(v as any)}>
          <TabsList>
            <TabsTrigger value="domestic">Domestic</TabsTrigger>
            <TabsTrigger value="international">International</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4">
        {feed.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-gradient-to-r from-accent/20 to-primary/10">
          <CardContent className="p-4">
            <h3 className="font-medium">Seasonal Events</h3>
            <p className="text-sm text-muted-foreground">Don’t miss cultural festivals and lake regattas this season.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
