"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema } from "@/zod-schemas/login";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      toast(`Login successful`);
      router.push("/");
    } else {
      toast("Error", {
        description: "Invalid credentials. Try again",
        action: {
          label: <X className=" bg-transparent" />,
          onClick: () => toast.dismiss(),
        },
      });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(false);
    // Cleanup if needed
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="max-w-md px-12 space-y-4 py-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-balance text-muted-foreground">
            Login to get started
          </p>
        </div>

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
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"} // 👈 Toggle visibility
            placeholder="********"
            {...field}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
            <div className="flex justify-center">
              <Button disabled={isLoading} type="submit">
                Login
                {isLoading && (
                  <span className="ml-2">
                    <LoaderCircle className="animate-spin" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Create one
          </Link>
        </div>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          onClick={() =>
            signIn("google", { callbackUrl: "/", redirect: false })
          }
          variant="outline"
          className="w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
