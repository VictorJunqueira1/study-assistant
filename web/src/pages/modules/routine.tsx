import { useState, useEffect } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import Aside from "@/components/Aside";
import "@/app/globals.css";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { days } from "@/types/data/data.routine";

const Routine = () => {
    const [selectedDay, setSelectedDay] = useState("");
    const [showAllDaysContent, setShowAllDaysContent] = useState(false);
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const daysOfWeek = [
            "Domingo", "Segunda-feira", "Terça-feira",
            "Quarta-feira", "Quinta-feira", "Sexta-feira",
            "Sábado"
        ];
        const dayIndex = new Date().getDay();
        setSelectedDay(daysOfWeek[dayIndex]);

        const interval = setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
            });
            setCurrentTime(timeString);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const toggleShowAllDaysContent = () => {
        setShowAllDaysContent((prev) => !prev);
    };

    return (
        <div className="flex min-h-screen bg-slate-950 text-white flex-col lg:flex-row lg:pl-64">
            <Aside />
            <main className="flex-1 p-6">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <Breadcrumb className="mt-6">
                            <BreadcrumbList className="text-xl md:text-2xl text-white items-center flex text-center">
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/" className="text-xl md:text-2xl font-light">
                                            Início
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/modules/routine">Rotina</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="relative max-w-6xl mx-auto">
                        <Tabs
                            value={selectedDay}
                            onValueChange={setSelectedDay}
                            className="w-full max-w-full mx-auto"
                        >
                            <TabsList className="flex py-2 space-x-1 bg-slate-900 rounded-xl overflow-auto">
                                <TabsTrigger
                                    value={selectedDay}
                                    className="text-sm md:text-base"
                                >
                                    {selectedDay}
                                </TabsTrigger>
                            </TabsList>
                            {Object.entries(days).map(([day, activities]) => (
                                <TabsContent
                                    key={day}
                                    value={day}
                                    className="bg-slate-900 p-4 md:p-6 rounded-xl shadow-lg transition ease-in-out duration-300 transform"
                                >
                                    <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-400">{day}</h3>
                                    <ul className="space-y-2 md:space-y-4">
                                        {activities.map((activity, index) => (
                                            <li key={index} className="flex items-center space-x-2">
                                                <span className="inline-block h-3 w-3 md:h-4 md:w-4 rounded-full bg-blue-500"></span>
                                                <span className="text-sm md:text-lg font-medium">
                                                    {activity}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </TabsContent>
                            ))}
                        </Tabs>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                onClick={toggleShowAllDaysContent}
                                className="bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                {showAllDaysContent ? "Esconder demais dias" : "Ver demais dias"}
                            </button>
                            <div className="text-lg md:text-xl text-white">
                                {currentTime}
                            </div>
                        </div>
                    </div>

                    {showAllDaysContent && (
                        <div className="mt-8 w-full max-w-full">
                            {Object.entries(days).map(([day, activities]) => (
                                day !== selectedDay && (
                                    <div key={day} className="bg-slate-900 p-4 md:p-6 rounded-xl mb-4 shadow-lg">
                                        <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-400">{day}</h3>
                                        <ul className="space-y-2 md:space-y-4">
                                            {activities.map((activity, index) => (
                                                <li key={index} className="flex items-center space-x-2">
                                                    <span className="inline-block h-3 w-3 md:h-4 md:w-4 rounded-full bg-blue-500"></span>
                                                    <span className="text-sm md:text-lg font-medium">
                                                        {activity}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Routine;