import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";

const SignUpForm = () => {
  const isLoading = false;
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values);
    console.log(newUser);
  }

  return (
    <Form {...form}>
      <div className=" sm:w-400 sm:px-0 md:px-5 flex-center flex-col">
        <div className="flex items-center flex-col gap-4 px-3">
          <img
            className="spin-around w-[80px] md:w-[130px]"
            src={"/public/ContactUS.png"}
            alt="Logo"
          />
          <h1 className="text-2xl md:text-4xl font-bold">CONTACT-US</h1>
        </div>
        <h2 className="text-2xl font-medium pt-2 sm:pt-4">
          Create a new account
        </h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" gap-5 flex flex-col w-full "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Name"
                    type="text"
                    className="shad-input px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Username"
                    type="text"
                    className="shad-input px-5 "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="shad-input px-5 "
                    {...field}
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
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    className="shad-input px-5 "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary py-6 " type="submit">
            {isLoading ? (
              <div className="flex flex-row gap-3 items-center ">
                <Loader /> Loading...{" "}
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="text-sm text-right text-blue-300">
            <Link to={"/sign-in"}> Already have an Account?</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
