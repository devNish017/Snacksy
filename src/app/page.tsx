import Navbar from "@/header/Navbar";
import Image from "next/image";
import img1 from "../../public/images/img2.jpg"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, Clock, LeafyGreen, Utensils } from "lucide-react";
import Testimonial from "@/components/testimonial";
import ctaSection from "@/components/ctaSection";
import CtaSection from "@/components/ctaSection";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-between mt-0 shadow-md ">
        <section className="relative w-full h-screen pl-6 ">
          <Image src={img1} alt="Hero Image" fill className="object-cover" />
          <div className="absolute inset-y-0 left-0 w-[90%] bg-linear-to-r from-black/70 to-transparent flex justify-center  flex-col">
            <h2 className="z-20 font-bold md:text-4xl text-3xl text-white ml-2 ">Authentic Flavours, <br />
              <span className="text-green-600"> Exceptional </span> Dining </h2>
            <p className="text-white ml-2 font-medium md:text-xl md:w-120 w-70 text-sm mt-1.5"> Experince the finest culinary creations made with locally sourced ingredients and passion.</p>

            {/* buttons */}
            <div className="flex gap-4 mt-2">


              <Link href="/menu">
                <Button size="lg" variant="outline">
                  View Menu <ChevronRight className="ml-1" />
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="default" className="bg-green-600 hover:bg-green-700 text-white">
                  Make reservation
                </Button>
              </Link>

            </div>
          </div>
        </section>

        {/* featured Section */}

        <section className="w-full h-[60%] not-md:h-[40%] bg-gray-200 flex not-md:flex-col items-center justify-center gap-4 py-5 md:py-10">
         
         <div className="flex flex-col items-center justify-center mx-4">
          <Clock className="text-green-600" />
          <h2 className="font-bold text-2xl mt-1.5">Open Daily</h2>
          <p className="text-gray-700 mt-1.5 text-center">Monday - Sunday: 10:00 AM - 11:00 PM</p>
         </div>

         <div className="flex flex-col items-center justify-center mx-4">
          <Utensils className="text-green-600" />
          <h2 className="font-bold text-2xl mt-1.5">Diverse Menu</h2>
          <p className="text-gray-700 mt-1.5 text-center">50+ disges craftes by our master chefs</p>
         </div>

         <div className="flex flex-col items-center justify-center mx-4">
          <LeafyGreen className="text-green-600" />
          <h2 className="font-bold text-2xl mt-1.5">Fresh Ingredients</h2>
          <p className="text-gray-700 mt-1.5 text-center">Locally sourced and organic produce for every dish</p>
         </div>
    
        </section>

{/* menu Preview Section */}

{/* testimonial */}
<Testimonial/>

{/* CTA Section */}
  <CtaSection/>


  {/* footer section */}

  <Footer/>


      </main>
    </>
  );
}
