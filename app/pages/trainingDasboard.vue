<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useExpeditionStore } from '~/stores/expedition'
import { useProfileStore } from '~/stores/profile'
import { useGoogleFitStore } from '~/stores/googleFit'

definePageMeta({
  layout: false,
})

const authStore = useAuthStore()
const expeditionStore = useExpeditionStore()
const profileStore = useProfileStore()
const googleFitStore = useGoogleFitStore()

const isLoading = ref(true)
const errorMessage = ref('')
const isGoogleFitLoading = ref(false)
const googleFitError = ref('')
const googleFitSuccess = ref('')

const activeExpedition = computed(() => expeditionStore.expeditions[0] || null)
const details = computed(() => expeditionStore.activeExpeditionDetails || null)
const trainingPlan = computed(() => details.value?.trainingPlan || null)
const tasks = computed(() => trainingPlan.value?.tasks || [])
const user = computed(() => profileStore.user || {})

onMounted(async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  await profileStore.fetchProfile()
  await expeditionStore.fetchMountains()
  await googleFitStore.fetchTrainingLogs()
  
  const expRes = await expeditionStore.fetchExpeditions()
  if (!expRes.success) {
    errorMessage.value = expRes.message || 'Gagal memuat data ekspedisi.'
    isLoading.value = false
    return
  }
  
  if (expeditionStore.expeditions.length > 0) {
    const activeId = expeditionStore.expeditions[0].id || expeditionStore.expeditions[0]._id
    const detailRes = await expeditionStore.fetchExpeditionById(activeId)
    if (!detailRes.success) {
      errorMessage.value = detailRes.message || 'Gagal memuat detail latihan ekspedisi.'
    }
  }
  
  isLoading.value = false
})

const mountainName = computed(() => {
  if (!activeExpedition.value) return 'Expedition'
  const targetMountain = expeditionStore.mountains.find(
    m => m.id === activeExpedition.value.mountainId || m._id === activeExpedition.value.mountainId
  )
  return targetMountain ? targetMountain.name : 'Gunung Tujuan'
})

const score = computed(() => {
  return details.value?.readinessScore || 0
})

const dashoffset = computed(() => {
  // circumference is 2 * Math.PI * 38 = 238.76
  return 238.76 * (1 - score.value / 100)
})

const readinessPercent = computed(() => {
  return score.value
})

const physicalStatus = computed(() => {
  const s = score.value
  if (s < 60) return 'Needs Work'
  if (s < 80) return 'Moderate'
  if (s < 95) return 'Good'
  return 'Excellent'
})

const completedTasks = computed(() => {
  return tasks.value.filter(t => t.isCompleted)
})

const verticalStamina = computed(() => {
  return completedTasks.value.reduce((sum, t) => sum + (t.targetElevationM || 0), 0)
})

const totalTargetElevation = computed(() => {
  return tasks.value.reduce((sum, t) => sum + (t.targetElevationM || 0), 0)
})

const verticalStaminaPercent = computed(() => {
  if (totalTargetElevation.value === 0) return 0
  return (verticalStamina.value / totalTargetElevation.value) * 100
})

const enduranceVolume = computed(() => {
  return completedTasks.value.reduce((sum, t) => sum + (t.targetDistanceKm || 0), 0)
})

const totalTargetDistance = computed(() => {
  return tasks.value.reduce((sum, t) => sum + (t.targetDistanceKm || 0), 0)
})

const enduranceVolumePercent = computed(() => {
  if (totalTargetDistance.value === 0) return 0
  return (enduranceVolume.value / totalTargetDistance.value) * 100
})

const consistency = computed(() => {
  if (tasks.value.length === 0) return 0
  return Math.round((completedTasks.value.length / tasks.value.length) * 100)
})

const completedCount = computed(() => completedTasks.value.length)
const totalCount = computed(() => tasks.value.length)

const checklistProgressText = computed(() => {
  const completed = completedCount.value
  const total = totalCount.value
  if (total === 0) return 'Belum Ada Tugas'
  if (completed === total) return 'Selesai'
  if (completed > 0) return `Belum Selesai (${completed}/${total})`
  return 'Belum Dikerjakan'
})

const checklistProgressClass = computed(() => {
  const completed = completedCount.value
  const total = totalCount.value
  if (total === 0) return 'bg-slate-100 text-slate-500'
  if (completed === total) return 'bg-green-100 text-[#118c13]'
  if (completed > 0) return 'bg-amber-100 text-amber-700'
  return 'bg-slate-100 text-slate-500'
})

const toggleTaskStatus = (task) => {
  task.isCompleted = !task.isCompleted
}

const handleGoogleFitAction = async () => {
  googleFitError.value = ''
  googleFitSuccess.value = ''
  
  if (!googleFitStore.isConnected) {
    isGoogleFitLoading.value = true
    const result = await googleFitStore.getConnectUrl()
    isGoogleFitLoading.value = false
    if (result.success && result.url) {
      window.location.href = result.url
    } else {
      googleFitError.value = result.message || 'Gagal mengambil URL koneksi Google Fit.'
    }
  } else {
    isGoogleFitLoading.value = true
    const result = await googleFitStore.syncData()
    if (result.success) {
      await googleFitStore.fetchTrainingLogs()
      isGoogleFitLoading.value = false
      googleFitSuccess.value = 'Data Google Fit berhasil disinkronisasi!'
      setTimeout(() => {
        googleFitSuccess.value = ''
      }, 4000)
    } else {
      isGoogleFitLoading.value = false
      googleFitError.value = result.message || 'Gagal menyinkronkan data Google Fit.'
    }
  }
}
</script>

<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
    <!-- Sidebar -->
    <Sidebar active="training"/>

    <!-- Main Content Area -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 flex flex-col justify-between">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex-1 flex flex-col items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-[#023C23] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-sm text-slate-500 font-medium">Memuat rencana pelatihan...</p>
      </div>

      <!-- No Active Expedition State -->
      <div v-else-if="!activeExpedition" class="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center px-4">
        <div class="h-16 w-16 rounded-2xl bg-emerald-50 text-[#023C23] flex items-center justify-center mb-6">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/>
          </svg>
        </div>
        <h2 class="text-xl font-heading font-medium text-slate-900 mb-2">Belum Ada Rencana Pelatihan</h2>
        <p class="text-sm text-slate-500 mb-6 leading-relaxed">
          Silakan mulai penilaian (Start Assessment) di halaman beranda terlebih dahulu untuk membuat ekspedisi baru dan menghasilkan program pelatihan biomekanik dari AI Coach.
        </p>
        <NuxtLink to="/" class="px-6 py-2.5 bg-[#023C23] hover:bg-emerald-700 text-white rounded-full text-sm font-semibold transition-all shadow-sm">
          Kembali ke Beranda
        </NuxtLink>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center px-4">
        <div class="h-16 w-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h2 class="text-xl font-heading font-medium text-slate-900 mb-2">Gagal Memuat Pelatihan</h2>
        <p class="text-sm text-slate-500 mb-6">{{ errorMessage }}</p>
      </div>

      <!-- Main Training Dashboard Content -->
      <div v-else class="w-full max-w-[1600px] mx-auto space-y-6">
        <!-- Header Section -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 class="text-2xl font-heading font-medium text-slate-900">Expedition Training Planner</h1>
            <p class="text-sm text-slate-500 mt-1">Preparing for Mt. {{ mountainName }} Summit Expedition</p>
          </div>
          <div class="flex flex-col items-end gap-1.5">
            <button 
              @click="handleGoogleFitAction"
              :disabled="isGoogleFitLoading"
              class="border border-slate-200 rounded-full px-5 py-2.5 text-xs font-medium text-slate-700 bg-white shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors active:scale-95 disabled:opacity-50"
            >
              <svg v-if="isGoogleFitLoading" class="animate-spin h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <svg v-else class="w-4 h-4 text-[#ea4335]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              {{ googleFitStore.isConnected ? 'Sync Google Fit' : 'Hubungkan Google Fit' }}
            </button>
            <div v-if="googleFitStore.isConnected" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[#118c13] text-[10px] font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-[#118c13]"></span>
              Sudah Tersambung
            </div>
            <div v-else class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#b81212] text-[10px] font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-[#b81212]"></span>
              Belum Tersambung
            </div>
            <span v-if="googleFitSuccess" class="text-xs text-[#118c13] font-medium flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {{ googleFitSuccess }}
            </span>
            <span v-if="googleFitError" class="text-xs text-danger font-medium flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {{ googleFitError }}
            </span>
          </div>
        </div>

        <!-- BENTO GRID -->
        <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 auto-rows-max">
          
          <!-- 1. HERO CARD / AI COACH (Spans 2 cols, 2 rows in XL) -->
          <div class="md:col-span-2 xl:col-span-2 xl:row-span-2 bg-[#023C23] rounded-[2.5rem] p-8 shadow-md relative overflow-hidden flex flex-col justify-between text-white border border-slate-200/40">
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            
            <div class="relative z-10 flex-1 flex flex-col justify-between space-y-8">
              <!-- Narrative -->
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"/>
                  </svg>
                  <h3 class="font-heading font-medium text-white text-lg">AI Coach Narrative</h3>
                </div>
                <p class="text-sm font-medium leading-relaxed text-slate-200 max-w-[90%]">
                  {{ trainingPlan?.summary || 'Rencana latihan Anda sedang diproses oleh AI Coach.' }}
                </p>
                <div class="mt-4">
                  <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Target: Pendakian Mt. {{ mountainName }}
                  </span>
                </div>
              </div>

              <!-- Readiness Progress Bars -->
              <div class="space-y-4 bg-black/20 backdrop-blur-md rounded-3xl p-5 border border-white/10">
                <h4 class="font-heading font-medium text-white text-sm mb-3">Expedition Readiness</h4>
                <!-- Vertical Stamina -->
                <div>
                  <div class="flex justify-between items-center text-xs font-medium text-slate-300 mb-1.5">
                    <span>Vertical Stamina</span>
                    <span>{{ verticalStamina.toLocaleString('en-US') }}m / {{ totalTargetElevation.toLocaleString('en-US') }}m</span>
                  </div>
                  <div class="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-emerald-400 h-full rounded-full transition-all duration-500" :style="{ width: verticalStaminaPercent + '%' }"></div>
                  </div>
                </div>
                <!-- Endurance Volume -->
                <div>
                  <div class="flex justify-between items-center text-xs font-medium text-slate-300 mb-1.5">
                    <span>Endurance Volume</span>
                    <span>{{ enduranceVolume.toFixed(1) }}km / {{ totalTargetDistance.toFixed(1) }}km</span>
                  </div>
                  <div class="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-sky-400 h-full rounded-full transition-all duration-500" :style="{ width: enduranceVolumePercent + '%' }"></div>
                  </div>
                </div>
                <!-- Consistency -->
                <div>
                  <div class="flex justify-between items-center text-xs font-medium text-slate-300 mb-1.5">
                    <span>Training Plan Progress</span>
                    <span>{{ consistency }}% Completed</span>
                  </div>
                  <div class="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-amber-400 h-full rounded-full transition-all duration-500" :style="{ width: consistency + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. PHYSICAL VALIDATION SCORE (Spans 1 col, 2 rows in XL) -->
          <div class="xl:col-span-1 xl:row-span-2 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-200/40 relative overflow-hidden flex flex-col">
            <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
            
            <div class="relative z-10 flex-1 flex flex-col">
              <h3 class="font-heading font-medium text-slate-800 text-lg">Validation Score</h3>
              <p class="text-xs text-slate-400 mt-0.5">Physical altitude readiness</p>

              <!-- Radial Progress -->
              <div class="flex items-center justify-center my-6 flex-1">
                <div class="relative w-48 h-48 flex items-center justify-center">
                  <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle class="text-slate-100" stroke-width="8" stroke="currentColor" fill="transparent" r="38" cx="50" cy="50"/>
                    <circle class="text-[#118c13] transition-all duration-500 ease-out" stroke-width="8" stroke-dasharray="238.76" :stroke-dashoffset="dashoffset" stroke-linecap="round" stroke="currentColor" fill="transparent" r="38" cx="50" cy="50"/>
                  </svg>
                  <div class="absolute text-center flex flex-col items-center">
                    <span class="text-5xl font-heading font-medium text-slate-800 leading-none">{{ score }}</span>
                    <span class="text-xs font-medium text-slate-400 mt-1">OF 100</span>
                  </div>
                </div>
              </div>

              <!-- Status Text -->
              <div class="mt-auto bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <h4 class="text-sm font-medium text-slate-900 flex justify-between items-center">
                  Status 
                  <span class="text-xs font-medium text-[#118c13] bg-emerald-50 px-2 py-1 rounded-lg">{{ physicalStatus }}</span>
                </h4>
                <p class="text-xs text-slate-500 leading-relaxed mt-2">"You are {{ readinessPercent }}% ready for high-altitude endurance requirements."</p>
              </div>
            </div>
          </div>

          <!-- 3. DISTANCE & FREQUENCY (Spans 1 col, 1 row) -->
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 flex flex-col justify-between">
            <div class="flex justify-between items-start mb-4">
              <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#118c13]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
              </div>
            </div>
            <div>
              <span class="text-xs font-medium text-slate-400 block">Completed Distance</span>
              <span class="text-3xl font-heading font-medium text-slate-900 mt-1 block">{{ enduranceVolume.toFixed(1) }} <span class="text-sm font-medium text-slate-500 font-sans">km</span></span>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span class="text-xs font-medium text-slate-400">Target</span>
              <span class="text-sm font-medium text-slate-800">{{ totalTargetDistance.toFixed(1) }} <span class="text-[10px] text-slate-400">km</span></span>
            </div>
          </div>

          <!-- 4. ELEVATION GAIN (Spans 1 col, 1 row) -->
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 flex flex-col justify-between">
            <div class="flex justify-between items-start mb-4">
              <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 20l7-12 5 8 2-3 4 7H3z"/>
                </svg>
              </div>
            </div>
            <div>
              <span class="text-xs font-medium text-slate-400 block">Completed Elevation</span>
              <span class="text-3xl font-heading font-medium text-slate-900 mt-1 block">{{ verticalStamina.toLocaleString('en-US') }} <span class="text-sm font-medium text-slate-500 font-sans">m</span></span>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span class="text-xs font-medium text-slate-400">Target</span>
              <span class="text-sm font-medium text-slate-800">{{ totalTargetElevation.toLocaleString('en-US') }} <span class="text-[10px] text-slate-400">m</span></span>
            </div>
          </div>

          <!-- 5. WEEKLY PREPARATION CHECKLIST (Spans full width, 4 cols) -->
          <div class="xl:col-span-4 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-200/40">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div class="flex flex-wrap items-center gap-3">
                <h3 class="font-heading font-medium text-slate-800 text-lg">Weekly Checklist</h3>
                <span :class="checklistProgressClass" class="text-[10px] font-medium px-2 py-1 rounded-md transition-all duration-300">
                  {{ checklistProgressText }}
                </span>
              </div>
            </div>

            <!-- Grid Items -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div 
                v-for="task in tasks" 
                :key="task.id" 
                @click="toggleTaskStatus(task)" 
                class="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all duration-200 select-none"
                :class="task.isCompleted ? 'bg-emerald-50/50 border-[#118c13]/30 shadow-sm' : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-white'"
              >
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                    <!-- Dynamic Activity Icon -->
                    <svg v-if="task.activityType === 'RUN'" class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 5a2 2 0 11-4 0 2 2 0 014 0zM9 20h2l1-4h3m-5-4v4m3-10l-1.5 3L13 14"/>
                    </svg>
                    <svg v-else-if="task.activityType === 'HIKE' || task.activityType === 'CLIMB'" class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 21h-4v-4h-4v-4H7V9H3"/>
                    </svg>
                    <svg v-else class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M5.636 5.636a9 9 0 000 12.728m0 0l2.829-2.829m-2.829 2.829L3 21M21 3L3 21"/>
                    </svg>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 mb-0.5">
                      <span class="text-[10px] font-medium text-[#118c13] bg-emerald-50 px-1.5 py-0.5 rounded">Wajib</span>
                      <span class="text-sm font-medium text-slate-800">{{ task.activityType }} - {{ task.targetDistanceKm }}km / {{ task.targetElevationM }}m</span>
                    </div>
                    <p class="text-xs text-slate-500 font-medium">{{ task.description }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span v-if="task.isCompleted" class="bg-[#118c13] text-white text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1 shrink-0 shadow-sm">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Selesai
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <!-- Footer Component -->
      <Footer class="mt-8"/>
    </main>
  </div>
</template>
