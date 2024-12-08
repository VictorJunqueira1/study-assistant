"use client";

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';
import Link from 'next/link';
import { BookText, Calculator, Cpu } from 'lucide-react';
import Aside from '@/components/Aside';

const Home: React.FC = () => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/auth/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-950 text-white">
                <ClipLoader color="#ffffff" loading={loading} size={50} />
            </div>
        );
    }

    if (!user) {
        router.push('/auth/login');
        return null;
    }

    return (
        <Aside>
            <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="max-w-4xl w-full">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 leading-tight">
                        {`Olá, ${user.email === "user@demo.com" ? "usuário demo!" : "Victor Junqueira"}`}
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        {[
                            { href: "/modules/math", title: "Matemática", description: "Aprofunde seus conhecimentos em matemática.", icon: Calculator, color: "from-red-600 to-red-800" },
                            { href: "/modules/prog", title: "Programação", description: "Explore o mundo da programação e desenvolvimento.", icon: Cpu, color: "from-blue-600 to-blue-800" },
                            { href: "/modules/english", title: "Inglês", description: "Aprenda e pratique o inglês de forma interativa.", icon: BookText, color: "from-green-600 to-green-800" },
                        ].map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={`relative flex flex-col items-center justify-center bg-gradient-to-br ${item.color} rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full h-40 sm:h-48 md:h-56 lg:h-64 group`}
                            >
                                <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center w-full h-full">
                                    <item.icon className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white transition-transform transform group-hover:scale-125" />
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">{item.title}</span>
                                    <span className="text-xs sm:text-sm md:text-base text-white mt-2 hidden sm:block">{item.description}</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Aside>
    );
};

export default Home;