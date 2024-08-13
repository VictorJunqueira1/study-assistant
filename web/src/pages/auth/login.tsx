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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
              <Button type="submit" variant={"loginButton"} className="py-5">Entrar</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;