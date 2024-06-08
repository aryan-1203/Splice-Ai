"use client";

import axios from "axios";
import * as z from "zod";
import { formSchema } from "./constants";
import { Heading } from "@/components/heading";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { Code, Divide, MessageSquare } from "lucide-react";
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
import ReactMarkDown from "react-markdown";

const CodePage = () => {
    const router = useRouter();
    const[messages,setMesassages] = useState<ChatCompletionMessageParam[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const userMessage: ChatCompletionMessageParam = {
                role:"user",
                content: values.prompt,

            };
            const newMessages = [...messages,userMessage];

            const response = await axios.post("/api/code",{
                messages: newMessages,
            });

            setMesassages((current)=>[...current , userMessage,response.data]);

            form.reset();
        }catch (error: any){
            console.log(error);
        }
        finally{
            router.refresh();
        }
    } ;

    const renderMessageContent = (
        content: string | ChatCompletionContentPart[] | null | undefined
      ) => {
        if (!content) {
          return null; // Return null if content is null or undefined
        }
        if (typeof content === "string") {
          return <span>{content}</span>;
        } else {
          return content.map((part, index) => {
            if (part.type === "text") {
              return <span key={index}>{part.text}</span>;
            } else {
              // Handle other types of content parts if needed
              return null;
            }
          });
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
              title="Code Generator"
              description="Generated code using the descriptive text."
              icon={Code}
              iconColor="text-green-700"
              bgColor="bg-green-700/10"
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
                className="border-0 outline-none 
                focus-visible:ring-0 
                focus-visible:ring-transparent"
                disabled={isLoading}
                placeholder="Simple toggle button using react hooks"
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
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } items-center space-x-2 mb-2`}
                >
                  {message.role === "user" ? (
                    <>
                      <div className="hidden md:block">
                        <UserAvatar />
                      </div>
                      <div className="flex-shrink-0 max-w-[80%]">
                        <div className="bg-blue-500 rounded-lg py-2 px-5 text-white">
                          {renderMessageContent(message.content)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                       <div className="hidden md:block">
                        <BotAvatar />
                      </div>
                      <div className="flex-shrink-0 max-w-[80%]">
                        <div className="bg-gray-300 rounded-lg py-2 px-4">
                          <pre className="whitespace-pre-wrap">
                            {renderMessageContent(message.content)}
                          </pre>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;