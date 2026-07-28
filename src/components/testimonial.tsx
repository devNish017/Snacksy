"use client";
import React from 'react'
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';
import { Star, StarIcon } from 'lucide-react';


type Props = {}



const CustomerReviews = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Food Blogger",
    image: "/images/testimonials/user1.jpg",
    rating: 5,
    review:
      "Absolutely amazing food! Every dish was fresh, flavorful, and beautifully presented. Highly recommended!",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Customer",
    image: "/images/testimonials/user2.jpg",
    rating: 5,
    review:
      "The ambience was warm and welcoming. The staff was friendly, and the food exceeded my expectations.",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Business Consultant",
    image: "/images/testimonials/user3.jpg",
    rating: 4,
    review:
      "A perfect place for family dinners. Great taste, quick service, and reasonable prices.",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "Travel Influencer",
    image: "/images/testimonials/user4.jpg",
    rating: 5,
    review:
      "One of the best dining experiences I've had. The desserts were simply outstanding!",
  },
  {
    id: 5,
    name: "Aditya Singh",
    role: "Software Engineer",
    image: "/images/testimonials/user5.jpg",
    rating: 5,
    review:
      "The quality of ingredients is noticeable in every bite. I'll definitely be coming back again.",
  },
  {
    id: 6,
    name: "Neha Gupta",
    role: "Photographer",
    image: "/images/testimonials/user6.jpg",
    rating: 4,
    review:
      "Loved the presentation and the flavors. The restaurant has a beautiful atmosphere as well.",
  },
  {
    id: 7,
    name: "Vikram Joshi",
    role: "Fitness Coach",
    image: "/images/testimonials/user7.jpg",
    rating: 5,
    review:
      "Fresh, healthy, and delicious meals. Perfect balance of taste and quality.",
  },
  {
    id: 8,
    name: "Ananya Roy",
    role: "Entrepreneur",
    image: "/images/testimonials/user8.jpg",
    rating: 5,
    review:
      "Exceptional service and unforgettable flavors. Easily one of my favorite restaurants in the city.",
  },
];

function Testimonial({}: Props) {

    const plugin = useRef(
  Autoplay({
    delay: 3000, // 3 seconds
    stopOnInteraction: true,
  })
);
  return (
    <>
        <div className="flex flex-col items-center justify-center mx-4 my-3 text-center ">
        <h2 className='font-bold text-2xl md:text-4xl '>What Our Guest Say-</h2>
        <p className='text-muted-foreground text-center *:text-sm md:text-md mt-1.5 '>
          Don't just take our word for it. Here's what our satisfied customers have to say about their experience with us.
        </p>
    </div>

    <section className="w-full h-[70%]  not-md:h-[40%] bg-gray-200 flex not-md:flex-col items-center justify-center gap-4 py-5 md:py-10">
   
   
      
     <Carousel
     plugins={[plugin.current]}
  opts={{
    align: "start",
    loop: true,
    skipSnaps: false,
    containScroll: "trimSnaps",
  }}
  className="w-full max-w-6xl mx-3 my-2  not-md:mx-auto "
>
 <CarouselContent>
  {CustomerReviews.map((customer) => (
    <CarouselItem
      key={customer.id}
      className="basis-full md:basis-1/2 lg:basis-1/3"
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="flex items-center gap-1 mb-3">
            
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < customer.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="mb-3">
            <h2 className="text-xl font-bold">
              {customer.name}
            </h2>

            <p className="text-muted-foreground text-sm">
              {customer.role}
            </p>
          </div>

          <p className="text-muted-foreground">
            "{customer.review}"
          </p>
        </CardContent>
      </Card>
    </CarouselItem>
  ))}
</CarouselContent>

  
</Carousel>

    </section>
    </>
  )
}

export default Testimonial