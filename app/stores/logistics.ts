import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLogisticsStore = defineStore('logistics', () => {
  const authStore = useAuthStore()
  const items = ref<any[]>([])
  const activeExpeditionId = ref<string>('active')

  const fetchExpeditions = async () => {
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/expeditions', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      
      if (Array.isArray(data) && data.length > 0) {
        activeExpeditionId.value = data[0].id
      } else if (data && data.id) {
        activeExpeditionId.value = data.id
      }
      return { success: true, data }
    } catch (err: any) {
      if (authStore.user && authStore.user.activeExpeditionId) {
        activeExpeditionId.value = authStore.user.activeExpeditionId
      }
      return { success: false, message: err.data?.message || 'Gagal mengambil data ekspedisi.' }
    }
  }

  const fetchLogistics = async (expeditionId?: string) => {
    const id = expeditionId || activeExpeditionId.value
    try {
      const data: any = await $fetch(`https://api.kakidaki.my.id/api/v1/expeditions/${id}/logistics`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      items.value = Array.isArray(data) ? data : (data.items || [])
      return { success: true, data: items.value }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal memuat daftar logistik.' }
    }
  }

  const generatePackingList = async (expeditionId?: string) => {
    const id = expeditionId || activeExpeditionId.value
    try {
      const data: any = await $fetch(`https://api.kakidaki.my.id/api/v1/expeditions/${id}/logistics/generate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      items.value = Array.isArray(data) ? data : (data.items || [])
      return { success: true, data: items.value }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal generate packing list.' }
    }
  }

  const updateItemPackedStatus = async (itemId: string, payload: any) => {
    try {
      const data: any = await $fetch(`https://api.kakidaki.my.id/api/v1/logistics/${itemId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: payload,
      })
      
      const index = items.value.findIndex(item => item.id === itemId)
      if (index !== -1) {
        items.value[index] = { ...items.value[index], ...data }
      }
      
      return { success: true, data }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal memperbarui status barang.' }
    }
  }

  return {
    items,
    activeExpeditionId,
    fetchExpeditions,
    fetchLogistics,
    generatePackingList,
    updateItemPackedStatus,
  }
})
