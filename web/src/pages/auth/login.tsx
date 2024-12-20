"use client"

import {z} from "zod";
import "@/app/globals.css";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../../lib/firebase';
import {useRouter} from 'next/navigation';
import {useState} from "react";
import ClipLoader from 'react-spinners/ClipLoader';

const formSchema = z.object({
    username: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
});

type FormSchemaType = z.infer<typeof formSchema>;

const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Bom dia! ☀️";
    if (hour >= 12 && hour < 18) return "Boa tarde! 🌇";
    return "Boa noite! 🌃";
};

const Login: React.FC = () => {
    const router = useRouter();
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function onSubmit(values: FormSchemaType) {
        setIsLoading(true);
        try {
            const {username, password} = values;
            await signInWithEmailAndPassword(auth, username, password);
            router.push('/');
        } catch (error) {
            setErrorMessage("Credenciais inválidas. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-slate-950 text-white">
            <div className="max-w-7xl min-h-screen mx-auto flex items-center justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs">
                        <h1 className="mb-6 text-4xl font-bold text-center">{getGreeting()}</h1>
                        <div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Insira seu email"
                                                   className="py-5 border-blue-800 placeholder:text-gray-300" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Insira sua senha" type="password"
                                                   className="py-5 border-blue-800 placeholder:text-gray-300" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" variant={"loginButton"} className="py-5">
                            {isLoading ? <ClipLoader color="#ffffff" loading={isLoading} size={24}/> : "Entrar"}
                        </Button>
                        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
                        <div className="mt-6 bg-blue-800/10 p-4 rounded-md shadow-md">
                            <p className="mb-2 text-lg font-semibold text-blue-300">
                                Acesso para demonstração:
                            </p>
                            <div className="text-sm text-gray-300">
                                <p>
                                    <span className="font-bold text-white">E-mail:</span> user@demo.com
                                </p>
                                <p>
                                    <span className="font-bold text-white">Senha:</span> 123456
                                </p>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Login;