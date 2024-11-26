import {useEffect, useRef, useState} from "react";

export default function useHeaderTopAnimation() {

  const [currentScrollYState, setCurrnetScrollYState] = useState<number>(0);
  const prevScrollYRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const visibleRef = useRef<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setCurrnetScrollYState(currentScrollY);

      if(visibleRef.current) {
        if(currentScrollY < prevScrollYRef.current) {
          prevScrollYRef.current = currentScrollY;
        }
      } else {
        if(currentScrollY > prevScrollYRef.current + 136 && currentScrollY > 136) {
          prevScrollYRef.current = currentScrollY - 136;
        }
      }
    }
    const handleScrollend = () => {
      const currentScrollY = window.scrollY;
      if(currentScrollY === 0) {
        setIsVisible(true);
        visibleRef.current = true;
        prevScrollYRef.current += 136;
      }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scrollend', handleScrollend);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  useEffect(() => {
    if(visibleRef.current && currentScrollYState - prevScrollYRef.current > 200) {
      setIsVisible(false);
      visibleRef.current = false;
      prevScrollYRef.current -= 136;
    } else if(!visibleRef.current && currentScrollYState - prevScrollYRef.current < -200) {
      setIsVisible(true);
      visibleRef.current = true;
      prevScrollYRef.current += 136;
    }
  }, [currentScrollYState]);

  return {isVisible};
}
