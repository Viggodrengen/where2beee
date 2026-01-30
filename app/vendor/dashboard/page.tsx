"use client";

import { EVENTS } from "@/lib/mockData";
import { Plus, Edit3, Trash2 } from "lucide-react";

export default function VendorDashboard() {
    const myEvents = EVENTS.slice(0, 3); // Mock: User owns first 3 events

    return (
        <main className="min-h-screen bg-brand-black text-white p-6">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Apollon Bar</h1>
                    <p className="text-brand-blue text-sm">Dashboard</p>
                </div>
                <button className="bg-white text-black rounded-full p-2">
                    <div className="w-8 h-8 bg-neutral-200 rounded-full" />
                </button>
            </header>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Your Events</h2>
                <button className="flex items-center gap-2 bg-brand-blue text-brand-black px-4 py-2 rounded-xl text-sm font-bold">
                    <Plus className="w-4 h-4" />
                    New Event
                </button>
            </div>

            <div className="space-y-4">
                {myEvents.map((event) => (
                    <div key={event.id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div>
                                <h3 className="font-bold">{event.title}</h3>
                                <p className="text-neutral-400 text-sm">{event.time}</p>
                                <p className="text-green-400 text-xs mt-1 font-medium">{event.perk}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                                <Edit3 className="w-5 h-5 text-neutral-400" />
                            </button>
                            <button className="p-2 hover:bg-red-900/20 rounded-lg transition-colors group">
                                <Trash2 className="w-5 h-5 text-neutral-600 group-hover:text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
