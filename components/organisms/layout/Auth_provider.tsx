'use client'

import {authControllerRefresh} from '@/entities/api/auth/auth'
import {userControllerProfile} from '@/entities/api/user/user'
import {usePathname} from 'next/navigation'
import {useEffect, ReactNode} from "react";
import {use_auth_store} from "@/shared/store/authStore";

async function checkLogin(): Promise <boolean> {
	try {
		await userControllerProfile()
		return true
	} catch (e) {
		return false
	}
}

async function handleRefresh () {
	try {
		await authControllerRefresh()
		const res = await checkLogin()
		if(!res) throw new Error('failed to refresh')
		return true
	} catch (e) {
		return false
	}
}

function handleAuth(
	isLogin: boolean,
	setIsLogin: (v: boolean) => void,
) {
	if(!isLogin) {
		handleRefresh()
			.then((res) => {
				if(res) {
					setIsLogin(true)
				}
			})
	} else {
		checkLogin()
			.then(res => {
				if(!res)
					setIsLogin(false)
			})
	}
}

export default function Auth_provider({
	children
}: {
	children: ReactNode
}) {
	const {isLogin, setIsLogin} = use_auth_store()

	const pathname = usePathname()

	useEffect(() => {
		if(pathname.includes('my'))
			handleAuth(isLogin, setIsLogin)
	}, [isLogin, setIsLogin]);

	return <>{children}</>
}
