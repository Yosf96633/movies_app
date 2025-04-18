"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "@/zod-schemas/sign-up";
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
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LoaderCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useDebounce from "@/hooks/useDebounce";

const SignUpPage = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
   const [isExisted , setIsExisted] = useState<boolean>()
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
    const checkAvailability = async (name:string) => {
         try {
            const response = await fetch(`/api/check_availability?name=${name}` , {
              method:"GET",
            })
            const result = await response.json()
            console.log(result)
            if(result.isIncluded){
                setIsExisted(true)
                return;
            }
            else{
              setIsExisted(false)
              return;
            }
         } catch (error) {
          
         }
    }
   const debounced =  useDebounce(checkAvailability , 1000)
  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result?.success) {
        toast(result.message, {
          action: {
            label: <X className="bg-transparent" />,
            onClick: () => toast.dismiss(),
          },
        });
        router.push("/login");
        return;
      }

      toast(result.message || "Something went wrong.", {
        action: {
          label: <X className="bg-transparent" />,
          onClick: () => toast.dismiss(),
        },
      });
    } catch (err) {
      toast("Network error. Please try again.", {
        action: {
          label: <X className="bg-transparent" />,
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
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
    <div className="h-screen flex justify-center items-center max-md:h-[85vh] px-3">
      <div className="max-w-md w-full px-6 space-y-6 py-6 border rounded-2xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-muted-foreground">Create an account to get started</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} onChange={(e)=>{
                      field.onChange(e);
                    debounced(e.target.value)
                    }} />
                  </FormControl>
                  <FormDescription className={`text-sm ${isExisted ? "text-red-500" : "text-green-500"}`}>{isExisted ? "Username already exist!" : "Username is available"}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <div className="relative">
                      <Input
                        type={isShow ? "text" : "password"}
                        placeholder="********"
                        {...field}
                      />
                      <span
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={() => setIsShow(!isShow)}
                      >
                        {isShow ? <EyeOff size={18} /> : <Eye size={18} />}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" />
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          <span>Sign up with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
