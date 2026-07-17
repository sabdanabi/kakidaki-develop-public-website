<template>
  <NuxtLayout name="auth">
    <div class="flex min-h-screen flex-col lg:flex-row font-sans">
      
      <div class="flex w-full flex-col justify-between px-6 py-8 md:px-8 lg:w-1/2 lg:px-12 xl:px-16 bg-white">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="~/assets/images/logo_.svg" alt="KakiDaki" class="h-9 w-9" />
          <span class="text-xl font-heading font-medium text-slate-800">KakiDaki</span>
        </NuxtLink>

        <div class="mx-auto w-full max-w-md py-8 lg:py-0">
          <div class="mb-6">
            <h1 class="mb-2 font-heading text-3xl font-medium text-slate-900">
              Selamat Datang!
            </h1>
            <p class="text-slate-500 text-sm leading-relaxed">
              Masuk ke akun Anda untuk memantau intelijen jalur, kesiapan fisik, dan ulasan pendakian Nusantara.
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label for="login-email" class="mb-1.5 block text-xs font-medium text-slate-700">Email</label>
              <div class="relative">
                <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </span>
                <input
                  id="login-email"
                  v-model="form.email"
                  type="email"
                  placeholder="Masukkan email Anda (contoh: admin@kakidaki.id / pendaki@kakidaki.id)"
                  class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[#023C23] focus:outline-none focus:ring-2 focus:ring-[#023C23]/20"
                  required
                />
              </div>
            </div>

            <div>
              <label for="login-password" class="mb-1.5 block text-xs font-medium text-slate-700">Password</label>
              <div class="relative">
                <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="login-password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Masukkan password Anda"
                  :class="[
                    'w-full rounded-xl border bg-white py-3 pl-11 pr-12 text-sm text-slate-800 placeholder-slate-400 transition-all focus:outline-none focus:ring-2',
                    loginError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-[#023C23] focus:ring-[#023C23]/20'
                  ]"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                >
                  <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>

              <p v-if="loginError" class="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {{ loginError }}
              </p>

              <div class="mt-2 text-right">
                <NuxtLink to="/forgot-password" class="text-xs font-medium text-[#023C23] transition-colors hover:text-emerald-600">
                  Lupa Password?
                </NuxtLink>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full rounded-xl bg-[#023C23] py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Memproses...' : 'Masuk' }}
            </button>
          </form>

          
         

          <p class="mt-6 text-center text-xs text-slate-500">
            Belum punya akun?
            <NuxtLink to="/register" class="font-medium text-[#023C23] transition-colors hover:text-emerald-600">
              Daftar Sekarang
            </NuxtLink>
          </p>
        </div>

        <div class="text-center text-xs text-slate-400">
          &copy; {{ new Date().getFullYear() }} KakiDaki. All rights reserved.
        </div>
      </div>

      
      <div class="hidden p-5 lg:block lg:w-1/2">
        <div class="relative h-full overflow-hidden rounded-3xl">
          <div class="absolute inset-0 bg-gradient-to-b from-[#023C23] via-slate-900/95 to-slate-950"></div>
          <div class="absolute inset-0 bg-[url('~/assets/images/gunung_rinjani.webp')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

          <div class="relative z-10 flex h-full flex-col justify-between p-8 xl:p-12">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-medium">
                Alpine Intelligence
              </span>
            </div>

            <div>
              <h2 class="mb-6 font-heading text-3xl font-medium leading-tight text-white xl:text-4xl">
                Keputusan Tepat untuk Setiap Pendakian
              </h2>

              <div class="mb-8 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                <p class="text-sm leading-relaxed text-white/85 italic">
                  "KakiDaki mengubah cara kami memantau kesiapan pendakian. Prosesnya cepat, akurat, dan memastikan setiap keputusan naik ke puncak diambil dengan data cuaca dan fisik terbaik."
                </p>
              </div>

              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/30 text-base font-bold text-emerald-300">
                  KD
                </div>
                <div>
                  <p class="font-medium text-white">Pendaki Profesional</p>
                  <p class="text-xs text-white/60">Expedition Readiness</p>
                </div>
              </div>
            </div>

            <div>
              <p class="mb-4 text-xs font-medium text-white/40">Dukungan Sistem & Sensor</p>
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-md bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/70 backdrop-blur-sm">Satelit Cuaca BMKG</span>
                <span class="rounded-md bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/70 backdrop-blur-sm">Pos Pengawasan Gunung</span>
                <span class="rounded-md bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/70 backdrop-blur-sm">Basarnas Terintegrasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: false,
})

const router = useRouter()
const form = ref({
  email: '',
  password: '',
})

const showPassword = ref(false)
const loginError = ref('')
const isLoading = ref(false)

const authStore = useAuthStore()

const handleLogin = async () => {
  loginError.value = ''
  isLoading.value = true

  const result = await authStore.login(form.value.email, form.value.password)

  isLoading.value = false
  if (result.success) {
    navigateTo('/onboarding')
  } else {
    loginError.value = result.message
  }
}
</script>
