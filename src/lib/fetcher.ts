import upfetch from './upfetch'

export const fetcher = async ({ queryKey }) => {
  const [url, params] = queryKey
  const searchParams = params
    ? '?' + new URLSearchParams(params).toString()
    : ''

  return await upfetch(`${url}${searchParams}`)
}
