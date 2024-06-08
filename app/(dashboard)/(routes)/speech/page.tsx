"use client";

import axios from "axios";
import * as z from "zod";

import { formSchema } from "./constants";

import { Heading } from "@/components/heading";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { Code, MessageSquare, Speech } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChatCompletionContentPart,
  ChatCompletionMessage,
  ChatCompletionMessageParam,
} from "openai/resources/index.mjs";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const SpeechPage = () => {
  const router = useRouter();
  const [messages, setMesassages] = useState<ChatCompletionMessageParam[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      /*const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };*/
      const newMessages = [messages];
      
      const response = await axios.post("/api/speech", {
        messages: newMessages,
      });

      setMesassages((current) => [...current, response.data]);

      form.reset();
    } catch (error: any) {
      //todo: open pro model
      console.log(error);
    } finally {
      router.refresh();
    }
  };



  return (
    <div className="h-full flex">
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <SideBar />
      </div>

      <div className="flex-1">
        <Navbar />
        <div className="px-4 lg:pg-8 ml-72">
          <div>
            <Heading
              title="Text to Speech"
              description="Write down your thoughts into words and get and Ai generated voice for your text."
              icon={Speech}
              iconColor="text-violet-500"
              bgColor="bg-violet-500/10"
            />
          </div>

          <div className="px-4 lg:px-8">
            <Form {...form}>
              <div className="rounded-lg border w-full p-4 md:p-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="How do I calculate the radius of a circle?"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="col-span-12 lg:col-span-2 w-full"
                  disabled={isLoading}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Generate
                </Button>
              </div>
            </Form>
          </div>

          <div className="space-y-4 mt-4 max-w-[100%]">
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                <Loader />
              </div>
            )}
            {messages.length === 0 && !isLoading && (
              <Empty label="No Conversation started." />
            )}
            <div className="response">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechPage;