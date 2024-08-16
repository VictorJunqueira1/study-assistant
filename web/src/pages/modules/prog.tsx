"use client"

import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { languagesRoadmap, topics, courses } from '@/types/data/data.prog';
import { database } from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';
import Sidebar from '@/components/Aside';

const Prog = () => {
  const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchCheckboxStates = async () => {
      const userId = 'Victor Junqueira';
      const checkboxRef = ref(database, `users/${userId}/progCheckboxStates`);

      onValue(checkboxRef, (snapshot) => {
        const data = snapshot.val();
        setCheckboxStates(data || {});
      });

      return () => { };
    };

    fetchCheckboxStates();
  }, []);

  const handleCheckboxChange = (category: string, index: number) => {
    const newState = { ...checkboxStates, [`${category}-${index}`]: !checkboxStates[`${category}-${index}`] };
    setCheckboxStates(newState);

    const userId = 'Victor Junqueira';
    const checkboxRef = ref(database, `users/${userId}/progCheckboxStates`);
    set(checkboxRef, newState);
  };

  const renderCheckboxes = (details: string[], category: string) => {
    return details.map((item, i) => (
      <li key={i} className="flex items-center space-x-2 ml-4">
        <input
          type="checkbox"
          id={`${category}-${i}`}
          checked={checkboxStates[`${category}-${i}`] || false}
          onChange={() => handleCheckboxChange(category, i)}
          className="w-5 h-5 accent-blue-500"
        />
        <label
          htmlFor={`${category}-${i}`}
          className={`ml-2 ${checkboxStates[`${category}-${i}`] ? 'line-through text-gray-500' : ''}`}
        >
          {item}
        </label>
      </li>
    ));
  };

  return (
    <>
      <div className="flex min-h-screen bg-slate-950 text-white">
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
                      <Link href={"/modules/prog"}>Programação</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl md:text-3xl font-semibold mb-4">Tópicos de Programação</h2>
                <Accordion type="single" collapsible>
                  {topics.map((topic, index) => (
                    <AccordionItem key={index} value={`topic-${index}`}>
                      <AccordionTrigger className="text-lg md:text-2xl font-semibold cursor-pointer">
                        {topic.category}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="mt-2 list-disc list-inside space-y-2">
                          {renderCheckboxes(topic.details, topic.category)}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                  <AccordionItem value={`roadmap`}>
                    <AccordionTrigger className="text-lg md:text-2xl font-semibold cursor-pointer">
                      Roadmap Linguagens
                    </AccordionTrigger>
                    <AccordionContent>
                      <Accordion type="single" collapsible>
                        {languagesRoadmap.map((level, levelIndex) => (
                          <AccordionItem key={levelIndex} value={`level-${level.level}`}>
                            <AccordionTrigger className="text-lg md:text-xl font-semibold cursor-pointer">
                              {level.level}
                            </AccordionTrigger>
                            <AccordionContent>
                              {level.subcategories.map((subcategory, subIndex) => (
                                <div key={subIndex} className="mb-4">
                                  <h3 className="text-lg md:text-xl font-semibold">{subcategory.category}</h3>
                                  <ul className="mt-2 list-disc list-inside space-y-2">
                                    {renderCheckboxes(subcategory.details, subcategory.category)}
                                  </ul>
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Links</h2>
                <ul className="list-disc list-inside space-y-2">
                  {courses.map((course, index) => (
                    <li key={index}>
                      <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        {course.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Prog;