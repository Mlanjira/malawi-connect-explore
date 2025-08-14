import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Route, Wifi, Zap } from "lucide-react";
import { Hotel, statusColor } from "@/data/mockHotels";

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-5 gap-0 md:grid-cols-3">
        <div className="col-span-5 md:col-span-1 h-44 md:h-40 bg-muted">
          <img src={hotel.image} alt={`${hotel.name} in ${hotel.city}`} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <CardContent className="col-span-5 md:col-span-2 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">{hotel.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {hotel.city}
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{hotel.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({hotel.reviews})</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-4 text-sm">
            <div className={`flex items-center gap-1 ${statusColor(hotel.infra.road)}`}>
              <Route className="h-4 w-4" /> Road
            </div>
            <div className={`flex items-center gap-1 ${statusColor(hotel.infra.telecom)}`}>
              <Wifi className="h-4 w-4" /> Telecom
            </div>
            <div className={`flex items-center gap-1 ${statusColor(hotel.infra.power)}`}>
              <Zap className="h-4 w-4" /> Power
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
