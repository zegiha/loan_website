import {globalRouter} from '@/shared/globalRouter'
import axios, {AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean
}

async function checkLogin() {
  try {
    await axios.get(`${baseUrl}/user/profile`, {withCredentials: true})
    return 'loggedIn'
  } catch {
    try {
      await axios.get(`${baseUrl}/auth/refresh`, {withCredentials: true})
      return 'loggedInUpdated'
    } catch {
      return 'loggedOut'
    }
  }
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
})

instance.interceptors.response.use(
  res => res,
  async (err) => {
    if(err instanceof AxiosError && err.status === 401) {
      const res = await checkLogin()
      const reqConfig = err.config as CustomInternalAxiosRequestConfig | undefined

      if(
        res === 'loggedInUpdated' &&
        reqConfig &&
        reqConfig.url?.includes('my') &&
        !reqConfig._isRetry
      ) {
        reqConfig._isRetry = true
        return instance(reqConfig)
      }
      if(res === 'loggedOut') {
        globalRouter?.push('/login')
      }
    }

    return Promise.reject(err)
  }
)

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source()

  const mergedConfig: AxiosRequestConfig = {
    ...config,
    ...options,
    cancelToken: source.token,
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams()
      Object.keys(params || {}).forEach((key) => {
        const value = params[key]
        if(Array.isArray(value)) {
          value.forEach(v => {
            searchParams.append(key, v)
          })
        } else if(value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      return searchParams.toString()
    }
  }

  const promise = instance(mergedConfig)
    .then(({data}) => data)

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  };

  return promise
};

export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData

export default instance
