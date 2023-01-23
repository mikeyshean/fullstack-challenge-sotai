const API_HOST = import.meta.env.VITE_API_HOST


export async function fetcher(
  input: RequestInfo,
  {
    method,
    data
  }: {
    method: "GET",
    data?: string | object | null
  } = { method: "GET", data: null }
) {
  const url = API_HOST + input
  if (data && typeof data === "object") {
    data = JSON.stringify(data)
  }
  const response = await fetch(url, {
    headers: {
      'Content-type': 'application/json',
    },
    method: method,
    body: data
  })

  if (response.ok) {
    return await response.json()
  } else {
    switch (response.status) {
      case 500:
        throw new Error("Http 500: Internal Server Error")
      case 401:
        throw new Error("Http 401: Session Expired")
      case 422:
        throw new Error("Http 422: Unprocessable Entity")
      default:
        throw new Error("Network Error")
    }
  }
} 