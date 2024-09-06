import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { languagesRoadmap, topics, courses } from '@/types/data/data.prog';
import { database } from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';
import Sidebar from '@/components/Aside';
import { Progress } from "@/components/ui/progress"

const normalizeKey = (key: string) => {
  return key.replace(/[.#$/[\]]/g, '_');
};

const combineData = () => {
  const combined: string[] = [];

  topics.forEach(topic => {
    combined.push(...topic.details);
  });

  languagesRoadmap.forEach(level => {
    level.subcategories.forEach(subcategory => {
      combined.push(...subcategory.details);
    });
  });

  return combined;
};

const Prog = () => {
  const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({});
  const [totalCheckboxes, setTotalCheckboxes] = useState<number>(0);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<number>(0);

  useEffect(() => {
    const fetchCheckboxStates = async () => {
      const userId = 'Victor Junqueira';
      const checkboxRef = ref(database, `users/${userId}/progCheckboxStates`);

      onValue(checkboxRef, (snapshot) => {
        const data = snapshot.val();
        setCheckboxStates(data || {});
        calculateProgress(data || {});
      });

      return () => { };
    };

    fetchCheckboxStates();
  }, []);

  const handleCheckboxChange = (item: string) => {
    const key = normalizeKey(item);
    const newState = { ...checkboxStates, [key]: !checkboxStates[key] };
    setCheckboxStates(newState);
    calculateProgress(newState);

    const userId = 'Victor Junqueira';
    const checkboxRef = ref(database, `users/${userId}/progCheckboxStates`);
    set(checkboxRef, newState);
  };

  const calculateProgress = (checkboxStates: { [key: string]: boolean }) => {
    const total = Object.keys(checkboxStates).length;
    const checked = Object.values(checkboxStates).filter(value => value).length;

    setTotalCheckboxes(total);
    setCheckedCheckboxes(checked);
  };

  const renderCheckboxes = (items: string[]) => {
    return items.map((item, i) => (
      <li key={i} className="flex items-center space-x-2 ml-4">
        <input
          type="checkbox"
          id={item}
          checked={checkboxStates[normalizeKey(item)] || false}
          onChange={() => handleCheckboxChange(item)}
          className="w-5 h-5 accent-blue-500"
        />
        <label
          htmlFor={item}
          className={`ml-2 ${checkboxStates[normalizeKey(item)] ? 'line-through text-gray-500' : ''}`}
        >
          {item}
        </label>
      </li>
    ));
  };

  const combinedItems = combineData();
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
                          {renderCheckboxes(topic.details)}
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
                                    {renderCheckboxes(subcategory.details)}
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

export default Prog;