<template>
 <NuxtLayout name="auth">

 
 <div v-if="showWelcome"class="fixed inset-0 z-50 flex items-center justify-center bg-white">
 <div class="flex flex-col items-center text-center welcome-fade-in">
 <div class="h-16 w-16 rounded-2xl bg-[#023C23]/10 flex items-center justify-center mb-6 welcome-bounce">
 <svg xmlns="http://www.w3.org/2000/svg"class="h-8 w-8 text-[#023C23]"viewBox="0 0 24 24"fill="none"stroke="currentColor"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
 </div>
 <h1 class="font-heading text-3xl font-medium text-slate-900 mb-2 welcome-slide-up">Selamat Datang!</h1>
 <p class="text-sm text-slate-500 max-w-xs welcome-slide-up-delay">Profilmu sudah tersimpan. Kami akan menyesuaikan pengalaman pendakian terbaik untukmu.</p>
 <div class="mt-6 flex gap-1.5 welcome-slide-up-delay2">
 <div class="h-1.5 w-1.5 rounded-full bg-[#023C23] animate-bounce"style="animation-delay:0s"></div>
 <div class="h-1.5 w-1.5 rounded-full bg-[#023C23] animate-bounce"style="animation-delay:0.15s"></div>
 <div class="h-1.5 w-1.5 rounded-full bg-[#023C23] animate-bounce"style="animation-delay:0.3s"></div>
 </div>
 </div>
 </div>

 <div v-if="!showWelcome"class="flex min-h-screen items-center justify-center px-6 py-8">

 <div class="w-full max-w-lg">
 
 <NuxtLink to="/"class="mb-6 flex items-center gap-3">
 <img src="~/assets/images/logo_.svg" alt="KakiDaki" class="h-9 w-9"/>
 <span class="text-xl font-medium text-slate-800">Kaki Daki</span>
 </NuxtLink>

 
 <div class="flex items-center gap-2 mb-6">
 <div
 v-for="s in totalSteps"
 :key="s"
 class="h-1.5 rounded-full transition-all duration-300"
 :class="s <= currentStep ? 'bg-[#023C23] w-8' : 'bg-slate-200 w-5'"
 ></div>
 <span class="ml-auto text-xs text-slate-400">{{ currentStep }} / {{ totalSteps }}</span>
 </div>

 
 <div>

 
 <div v-if="currentStep === 1"key="s1">
 <h1 class="font-heading text-2xl font-medium text-slate-900 mb-2">Apa jenis kelamin kamu?</h1>
 <p class="text-sm text-slate-500 mb-6">Informasi ini membantu kami merekomendasikan perlengkapan yang lebih sesuai.</p>

 <div class="grid grid-cols-2 gap-4">
 <button
 v-for="option in genderOptions"
 :key="option.value"
 @click="form.gender = option.value; clearWarn()"
 class="relative flex flex-col items-start gap-3 rounded-xl border-2 p-5 text-left transition-all"
 :class="form.gender === option.value
 ? 'border-[#023C23] bg-[#023C23]/5'
 : 'border-slate-200 bg-white hover:border-slate-300'"
 >
 <div
 v-if="form.gender === option.value"
 class="absolute top-3 right-3 h-5 w-5 rounded-full bg-[#023C23] flex items-center justify-center"
 >
 <svg class="h-3 w-3 text-white"fill="none"viewBox="0 0 24 24"stroke="currentColor"stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
 </div>

 <div class="h-10 w-10 rounded-lg flex items-center justify-center":class="form.gender === option.value ? 'bg-[#023C23]/10' : 'bg-slate-100'">
 <span v-html="option.icon"class="h-5 w-5":class="form.gender === option.value ? 'text-[#023C23]' : 'text-slate-500'"></span>
 </div>
 <div>
 <span class="text-sm font-medium text-slate-800 block">{{ option.label }}</span>
 <span class="text-xs text-slate-400 mt-0.5 block">{{ option.desc }}</span>
 </div>
 </button>
 </div>

 
 <p v-if="warning"class="mt-3 flex items-center gap-1.5 text-xs text-red-500">
 <svg xmlns="http://www.w3.org/2000/svg"class="h-3.5 w-3.5 shrink-0"viewBox="0 0 24 24"fill="none"stroke="currentColor"stroke-width="2.5"stroke-linecap="round"stroke-linejoin="round"><circle cx="12"cy="12"r="10"/><line x1="12"y1="8"x2="12"y2="12"/><line x1="12"y1="16"x2="12.01"y2="16"/></svg>
 {{ warning }}
 </p>
 </div>

 
 <div v-else-if="currentStep === 2"key="s2">
 <h1 class="font-heading text-2xl font-medium text-slate-900 mb-2">Data fisik kamu</h1>
 <p class="text-sm text-slate-500 mb-6">Kami gunakan untuk menghitung kebutuhan kalori dan beban ideal carrier.</p>

 <div class="space-y-5">
 <div>
 <label class="mb-1.5 block text-sm font-medium text-slate-700">Tinggi Badan</label>
 <div class="relative">
 <input
 v-model="form.height"
 type="number"
 placeholder="Contoh: 170"
 @input="clearWarn()"
 class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-14 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[#023C23] focus:outline-none focus:ring-2 focus:ring-[#023C23]/20"
 />
 <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">cm</span>
 </div>
 </div>

 <div>
 <label class="mb-1.5 block text-sm font-medium text-slate-700">Berat Badan</label>
 <div class="relative">
 <input
 v-model="form.weight"
 type="number"
 placeholder="Contoh: 65"
 @input="clearWarn()"
 class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-14 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[#023C23] focus:outline-none focus:ring-2 focus:ring-[#023C23]/20"
 />
 <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">kg</span>
 </div>
 </div>

 <div v-if="bmi"class="rounded-xl bg-slate-50 p-4 flex items-center gap-3">
 <div class="h-9 w-9 rounded-lg flex items-center justify-center":class="bmiColor.bg">
 <svg xmlns="http://www.w3.org/2000/svg"class="h-4 w-4":class="bmiColor.text"viewBox="0 0 24 24"fill="none"stroke="currentColor"stroke-width="2"><path d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-10 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C1.118 12.87 5.477 9.246 10 8c2.656-.73 5.289-.529 7.551.454"/><path d="M15 15c-1.673 0-3-.385-3-1"/></svg>
 </div>
 <div>
 <p class="text-sm font-medium text-slate-700">BMI: {{ bmi }}</p>
 <p class="text-xs text-slate-400">{{ bmiLabel }}</p>
 </div>
 </div>
 </div>

 <p v-if="warning"class="mt-3 flex items-center gap-1.5 text-xs text-red-500">
 <svg xmlns="http://www.w3.org/2000/svg"class="h-3.5 w-3.5 shrink-0"viewBox="0 0 24 24"fill="none"stroke="currentColor"stroke-width="2.5"stroke-linecap="round"stroke-linejoin="round"><circle cx="12"cy="12"r="10"/><line x1="12"y1="8"x2="12"y2="12"/><line x1="12"y1="16"x2="12.01"y2="16"/></svg>
 {{ warning }}
 </p>
 </div>

 
 <div v-else-if="currentStep === 3"key="s3">
 <h1 class="font-heading text-2xl font-medium text-slate-900 mb-2">Riwayat penyakit</h1>
 <p class="text-sm text-slate-500 mb-6">Pilih kondisi yang pernah atau sedang kamu alami. Bisa pilih lebih dari satu.</p>

 <div class="grid grid-cols-2 gap-3">
 <button
 v-for="d in diseaseOptions"
 :key="d.value"
 @click="toggleMulti('diseases', d.value); clearWarn()"
 class="relative flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all"
 :class="form.diseases.includes(d.value)
 ? 'border-[#023C23] bg-[#023C23]/5'
 : 'border-slate-200 bg-white hover:border-slate-300'"
 >
 <div
 class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[1.5px] transition-all"
 :class="form.diseases.includes(d.value) ? 'border-[#023C23] bg-[#023C23] text-white' : 'border-slate-300 bg-white'"
 >
 <svg v-if="form.diseases.includes(d.value)"class="h-3 w-3"fill="none"viewBox="0 0 24 24"stroke="currentColor"stroke-width="4"><polyline points="20 6 9 17 4 12"/></svg>
 </div>
 <div>
 <span class="text-sm font-medium text-slate-700 block">{{ d.label }}</span>
 <span v-if="d.desc"class="text-xs text-slate-400 mt-0.5 block">{{ d.desc }}</span>
 </div>
 </button>
 </div>

 <div class="mt-5">
 <label class="mb-1.5 block text-sm font-medium text-slate-700">Lainnya</label>
 <input
 v-model="form.diseasesOther"
 type="text"
 placeholder="Pisahkan dengan koma, misal: vertigo, migrain"
 @input="clearWarn()"
 class="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[#023C23] focus:outline-none focus:ring-2 focus:ring-[#023C23]/20"
 />
 <p class="mt-1.5 text-xs text-slate-400">Tulis kondisi lain yang tidak ada di atas.</p>
 </div>

 <p v-if="warning"class="mt-3 flex items-center gap-1.5 text-xs text-red-500">
 <svg xmlns="http://www.w3.org/2000/svg"class="h-3.5 w-3.5 shrink-0"viewBox="0 0 24 24"fill="none"stroke="currentColor"stroke-width="2.5"stroke-linecap="round"stroke-linejoin="round"><circle cx="12"cy="12"r="10"/><line x1="12"y1="8"x2="12"y2="12"/><line x1="12"y1="16"x2="12.01"y2="16"/></svg>
 {{ warning }}
 </p>
 </div>

 
 <div v-else-if="currentStep === 4"key="s4">
 <h1 class="font-heading text-2xl font-medium text-slate-900 mb-2">Riwayat cedera fisik</h1>
 <p class="text-sm text-slate-500 mb-6">Cedera sebelumnya bisa mempengaruhi rute dan durasi pendakian yang kami rekomendasikan.</p>

 <div class="grid grid-cols-2 gap-3">
 <button
 v-for="inj in injuryOptions"
 :key="inj.value"
 @click="toggleMulti('injuries', inj.value); clearWarn()"
 class="relative flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all"
 :class="form.injuries.includes(inj.value)
 ? 'border-[#023C23] bg-[#023C23]/5'
 : 'border-slate-200 bg-white hover:border-slate-300'"
 >
 <div
 class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[1.5px] transition-all"
 :class="form.injuries.includes(inj.value) ? 'border-[#023C23] bg-[#023C23] text-white' : 'border-slate-300 bg-white'"
 >
 <svg v-if="form.injuries.includes(inj.value)"class="h-3 w-3"fill="none"viewBox="0 0 24 24"stroke="currentColor"stroke-width="4"><polyline points="20 6 9 17 4 12"/></svg>
 </div>
 <div>
 <span class="text-sm font-medium text-slate-700 block">{{ inj.label }}</span>
 <span v-if="inj.desc"class="text-xs text-slate-400 mt-0.5 block">{{ inj.desc }}</span>
 </div>
 </button>
 </div>

 <div class="mt-5">
 <label class="mb-1.5 block text-sm font-medium text-slate-700">Lainnya</label>
 <input
 v-model="form.injuriesOther"
 type="text"
 placeholder="Pisahkan dengan koma, misal: keseleo pergelangan, retak tulang"
 @input="clearWarn()"
 class="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[#023C23] focus:outline-none focus:ring-2 focus:ring-[#023C23]/20"
 />
 <p class="mt-1.5 text-xs text-slate-400">Tulis cedera lain yang tidak ada di atas.</p>
 </div>

 <p v-if="warning"class="mt-3 flex items-center gap-1.5 text-xs text-red-500">
 <svg xmlns="http://www.w3.org/2000/svg"class="h-3.5 w-3.5 shrink-0"viewBox="0 0 24 24"fill="none"stroke="currentColor"stroke-width="2.5"stroke-linecap="round"stroke-linejoin="round"><circle cx="12"cy="12"r="10"/><line x1="12"y1="8"x2="12"y2="12"/><line x1="12"y1="16"x2="12.01"y2="16"/></svg>
 {{ warning }}
 </p>
 </div>

 
 <div v-else-if="currentStep === 5"key="s5">
 <h1 class="font-heading text-2xl font-medium text-slate-900 mb-2">Alergi cuaca & obat</h1>
 <p class="text-sm text-slate-500 mb-6">Agar kami bisa menyesuaikan rekomendasi obat P3K dan peringatan cuaca untukmu.</p>

 <div class="grid grid-cols-2 gap-3">
 <button
 v-for="al in allergyOptions"
 :key="al.value"
 @click="toggleMulti('allergies', al.value); clearWarn()"
 class="relative flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all"
 :class="form.allergies.includes(al.value)
 ? 'border-[#023C23] bg-[#023C23]/5'
 : 'border-slate-200 bg-white hover:border-slate-300'"
 >
 <div
 class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[1.5px] transition-all"
 :class="form.allergies.includes(al.value) ? 'border-[#023C23] bg-[#023C23] text-white' : 'border-slate-300 bg-white'"
 >
 <svg v-if="form.allergies.includes(al.value)"class="h-3 w-3"fill="none"viewBox="0 0 24 24"stroke="currentColor"stroke-width="4"><polyline points="20 6 9 17 4 12"/></svg>
 </div>
 <div>
 <span class="text-sm font-medium text-slate-700 block">{{ al.label }}</span>
 <span v-if="al.desc"class="text-xs text-slate-400 mt-0.5 block">{{ al.desc }}</span>
 </div>
 </button>
 </div>

 <div class="mt-5">
 <label class="mb-1.5 block text-sm font-medium text-slate-700">Lainnya</label>
 <input
 v-model="form.allergiesOther"
 type="text"
 placeholder="Pisahkan dengan koma, misal: alergi debu, ibuprofen"
 @input="clearWarn()"
 class="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[#023C23] focus:outline-none focus:ring-2 focus:ring-[#023C23]/20"
 />
 <p class="mt-1.5 text-xs text-slate-400">Tulis alergi lain yang tidak ada di atas.</p>
 </div>

 <p v-if="warning"class="mt-3 flex items-center gap-1.5 text-xs text-red-500">
 <svg xmlns="http://www.w3.org/2000/svg"class="h-3.5 w-3.5 shrink-0"viewBox="0 0 24 24"fill="none"stroke="currentColor"stroke-width="2.5"stroke-linecap="round"stroke-linejoin="round"><circle cx="12"cy="12"r="10"/><line x1="12"y1="8"x2="12"y2="12"/><line x1="12"y1="16"x2="12.01"y2="16"/></svg>
 {{ warning }}
 </p>
 </div>

  
  <div v-else-if="currentStep === 6"key="s6">
  <h1 class="font-heading text-2xl font-medium text-slate-900 mb-2">Hubungkan Google Fit</h1>
  <p class="text-sm text-slate-500 mb-6">Sinkronkan data aktivitas fisikmu untuk analisis kebugaran yang lebih akurat.</p>

  <div class="flex flex-col items-center text-center py-8">
  <div class="h-20 w-20 rounded-2xl bg-[#ea4335]/10 flex items-center justify-center mb-6">
  <svg class="h-10 w-10 text-[#ea4335]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
  </div>

  <h3 class="text-lg font-medium text-slate-800 mb-2">Google Fit</h3>
  <p class="text-sm text-slate-500 max-w-xs mb-6">Dengan menghubungkan Google Fit, kami bisa menganalisis riwayat aktivitas dan tingkat kebugaranmu secara otomatis.</p>

  <button
  v-if="!googleFitStore.isConnected"
  @click="handleConnectGoogleFit"
  :disabled="isLoading"
  class="inline-flex items-center gap-2 rounded-xl bg-[#ea4335] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#d62d20] active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed"
  >
  <svg v-if="isLoading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
  <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
  Hubungkan Google Fit
  </button>
  <div v-else class="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-6 py-3 text-sm font-medium text-[#023C23]">
  <svg class="h-4 w-4"fill="none"viewBox="0 0 24 24"stroke="currentColor"stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
  Terhubung
  </div>
  </div>
  </div>
 </div>

 
 <div class="mt-6 flex items-center justify-between">
 <div>
 <button
 v-if="currentStep > 1"
 @click="currentStep--; clearWarn()"
 class="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
 >
 <svg class="h-4 w-4"fill="none"viewBox="0 0 24 24"stroke="currentColor"stroke-width="2"><path stroke-linecap="round"stroke-linejoin="round"d="M15 19l-7-7 7-7"/></svg>
 Kembali
 </button>
 </div>

 <div class="flex items-center gap-3">
 <NuxtLink
 to="/"
 class="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
 >
 Lewati semua
 </NuxtLink>

 
 <button
 v-if="currentStep < totalSteps"
 @click="tryNext()"
 :disabled="isLoading"
 class="rounded-xl bg-[#023C23] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
 >
 <svg v-if="isLoading"class="animate-spin h-4 w-4 text-white"xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="0 0 24 24"><circle class="opacity-25"cx="12"cy="12"r="10"stroke="currentColor"stroke-width="4"></circle><path class="opacity-75"fill="currentColor"d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
 {{ isLoading ? 'Menyimpan...' : 'Lanjutkan' }}
 </button>
 <button
 v-else
 @click="handleFinish()"
 :disabled="isLoading"
 class="rounded-xl bg-[#023C23] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
 >
 <svg v-if="isLoading"class="animate-spin h-4 w-4 text-white"xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="0 0 24 24"><circle class="opacity-25"cx="12"cy="12"r="10"stroke="currentColor"stroke-width="4"></circle><path class="opacity-75"fill="currentColor"d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
 {{ isLoading ? 'Menyimpan...' : 'Selesai' }}
 </button>
 </div>
 </div>

 
 <div class="mt-6 text-center text-xs text-slate-400">
 &copy; {{ new Date().getFullYear() }} Kaki Daki. All rights reserved.
 </div>
 </div>

 </div>
 </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

definePageMeta({
 layout: false,
})

const router = useRouter()
const currentStep = ref(1)
const totalSteps = 6
const warning = ref('')
const isLoading = ref(false)
const showWelcome = ref(false)

const form = ref({

  gender: '',
  height: '',
  weight: '',
  diseases: [],
  diseasesOther: '',
  injuries: [],
  injuriesOther: '',
  allergies: [],
  allergiesOther: '',
  googleFitConnected: false,
})

const clearWarn = () => { warning.value = '' }

const isStepValid = () => {
 switch (currentStep.value) {
 case 1:
 if (!form.value.gender) { warning.value = 'Pilih jenis kelamin terlebih dahulu.'; return false }
 break
 case 2:
 if (!form.value.height || !form.value.weight) { warning.value = 'Isi tinggi dan berat badan terlebih dahulu.'; return false }
 break
 case 3:
 if (form.value.diseases.length === 0 && !form.value.diseasesOther.trim()) { warning.value = 'Pilih minimal satu riwayat penyakit atau isi kolom lainnya.'; return false }
 break
 case 4:
 if (form.value.injuries.length === 0 && !form.value.injuriesOther.trim()) { warning.value = 'Pilih minimal satu riwayat cedera atau isi kolom lainnya.'; return false }
 break
 case 5:
 if (form.value.allergies.length === 0 && !form.value.allergiesOther.trim()) { warning.value = 'Pilih minimal satu alergi atau isi kolom lainnya.'; return false }
 break
 }
 return true
}

const tryNext = () => {
 if (!isStepValid()) return

 warning.value = ''
 isLoading.value = true

 setTimeout(() => {
 isLoading.value = false
 currentStep.value++
 }, 600)
}

const assessmentStore = useAssessmentStore()
const googleFitStore = useGoogleFitStore()

onMounted(async () => {
  if (authStore.user?.role?.toUpperCase() === 'ADMIN') {
    navigateTo('/admin/gunung')
    return
  }
  await googleFitStore.fetchTrainingLogs()
})

const buildAssessmentPayload = () => {
  const parts = []

  if (form.value.diseases.length > 0 || form.value.diseasesOther) {
    const list = [...form.value.diseases]
    if (form.value.diseasesOther.trim()) list.push(form.value.diseasesOther.trim())
    parts.push(`Riwayat penyakit: ${list.join(', ')}.`)
  } else {
    parts.push('Tidak ada riwayat penyakit.')
  }

  if (form.value.injuries.length > 0 || form.value.injuriesOther) {
    const list = [...form.value.injuries]
    if (form.value.injuriesOther.trim()) list.push(form.value.injuriesOther.trim())
    parts.push(`Riwayat cedera: ${list.join(', ')}.`)
  } else {
    parts.push('Tidak ada riwayat cedera.')
  }

  if (form.value.allergies.length > 0 || form.value.allergiesOther) {
    const list = [...form.value.allergies]
    if (form.value.allergiesOther.trim()) list.push(form.value.allergiesOther.trim())
    parts.push(`Riwayat alergi: ${list.join(', ')}.`)
  } else {
    parts.push('Tidak ada riwayat alergi.')
  }

  const medicalHistory = parts.join(' ')

  return {
    heightCm: parseInt(form.value.height),
    weightKg: parseInt(form.value.weight),
    gender: (form.value.gender || '').toUpperCase(),
    medicalHistory: medicalHistory,
  }
}

const handleFinish = async () => {
  warning.value = ''
  isLoading.value = true

  const payload = buildAssessmentPayload()
  const result = await assessmentStore.submitAssessment(payload)

  isLoading.value = false
  if (result.success) {
    showWelcome.value = true
    setTimeout(() => {
      router.push('/dashboard')
    }, 2500)
  } else {
    warning.value = result.message || 'Gagal menyimpan data onboarding. Silakan coba lagi.'
  }
}

const handleConnectGoogleFit = async () => {
  warning.value = ''
  isLoading.value = true

  const payload = buildAssessmentPayload()
  const result = await assessmentStore.submitAssessment(payload)

  if (result.success) {
    const fitResult = await googleFitStore.getConnectUrl()
    isLoading.value = false
    
    if (fitResult.success && fitResult.url) {
      window.location.href = fitResult.url
    } else {
      warning.value = fitResult.message || 'Gagal menghubungkan dengan Google Fit, tetapi profil Anda telah berhasil disimpan.'
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
    }
  } else {
    isLoading.value = false
    warning.value = result.message || 'Gagal menyimpan data onboarding. Silakan coba lagi.'
  }
}

const toggleMulti = (field, value) => {
 const idx = form.value[field].indexOf(value)
 if (idx === -1) {
 form.value[field].push(value)
 } else {
 form.value[field].splice(idx, 1)
 }
}

const bmi = computed(() => {
 const h = parseFloat(form.value.height)
 const w = parseFloat(form.value.weight)
 if (!h || !w || h <= 0) return null
 return (w / ((h / 100) ** 2)).toFixed(1)
})
const bmiLabel = computed(() => {
 const v = parseFloat(bmi.value)
 if (!v) return ''
 if (v < 18.5) return 'Berat badan kurang'
 if (v < 25) return 'Berat badan normal'
 if (v < 30) return 'Berat badan berlebih'
 return 'Obesitas'
})
const bmiColor = computed(() => {
 const v = parseFloat(bmi.value)
 if (!v) return { bg: 'bg-slate-100', text: 'text-slate-500' }
 if (v < 18.5) return { bg: 'bg-amber-100', text: 'text-amber-600' }
 if (v < 25) return { bg: 'bg-emerald-100', text: 'text-emerald-600' }
 if (v < 30) return { bg: 'bg-amber-100', text: 'text-amber-600' }
 return { bg: 'bg-red-100', text: 'text-red-600' }
})

const genderOptions = [
 {
 value: 'male',
 label: 'Laki-laki',
 desc: 'Pria / Male',
 icon: '<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"><circle cx="10"cy="14"r="5"/><path d="M19 5l-4.36 4.36"/><path d="M15 5h4v4"/></svg>',
 },
 {
 value: 'female',
 label: 'Perempuan',
 desc: 'Wanita / Female',
 icon: '<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"><circle cx="12"cy="8"r="5"/><path d="M12 13v8"/><path d="M9 18h6"/></svg>',
 },
]

const diseaseOptions = [
 { value: 'asma', label: 'Asma', desc: 'Gangguan pernapasan' },
 { value: 'jantung', label: 'Penyakit Jantung', desc: 'Riwayat gangguan jantung' },
 { value: 'diabetes', label: 'Diabetes', desc: 'Gula darah tinggi' },
 { value: 'hipertensi', label: 'Hipertensi', desc: 'Tekanan darah tinggi' },
 { value: 'epilepsi', label: 'Epilepsi', desc: 'Gangguan saraf' },
 { value: 'maag', label: 'Maag Kronis', desc: 'Gangguan lambung' },
]

const injuryOptions = [
 { value: 'lutut', label: 'Cedera Lutut', desc: 'ACL, meniskus, dll.' },
 { value: 'punggung', label: 'Cedera Punggung', desc: 'Hernia, saraf terjepit' },
 { value: 'pergelangan', label: 'Pergelangan Kaki', desc: 'Keseleo berulang' },
 { value: 'bahu', label: 'Cedera Bahu', desc: 'Dislokasi, rotator cuff' },
 { value: 'patah_tulang', label: 'Patah Tulang', desc: 'Riwayat fraktur' },
 { value: 'tidak_ada', label: 'Tidak Ada', desc: 'Tidak pernah cedera' },
]

const allergyOptions = [
 { value: 'dingin', label: 'Alergi Dingin', desc: 'Urtikaria saat suhu rendah' },
 { value: 'matahari', label: 'Alergi Matahari', desc: 'Fotosensitivitas' },
 { value: 'paracetamol', label: 'Paracetamol', desc: 'Obat pereda nyeri' },
 { value: 'ibuprofen', label: 'Ibuprofen', desc: 'Anti-inflamasi' },
 { value: 'antibiotik', label: 'Antibiotik', desc: 'Amoxicillin, dll.' },
 { value: 'tidak_ada', label: 'Tidak Ada', desc: 'Tidak punya alergi' },
]
</script>

<style>

@keyframes welcomeFadeIn {
 from { opacity: 0; }
 to { opacity: 1; }
}
@keyframes welcomeBounce {
 0% { transform: scale(0); opacity: 0; }
 50% { transform: scale(1.15); }
 100% { transform: scale(1); opacity: 1; }
}
@keyframes welcomeSlideUp {
 from { opacity: 0; transform: translateY(16px); }
 to { opacity: 1; transform: translateY(0); }
}

.welcome-fade-in {
 animation: welcomeFadeIn 0.4s ease-out;
}
.welcome-bounce {
 animation: welcomeBounce 0.5s ease-out 0.1s both;
}
.welcome-slide-up {
 animation: welcomeSlideUp 0.4s ease-out 0.3s both;
}
.welcome-slide-up-delay {
 animation: welcomeSlideUp 0.4s ease-out 0.5s both;
}
.welcome-slide-up-delay2 {
 animation: welcomeSlideUp 0.4s ease-out 0.7s both;
}
</style>
