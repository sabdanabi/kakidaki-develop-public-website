import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useStravaStore = defineStore('strava', () => {
  const authStore = useAuthStore()

  const getConnectUrl = async () => {
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/strava/connect', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      
      let url = ''
      if (typeof data === 'string') {
        url = data
      } else if (data && typeof data === 'object') {
        url = data.url || data.redirectUrl || data.data?.url || data.data?.redirectUrl
      }
      
      if (!url) {
        return { success: false, message: 'URL redirect Strava tidak ditemukan.' }
      }
      
      return { success: true, url }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal menghubungkan dengan Strava.' }
    }
  }

  return {
    getConnectUrl,
  }
})
