"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testemonials = [
    {
        name: "Sahil",
        avatar: "S",
        title: "Software Enginner",
        description: "This is the best AI site I have ever used."
    },
    {
        name: "Aryan Shrivastava",
        avatar: "AS",
        title: "Software Enginner",
        description: "Component maker made it easy for me."
    },
    {
        name: "Yash Pal",
        avatar: " YP",
        title: "Dev-ops Enginner",
        description: "Helped to verify my code on daily basis."
    },
    {
        name: "Sakshi Sharma",
        avatar: "SS",
        title: "MERN-Stack Specialist",
        description: "Best suited AI."
    },
]

export const LandingContent = () => {
    return(
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
               Reviews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testemonials.map((item) => (
                    <Card 
                    key={item.description}
                    className="bg-[#192339] border-none text-white "
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">
                                        {item.name}
                                    </p>
                                    <p className="text-zinc-400 text-sm">
                                        {item.title}
                                    </p>
                                </div>
                            </CardTitle>

                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>

                    </Card>
                ))}
            </div>
        </div>
    )
}

export default LandingContent;