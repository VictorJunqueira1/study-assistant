"use client"

import { z } from "zod"
import "@/app/globals.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import axios from 'axios'
import { useState } from "react";
import { useRouter } from 'next/navigation';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000"
})

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Este campo é obrigatório."
  }).max(16, {
    message: "Campo inválido, preencha corretamente."
  }),
  password: z.string().min(2, {
    message: "Este campo é obrigatório."
  }).max(16, {
    message: "Campo inválido, preencha corretamente."
  }),
})

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours()
    if (currentHour < 12) {
      return "Bom dia! ☀️"
    } else if (currentHour < 18) {
      return "Boa tarde! 🌇"
    } else {
      return "Boa noite! 🌆"
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosInstance.post('/auth', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccess('Login bem-sucedido!');
      console.log('Resposta do servidor:', response.data);
      router.push('/'); 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Erro ao fazer login: ${error.response.data.message || error.message}`);
        console.error('Erro de resposta:', error.response.data);
      } else {
        setError('Erro desconhecido.');
        console.error('Erro:', error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bg-slate-950 text-white">
        <div className="max-w-7xl min-h-screen mx-auto flex items-center justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs">
              <h1 className="mb-6 text-4xl font-bold text-center">{getCurrentGreeting()}</h1>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira seu nome" className="py-5 border-blue-800 placeholder:text-gray-300" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira sua senha" type="password" className="py-5 border-blue-800 placeholder:text-gray-300" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" variant={"loginButton"} className="py-5">
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              {success && <p className="text-green-500 mt-4">{success}</p>}
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login;