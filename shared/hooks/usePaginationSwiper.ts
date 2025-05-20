'use client'

import {SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import {Swiper as SwiperType} from 'swiper'
import react_state_action from "@/shared/type/react_state_action";

export default function usePaginationSwiper(
  activeSlides: number,
  setActiveSlides: react_state_action<number>,
  maxSlideLength?: number
) {
  const swiperRef = useRef<SwiperType>(null)
  const [pagination, setPagination] = useState<Array<number>>([]);

  const handlePaginationRender = useCallback(() => {
    if (swiperRef.current) {
      const slideLength = maxSlideLength ?? swiperRef.current.slides.length;
      const newPagination: Array<number> = []

      let start = Math.max(activeSlides - 2, 1)
      let end = Math.min(activeSlides + 2, slideLength)

      if(slideLength < 5) {
        start = 1
        end = slideLength
      } else if(end - start < 4) {
        if(end === slideLength)
          start = end - 4
        else
          end = start + 4
      }

      for(let i = start; i <= end; i++) newPagination.push(i)

      setPagination(newPagination)
    }
  }, [maxSlideLength, activeSlides])

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
  }, [activeSlides, maxSlideLength])

  return {
    swiperRef,
    pagination,
    activeSlides,
    handleNextSlide,
    handlePrevSlide,
    handleToSlide,
    handleSwiperUpdate,
    setActiveSlides,
  };
}
