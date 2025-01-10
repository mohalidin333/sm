import { X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

type fieldsType = {
  name: string;
  label: string;
  type: string | string[];
};

type AddFormProps = {
  title: string;
  fields: fieldsType[];
  schema: any;
  description: string;
  onSubmit: (data: any) => void;
  url: string;
};

export default function EditForm({
  title,
  fields,
  schema,
  description,
  onSubmit,
  url,
}: AddFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter()
  const searchParams = useSearchParams();

  const handleClose = () => {
    if (searchParams.has('id')) {
      router.push(url)
    }
  }

  return (
    <Card className="bg-white shadow-sm md:w-[500px] w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{title}</CardTitle>

              <button onClick={handleClose}>
                <X size={15} />
              </button>
            </div>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <FormField
                key={index}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {typeof field.type === "string" ? (
                        <Input
                          {...formField}
                          type={field.type}
                          className="w-full"
                          value={formField.value || ""}
                        />
                      ) : (
                        <Select
                          onValueChange={(value) => formField.onChange(value)} // Ensure onChange is called
                          value={formField.value || ""} // Bind value to form state
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.type.map((role: string, index: number) => (
                              <SelectItem value={role} key={index}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="flex items-center gap-2 justify-end mt-[.5rem]">
              <Button variant={"ghost"} type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
