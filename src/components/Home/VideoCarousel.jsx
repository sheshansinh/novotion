'use client';

import React, { useState, useEffect, useRef } from 'react';

const VideoCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const containerRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false); // Add this state

    const videoCards = [
        {
            title: "Nature & Travel",
            image: "https://images.unsplash.com/photo-1518047970176-7917208d4b3e?q=80&w=2940&auto=format&fit=crop",
            description: "Explore breathtaking landscapes and scenic journeys through stunning short videos."
        },
        {
            title: "Beauty & Lifestyle",
            image: "https://images.unsplash.com/photo-1589772570077-e68c67319985?q=80&w=2940&auto=format&fit=crop",
            description: "Tips, tutorials, and inspiration to elevate your beauty and daily lifestyle."
        },
        {
            title: "Food & Recipes",
            image: "https://images.unsplash.com/photo-1543825821-2e11892c57f0?q=80&w=2940&auto=format&fit=crop",
            description: "Discover new flavors and easy-to-follow recipes from expert culinary creators."
        },
        {
            title: "Fitness & Wellness",
            image: "https://images.unsplash.com/photo-1554244933-d86789700305?q=80&w=2940&auto=format&fit=crop",
            description: "Stay motivated and healthy with high-energy workout routines and wellness tips."
        },
        {
            title: "Automotive",
            image: "https://images.unsplash.com/photo-1534066504229-2c6762391629?q=80&w=2940&auto=format&fit=crop",
            description: "Showcasing the latest cars and thrilling rides in dynamic, high-quality videos."
        },
        {
            title: "Tech Reviews",
            image: "https://images.unsplash.com/photo-1628126782498-f297298f6d2b?q=80&w=2940&auto=format&fit=crop",
            description: "Unboxing and in-depth reviews of the newest tech gadgets and software."
        }
    ];

    useEffect(() => {
        setIsMounted(true); // Set to true after the component mounts on the client
        const timer = setInterval(() => {
            if (!isDragging) {
                setCurrentSlide((prev) => (prev + 1) % videoCards.length);
            }
        }, 3000);
        return () => clearInterval(timer);
    }, [isDragging, videoCards.length]);

    const handleStart = (clientX) => {
        setIsDragging(true);
        setStartX(clientX);
        setDragOffset(0);
    };

    const handleMove = (clientX) => {
        if (!isDragging) return;
        const diff = clientX - startX;
        setDragOffset(diff);
    };

    const handleEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const threshold = 50;
        if (dragOffset > threshold) {
            setCurrentSlide((prev) => (prev - 1 + videoCards.length) % videoCards.length);
        } else if (dragOffset < -threshold) {
            setCurrentSlide((prev) => (prev + 1) % videoCards.length);
        }
        setDragOffset(0);
    };
    
    // Determine which slides to show and their transformations
    const getVisibleSlides = () => {
        const numVisible = isMounted && window.innerWidth >= 768 ? 5 : 3;
        const offset = Math.floor(numVisible / 2);
        const slides = [];

        for (let i = -offset; i <= offset; i++) {
            const index = (currentSlide + i + videoCards.length) % videoCards.length;
            slides.push({ ...videoCards[index], position: i, index });
        }
        return slides;
    };

    const visibleSlides = getVisibleSlides();

    return (
        <div className="bg-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">
                        Boost Your Brand with <span className="text-blue-600">High-Impact</span> Short Videos
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                        from our expert content creators. Our team is ready to propel your business forward
                    </p>
                </div>

                {/* Conditionally render the carousel content to avoid hydration errors */}
                {isMounted ? (
                    <div
                        ref={containerRef}
                        className="relative h-[450px] md:h-[550px] flex items-center justify-center cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => handleStart(e.clientX)}
                        onMouseMove={(e) => handleMove(e.clientX)}
                        onMouseUp={handleEnd}
                        onMouseLeave={handleEnd}
                        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
                        onTouchEnd={handleEnd}
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            {visibleSlides.map((card) => {
                                const isCenter = card.position === 0;
                                const isLeft1 = card.position === -1;
                                const isRight1 = card.position === 1;
                                const isLeft2 = card.position === -2;
                                const isRight2 = card.position === 2;

                                let translateX = 0;
                                let scale = 0.6;
                                let opacity = 0;
                                let zIndex = 0;
                                let blur = 4;
                                const cardWidth = 250;
                                const gap = 30;

                                if (isCenter) {
                                    translateX = 0 + (dragOffset * 0.5);
                                    scale = 1;
                                    opacity = 1;
                                    zIndex = 30;
                                    blur = 0;
                                } else if (isLeft1) {
                                    translateX = -cardWidth - gap + (dragOffset * 0.5);
                                    scale = 0.8;
                                    opacity = 0.8;
                                    zIndex = 20;
                                    blur = 0.5;
                                } else if (isRight1) {
                                    translateX = cardWidth + gap + (dragOffset * 0.5);
                                    scale = 0.8;
                                    opacity = 0.8;
                                    zIndex = 20;
                                    blur = 0.5;
                                } else if (isLeft2) {
                                    translateX = -2 * (cardWidth + gap) + (dragOffset * 0.5);
                                    scale = 0.6;
                                    opacity = 0.5;
                                    zIndex = 10;
                                    blur = 1;
                                } else if (isRight2) {
                                    translateX = 2 * (cardWidth + gap) + (dragOffset * 0.5);
                                    scale = 0.6;
                                    opacity = 0.5;
                                    zIndex = 10;
                                    blur = 1;
                                }

                                return (
                                    <div
                                        key={card.index}
                                        className="absolute transition-all duration-700 ease-out select-none"
                                        style={{
                                            transform: `translateX(${translateX}px) scale(${scale})`,
                                            opacity: opacity,
                                            zIndex: zIndex,
                                            filter: `blur(${blur}px)`,
                                        }}
                                    >
                                        <div className="group relative w-[250px] h-[350px] md:w-[280px] md:h-[400px] rounded-[30px] overflow-hidden shadow-2xl transition-transform duration-500">
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                draggable="false"
                                            />
                                            <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/60"></div>
                                            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 text-white transform-gpu">
                                                <h3 className="text-xl md:text-2xl font-bold mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                                                    {card.title}
                                                </h3>
                                                <div className="overflow-hidden">
                                                    <p className="text-sm md:text-base text-gray-200 leading-tight transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                                        {card.description}
                                                    </p>
                                                </div>
                                                <div className="w-0 h-1 bg-blue-500 mt-3 group-hover:w-full transition-all duration-700"></div>
                                            </div>
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-lg">Loading carousel...</div>
                )}
                
                <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12">
                    {videoCards.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`transition-all duration-300 rounded-full ${
                                idx === currentSlide
                                    ? 'w-8 md:w-12 h-2 md:h-2.5 bg-blue-500'
                                    : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoCarousel;