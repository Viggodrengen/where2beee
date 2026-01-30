"use client";

import { Event } from "@/lib/mockData";
import { MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface EventCardProps {
    event: Event;
    onClick: () => void;
    featured?: boolean;
}

export function EventCard({ event, onClick, featured = false }: EventCardProps) {
    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`relative shrink-0 overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 ${featured ? "w-[85vw] h-[60vh]" : "w-[40vw] h-[30vh]" // featured is big, regular is smaller square-ish
                }`}
        >
            <div className="absolute inset-0 z-0">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent " />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col gap-1">
                {featured && (
                    <span className="self-start px-3 py-1 mb-2 text-xs font-bold text-brand-black bg-brand-blue rounded-full uppercase tracking-wider">
                        Top Pick
                    </span>
                )}
                <h3 className={`font-bold text-white ${featured ? "text-3xl" : "text-lg/tight"}`}>
                    {event.title}
                </h3>
                <p className="text-brand-blue font-medium text-sm uppercase tracking-wide">
                    {event.venue}
                </p>

                {featured && (
                    <div className="flex items-center gap-4 mt-2 text-gray-300 text-sm">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-brand-blue" />
                            <span>{event.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-brand-blue" />
                            <span>{event.time}</span>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
