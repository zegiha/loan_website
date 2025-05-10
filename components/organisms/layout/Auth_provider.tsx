'use client'

import {useEffect, ReactNode} from "react";
import {use_auth_store} from "@/shared/store/authStore";
import {usePathname} from "next/navigation";

export default function Auth_provider({
	children
}: {
	children: ReactNode
}) {
	const {isLogin, setIsLogin} = use_auth_store()
	const pathname = usePathname()
	useEffect(() => {
		const check_login = async () => {
			try {
				const res = await fetch('/api/auth/check_login')
				const data = await res.json()

				if(data.isValid) {
					setIsLogin(true)
				} else {
					setIsLogin(false)
				}
			} catch(e) {
				console.error(`check_login failed: ${e}`)
				setIsLogin(false)
			}
		}

		check_login()
	}, [isLogin, setIsLogin, pathname])
	return <>{children}</>
}