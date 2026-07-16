<template>
  <NuxtLayout name="auth">
    <div class="flex min-h-screen flex-col lg:flex-row">

      <div class="flex w-full flex-col justify-between px-6 py-8 md:px-12 lg:w-1/2 lg:px-16 xl:px-24">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img
            src="/images/logo.svg"
            alt="Kaki Daki"
            class="h-9 w-9"
          />
          <span class="text-xl font-bold tracking-tight text-slate-800">Kaki Daki</span>
        </NuxtLink>

        <div class="mx-auto w-full max-w-md py-10 lg:py-0">
          <h1 class="mb-2 font-heading text-3xl font-bold text-slate-900">Selamat Datang!</h1>
          <p class="mb-8 text-slate-500">
            Masuk ke dashboard Anda untuk mulai memantau dan mengoptimasi keputusan penerbangan.
          </p>

          <form @submit.prevent="handleLogin" class="space-y-5">
            <div>
              <label for="login-email" class="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
              <div class="relative">
                <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  id="login-email"
                  v-model="form.email"
                  type="email"
                  placeholder="Masukkan email Anda"
                  class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label for="login-password" class="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <div class="relative">
                <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Masukkan password Anda"
                  :class="[
                    'w-full rounded-xl border bg-white py-3 pl-11 pr-12 text-sm text-slate-800 placeholder-slate-400 transition-all focus:outline-none focus:ring-2',
                    loginError
                      ? 'border-danger focus:border-danger focus:ring-danger/20'
                      : 'border-slate-200 focus:border-primary focus:ring-primary/20'
                  ]"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                >
                  <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>

              <p v-if="loginError" class="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {{ loginError }}
              </p>

              <div class="mt-2 text-right">
                <NuxtLink to="/forgot-password" class="text-sm font-medium text-primary transition-colors hover:text-primary-600">
                  Lupa Password?
                </NuxtLink>
              </div>
            </div>

            <button
              type="submit"
              class="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 active:scale-[0.98]"
            >
              Masuk
            </button>
          </form>

          <p class="mt-8 text-center text-sm text-slate-500">
            Belum punya akun?
            <NuxtLink to="/register" class="font-semibold text-primary transition-colors hover:text-primary-600">
              Daftar
            </NuxtLink>
          </p>
        </div>

        <div class="text-center text-xs text-slate-400">
          &copy; {{ new Date().getFullYear() }} Kaki Daki. All rights reserved.
        </div>
      </div>

      <div class="hidden p-5 lg:block lg:w-1/2">
        <div class="relative h-full overflow-hidden rounded-3xl">
          <img
            src="/images/login-hero.jpg"
            alt="Aviation dashboard"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-danger-800/90 via-slate-900/85 to-primary-800/90"></div>

          <div class="relative z-10 flex h-full flex-col justify-between p-12 xl:p-16">
            <div></div>

            <div>
              <h2 class="mb-6 font-heading text-4xl font-bold leading-tight text-white xl:text-5xl">
                Keputusan Tepat<br/>untuk Setiap<br/>Penerbangan
              </h2>

              <div class="mb-8">
                <svg class="mb-3 h-8 w-10 text-white/30" viewBox="0 0 40 32" fill="currentColor">
                  <path d="M0 24.615V0h15.385v15.385H7.692c0 4.254 3.438 7.693 7.693 7.693v7.692C6.894 30.77 0 23.874 0 24.615zM24.615 24.615V0H40v15.385h-7.692c0 4.254 3.438 7.693 7.692 7.693v7.692c-8.49 0-15.385-6.896-15.385-15.385v8.23z" />
                </svg>
                <p class="text-lg leading-relaxed text-white/85">
                  "Kaki Daki mengubah cara kami memantau kesiapan penerbangan. Prosesnya cepat, akurat, dan memastikan setiap keputusan go/no-go diambil dengan data terbaik."
                </p>
              </div>

              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-lg font-bold text-white">
                  KD
                </div>
                <div>
                  <p class="font-semibold text-white">Kaki Daki Admin</p>
                  <p class="text-sm text-white/60">Flight Operations</p>
                </div>
              </div>
            </div>

            <div>
              <p class="mb-4 text-xs font-medium uppercase tracking-widest text-white/40">Dipercaya oleh</p>
              <div class="flex flex-wrap items-center gap-3">
                <span class="rounded-md bg-white/10 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-sm">Partner A</span>
                <span class="rounded-md bg-white/10 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-sm">Partner B</span>
                <span class="rounded-md bg-white/10 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-sm">Partner C</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false,
})

const form = ref({
  email: '',
  password: '',
})

const showPassword = ref(false)
const loginError = ref('')

const handleLogin = () => {
  loginError.value = 'Email atau password salah'
}
</script>
