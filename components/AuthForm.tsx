"use client";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "./ui/form";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  DefaultValues,
  Path,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

// Form field type
type FormFieldType = "email" | "password";

// Form fields type
type FormFieldsType<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type: FormFieldType;
};

// Props type for the AuthForm component
type PropsType<T extends FieldValues> = {
  formTitle: string;
  formDescription: string;
  fields: FormFieldsType<T>[];
  schema: z.AnyZodObject;
  onSubmit: SubmitHandler<T>;
  buttonText: string;
  authFormLink: string;
};

// Get the default value for a field based on its type
const getDefaultValue = (type: FormFieldType): string | number | boolean => {
  switch (type) {
    case "email":
      return "";
    case "password":
    default:
      return "";
  }
};

// AuthForm links
const authFormLinks = (type: string): React.ReactNode => {
  switch (type) {
    case "login":
      return (
        <div className="flex flex-col">
          <Link href="/signup" className={buttonVariants({ variant: "link" })}>
            Create account
          </Link>
          <Link href="/reset" className={buttonVariants({ variant: "link" })}>
            Reset password
          </Link>
        </div>
      );
    case "signup":
      return (
        <Link href="/login" className={buttonVariants({ variant: "link" })}>
          Login here
        </Link>
      );
    case "reset":
      return (
        <Link href="/login" className={buttonVariants({ variant: "link" })}>
          Remembered account?
        </Link>
      );
  }
};

export default function AuthForm<T extends FieldValues>({
  formTitle,
  formDescription,
  fields,
  schema,
  onSubmit,
  buttonText,
  authFormLink,
}: PropsType<T>) {
  // Create a defaultValues object from the fields array
  const defaultValues = fields.reduce<DefaultValues<T>>((acc, field) => {
    acc[field.name] = getDefaultValue(field.type) as DefaultValues<T>[Path<T>];
    return acc;
  }, {} as DefaultValues<T>);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <div className="md:w-[400px] w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-xl">{formTitle}</CardTitle>
            <CardDescription>{formDescription}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-[1rem]">
            {fields.map((field, index) => (
              <FormField
                key={index}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        {...formField}
                        type={field.type}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit">{buttonText}</Button>

            {authFormLinks(authFormLink)}
          </CardContent>
        </form>
      </Form>
    </div>
  );
}
