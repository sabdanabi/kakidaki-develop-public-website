import { defineStore } from 'pinia'

export const useAssessmentStore = defineStore('assessment', () => {
  const authStore = useAuthStore()

  const submitAssessment = async (assessmentData: any) => {
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/users/me/assessment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: assessmentData,
      })
      return { success: true, data }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal menyimpan data onboarding.' }
    }
  }

  return {
    submitAssessment,
  }
})
