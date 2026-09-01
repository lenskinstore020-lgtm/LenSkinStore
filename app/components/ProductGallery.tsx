"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ProductGalleryProps {
  images: string[];
  alt?: string;
}

export function ProductGallery({ images, alt = "" }: ProductGalleryProps) {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi],
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbApi.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  if (images.length === 0) return null;

  // Якщо фото лише одне — карусель і мініатюри не потрібні, просто показуємо його
  if (images.length === 1) {
    return (
      <div className="w-full max-w-lg">
        <div className="bg-muted relative aspect-square overflow-hidden rounded-xl">
          <img
            src={images[0]}
            alt={alt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[600px] flex-col gap-3">
      <Carousel setApi={setMainApi} className="w-full">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="bg-muted relative aspect-square overflow-hidden rounded-xl">
                <img
                  src={src}
                  alt={`${alt} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Carousel
        setApi={setThumbApi}
        opts={{
          containScroll: "keepSnaps",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 flex-row">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className="basis-1/5 cursor-pointer pl-2 sm:basis-1/6"
              onClick={() => onThumbClick(index)}
            >
              <div
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                  index === selectedIndex
                    ? "border-primary opacity-100"
                    : "border-transparent opacity-40 hover:opacity-70",
                )}
              >
                <img
                  src={src}
                  alt={`${alt} thumb ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
