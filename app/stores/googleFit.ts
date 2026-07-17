import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGoogleFitStore = defineStore('googleFit', () => {
  const authStore = useAuthStore()
  const isConnected = ref(false)
  const trainingLogs = ref<any[]>([])

  const getConnectUrl = async () => {
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/google-fit/connect', {
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
        return { success: false, message: 'URL redirect Google Fit tidak ditemukan.' }
      }
      
      return { success: true, url }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal mengambil URL koneksi Google Fit.' }
    }
  }

  const syncData = async () => {
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/google-fit/sync', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return { success: true, data }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal sinkronisasi data Google Fit.' }
    }
  }

  const fetchTrainingLogs = async () => {
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/google-fit/training-logs', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      trainingLogs.value = Array.isArray(data) ? data : (data.logs || [])
      isConnected.value = true
      return { success: true, data: trainingLogs.value }
    } catch (err: any) {
      if (err.status === 400 || err.status === 401 || err.status === 404) {
        isConnected.value = false
      }
      return { success: false, message: err.data?.message || 'Gagal memuat log latihan Google Fit.' }
    }
  }

  const handleCallback = async (code: string, state: string) => {
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/google-fit/callback', {
        method: 'GET',
        params: {
          code,
          state,
        },
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      
      // Update status and fetch fresh logs after connection
      await fetchTrainingLogs()
      
      return { success: true, data }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal menghubungkan Google Fit.' }
    }
  }

  return {
    isConnected,
    trainingLogs,
    getConnectUrl,
    syncData,
    fetchTrainingLogs,
    handleCallback,
  }
})
