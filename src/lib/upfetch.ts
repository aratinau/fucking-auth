import { up } from 'up-fetch'
import {authUtils} from "@/utils/auth.ts";

let refreshInProgress = false

async function refreshToken() {
  if (refreshInProgress) return

  refreshInProgress = true
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/token/refresh`, {
      method: 'POST',
      // credentials: 'include',
      body: JSON.stringify({
        refresh_token: localStorage.getItem('refresh_token')
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) throw new Error('Refresh failed')

    const data = await response.json()

    localStorage.setItem('refresh_token', data.refresh_token)
    localStorage.setItem('auth_token', data.token)

    document.reload()
  } finally {
    refreshInProgress = false
  }
}

const upfetch = up(fetch, () => {
  const token = authUtils.getAuthData('auth_token')

  return {
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    retry: {
      attempts: 1,
      when: (ctx) => ctx.response?.status === 401,
    },
    reject: async (res) => {
      if (res.status === 401) {
        await refreshToken()

        return false
      }

      return !res.ok
    },
    parseRejected: async (res) => {
      return new Error(`HTTP ${res.status}`)
    },
  }
})

export default upfetch
