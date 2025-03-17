'use client'

import {useEffect, useState} from "react";

async function useInfiniteScroll<T>(
	fetch_func: () => Promise<T>,
	process_func: () => void,
) {
	const [target, set_target] = useState<HTMLDivElement | null>(null)
	const [observer, set_observer] = useState<IntersectionObserver | null>(null)

	const option: IntersectionObserverInit = {
		root: document.querySelector('#scrollArea'),
		rootMargin: '0px',
		threshold: 0.3,
	}
	const callback: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
		entries.forEach(entry => {
			if(entry.isIntersecting) {
				// 최하단 도달 시 로직
			}
		})
	}

	useEffect(() => {
		if(observer === null) {
			set_observer(new IntersectionObserver(callback, option))
		}
	}, [])

	useEffect(() => {
		if(target !== null && observer !== null) {
			observer.observe(target);
			return () => {
				observer.unobserve(target);
			}
		}
	}, [target])

	return {}
}