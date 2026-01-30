"use client";

import { useState } from "react";
import { EVENTS } from "@/lib/mockData";
import { EventCard } from "@/components/ui/EventCard";
import { PerkModal } from "@/components/ui/PerkModal";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const CITIES = ["Aarhus", "København", "Odense", "Aalborg"] as const;

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<typeof CITIES[number]>("Aarhus");
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS[number] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPerkModal = (event: typeof EVENTS[number]) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const filteredEvents = EVENTS.filter((e) => e.city === selectedCity);
  const featuredEvents = filteredEvents.filter((e) => e.isHighlighted);
  const regularEvents = filteredEvents.filter((e) => !e.isHighlighted);

  return (
    <main className="min-h-screen pb-20 bg-brand-black text-brand-white">
      {/* Header */}
      <header className="sticky top-0 z-50 p-6 bg-brand-black/90 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tighter">
            Where2<span className="text-brand-blue">Be</span>
          </h1>
        </div>

        {/* City Filter */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 text-sm font-bold rounded-full transition-colors whitespace-nowrap ${selectedCity === city
                ? "bg-brand-blue text-brand-black"
                : "bg-neutral-900 text-neutral-400 hover:text-white"
                }`}
            >
              {city}
            </button>
          ))}
        </div>
      </header>

      {/* Featured Section */}
      <section className="mt-2 pl-6">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-white flex items-center gap-2">
          🔥 Top Picks in {selectedCity}
        </h2>

        {featuredEvents.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-8 pr-6 snap-x snap-mandatory scrollbar-hide">
            {featuredEvents.map((event) => (
              <div key={event.id} className="snap-center">
                <EventCard
                  event={event}
                  featured
                  onClick={() => window.location.href = `/bar/${event.id}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 mb-8 italic">Ingen top picks i dag.</p>
        )}
      </section>

      {/* All Bars List */}
      <section className="px-6">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
          Alle barer i {selectedCity}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {regularEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <EventCard
                  event={event}
                  featured={false}
                  onClick={() => window.location.href = `/bar/${event.id}`}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {regularEvents.length === 0 && (
            <p className="text-neutral-500 italic col-span-2">Ingen barer lige nu...</p>
          )}
        </div>
      </section>

      <PerkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </main>
  );
}
