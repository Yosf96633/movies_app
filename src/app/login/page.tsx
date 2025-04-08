"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/zod-schemas/login";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderCircle, X } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
const page = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    const { email, password } = values;
    const result = await signIn("credentials" , {
      email,
      password,
      redirect:false,
    })
    if(result?.ok){
           toast(`Login successfull`)
           redirect('/')
    }
    else{
      toast('Error' , {
         description:'Invalid credentials. Try again',
         action:{
          label:<X className=" bg-transparent"/>,
          onClick:()=>toast.dismiss(),
         }
      })
      setIsLoading(false);
    }
  }
  useEffect(() => {
    return () => {
      setIsLoading(false);
      setIsShow(false);
    };
  }, []);
  return (
    <div className=" h-screen max-md:h-[85vh] flex justify-center px-3 items-center">
      <div className="max-w-md w-full px-6 space-y-4 py-4 border rounded-2xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-balance text-muted-foreground">
            Login to get start
          </p>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@example.com" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password"  placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" flex justify-center">
                <Button
                  disabled={isLoading}
                  className=" cursor-pointer"
                  type="submit"
                >
                 Login
                  {isLoading && (
                    <span>
                      <LoaderCircle
                        className={isLoading ? " animate-spin " : " "}
                      />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div>
          <p className=" text-center">Did'nt have account? <Link href={'/sign-up'} className=" underline">Create an account</Link></p>
        </div>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <div className="">
          <Button
            onClick={() => {
              signIn("google" , {callbackUrl:"/" , redirect:false});
            }}
            variant="outline"
            className="w-full cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            <span className="">Login with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
