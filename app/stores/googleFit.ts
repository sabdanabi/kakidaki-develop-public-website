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
      isConnected.value = true
      return { success: true, data }
    } catch (err: any) {
      const status = err.status || err.statusCode || err.response?.status
      const msg = err.data?.message || ''
      if (status === 400 || status === 401 || status === 403 || status === 404 || msg.toLowerCase().includes('not connected')) {
        isConnected.value = false
      }
      return { success: false, message: msg || 'Gagal sinkronisasi data Google Fit.' }
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
      if (data && typeof data === 'object' && data.message && data.message.toLowerCase().includes('not connected')) {
        isConnected.value = false
        return { success: false, message: data.message }
      }
      trainingLogs.value = Array.isArray(data) ? data : (data.logs || [])
      isConnected.value = true
      return { success: true, data: trainingLogs.value }
    } catch (err: any) {
      const status = err.status || err.statusCode || err.response?.status
      const msg = err.data?.message || ''
      if (status === 400 || status === 401 || status === 403 || status === 404 || msg.toLowerCase().includes('not connected')) {
        isConnected.value = false
      }
      return { success: false, message: msg || 'Gagal memuat log latihan Google Fit.' }
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
