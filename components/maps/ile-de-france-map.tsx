"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default marker icons in Next.js
const createCustomIcon = (code: string, isActive: boolean, isParis: boolean) => {
  const size = isParis ? 44 : 36
  const bgColor = isActive ? "#134BF2" : isParis ? "#134BF2" : "#ffffff"
  const textColor = isActive || isParis ? "#ffffff" : "#134BF2"
  const borderColor = "#134BF2"
  const shadow = isActive ? "0 4px 12px rgba(19, 75, 242, 0.4)" : "0 2px 8px rgba(0,0,0,0.15)"

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${bgColor};
        border: 3px solid ${borderColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: ${isParis ? "14px" : "12px"};
        color: ${textColor};
        box-shadow: ${shadow};
        transition: all 0.3s ease;
        cursor: pointer;
      ">
        ${code}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

// Paris arrondissements with real coordinates
const parisArrondissements = [
  { num: 1, name: "1er - Louvre", lat: 48.8606, lng: 2.3376 },
  { num: 2, name: "2e - Bourse", lat: 48.8687, lng: 2.3411 },
  { num: 3, name: "3e - Temple", lat: 48.8637, lng: 2.3615 },
  { num: 4, name: "4e - Hôtel-de-Ville", lat: 48.8544, lng: 2.3572 },
  { num: 5, name: "5e - Panthéon", lat: 48.8449, lng: 2.3502 },
  { num: 6, name: "6e - Luxembourg", lat: 48.8499, lng: 2.3323 },
  { num: 7, name: "7e - Palais-Bourbon", lat: 48.8566, lng: 2.3166 },
  { num: 8, name: "8e - Élysée", lat: 48.8744, lng: 2.3106 },
  { num: 9, name: "9e - Opéra", lat: 48.8766, lng: 2.3377 },
  { num: 10, name: "10e - Enclos-St-Laurent", lat: 48.8762, lng: 2.3598 },
  { num: 11, name: "11e - Popincourt", lat: 48.8594, lng: 2.3784 },
  { num: 12, name: "12e - Reuilly", lat: 48.8396, lng: 2.3876 },
  { num: 13, name: "13e - Gobelins", lat: 48.8322, lng: 2.3561 },
  { num: 14, name: "14e - Observatoire", lat: 48.8331, lng: 2.3264 },
  { num: 15, name: "15e - Vaugirard", lat: 48.8421, lng: 2.2987 },
  { num: 16, name: "16e - Passy", lat: 48.8637, lng: 2.2769 },
  { num: 17, name: "17e - Batignolles-Monceau", lat: 48.8871, lng: 2.3089 },
  { num: 18, name: "18e - Butte-Montmartre", lat: 48.8924, lng: 2.3444 },
  { num: 19, name: "19e - Buttes-Chaumont", lat: 48.8817, lng: 2.3822 },
  { num: 20, name: "20e - Ménilmontant", lat: 48.8638, lng: 2.3985 },
]

// Île-de-France departments with real coordinates
const departments = [
  { code: "75", name: "Paris", lat: 48.8566, lng: 2.3522, isParis: true },
  { code: "77", name: "Seine-et-Marne", lat: 48.6167, lng: 2.8833 },
  { code: "78", name: "Yvelines", lat: 48.8014, lng: 1.8883 },
  { code: "91", name: "Essonne", lat: 48.5294, lng: 2.2378 },
  { code: "92", name: "Hauts-de-Seine", lat: 48.8467, lng: 2.2458 },
  { code: "93", name: "Seine-Saint-Denis", lat: 48.9133, lng: 2.4256 },
  { code: "94", name: "Val-de-Marne", lat: 48.7833, lng: 2.4667 },
  { code: "95", name: "Val-d'Oise", lat: 49.0333, lng: 2.0667 },
]

interface MapProps {
  view: "paris" | "idf"
  hoveredZone: string | null
  selectedDept: string | null
  onZoneHover: (zone: string | null) => void
  onZoneClick: (zone: string) => void
}

// Component to control map view
function MapController({ view }: { view: "paris" | "idf" }) {
  const map = useMap()

  useEffect(() => {
    if (view === "paris") {
      map.flyTo([48.8566, 2.3522], 12, { duration: 1 })
    } else {
      map.flyTo([48.7, 2.5], 9, { duration: 1 })
    }
  }, [view, map])

  return null
}

export default function IleDeFranceMap({
  view,
  hoveredZone,
  selectedDept,
  onZoneHover,
  onZoneClick,
}: MapProps) {
  const isClient = typeof window !== "undefined"

  if (!isClient) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted/50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground">Chargement de la carte...</span>
        </div>
      </div>
    )
  }

  const center: [number, number] = view === "paris" ? [48.8566, 2.3522] : [48.7, 2.5]
  const zoom = view === "paris" ? 12 : 9

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full"
      style={{ background: "#f0f4ff", minHeight: "100%" }}
      scrollWheelZoom={true}
      zoomControl={true}
    >
      <MapController view={view} />
      
      {/* OpenStreetMap Tiles - Free to use */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Alternative: CartoDB Positron (cleaner look, also free) */}
      {/* <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      /> */}

      {view === "paris" ? (
        // Paris arrondissements
        <>
          {parisArrondissements.map((arr) => {
            const isActive = hoveredZone === `75${arr.num.toString().padStart(3, "0")}`
            return (
              <Marker
                key={arr.num}
                position={[arr.lat, arr.lng]}
                icon={createCustomIcon(arr.num.toString(), isActive, false)}
                eventHandlers={{
                  mouseover: () => onZoneHover(`75${arr.num.toString().padStart(3, "0")}`),
                  mouseout: () => onZoneHover(null),
                  click: () => onZoneClick("75"),
                }}
              >
                <Popup className="custom-popup">
                  <div className="text-center">
                    <strong className="text-primary">{arr.name}</strong>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Paris {arr.num}e arrondissement
                    </p>
                    <p className="mt-1 text-xs font-medium text-green-600">✓ Zone couverte</p>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </>
      ) : (
        // Île-de-France departments
        <>
          {departments.map((dept) => {
            const isActive = hoveredZone === dept.code || selectedDept === dept.code
            return (
              <Marker
                key={dept.code}
                position={[dept.lat, dept.lng]}
                icon={createCustomIcon(dept.code, isActive, dept.isParis || false)}
                eventHandlers={{
                  mouseover: () => onZoneHover(dept.code),
                  mouseout: () => onZoneHover(null),
                  click: () => onZoneClick(dept.code),
                }}
              >
                <Popup className="custom-popup">
                  <div className="text-center">
                    <strong className="text-primary">{dept.name}</strong>
                    <p className="mt-1 text-xs text-muted-foreground">Département {dept.code}</p>
                    <p className="mt-1 text-xs font-medium text-green-600">✓ Intervention 24 à 48 h</p>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </>
      )}
    </MapContainer>
  )
}
