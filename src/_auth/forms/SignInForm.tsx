import { LoginValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";

import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";
const SignInForm = () => {
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof LoginValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({
        title: "Sign in failed. Please try again",
        description: "Double check the data you provide",
      });
    }
    const isLooggedIn = await checkAuthUser();
    if (isLooggedIn) {
      form.reset();
      navigate("/");
    }
    return toast({
      title: "Sign up failed. Please try again",
    });
  }

  return (
    <div className="relative z-20 sm:w-400 sm:px-0 md:px-5 flex-center flex-col">
      <div className="flex items-center flex-col gap-3 px-2">
        <img
          className="spin-around w-[80px] md:w-[130px]"
          src={"/ContactUS.png"}
          alt="Logo"
        />
        <h1 className="text-4xl md:text-5xl font-bold">CONTACT-US</h1>
        <h2 className="text-xl font-medium  py-2">Log in to your account</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" gap-5 flex flex-col w-full "
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="shad-input px-5"
                    type="email"
                    placeholder="email"
                    {...field}
                  />
                </FormControl>
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
                    className="shad-input px-5"
                    type="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="shad-button_primary py-6 " type="submit">
            {isUserLoading ? (
              <div className="flex flex-row gap-3 items-center ">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="text-sm text-right text-blue-300">
            <Link
              className="hover:text-blue-600 duration-200 ease-in"
              to={"/sign-up"}
            >
              Create an account ?
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
