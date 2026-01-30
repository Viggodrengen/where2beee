"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, CheckCircle } from "lucide-react";
import { Event } from "@/lib/mockData";

interface PerkModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event | null;
}

export function PerkModal({ isOpen, onClose, event }: PerkModalProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    if (!isOpen || !event) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        // Mock API call
        setTimeout(() => {
            setStatus("success");
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 w-full max-w-sm relative shadow-2xl shadow-brand-blue/10"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-2">
                                    {status === "success" ? (
                                        <CheckCircle className="w-8 h-8 text-green-400" />
                                    ) : (
                                        <Gift className="w-8 h-8 text-brand-blue" />
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold text-white">
                                        {status === "success" ? "Perk Unlocked!" : event.perk}
                                    </h3>
                                    <p className="text-neutral-400 text-sm">
                                        {status === "success"
                                            ? "Check your inbox for the voucher."
                                            : `at ${event.venue}`}
                                    </p>
                                </div>

                                {status !== "success" ? (
                                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 mt-2">
                                        <input
                                            type="email"
                                            required
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full bg-brand-blue text-brand-black font-bold py-3 rounded-xl hover:bg-cyan-400 transition-colors disabled:opacity-50"
                                        >
                                            {status === "submitting" ? "Unlocking..." : "Get Perk"}
                                        </button>
                                        <p className="text-xs text-neutral-600 mt-2">
                                            Zero spam. Just free drinks.
                                        </p>
                                    </form>
                                ) : (
                                    <div className="w-full mt-4">
                                        <p className="text-sm text-neutral-300 mb-6">
                                            Show the email to the bartender at <strong>{event.venue}</strong> to claim your discount.
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="w-full bg-neutral-800 text-white font-bold py-3 rounded-xl hover:bg-neutral-700 transition-colors"
                                        >
                                            Huuuge, thanks!
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
