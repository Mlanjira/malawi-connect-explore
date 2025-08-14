import { useMemo, useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, MapIcon, List } from "lucide-react";
import { hotels } from "@/data/mockHotels";
import { HotelCard } from "@/components/HotelCard";
import Map from "@/components/Map";

export default function HotelsPage() {
  useSEO({ title: "Hotels • Malawi Tourism App", description: "Browse hotels with road, telecom, and power insights across Malawi.", canonical: "/app/hotels" });
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("list");
  const [mapToken, setMapToken] = useState("");

  const filtered = useMemo(() => {
    if (!query) return hotels;
    return hotels.filter((h) => h.name.toLowerCase().includes(query.toLowerCase()) || h.city.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 pb-20 md:pb-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-3">
        <h1 className="text-xl font-semibold">Hotel insights</h1>
        <div className="flex gap-2">
          <Button variant="secondary"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center mb-4">
        <div className="flex-1">
          <Input placeholder="Search hotels or cities" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Tabs value={tab} onValueChange={setTab} className="md:ml-3">
          <TabsList>
            <TabsTrigger value="list"><List className="h-4 w-4 mr-2" /> List</TabsTrigger>
            <TabsTrigger value="map"><MapIcon className="h-4 w-4 mr-2" /> Map</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsContent value="list" className="space-y-3">
          {filtered.map((h) => (
            <HotelCard key={h.id} hotel={h} />
          ))}
        </TabsContent>
        <TabsContent value="map" className="space-y-3">
          <div className="flex items-center gap-2">
            <Input placeholder="Mapbox public token (temporary demo field)" value={mapToken} onChange={(e) => setMapToken(e.target.value)} />
            <Button variant="secondary" onClick={() => setMapToken(mapToken)}>Apply</Button>
          </div>
          <Map accessToken={mapToken} />
          <p className="text-xs text-muted-foreground">Pin colors reflect telecom status from ML output: blue=good, gold=average, red=poor.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
