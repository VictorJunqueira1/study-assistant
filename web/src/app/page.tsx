"use client"

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';
import Link from 'next/link';
import { BookText, Calculator, Cpu } from "lucide-react"

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

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mx-auto max-w-7xl w-full">
        <h1 className="mb-8 text-4xl font-bold text-center">Olá, {user?.email}!</h1>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
          <Link
            href={"/modules/math"}
            className="flex flex-col items-center justify-center bg-red-600 text-white rounded-lg shadow-lg transform py-8 transition-transform duration-300 hover:scale-105 w-full md:w-64 md:h-40 p-4"
          >
            <Calculator className="h-12 w-12 mb-2 text-white" />
            <span className="text-lg font-semibold">Matemática</span>
          </Link>
          <Link
            href={"/modules/prog"}
            className="flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg shadow-lg transform py-8 transition-transform duration-300 hover:scale-105 w-full md:w-64 md:h-40 p-4"
          >
            <Cpu className="h-12 w-12 mb-2 text-white" />
            <span className="text-lg font-semibold">Programação</span>
          </Link>
          <Link
            href={"/modules/english"}
            className="flex flex-col items-center justify-center bg-green-600 text-white rounded-lg shadow-lg transform py-8 transition-transform duration-300 hover:scale-105 w-full md:w-64 md:h-40 p-4"
          >
            <BookText className="h-12 w-12 mb-2 text-white" />
            <span className="text-lg font-semibold">Inglês</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;