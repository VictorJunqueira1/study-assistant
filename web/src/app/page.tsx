"use client";

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';
import Link from 'next/link';
import { BookText, Calculator, Cpu } from "lucide-react";

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
    <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 leading-tight">
          Olá, Victor Junqueira!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Link
            href="/modules/math"
            className="relative flex flex-col items-center justify-center bg-red-600 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 w-full h-48 md:h-64 group"
          >
            <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center w-full h-full">
              <Calculator className="h-16 w-16 text-white transition-transform transform group-hover:scale-125" />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xl md:text-2xl font-bold text-white">Matemática</span>
              <span className="text-sm md:text-base text-white mt-2 text-center px-4">Aprofunde seus conhecimentos em matemática.</span>
            </div>
          </Link>
          <Link
            href="/modules/prog"
            className="relative flex flex-col items-center justify-center bg-blue-600 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 w-full h-48 md:h-64 group"
          >
            <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center w-full h-full">
              <Cpu className="h-16 w-16 text-white transition-transform transform group-hover:scale-125" />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xl md:text-2xl font-bold text-white">Programação</span>
              <span className="text-sm md:text-base text-white mt-2 text-center px-4">Explore o mundo da programação e desenvolvimento.</span>
            </div>
          </Link>
          <Link
            href="/modules/english"
            className="relative flex flex-col items-center justify-center bg-green-600 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 w-full h-48 md:h-64 group"
          >
            <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center w-full h-full">
              <BookText className="h-16 w-16 text-white transition-transform transform group-hover:scale-125" />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xl md:text-2xl font-bold text-white">Inglês</span>
              <span className="text-sm md:text-base text-white mt-2 text-center px-4">Aprenda e pratique o inglês de forma interativa.</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;