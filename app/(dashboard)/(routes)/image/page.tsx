"use client";

import axios from "axios"
import * as z from "zod";
import { formSchema } from "./constants";
import { Heading } from "@/components/heading";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Select } from "@/components/ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const ImagePage = () => {
    const router = useRouter();

    const [images,setImages] = useState<string[]>([]);
    

    const form = useForm<z.infer<typeof formSchema>>({
        
        resolver: zodResolver(formSchema),
        
        defaultValues: {
            prompt: "",
            
            
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
          console.log("Form Values:", form.getValues());
          setImages([]); // Clear previous images
          const response = await axios.post("/api/image", values);
          
          // Check if response data contains imageURL property
          if (response.data && response.data.imageURL) {
              // Update images state with imageURL
              setImages([response.data.imageURL]);
          } else {
              console.error("Invalid response data:", response.data);
              // Handle the case where response data is invalid or doesn't contain imageURL
          }
          
          form.reset(); // Reset form fields
      } catch (error: any) {
          console.error(error); // Log any errors
      } finally {
          router.refresh(); // Refresh router
      }
  };
  

  


    return (
        <div className="h-full relative">
          <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
            <SideBar />
          </div>
          <div>
            <Navbar />
            <div className="px-4 lg:pg-8 ml-72">
              <Heading
                title="Image Generation"
                description="Turn your prompt into an image"
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
              />
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="
                      rounded-lg
                      border
                      w-full
                      p-4
                      px-3
                      md:px-6
                      focus-within:shadow-sm
                      grid
                      grid-cols-12
                      gap-2
                    "
                  >
                    <FormField
                      name="prompt"
                      render={({ field }) => (
                        <FormItem className="col-span-12 lg:col-span-6">
                          <FormControl className="m-0 p-0">
                            <Input
                              className="border-0 outline-none 
                              focus-visible:ring-0 
                              focus-visible:ring-transparent"
                              disabled={isLoading}
                              placeholder="A picture of a horse on a mountain."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="resolution"
                      render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-2">
                          <Select
                            disabled={isLoading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue defaultValue={field.value} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {resolutionOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem className="col-span-12 lg:col-span-2">
                          <Select
                            disabled={isLoading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue defaultValue={field.value} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {amountOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    /> */}
                    <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                      Generate
                    </Button>
                  </form>
                </Form>
              </div>
              <div className="space-y-4 mt-4">
                {isLoading && (
                  <div className="p-20">
                    <Loader />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 ">
                {images.map((imageUrl, index) => (
                <div key={index} className="flex items-center justify-center">
                    <img src={imageUrl} alt={`Image ${index}`} />
                </div>
            ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }      

export default ImagePage;