import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(useCookie('auth_token').value || null)
  const user = ref(useCookie('auth_user').value || null)

  const login = async (email, password) => {
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/auth/login', {
        method: 'POST',
        body: { email, password },
      })

      if (data.accessToken) {
        const tokenCookie = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 })
        const userCookie = useCookie('auth_user', { maxAge: 60 * 60 * 24 * 7 })

        tokenCookie.value = data.accessToken
        userCookie.value = data.user

        token.value = data.accessToken
        user.value = data.user
        return { success: true }
      }
      return { success: false, message: 'Login gagal.' }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Login gagal.' }
    }
  }

  const register = async (payload: any) => {
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/auth/register', {
        method: 'POST',
        body: payload,
      })

      if (data.accessToken) {
        return { success: true }
      }
      return { success: false, message: 'Pendaftaran gagal.' }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Pendaftaran gagal.' }
    }
  }

  const logout = () => {
    const tokenCookie = useCookie('auth_token')
    const userCookie = useCookie('auth_user')
    tokenCookie.value = null
    userCookie.value = null

    token.value = null
    user.value = null
  }

  const fetchProfile = async () => {
    try {
      const data: any = await $fetch('https://api.kakidaki.my.id/api/v1/users/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      user.value = data
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
          Authorization: `Bearer ${token.value}`,
        },
        body: profileData,
      })
      user.value = data
      const userCookie = useCookie('auth_user')
      userCookie.value = data
      return { success: true, data }
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Gagal memperbarui profil.' }
    }
  }

  return {
    token,
    user,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
  }
})
