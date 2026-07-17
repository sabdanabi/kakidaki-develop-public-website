import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useWeatherStore = defineStore('weather', () => {
  const authStore = useAuthStore()
  const weatherData = ref<any>(null)
  const isLoading = ref(false)

  const fetchWeather = async (expeditionId: string) => {
    isLoading.value = true
    try {
      const data: any = await $fetch(`https://api.kakidaki.my.id/api/v1/expeditions/${expeditionId}/weather`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      weatherData.value = data
      return { success: true, data }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal memuat data cuaca.' }
    } finally {
      isLoading.value = false
    }
  }

  return {
    weatherData,
    isLoading,
    fetchWeather,
  }
})
