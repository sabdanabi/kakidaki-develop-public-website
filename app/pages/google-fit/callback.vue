<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: false,
})

const route = useRoute()
const router = useRouter()
const googleFitStore = useGoogleFitStore()

const status = ref<'loading' | 'success' | 'error'>('loading')
const errorMessage = ref('')

onMounted(async () => {
  const code = route.query.code as string
  const state = route.query.state as string

  if (!code || !state) {
    status.value = 'error'
    errorMessage.value = 'Parameter dari Google Fit tidak lengkap (code atau state tidak ditemukan).'
    return
  }

  const result = await googleFitStore.handleCallback(code, state)
  
  if (result.success) {
    status.value = 'success'
    setTimeout(() => {
      router.push('/health')
    }, 2500)
  } else {
    status.value = 'error'
    errorMessage.value = result.message || 'Gagal memverifikasi koneksi Google Fit.'
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans relative overflow-hidden">
    
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-8 text-center relative z-10">
      
      
      <div class="flex justify-center mb-8">
        <div class="flex items-center gap-3">
          <img
            src="~assets/images/logo_.svg"
            alt="Kaki Daki"
            class="h-9 w-9"
          />
          <span class="text-xl font-bold tracking-tight text-slate-800">Kaki Daki</span>
        </div>
      </div>

      
      <div v-if="status === 'loading'" class="space-y-6">
        <div class="relative w-20 h-20 mx-auto flex items-center justify-center">
          
          <div class="absolute inset-0 rounded-full border-4 border-slate-100 border-t-[#118c13] animate-spin"></div>
          <div class="absolute inset-2 rounded-full border-4 border-slate-100 border-b-[#023C23] animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>
          
          <svg class="w-8 h-8 text-[#ea4335] animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <div class="space-y-2">
          <h2 class="text-xl font-medium text-slate-900 font-heading">Menghubungkan Google Fit</h2>
          <p class="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            Sedang memproses verifikasi dan sinkronisasi data aktivitas Anda. Mohon tunggu sebentar...
          </p>
        </div>
      </div>

      
      <div v-else-if="status === 'success'" class="space-y-6">
        <div class="w-20 h-20 mx-auto rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#118c13] relative">
          <div class="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping"></div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 relative z-10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div class="space-y-2">
          <h2 class="text-xl font-medium text-slate-900 font-heading">Google Fit Terhubung!</h2>
          <p class="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            Akun Google Fit Anda berhasil ditautkan. Anda akan dialihkan kembali ke dashboard kesehatan.
          </p>
        </div>

        <div class="pt-2 flex justify-center">
          <div class="flex gap-1.5 items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Redirecting...
          </div>
        </div>
      </div>

      
      <div v-else-if="status === 'error'" class="space-y-6">
        <div class="w-20 h-20 mx-auto rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <div class="space-y-2">
          <h2 class="text-xl font-medium text-slate-900 font-heading">Gagal Menghubungkan</h2>
          <p class="text-sm text-red-600 bg-red-50/50 border border-red-100/50 rounded-2xl p-4 leading-relaxed max-w-xs mx-auto">
            {{ errorMessage }}
          </p>
        </div>

        <div class="pt-4 flex flex-col gap-2">
          <NuxtLink
            to="/health"
            class="w-full bg-[#023C23] hover:bg-emerald-800 text-white py-3 rounded-xl font-medium text-xs transition-colors active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
          >
            Kembali ke Health Dashboard
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>
