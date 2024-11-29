'use client'

import {useEffect, useRef, useState} from "react";
import {Swiper as SwiperType} from 'swiper'

export default function usePaginationSwiper() {
  const swiperRef = useRef<SwiperType>()
  const [pagination, setPagination] = useState<Array<number>>([]);
  const [activeSlides, setActiveSlides] = useState(1);

  const handlePaginationRender = () => {
    if (swiperRef.current) {
      const slideLength = swiperRef.current.slides.length;
      const newPagination: Array<number> = []
      if (slideLength <= 5) {
        for (let i = 1; i <= slideLength; i++)
          newPagination.push(i);
      } else {
        const start = activeSlides - 2;
        const end = activeSlides + 2;
        if (start <= 1) {
          for (let i = 0; i < 5; i++)
            newPagination.push(i + 1);
        } else {
          if (end >= slideLength) {
            for (let i = slideLength - 4; i <= slideLength; i++)
              newPagination.push(i);
          } else {
            for (let i = end - 4; i <= end; i++)
              newPagination.push(i);
          }
        }

      }
      setPagination(newPagination)
    }
  }
  const handleNextSlide = () => {
    if (swiperRef.current) {
      if (swiperRef.current.allowSlideNext) {
        swiperRef.current.slideNext(240);
        setActiveSlides(swiperRef.current.activeIndex + 1);
      }
    }
  }
  const handlePrevSlide = () => {
    if (swiperRef.current) {
      if (swiperRef.current.allowSlidePrev) {
        swiperRef.current.slidePrev(240);
        setActiveSlides(swiperRef.current.activeIndex + 1);
      }
    }
  }
  const handleToSlide = (to: number) => {
    if(swiperRef.current) {
      swiperRef.current.slideTo(to - 1, 240);
      setActiveSlides(to);
    }
  }
  const handleSwiperUpdate = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    handlePaginationRender();
    setActiveSlides(1);
  }

  useEffect(() => {
    handlePaginationRender()
  }, [activeSlides])

  return {
    swiperRef,
    pagination,
    activeSlides,
    handleNextSlide,
    handlePrevSlide,
    handleToSlide,
    handleSwiperUpdate,
  };
}
