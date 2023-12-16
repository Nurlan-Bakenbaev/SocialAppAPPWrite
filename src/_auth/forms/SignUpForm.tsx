import { Button } from "@/components/ui/button";
import { FaRegEye } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccountMutation,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useState } from "react";

const SignUpForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  const [isShowPassword, setShowPassword] = useState(true);

  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: "Sign up failed. Please try again",
        description: "Double check the data you provide",
      });
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({
        title: "Sign up failed. Please try again",
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
    <Form {...form}>
      <div className="relative z-20 sm:w-400 sm:px-0 md:px-5 flex-center flex-col">
        <div className="flex items-center flex-col gap-4 px-3">
          <img
            className="spin-around w-[80px] md:w-[130px]"
            src={"/ContactUS.png"}
            alt="Logo"
          />
          <h1 className="text-2xl md:text-4xl font-bold">CONTACT-US</h1>
        </div>
        <h2 className="text-2xl font-medium py-2 sm:pt-4">
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
          <div className="relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type={isShowPassword ? "text" : "password"}
                      className="shad-input px-5 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              onClick={() => setShowPassword(!isShowPassword)}
              className="absolute text-blue-700 bottom-4 right-6 transition hover:scale-110 duration-200 hover:text-purple-500 "
            >
              <FaRegEye />
            </div>
          </div>
          <Button className="shad-button_primary py-6 " type="submit">
            {isCreatingAccount ? (
              <div className="flex flex-row gap-3 items-center ">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="text-sm text-right text-blue-300">
            <Link to={"/sign-in"}> Already have an account?</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
export default SignUpForm;
