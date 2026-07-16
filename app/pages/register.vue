<template>
  <NuxtLayout name="auth">
    <div class="flex min-h-screen flex-col lg:flex-row">

      <div class="flex w-full flex-col px-6 py-8 md:px-12 lg:w-1/2 lg:px-16 xl:px-24">
        <NuxtLink to="/" class="mb-8 flex items-center gap-3 lg:mb-10">
          <img
            src="/images/logo.svg"
            alt="Kaki Daki"
            class="h-9 w-9"
          />
          <span class="text-xl font-bold tracking-tight text-slate-800">Kaki Daki</span>
        </NuxtLink>

        <div class="mx-auto w-full max-w-md flex-1">
          <h1 class="mb-2 font-heading text-3xl font-bold text-slate-900">Buat Akun</h1>
          <p class="mb-8 text-slate-500">
            Daftar untuk mulai menggunakan Kaki Daki dalam keputusan penerbangan Anda.
          </p>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label for="reg-name" class="mb-1.5 block text-sm font-medium text-slate-700">Nama Lengkap</label>
              <div class="relative">
                <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="reg-name"
                  v-model="form.name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label for="reg-age" class="mb-1.5 block text-sm font-medium text-slate-700">Umur</label>
              <div class="relative">
                <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
                <input
                  id="reg-age"
                  v-model="form.age"
                  type="number"
                  min="1"
                  max="120"
                  placeholder="Masukkan umur Anda"
                  class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label for="reg-email" class="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
              <div class="relative">
                <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  id="reg-email"
                  v-model="form.email"
                  type="email"
                  placeholder="Masukkan email Anda"
                  :class="[
                    'w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:outline-none focus:ring-2',
                    form.email.length > 0 && !isEmailValid
                      ? 'border-danger focus:border-danger focus:ring-danger/20'
                      : 'border-slate-200 focus:border-primary focus:ring-primary/20'
                  ]"
                />
              </div>
              <p v-if="form.email.length > 0 && !isEmailValid" class="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Email harus mengandung format @mail.com
              </p>
            </div>

            <div>
              <label for="reg-phone" class="mb-1.5 block text-sm font-medium text-slate-700">Nomor HP</label>
              <div class="relative">
                <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <input
                  id="reg-phone"
                  :value="form.phone"
                  @input="handlePhoneInput"
                  type="tel"
                  inputmode="numeric"
                  placeholder="08xxxxxxxxxx"
                  class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label for="reg-password" class="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <div class="relative">
                <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="reg-password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Buat password"
                  class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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

              <div v-if="form.password.length > 0" class="mt-2 space-y-1">
                <div class="flex items-center gap-2 text-xs" :class="hasMinLength ? 'text-primary' : 'text-danger'">
                  <svg v-if="hasMinLength" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  <span>Minimal 8 karakter</span>
                </div>
                <div class="flex items-center gap-2 text-xs" :class="hasNumber ? 'text-primary' : 'text-danger'">
                  <svg v-if="hasNumber" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  <span>Mengandung angka</span>
                </div>
                <div class="flex items-center gap-2 text-xs" :class="hasSpecial ? 'text-primary' : 'text-danger'">
                  <svg v-if="hasSpecial" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  <span>Mengandung karakter unik (!@#$%^&*)</span>
                </div>
              </div>
            </div>

            <div>
              <label for="reg-confirm" class="mb-1.5 block text-sm font-medium text-slate-700">Konfirmasi Password</label>
              <div class="relative">
                <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="reg-confirm"
                  v-model="form.confirmPassword"
                  :type="showConfirm ? 'text' : 'password'"
                  placeholder="Ulangi password"
                  class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  @click="showConfirm = !showConfirm"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                >
                  <svg v-if="!showConfirm" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
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

              <div v-if="form.confirmPassword.length > 0 && form.confirmPassword !== form.password" class="mt-1.5">
                <p class="flex items-center gap-2 text-xs text-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  <span>Password tidak sama</span>
                </p>
              </div>
            </div>

            <button
              type="submit"
              class="w-full rounded-xl bg-[#023C23] py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 active:scale-[0.98]"
            >
              Daftar
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-slate-500">
            Sudah punya akun?
            <NuxtLink to="/login" class="font-semibold text-[#023C23] transition-colors hover:text-primary-600">
              Masuk
            </NuxtLink>
          </p>
        </div>

        <div class="mt-8 text-center text-xs text-slate-400">
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
                Bergabung dengan<br/>Platform Keputusan<br/>Penerbangan
              </h2>

              <div class="mb-8">
                <svg class="mb-3 h-8 w-10 text-white/30" viewBox="0 0 40 32" fill="currentColor">
                  <path d="M0 24.615V0h15.385v15.385H7.692c0 4.254 3.438 7.693 7.693 7.693v7.692C6.894 30.77 0 23.874 0 24.615zM24.615 24.615V0H40v15.385h-7.692c0 4.254 3.438 7.693 7.692 7.693v7.692c-8.49 0-15.385-6.896-15.385-15.385v8.23z" />
                </svg>
                <p class="text-lg leading-relaxed text-white/85">
                  "Dengan Kaki Daki, tim kami bisa mengambil keputusan Go/No-Go lebih cepat dan tepat. Data real-time yang disajikan sangat membantu operasional kami."
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
  name: '',
  age: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const showPassword = ref(false)
const showConfirm = ref(false)

const hasMinLength = computed(() => form.value.password.length >= 8)
const hasNumber = computed(() => /\d/.test(form.value.password))
const hasSpecial = computed(() => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.value.password))

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))

const handlePhoneInput = (e) => {
  const digits = e.target.value.replace(/\D/g, '')
  form.value.phone = digits
  e.target.value = digits
}

const handleRegister = () => {
}
</script>
