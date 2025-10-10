'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const carouselData = [
  {
    title: 'Recruitment Process Outsourcing',
    text: 'Novotion provides a wide range of services to aid organizations with Recruitment Process Outsourcing.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop', 
  },
  {
    title: 'Career Consultation',
    text: 'Novotion provides expert guidance on career choices, job search, and skill development to help individuals achieve professional success.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop',
  },
  {
    title: 'Resume Crafting',
    text: 'Creating a polished, tailored resume that highlights skills, experience, and achievements to improve job prospects.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop',
  },
  {
    title: 'Resume Understanding',
    text: 'Analyzing a resume to interpret its strengths, weaknesses, and alignment with job requirements.',
    image: 'https://images.unsplash.com/photo-1543286307-e4359d997ccb?q=80&w=1974&auto=format&fit=crop',
  },
  {
    title: 'Marketing of Profile',
    text: 'Strategically presenting skills and experience to enhance visibility and attract job opportunities.',
    image: 'https://images.unsplash.com/photo-1594950793134-2e21ef263d91?q=80&w=1968&auto=format&fit=crop',
  },
  {
    title: 'On Job Support',
    text: 'Guidance and assistance to employees in handling workplace challenges and improving performance.',
    image: 'https://images.unsplash.com/photo-1557804506-690226c6d267?q=80&w=1974&auto=format&fit=crop',
  },
  {
    title: 'Interview Support & Preparations',
    text: 'We help candidates build confidence, refine answers, and develop strategies to succeed in job interviews.',
    image: 'https://images.unsplash.com/photo-1563986768494-06900f07c11f?q=80&w=1974&auto=format&fit=crop',
  },
  {
    title: 'Interview Consultation',
    text: 'We offer expert advice and strategies to improve interview performance and increase job success chances.',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88a04?q=80&w=1974&auto=format&fit=crop',
  },
];

const getZindex = (array, index) =>
  array.map((_, i) => (index === i ? array.length : array.length - Math.abs(index - i)));

const CarouselSection = () => {
  const [active, setActive] = useState(0);
  const progressRef = useRef(50);
  const startXRef = useRef(0);
  const isDownRef = useRef(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const items = carouselRef.current.querySelectorAll('.carousel-item');
    const cursors = document.querySelectorAll('.cursor');

    const displayItems = () => {
      const zIndex = getZindex(Array.from(items), active);
      items.forEach((item, index) => {
        item.style.setProperty('--zIndex', zIndex[index]);
        item.style.setProperty('--active', (index - active) / items.length);
      });
    };

    const animate = () => {
      progressRef.current = Math.max(0, Math.min(progressRef.current, 100));
      setActive(Math.floor(progressRef.current / 100 * (items.length - 1)));
      displayItems();
    };

    const handleWheel = (e) => {
      const wheelProgress = e.deltaY * 0.02;
      progressRef.current += wheelProgress;
      animate();
    };

    const handleMouseMove = (e) => {
      cursors.forEach((cursor) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
      if (!isDownRef.current) return;
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const mouseProgress = (x - startXRef.current) * -0.1;
      progressRef.current += mouseProgress;
      startXRef.current = x;
      animate();
    };

    const handleMouseDown = (e) => {
      isDownRef.current = true;
      startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    };

    const handleMouseUp = () => {
      isDownRef.current = false;
    };

    const handleItemClick = (index) => {
      progressRef.current = (index / items.length) * 100 + 10;
      animate();
    };

    animate();

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('wheel', handleWheel);
      carouselElement.addEventListener('mousedown', handleMouseDown);
      carouselElement.addEventListener('mousemove', handleMouseMove);
      carouselElement.addEventListener('mouseup', handleMouseUp);
      carouselElement.addEventListener('mouseleave', handleMouseUp);
      carouselElement.addEventListener('touchstart', handleMouseDown);
      carouselElement.addEventListener('touchmove', handleMouseMove);
      carouselElement.addEventListener('touchend', handleMouseUp);
      
      items.forEach((item, index) => {
        item.addEventListener('click', () => handleItemClick(index));
      });
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('wheel', handleWheel);
        carouselElement.removeEventListener('mousedown', handleMouseDown);
        carouselElement.removeEventListener('mousemove', handleMouseMove);
        carouselElement.removeEventListener('mouseup', handleMouseUp);
        carouselElement.removeEventListener('mouseleave', handleMouseUp);
        carouselElement.removeEventListener('touchstart', handleMouseDown);
        carouselElement.removeEventListener('touchmove', handleMouseMove);
        carouselElement.removeEventListener('touchend', handleMouseUp);
      }
    };
  }, [active]);

  return (
    <>
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row h-screen overflow-hidden font-sans text-white bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        
        {/* Left Content Section */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-16 text-center">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">
              Targeted Placements, <br className="hidden sm:inline" />
              Exceptional Results
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-blue-200 opacity-80 mb-8">
              Our team is our greatest asset. Comprising seasoned recruiters, industry experts, and
              dedicated professionals, we bring a wealth of experience and expertise to every client engagement.
              With a deep understanding of the recruitment landscape and a commitment to delivering results, our
              team is poised to help you achieve your hiring objectives efficiently and effectively.
            </p>
            <a href="#" className="inline-block px-6 py-3 border border-blue-400 rounded-md text-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-300">
              View More
            </a>
          </div>
        </div>

        {/* Right Carousel Section */}
        <div className="flex-1 relative z-10 h-full overflow-hidden pointer-events-none flex justify-center items-center">
          <div className="relative w-full h-full" ref={carouselRef}>
            {carouselData.map((item, index) => (
              <div
                className="carousel-item absolute top-1/2 left-1/2 w-[min(30vw,300px)] h-[min(40vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-lg bg-black transition-transform duration-800 ease-[cubic-bezier(0,0.02,0,1)] pointer-events-auto"
                key={index}
                style={{
                  '--items': carouselData.length,
                  '--active': 0,
                  '--width': 'min(30vw,300px)',
                  '--height': 'min(40vw,400px)',
                  '--x': 'calc(var(--active) * 800%)',
                  '--y': 'calc(var(--active) * 200%)',
                  '--rot': 'calc(var(--active) * 120deg)',
                  '--opacity': 'calc(var(--zIndex) / var(--items) * 3 - 2)',
                  transform: 'translate(var(--x), var(--y)) rotate(var(--rot))',
                  zIndex: `var(--zIndex)`,
                }}
              >
                <div className="carousel-box relative z-10 w-full h-full transition-opacity duration-800 ease-[cubic-bezier(0,0.02,0,1)] opacity-[var(--opacity)]">
                  <div className="absolute z-10 inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
                  <div className="title absolute z-10 text-white bottom-5 left-5 text-xl md:text-2xl lg:text-3xl transition-opacity duration-800 ease-[cubic-bezier(0,0.02,0,1)]">
                    {item.title}
                  </div>
                  <p className="absolute z-10 text-blue-100 bottom-16 left-5 right-5 text-xs sm:text-sm transition-opacity duration-800 ease-[cubic-bezier(0,0.02,0,1)]">
                    {item.text}
                  </p>
                  <div className="num absolute z-10 text-blue-400 top-2.5 left-5 text-xl sm:text-2xl md:text-3xl transition-opacity duration-800 ease-[cubic-bezier(0,0.02,0,1)] font-extrabold">
                    {`0${index + 1}`}
                  </div>
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    priority={index < 3}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Cursors */}
      <div className="cursor fixed z-50 w-10 h-10 rounded-full border border-blue-400 -translate-x-1/2 -translate-y-1/2 transition-[transform] duration-[0.85s] ease-[cubic-bezier(0,0.02,0,1)] hidden md:block pointer-events-none"></div>
      <div className="cursor cursor2 fixed z-50 w-0.5 h-0.5 rounded-full bg-blue-400 -translate-x-1/2 -translate-y-1/2 transition-[transform] duration-700 ease-[cubic-bezier(0,0.02,0,1)] hidden md:block pointer-events-none"></div>
    </>
  );
};

export default CarouselSection;