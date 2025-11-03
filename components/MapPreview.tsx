import React, { useState, useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

const demoEvents = [
  { id: 1, title: "Sunset Hike", lat: 35.2828, lng: -120.6596, time: "Today 6:30pm", price: 0, tags: ["outdoors", "free"] },
  { id: 2, title: "Open Mic Night", lat: 35.277, lng: -120.6637, time: "Tonight 8pm", price: 5, tags: ["music", "indoor"] },
  { id: 3, title: "Farmers Market", lat: 35.2849, lng: -120.6597, time: "Sat 9am", price: 0, tags: ["food", "free", "outdoors"] },
  { id: 4, title: "Beach Volleyball", lat: 35.3004, lng: -120.8652, time: "Sun 4pm", price: 0, tags: ["sports", "outdoors", "free"] },
  { id: 5, title: "Board Game Night", lat: 35.2794, lng: -120.6631, time: "Fri 7pm", price: 10, tags: ["indoor", "social"] },
];

export function MapPreview() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);
  const [filters, setFilters] = useState<string[]>([]);

  const filtered = demoEvents.filter((e) =>
    filters.length === 0 || filters.every((f) => (f === "free" ? e.price === 0 : e.tags.includes(f)))
  );

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current, { zoomControl: true }).setView([35.2828, -120.6596], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
    markersLayer.current = L.layerGroup().addTo(map);
    mapInstance.current = map;
  }, []);

  useEffect(() => {
    if (!markersLayer.current) return;
    markersLayer.current.clearLayers();
    
    // Custom pinpoint icon
    const pinIcon = L.icon({
      iconUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDMyIDQwIj48cGF0aCBkPSJNMTYgMEM3LjIgMCAwIDcuMiAwIDE2YzAgMTIgMTYgMjQgMTYgMjRzMTYtMTIgMTYtMjRjMC04LjgtNy4yLTE2LTE2LTE2em0wIDI0Yy00LjQgMC04LTMuNi04LThjMC00LjQgMy42LTggOC04czggMy42IDggOGMwIDQuNC0zLjYgOC04IDh6IiBmaWxsPSIjNGY0NmU1Ii8+PC9zdmc+",
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
    });
    
    filtered.forEach((e) => {
      const m = L.marker([e.lat, e.lng], { icon: pinIcon });
      m.bindPopup(`<strong>${e.title}</strong><br/>${e.time}<br/>${e.price === 0 ? "Free" : ` $${e.price}`}` );
      m.addTo(markersLayer.current!);
    });
  }, [filters]);

  const toggle = (f: string) =>
    setFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  return (
    <div className="w-full">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-600">Quick filters:</span>
        {[
          { key: "free", label: "Free" },
          { key: "outdoors", label: "Outdoors" },
          { key: "indoor", label: "Indoors" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => toggle(f.key)}
            className={`rounded-full border px-3 py-1 ${filters.includes(f.key) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 border-slate-300"}` }
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-slate-500">Showing {filtered.length} events</span>
      </div>
      <div ref={mapRef} className="h-[420px] w-full rounded-xl border border-slate-200 shadow-lg overflow-hidden" />
    </div>
  );
}
