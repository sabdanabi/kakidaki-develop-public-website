import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExpeditionStore = defineStore('expedition', () => {
  const authStore = useAuthStore()
  const expeditions = ref<any[]>([])
  const isLoading = ref(false)

  const mountains = ref<any[]>([])
  const isLoadingMountains = ref(false)

  const fetchMountains = async () => {
    isLoadingMountains.value = true
    try {
      const data = await $fetch('https://api.kakidaki.my.id/api/v1/mountains', {
        headers: authStore.token ? { Authorization: `Bearer ${authStore.token}` } : {}
      })
      
      const staticMountains = [
        { id: 'rinjani-uuid-1234', name: 'Gunung Rinjani', elevation: '3.726m' },
        { id: 'semeru-uuid-5678', name: 'Gunung Semeru', elevation: '3.676m' },
        { id: 'merbabu-uuid-9012', name: 'Gunung Merbabu', elevation: '3.142m' },
        { id: 'gede-uuid-3456', name: 'Gunung Gede', elevation: '2.958m' },
        { id: 'kerinci-uuid-7890', name: 'Gunung Kerinci', elevation: '3.805m' }
      ]

      if (Array.isArray(data)) {
        mountains.value = data
      } else if (data && typeof data === 'object' && Array.isArray((data as any).data)) {
        mountains.value = (data as any).data
      } else {
        mountains.value = staticMountains
      }
      return { success: true, data: mountains.value }
    } catch (err) {
      const staticMountains = [
        { id: 'rinjani-uuid-1234', name: 'Gunung Rinjani', elevation: '3.726m' },
        { id: 'semeru-uuid-5678', name: 'Gunung Semeru', elevation: '3.676m' },
        { id: 'merbabu-uuid-9012', name: 'Gunung Merbabu', elevation: '3.142m' },
        { id: 'gede-uuid-3456', name: 'Gunung Gede', elevation: '2.958m' },
        { id: 'kerinci-uuid-7890', name: 'Gunung Kerinci', elevation: '3.805m' }
      ]
      mountains.value = staticMountains
      return { success: true, data: staticMountains }
    } finally {
      isLoadingMountains.value = false
    }
  }

  const createExpedition = async (payload: {
    mountainId: string
    startDate: string
    endDate: string
    memberCount: number
    age: number
    heightCm: number
    weightKg: number
  }) => {
    isLoading.value = true
    try {
      const data = await $fetch('https://api.kakidaki.my.id/api/v1/expeditions', {
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return { success: true, data }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal menyimpan data ekspedisi.' }
    } finally {
      isLoading.value = false
    }
  }

  return {
    expeditions,
    isLoading,
    mountains,
    isLoadingMountains,
    fetchMountains,
    createExpedition,
  }
})
