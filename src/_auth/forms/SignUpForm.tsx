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
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccountMutation,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignUpForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } =
    useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isLoading: isSigningIn } =
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
      navigate("/home");
    }
    return toast({
      title: "Sign up failed. Please try again",
      description: "Double check the data you provide",
    });
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
            {isCreatingUser ? (
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
