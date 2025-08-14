import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { hotels, pinColor } from "@/data/mockHotels";

interface MapProps {
  accessToken?: string;
}

const Map: React.FC<MapProps> = ({ accessToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!accessToken) return; // wait until token provided

    mapboxgl.accessToken = accessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [33.8, -13.5],
      zoom: 6,
      pitch: 0,
    });

    map.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");

    map.current.on("load", () => {
      hotels.forEach((h) => {
        const status = h.infra.telecom; // example ML attribute to color by
        const el = document.createElement("div");
        el.style.width = "14px";
        el.style.height = "14px";
        el.style.borderRadius = "9999px";
        el.style.backgroundColor = pinColor(status);
        el.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.1)";

        const popup = new mapboxgl.Popup({ offset: 16 }).setHTML(`<strong>${h.name}</strong><br/><span>${h.city}</span>`);
        new mapboxgl.Marker({ element: el })
          .setLngLat(h.coords)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [accessToken]);

  return (
    <div className="relative w-full h-[420px] rounded-lg overflow-hidden border">
      {!accessToken && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-background/80 text-center p-6">
          <div>
            <p className="font-medium">Map disabled</p>
            <p className="text-sm text-muted-foreground">Enter a Mapbox public token to enable the interactive map.</p>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;
