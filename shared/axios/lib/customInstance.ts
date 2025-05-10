// import {globalRouter} from '@/shared/lib'
import axios, {AxiosError, AxiosRequestConfig} from 'axios'
// import {adminControllerRefresh} from "@/entities/api/admin/admin";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
})

instance.interceptors.response.use(
  res => res,
  async (err) => {
    if(err instanceof AxiosError && err.status === 401) {
      try {
        return Promise.reject(err)
      } catch (e) {
      }
    }
  }
)

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = instance({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({data}) => data)

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  };

  return promise
};

export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData

export default instance
