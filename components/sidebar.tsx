"use client";

import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Music2Icon, Settings, Speech, VideoIcon } from "lucide-react";
import "./sidebar.css"
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const montserrate =Montserrat({
    weight :"600",
    subsets : ["latin"]
});

const route = [
    {
        label:"Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label:"Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
    },
    {
        label:"Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
    },
    /*{
        label:"Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-500",
    },*/
    {
        label:"Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700",
    },
    {
        label:"Text to Speech",
        icon: Speech,
        href: "/speech",
        color: "text-orange-500",
    },
   
    /*{
        label:"Settings",
        icon: Settings,
        href: "/settings",
        color: "text-white",
    },*/
];


const SideBar = () =>{
    const pathname=usePathname();
    return(
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            
            <div className="px-3 py-2 flex-1">
            <Link href="/dashboard" className="flex items-center pl-3 mb-14">
            <div className="relative w-8 h-8 mr-4">
            <Image
            fill
            alt="Logo"
            src="/logo.png"
            />
            </div>
            <h1 className={cn ("text-2xl font-bold",montserrate.className)}>
                Splice Ai
            </h1>
            </Link>
            <div className="space-y-1">
            {route.map((route)=>(
                <Link
                href={route.href}
                key={route.href}
                className="custom-link"
                
                >
                    <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-3",route.color)}/>
                    {route.label}
                    </div>
                
                </Link>
            ))}
            </div>
            </div>
        </div>
    )
}

export default SideBar;

// "use client"

// import React, { useState, useEffect } from "react";
// import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { Link } from 'react-router-dom'
// import "react-pro-sidebar/dist/css/styles.css";
// import { tokens } from "../theme";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import DevicesFoldTwoToneIcon from '@mui/icons-material/DevicesFoldTwoTone';
// import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
// import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
// import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
// import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
// import PodcastsIcon from '@mui/icons-material/Podcasts';
// import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
// import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

// const route = [
//     {
//         label:"Dashboard",
//         icon: <HomeOutlinedIcon />,
//         href: "/",
//         color: "#6870fa",
//     },
//     {
//         label:"PMG Table",
//         icon: <PeopleOutlinedIcon />,
//         href: "/pmgtable",
//         color: "#868dfb",
//     },
//     {
//         label:"Team Table",
//         icon: <ContactsOutlinedIcon />,
//         href: "/teamstable",
//         color: "#868dfb",
//     },
//     {
//         label:"Pending Approvals",
//         icon: <BookmarkAddedIcon />,
//         href: "/approvaltable",
//         color: "#868dfb",
//     },
//     {
//         label:"Backlog Table",
//         icon: <WorkHistoryIcon />,
//         href: "/engbacklogtable",
//         color: "#868dfb",
//     },
//     {
//         label:"Pod Search",
//         icon: <PodcastsIcon />,
//         href: "/podsearch",
//         color: "#868dfb",
//     },
//     {
//         label:"User Search",
//         icon: <PersonSearchIcon />,
//         href: "/usersearch",
//         color: "#868dfb",
//     },
//     {
//         label:"Create PMG Table Entry",
//         icon: <DevicesFoldTwoToneIcon />,
//         href: "/pmgtableform",
//         color: "#868dfb",
//     },
//     {
//         label:"Create Team Table Entry",
//         icon: <CreateNewFolderRoundedIcon />,
//         href: "/engineeringform",
//         color: "#868dfb",
//     },
//     {
//         label:"User Registration",
//         icon: <SupervisedUserCircleIcon />,
//         href: "/userregister",
//         color: "#868dfb",
//     },
//     {
//         label:"Team Member Form",
//         icon: <PersonAddAltRoundedIcon />,
//         href: "/form",
//         color: "#868dfb",
//     },
//     {
//         label:"Export Excel",
//         icon: <DownloadForOfflineRoundedIcon />,
//         href: "/exportexcel",
//         color: "#868dfb",
//     },
// ];

// interface ItemProps {
//     title: string;
//     to: string;
//     icon: JSX.Element;
//     selected: string;
//     setSelected: React.Dispatch<React.SetStateAction<string>>;
//     color: string;
// }

// const Item: React.FC<ItemProps> = ({ title, to, icon, selected, setSelected, color }) => {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);

//     return (
//         <MenuItem
//             active={selected === title}
//             style={{
//                 color: colors.grey[100],
//             }}
//             onClick={() => setSelected(title)}
//             icon={icon}
//             title={title}
//             className={`custom-link ${selected === title ? 'active' : ''}`}
//         >
//             <Typography>{title}</Typography>
//             <Link to={to} />
//         </MenuItem>
//     );
// };

// const Sidebar: React.FC = () => {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const [isCollapsed, setIsCollapsed] = useState(true);
//     const [selected, setSelected] = useState("Dashboard");

//     const handleMouseEnter = () => {
//         setIsCollapsed(false);
//     };

//     const handleMouseLeave = () => {
//         setIsCollapsed(true);
//     };

//     return (
//         <Box
//             sx={{
//                 "& .pro-sidebar-inner": {
//                     background: `${colors.primary[400]} !important`,
//                 },
//                 "& .pro-icon-wrapper": {
//                     backgroundColor: "transparent !important",
//                 },
//                 "& .pro-inner-item": {
//                     padding: "5px 35px 5px 20px !important",
//                 },
//                 "& .pro-inner-item:hover": {
//                     color: "#868dfb !important",
//                 },
//                 "& .pro-menu-item.active": {
//                     color: "#6870fa !important",
//                 },
//             }}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//         >
//             <ProSidebar collapsed={isCollapsed}>
//                 <Menu iconShape="square">
//                     {route.map((item) => (
//                         <Item
//                             key={item.href}
//                             title={item.label}
//                             to={item.href}
//                             icon={item.icon}
//                             selected={selected}
//                             setSelected={setSelected}
//                             color={item.color}
//                         />
//                     ))}
//                 </Menu>
//             </ProSidebar>
//         </Box>
//     );
// };

// export default Sidebar;
