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
import { useState } from "react"
import { ref, set, get } from "firebase/database";
import { database } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    console.log("Formulário enviado com valores:", values);
    const { username, password } = values;

    if (username === "VictorJunqueira" && password === "gataNina@10") {
      console.log("Usuário autenticado com sucesso!");
      setErrorMessage(null);

      const usuario = { username, password };

      await escreverDados(usuario);

      router.push('/');

    } else {
      setErrorMessage("Credenciais inválidas. Tente novamente.");
      console.error("Erro ao autenticar: Credenciais inválidas.");
    }
  }

  async function escreverDados(usuario: unknown) {
    try {
      await set(ref(database, 'usuarios/1'), usuario);
      console.log("Dados gravados com sucesso!");
      const snapshot = await get(ref(database, 'usuarios/1'));
      if (snapshot.exists()) {
        console.log("Dados salvos:", snapshot.val());
      } else {
        console.log("Nenhum dado encontrado.");
      }
    } catch (error) {
      console.error("Erro ao gravar dados: ", error);
    }
  }

  return (
    <>
      <div className="bg-slate-950 text-white">
        <div className="max-w-7xl min-h-screen mx-auto flex items-center justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs">
              <h1 className="mb-6 text-4xl font-bold text-center"> {getCurrentGreeting()}</h1>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome de Usuário</FormLabel>
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
              <Button type="submit" variant={"loginButton"} className="py-5">Entrar</Button>
              {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}  
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;