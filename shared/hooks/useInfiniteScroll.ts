'use client'

import {useEffect, useState} from "react";

export default function useInfiniteScroll<T>(
	fetching: () => Promise<T>,
	isFetching: boolean,
	hasNext: boolean,
) {
	const [target, setTarget] = useState<HTMLDivElement | null>(null);
	const [observer, set_observer] = useState<IntersectionObserver | null>(null)

	useEffect(() => {
		const callback: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if(entry.isIntersecting) {
					if(hasNext && !isFetching) {
						fetching()
					}
				}
			})
		}
		const option: IntersectionObserverInit = {
			root: null,
			rootMargin: '0px',
			threshold: 0.3,
		}
		set_observer(p => {
			p?.disconnect()
			return new IntersectionObserver(callback, option)
		})
		return () => {
			set_observer(p => {
				p?.disconnect()
				return null
			})
		}
	}, [fetching, isFetching, hasNext, target])

	useEffect(() => {
		if(target !== null && observer !== null) {
			observer.observe(target)
		}
		return () => {
			if(target && observer) {
				observer.unobserve(target)
			}
		}
	}, [target, observer])

	return {
		setTarget
	}
}