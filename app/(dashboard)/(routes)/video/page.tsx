import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";

const VideoPage = () => {
return (
    
    <div className="h-full relative">
    <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">

   <SideBar />

    </div>
    <main className="md:pl-72">
    <Navbar/>
    Hello Video
    </main>

</div>
)
}

export default VideoPage;