"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { CLIENT_REVIEWS } from "@/app/constants/reviews";
import { Star, Quote, MessageCircle } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

export const ClientReviews = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            slidesToScroll: 1,
            skipSnaps: false,
            containScroll: "trimSnaps",
        },
        [Autoplay({ delay: 3000, stopOnInteraction: false })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={16}
                className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
            />
        ));
    };

    return (
        <section id="reviews" className="flex flex-col items-center justify-center py-10 md:py-14 relative z-20">
            <SectionHeading
                icon={<MessageCircle className="text-purple-500" size={48} />}
                title="Client Reviews"
                subtitle="What clients say about working with me"
            />

            <div className="w-full max-w-7xl px-4 md:px-10">
                <div className="relative">
                    {/* Carousel */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {CLIENT_REVIEWS.map((review, index) => (
                                <div
                                    key={index}
                                    className="pl-4 flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                                >
                                    <Card className="h-full flex flex-col justify-between p-6 relative">
                                        {/* Quote Icon */}
                                        <Quote className="absolute top-4 right-4 text-purple-500/20" size={40} />

                                        {/* Avatar and Info */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-white font-bold flex-shrink-0">
                                                {review.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-white">{review.name}</h3>
                                                <p className="text-sm text-gray-400">{review.role}</p>
                                                <p className="text-xs text-purple-400">{review.company}</p>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex gap-1 mb-3">
                                            {renderStars(review.rating)}
                                        </div>

                                        {/* Review Text */}
                                        <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                                            "{review.review}"
                                        </p>

                                        {/* Project Tag */}
                                        <div className="pt-3 border-t border-white/10">
                                            <span className="text-xs text-purple-400">
                                                Project: {review.project}
                                            </span>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={scrollPrev}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-purple-500/20 hover:border-purple-500 transition-all"
                            aria-label="Previous"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-purple-500/20 hover:border-purple-500 transition-all"
                            aria-label="Next"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6 flex-wrap">
                        {CLIENT_REVIEWS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => emblaApi?.scrollTo(i)}
                                className={`h-2 rounded-full transition-all ${selectedIndex === i
                                    ? "w-8 bg-purple-500"
                                    : "w-2 bg-white/20 hover:bg-white/40"
                                    }`}
                                aria-label={`Go to review ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
