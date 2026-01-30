"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function VendorLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        router.push("/vendor/dashboard");
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-brand-black text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm space-y-8"
            >
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tighter">
                        Where2<span className="text-brand-blue">Be</span>
                    </h1>
                    <p className="mt-2 text-neutral-400">Venue Partner Login</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold mb-1 text-neutral-500">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors"
                            placeholder="bar@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold mb-1 text-neutral-500">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-blue text-brand-black font-bold py-3 rounded-xl hover:opacity-90 transition-all"
                    >
                        Access Dashboard
                    </button>
                </form>
            </motion.div>
        </main>
    );
}
