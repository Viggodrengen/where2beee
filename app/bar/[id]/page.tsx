"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EVENTS } from "@/lib/mockData";
import { MapPin, Clock, ArrowLeft, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function BarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const event = EVENTS.find((e) => e.id === params.id);

  if (!event) {
    return (
      <div className="min-h-screen bg-brand-black text-brand-white flex items-center justify-center">
        <p>Bar ikke fundet</p>
      </div>
    );
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Her ville vi normalt sende email til backend
      console.log("Email tilmeldt:", email);
    }
  };

  return (
    <main className="min-h-screen bg-brand-black text-brand-white">
      {/* Header med tilbage knap */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 bg-gradient-to-b from-brand-black/90 to-transparent backdrop-blur-sm">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-brand-white hover:text-brand-blue transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Tilbage</span>
        </button>
      </div>

      {/* Hero billede */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
        
        {event.isHighlighted && (
          <div className="absolute top-24 left-6">
            <span className="px-3 py-1 text-xs font-bold text-brand-black bg-brand-blue rounded-full uppercase tracking-wider">
              Top Pick
            </span>
          </div>
        )}
      </div>

      {/* Indhold */}
      <div className="px-6 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Venue navn og titel */}
          <h1 className="text-4xl font-bold text-white mb-2">
            {event.title}
          </h1>
          <p className="text-brand-blue font-bold text-xl uppercase tracking-wide mb-6">
            {event.venue}
          </p>

          {/* Info kort */}
          <div className="bg-neutral-900 rounded-2xl p-6 mb-6 border border-neutral-800">
            <div className="flex items-start gap-3 mb-4">
              <Clock className="w-5 h-5 text-brand-blue mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">Tidspunkt</h3>
                <p className="text-gray-300">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-5 h-5 text-brand-blue mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">Lokation</h3>
                <p className="text-gray-300">{event.venue}, {event.city}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 text-brand-blue mt-1 shrink-0 text-xl">🎉</div>
              <div>
                <h3 className="font-semibold text-white mb-1">Tilbud</h3>
                <p className="text-brand-blue font-medium">{event.perk}</p>
              </div>
            </div>
          </div>

          {/* Om eventet */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">Om eventet</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Kom og oplev en fantastisk aften hos {event.venue} i {event.city}! 
              Vi har åbent fra {event.time}, og der venter en uforglemmelig oplevelse.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Atmosfæren er elektrisk, og vi lover en aften fuld af god musik, 
              dejlige drinks og fantastisk stemning. Mød dine venner eller kom alene 
              - her finder du altid godt selskab!
            </p>
          </div>

          {/* Kort sektion (placeholder) */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-3">Find vej</h2>
            <div className="bg-neutral-900 rounded-2xl h-48 border border-neutral-800 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-brand-blue mx-auto mb-2" />
                <p className="text-gray-400">Kort kommer snart</p>
                <p className="text-sm text-gray-500 mt-1">{event.venue}, {event.city}</p>
              </div>
            </div>
          </div>

          {/* Email signup */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-3">Få eksklusive tilbud</h2>
            <div className="bg-gradient-to-br from-brand-blue/20 to-purple-600/20 rounded-2xl p-6 border border-brand-blue/30">
              <p className="text-white mb-4 leading-relaxed">
                Tilmeld dig og få <span className="font-bold text-brand-blue">10% rabat</span> på 
                dine første 5 øl eller drinks! Plus eksklusiv adgang til fremtidige events.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="text-white font-semibold text-lg">Tak for din tilmelding!</p>
                  <p className="text-gray-300 text-sm mt-1">
                    Check din mail for din rabatkode
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Din email"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-brand-black/50 border border-neutral-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-blue text-brand-black font-bold rounded-xl hover:bg-brand-blue/90 transition-colors whitespace-nowrap"
                  >
                    Tilmeld
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
