import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useCommentsStore = defineStore('comments', () => {
  const authStore = useAuthStore()
  const comments = ref<Record<string, any[]>>({})
  const isLoading = ref(false)

  const fetchComments = async (mountainId: string) => {
    isLoading.value = true
    try {
      const data: any = await $fetch(`https://api.kakidaki.my.id/api/v1/mountains/${mountainId}/comments`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      comments.value[mountainId] = Array.isArray(data) ? data : (data.data || [])
      return { success: true, data: comments.value[mountainId] }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal memuat ulasan gunung.' }
    } finally {
      isLoading.value = false
    }
  }

  const postComment = async (payload: {
    mountainId: string
    trailName: string
    text: string
    imageUrl?: string
  }) => {
    isLoading.value = true
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/comments', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: payload,
      })
      
      const mountainId = payload.mountainId
      if (!comments.value[mountainId]) {
        comments.value[mountainId] = []
      }
      comments.value[mountainId].unshift(data)
      return { success: true, data }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal mengirim ulasan.' }
    } finally {
      isLoading.value = false
    }
  }

  return {
    comments,
    isLoading,
    fetchComments,
    postComment,
  }
})
