"use client"
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DummyTestimonials = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      }
    );

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      }
    );
  }, []);

  const dummyReviews = [
    { id: 1, name: 'Alice', review: 'Great experience!' },
    { id: 2, name: 'Bob', review: 'Loved the service.' },
    { id: 3, name: 'Charlie', review: 'Highly recommend!' },
    { id: 4, name: 'Bob', review: 'Loved the service.' },
    { id: 5, name: 'Charlie', review: 'Highly recommend!' },
    { id: 6, name: 'Bob', review: 'Loved the service.' },
    { id: 7, name: 'Charlie', review: 'Highly recommend!' },
  
  
  ];

  return (
    <div ref={sectionRef} className="overflow-hidden bg-black text-white py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="lg:py-20 lg:pt-32 pt-10 pb-20 relative">
          <div className="relative">
            <div className="flex flex-col gap-10 relative text-center md:text-left">
              <div className='w-full'>
                <p className="text-2xl md:text-4xl lg:text-5xl font-bold">
                  What our customers <span className='text-orange-500'>say</span>
                </p>
              </div>
              <div className="flex flex-col gap-4 pt-0 lg:mt-4 relative z-50">
                <div className="flex flex-wrap justify-center md:justify-start gap-4 p-4">
                  {dummyReviews.map((review, index) => (
                    <div
                      key={review.id}
                      ref={(el) => {
                        if (el) cardsRef.current[index] = el;
                      }}
                      className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-[300px] md:w-[250px] opacity-0"
                    >
                      <h3 className="text-xl font-semibold">{review.name}</h3>
                      <p className="mt-2 text-gray-300">{review.review}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyTestimonials;