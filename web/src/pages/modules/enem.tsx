import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { roadmapEnem } from '@/types/data/data.enem';
import { database } from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';
import Sidebar from '@/components/Aside';
import { Progress } from "@/components/ui/progress";

const Enem = () => {
    const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({});
    const [totalCheckboxes, setTotalCheckboxes] = useState<number>(0);
    const [checkedCheckboxes, setCheckedCheckboxes] = useState<number>(0);

    useEffect(() => {
        const fetchCheckboxStates = async () => {
            const userId = 'Victor Junqueira';
            const checkboxRef = ref(database, `users/${userId}/enemCheckboxStates`);

            onValue(checkboxRef, (snapshot) => {
                const data = snapshot.val() || {};
                setCheckboxStates(data);
                calculateProgress(data);
            });

            return () => { };
        };

        fetchCheckboxStates();
    }, []);

    const handleCheckboxChange = (week: string, category: string, index: number) => {
        const key = `${week}-${category}-${index}`;
        const newState = { ...checkboxStates, [key]: !checkboxStates[key] };
        setCheckboxStates(newState);
        calculateProgress(newState);

        const userId = 'Victor Junqueira';
        const checkboxRef = ref(database, `users/${userId}/enemCheckboxStates`);
        set(checkboxRef, newState).catch(error => {
            console.error('Error updating Firebase:', error);
        });
    };

    const renderCheckboxes = (details: string[] | undefined, week: string, category: string) => {
        if (!details) return null;  // Verifica se o details está definido antes de prosseguir
        return details.map((item, i) => (
            <li key={i} className="flex items-center space-x-2 ml-4">
                <input
                    type="checkbox"
                    id={`${week}-${category}-${i}`}
                    checked={checkboxStates[`${week}-${category}-${i}`] || false}
                    onChange={() => handleCheckboxChange(week, category, i)}
                    className="w-5 h-5 accent-blue-500"
                />
                <label
                    htmlFor={`${week}-${category}-${i}`}
                    className={`ml-2 ${checkboxStates[`${week}-${category}-${i}`] ? 'line-through text-gray-500' : ''}`}
                >
                    {item}
                </label>
            </li>
        ));
    };

    const combineData = () => {
        const combined: string[] = [];

        roadmapEnem.forEach((week) => {
            week.topics.forEach((topic) => {
                topic.details.forEach((detail, i) => {
                    combined.push(`${week.week}-${topic.category}-${i}`);
                });
            });
        });

        return combined;
    };

    const calculateProgress = (checkboxStates: { [key: string]: boolean }) => {
        const items = combineData();
        const total = items.length;
        const checked = items.filter(item => checkboxStates[item] === true).length;
        setTotalCheckboxes(total);
        setCheckedCheckboxes(checked);
    };

    const progressPercentage = totalCheckboxes === 0 ? 0 : (checkedCheckboxes / totalCheckboxes) * 100;

    return (
        <>
            <div className="flex min-h-screen bg-slate-950 text-white flex-1 p-6 lg:pl-64">
                <Sidebar />
                <main className="flex-1 p-6">
                    <div className='mx-auto max-w-7xl'>
                        <div className="flex items-center justify-between mb-8">
                            <Breadcrumb className='mt-6'>
                                <BreadcrumbList className='text-2xl md:text-3xl text-white items-center flex text-center'>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href="/" className='text-2xl font-light'>Início</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href={"/modules/enem"}>Enem</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
                                <h2 className="text-xl md:text-3xl font-semibold mb-4">Tópicos de Enem</h2>
                                <Accordion type="single" collapsible>
                                    {roadmapEnem.map((week, index) => (
                                        <AccordionItem key={index} value={`topic-${index}`}>
                                            <AccordionTrigger className="text-lg md:text-2xl font-semibold cursor-pointer">
                                                {week.week}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="mt-2 list-disc list-inside space-y-2">
                                                    {week.topics.map((topic, i) => (
                                                        <div key={i} className="mb-4">
                                                            <h3 className="text-lg font-medium">{topic.category}</h3>
                                                            <ul>
                                                                {renderCheckboxes(topic.details, week.week, topic.category)}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                            <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
                                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Progresso</h2>
                                <Progress value={progressPercentage} className="w-full h-4 bg-gray-700 rounded-full mb-2">
                                    <div className="bg-blue-400 h-full rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                                </Progress>
                                {`${progressPercentage.toFixed(0)}% completo - (${checkedCheckboxes} de ${totalCheckboxes})`}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Enem;