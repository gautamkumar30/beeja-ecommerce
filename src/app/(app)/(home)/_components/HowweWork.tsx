"use client"
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const HowWeWork = () => {
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
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
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
        ease: "power2.out", 
        stagger: 0.3, 
        delay: 0.5,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reset"
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-black text-white text-center">
      <h2 className="text-4xl font-bold mb-10">How We Work</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {["Step 1: Idea & Research", "Step 2: Design & Develop", "Step 3: Deliver & Optimize"].map((step, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg opacity-0"
          >
            <Image src={`/step${index + 1}.png`} alt={`Step ${index + 1}`} width={300} height={200} className="rounded-lg mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold">{step}</h3>
            <p className="mt-4 text-gray-300">We ensure every phase is executed with precision and creativity.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;