"use client"

import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { topics, courses } from '@/types/data/data.math';
import { database } from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';
import Aside from '@/components/Aside';
import { Progress } from '@/components/ui/progress';

const Mathematic = () => {
  const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({});
  const [totalCheckboxes, setTotalCheckboxes] = useState<number>(0);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<number>(0);

  useEffect(() => {
    const fetchCheckboxStates = () => {
      const userId = 'Victor Junqueira';
      const checkboxRef = ref(database, `users/${userId}/mathCheckboxStates`);

      onValue(checkboxRef, (snapshot) => {
        const data = snapshot.val() || {};
        console.log('Fetched Checkbox States:', data);
        setCheckboxStates(data);
        calculateProgress(data);
      });
    };

    fetchCheckboxStates();
  }, []);

  const handleCheckboxChange = (category: string, index: number) => {
    const key = `${category}-${index}`;
    const newState = { ...checkboxStates, [key]: !checkboxStates[key] };
    console.log('Checkbox Change:', key, newState[key]);
    setCheckboxStates(newState);
    calculateProgress(newState);

    const userId = 'Victor Junqueira';
    const checkboxRef = ref(database, `users/${userId}/mathCheckboxStates`);
    set(checkboxRef, newState)
      .then(() => {
        console.log('Updated Firebase Checkbox States:', newState);
      })
      .catch(error => {
        console.error('Error updating Firebase:', error);
      });
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

  const combineData = () => {
    let combined: string[] = [];
    topics.forEach(topic => {
      topic.details.forEach((detail, i) => {
        combined.push(`${topic.category}-${i}`);
      });
    });
    return combined;
  };

  const calculateProgress = (checkboxStates: { [key: string]: boolean }) => {
    const items = combineData();
    const total = items.length;
    const checked = items.filter(item => checkboxStates[item]).length;

    console.log('Total Checkboxes:', total);
    console.log('Checked Checkboxes:', checked);

    setTotalCheckboxes(total);
    setCheckedCheckboxes(checked);
  };

  const progressPercentage = totalCheckboxes === 0 ? 0 : (checkedCheckboxes / totalCheckboxes) * 100;

  const roundPercentage = (value: number) => {
    return Math.floor(value + 0.5);
  };

  console.log('Progress Percentage:', progressPercentage);

  return (
    <>
      <Aside>
        <div className="flex min-h-screen bg-slate-950 text-white flex-1 p-6">
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
                        <Link href={"/modules/math"}>Matemática</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
                  <h2 className="text-xl md:text-3xl font-semibold mb-4">Tópicos de Matemática</h2>
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
      </Aside>
    </>
  );
};

export default Mathematic;