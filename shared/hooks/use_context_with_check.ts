'use client'

import React, {useContext} from "react";

export default function use_context_with_check<T>(context: React.Context<T | null>) {
	const data = useContext<T | null>(context)
	if(data === null || data === undefined) {
		throw new Error('초기값 없이 콘텍스트 사용')
	}
	return data
}