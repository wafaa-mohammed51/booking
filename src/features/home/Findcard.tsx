import "./Findcard.css";
import { Search } from "lucide-react";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useGetTopRatedDoctor } from "./hooks/useGetTopRatedDoctors";

function Recenter({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 15);
  }, [map, position]);

  return null;
}

const Findcard = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [addressQuery, setAddressQuery] = useState("");
  const { data: doctors } = useGetTopRatedDoctor();

  // Filter the map pins live from the location search field (real data only —
  // matches name or address; an empty query shows every doctor).
  const visibleDoctors = useMemo(() => {
    const list = doctors ?? [];
    const q = addressQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (doctor) =>
        (doctor.name ?? "").toLowerCase().includes(q) ||
        (doctor.address ?? "").toLowerCase().includes(q),
    );
  }, [doctors, addressQuery]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);
  return (
    <section className="px-13" id="find-care">
      <div className="location-container ">
        {/* Left Side */}
        <div className="location-left">
          <h2>
            Find Care Near You <br />
            in Seconds
          </h2>

          <p>
            Allow location access or choose your city to instantly discover
            trusted doctors and clinics around you—quick, easy, and local.
          </p>

          <div className="location-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search by location"
              aria-label="Search doctors by name or location"
              value={addressQuery}
              onChange={(e) => setAddressQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-145.75">
          <MapContainer
            center={position ?? [30.0444, 31.2357]} // Cairo fallback
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {position && (
              <>
                <Recenter position={position} />

                <Marker position={position}>
                  <Popup>You are here</Popup>
                </Marker>
              </>
            )}
            {visibleDoctors
              .filter(
                (doctor) =>
                  Number.isFinite(doctor.latitude) &&
                  Number.isFinite(doctor.longitude),
              )
              .map((doctor) => (
                <Marker
                  key={doctor.id}
                  position={[doctor.latitude, doctor.longitude]}
                >
                  <Popup>{doctor.name}</Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Findcard;
