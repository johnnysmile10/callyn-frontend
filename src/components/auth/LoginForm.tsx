import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/context";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Instead of submitting, redirect on click
  const handleLoginRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = "https://callyn-frontend-d3dtd7fqhxagczax.norwayeast-01.azurewebsites.net";
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="you@example.com" 
                  {...field} 
                  className="rounded-md py-5"
                  disabled
                />
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
                <Input 
                  type="password" 
                  placeholder="Enter your password" 
                  {...field} 
                  className="rounded-md py-5"
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="button"
          className="w-full bg-callyn-blue hover:bg-callyn-darkBlue text-white rounded-full py-6 text-base font-medium"
          onClick={handleLoginRedirect}
        >
          Log In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
