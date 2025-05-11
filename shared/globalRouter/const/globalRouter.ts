import {useRouter} from 'next/navigation'

export let globalRouter: ReturnType<typeof useRouter> | undefined = undefined

export const setGlobalRouter = (router: ReturnType<typeof useRouter>): void => {
  globalRouter = router
}