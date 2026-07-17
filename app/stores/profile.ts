import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  const authStore = useAuthStore()
  const user = ref(useCookie('auth_user').value || null)

  const fetchProfile = async () => {
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/users/me', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      user.value = data
      authStore.user = data
      const userCookie = useCookie('auth_user')
      userCookie.value = data
      return { success: true, data }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal mengambil data profil.' }
    }
  }

  const updateProfile = async (profileData: any) => {
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/users/me', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: profileData,
      })
      user.value = data
      authStore.user = data
      const userCookie = useCookie('auth_user')
      userCookie.value = data
      return { success: true, data }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal memperbarui profil.' }
    }
  }

  return {
    user,
    fetchProfile,
    updateProfile,
  }
})
