import axios, { AxiosResponse } from 'axios'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: JSX.Element
}

const x: any = null

axios.interceptors.request.use(
  (requestConfig: any) => {
    const token: string | null = localStorage.getItem('access_token')

    if (token) {
      if (requestConfig.headers) {
        requestConfig.headers.Authorization = `Bearer ${token}`
      }
    }

    return requestConfig
  },
  requestError => {
    return Promise.reject(requestError)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status === 401) {
      //
      // store.subscribe('')
      // console.error({store})
      x && x()

    }

    return Promise.reject(error)
  }
)

const AxiosInterceptor = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate()


  useEffect(() => {
    const resInterceptor = (response: AxiosResponse): any => {
      return response
    }

    const errInterceptor = (error: any): any => {

      return Promise.reject(error)
    }

    axios.interceptors.response.use(resInterceptor, errInterceptor)
  }, [])

  return children
}

export { AxiosInterceptor }
