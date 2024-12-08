"use client"

import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { days } from '@/types/data/data.routine';
import Aside from '@/components/Aside';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, Clock } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Routine = () => {
    const [currentTime, setCurrentTime] = useState(new Date())
    const currentDay = format(currentTime, "EEEE", { locale: ptBR })
    const formattedTime = format(currentTime, "HH:mm")

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const weekDays = Object.keys(days);

    return (
        <Aside>
            <div className="flex min-h-screen bg-slate-950 text-white flex-1 p-2 sm:p-4 md:p-6">
                <main className="flex-1">
                    <div className='mx-auto max-w-7xl'>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-8">
                            <Breadcrumb className='mt-2 sm:mt-6'>
                                <BreadcrumbList className='text-lg sm:text-2xl md:text-3xl text-white items-center flex text-center'>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href="/" className='text-lg sm:text-2xl font-light'>Início</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href={"/modules/routine"}>Rotina</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <Card className="bg-slate-900 text-white shadow-lg border-none">
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-semibold">Rotina Semanal</CardTitle>
                                    <div className="flex items-center gap-4 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm sm:text-base">{capitalizeFirstLetter(currentDay)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-sm sm:text-base">{formattedTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue={currentDay.toLowerCase()} className="w-full">
                                    <TabsList className="grid w-full grid-cols-1 md:grid-cols-7 gap-4 bg-slate-800">
                                        {weekDays.map((day) => (
                                            <TabsTrigger key={day} value={day.toLowerCase()} className="data-[state=active]:bg-blue-800">
                                                {day.slice(0, 3)}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                    {Object.entries(days).map(([day, schedule]) => (
                                        <TabsContent key={day} value={day.toLowerCase()} className="mt-4 bg-slate-900 shadow-none">
                                            <h3 className="text-lg sm:text-xl font-semibold mb-4">{day}</h3>
                                            <div className="space-y-3">
                                                {schedule.map((activity, index) => {
                                                    const [time, description] = activity.split(": ")
                                                    return (
                                                        <Card key={index} className="border-none text-white bg-slate-800 hover:bg-slate-700 transition-colors">
                                                            <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                                                <div className="text-blue-400 font-medium mb-1 sm:mb-0">{time}</div>
                                                                <div className="flex-1 ml-0 sm:ml-4">{description}</div>
                                                            </CardContent>
                                                        </Card>
                                                    )
                                                })}
                                            </div>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </Aside>
    );
};

export default Routine;