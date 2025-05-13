import axios, {AxiosError, AxiosRequestConfig} from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LENDERS_BASE_URL,
  // withCredentials: true,
})

export const customInstanceLenders = <T>(
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

export default customInstanceLenders