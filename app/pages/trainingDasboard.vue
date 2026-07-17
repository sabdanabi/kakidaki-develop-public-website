<script setup>
import { ref, computed } from 'vue'

definePageMeta({
 layout: false,
})

const checklistItems = ref([
 {
 id: 1,
 type: 'wajib',
 title: '30-min Brisk Walk',
 description: 'Focus on maintaining 120-130 BPM heart rate.',
 checked: false,
 points: 10,
 icon: 'walk'
 },
 {
 id: 2,
 type: 'wajib',
 title: '15 Floors Stair Climb',
 description: 'Simulating vertical ascent with a 5kg pack.',
 checked: false,
 points: 10,
 icon: 'stair'
 },
 {
 id: 3,
 type: 'opsional',
 title: 'Core Stability Session',
 description: '15 mins of planks and mountain climbers.',
 checked: false,
 points: 4,
 icon: 'core'
 },
 {
 id: 4,
 type: 'opsional',
 title: 'Altitude Breathing Work',
 description: 'Controlled breathing exercises (Box Breathing).',
 checked: false,
 points: 4,
 icon: 'wind'
 }
])

const showMandatory = ref(true)
const showOptional = ref(true)

const toggleItem = (id) => {
 const item = checklistItems.value.find(i => i.id === id)
 if (item) {
 item.checked = !item.checked
 }
}

// Score Calculation
const score = computed(() => {
 return 72 + checklistItems.value.filter(i => i.checked).reduce((sum, item) => sum + item.points, 0)
})

const dashoffset = computed(() => {
 // circumference is 2 * Math.PI * 38 = 238.76
 return 238.76 * (1 - score.value / 100)
})

const readinessPercent = computed(() => {
 return 82 + Math.round((score.value - 72) * (18 / 28))
})

const physicalStatus = computed(() => {
 if (score.value < 80) return 'Moderate'
 if (score.value < 95) return 'Good'
 return 'Excellent'
})

// Progress Bars Calculation
const verticalStamina = computed(() => {
 return 1120 + (checklistItems.value[1].checked ? 150 : 0)
})
const verticalStaminaPercent = computed(() => {
 return (verticalStamina.value / 2500) * 100
})

const enduranceVolume = computed(() => {
 return 42.8 + (checklistItems.value[0].checked ? 3.2 : 0)
})
const enduranceVolumePercent = computed(() => {
 return (enduranceVolume.value / 50) * 100
})

const consistency = computed(() => {
 let base = 92
 if (checklistItems.value[2].checked) base += 4
 if (checklistItems.value[3].checked) base += 4
 return Math.min(base, 100)
})

const completedCount = computed(() => checklistItems.value.filter(i => i.checked).length)

const checklistProgressText = computed(() => {
 const count = completedCount.value
 if (count === 4) return 'Selesai'
 if (count > 0) return `Belum Selesai (${count}/4)`
 return 'Belum Dikerjakan'
})

const checklistProgressClass = computed(() => {
 const count = completedCount.value
  if (count === 4) return 'bg-green-100 text-[#118c13]'
  if (count > 0) return 'bg-amber-100 text-amber-700'
  return 'bg-slate-100 text-slate-500'
})

const profileStore = useProfileStore()
const googleFitStore = useGoogleFitStore()
const isGoogleFitLoading = ref(false)
const googleFitError = ref('')
const googleFitSuccess = ref('')

const user = computed(() => profileStore.user || {})

onMounted(async () => {
  await profileStore.fetchProfile()
  await googleFitStore.fetchTrainingLogs()
})

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
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 space-y-6">
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-heading font-medium text-slate-900">Expedition Training Planner</h1>
          <p class="text-sm text-slate-500 mt-1">Preparing for Mt. Whitney Summit Expedition</p>
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
                To reach the Whitney summit safely, we recommend focusing on <strong class="text-emerald-300 font-medium">steady incline walks</strong>. You're doing great with frequency, but we need to boost your vertical gain to simulate the final push.
              </p>
              <div class="mt-4">
                <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Target Readiness: 14 Days
                </span>
              </div>
            </div>

            <!-- Readiness Progress Bars -->
            <div class="space-y-4 bg-black/20 backdrop-blur-md rounded-3xl p-5 border border-white/10">
              <h4 class="font-heading font-medium text-white text-sm mb-3">Mt. Whitney Readiness</h4>
              <!-- Vertical Stamina -->
              <div>
                <div class="flex justify-between items-center text-xs font-medium text-slate-300 mb-1.5">
                  <span>Vertical Stamina</span>
                  <span>{{ verticalStamina.toLocaleString('en-US') }}m / 2,500m</span>
                </div>
                <div class="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div class="bg-emerald-400 h-full rounded-full transition-all duration-500" :style="{ width: verticalStaminaPercent + '%' }"></div>
                </div>
              </div>
              <!-- Endurance Volume -->
              <div>
                <div class="flex justify-between items-center text-xs font-medium text-slate-300 mb-1.5">
                  <span>Endurance Volume</span>
                  <span>{{ enduranceVolume.toFixed(1) }}km / 50km</span>
                </div>
                <div class="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div class="bg-sky-400 h-full rounded-full transition-all duration-500" :style="{ width: enduranceVolumePercent + '%' }"></div>
                </div>
              </div>
              <!-- Consistency -->
              <div>
                <div class="flex justify-between items-center text-xs font-medium text-slate-300 mb-1.5">
                  <span>Training Load Consistency</span>
                  <span>{{ consistency }}% Consistency</span>
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
            <div class="flex items-center gap-1 text-[10px] font-medium text-[#118c13] bg-emerald-50 px-2 py-1 rounded-md">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/></svg>
              <span>+12%</span>
            </div>
          </div>
          <div>
            <span class="text-xs font-medium text-slate-400 block">Distance (2w)</span>
            <span class="text-3xl font-heading font-medium text-slate-900 mt-1 block">{{ enduranceVolume.toFixed(1) }} <span class="text-sm font-medium text-slate-500 font-sans">km</span></span>
          </div>
          <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
            <span class="text-xs font-medium text-slate-400">Frequency</span>
            <span class="text-sm font-medium text-slate-800">4.2 <span class="text-[10px] text-slate-400">days/wk</span></span>
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
            <div class="flex items-center gap-1 text-[10px] font-medium text-red-600 bg-red-50 px-2 py-1 rounded-md">
              <span class="w-3 h-3 rounded-full bg-red-100 flex items-center justify-center">!</span>
              <span>Needs Work</span>
            </div>
          </div>
          <div>
            <span class="text-xs font-medium text-slate-400 block">Elevation Gain</span>
            <span class="text-3xl font-heading font-medium text-slate-900 mt-1 block">{{ verticalStamina.toLocaleString('en-US') }} <span class="text-sm font-medium text-slate-500 font-sans">m</span></span>
          </div>
          <div class="mt-4 pt-4 border-t border-slate-100">
            <p class="text-xs font-medium text-red-500">450m below target</p>
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
            <!-- Legends -->
            <div class="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 select-none bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <div @click="showMandatory = !showMandatory" class="flex items-center gap-2 cursor-pointer hover:text-slate-800 transition-colors">
                <span class="w-3.5 h-3.5 rounded-sm flex items-center justify-center border transition-all pointer-events-none"
                  :class="showMandatory ? 'border-[#118c13] bg-[#118c13] text-white' : 'border-slate-300 bg-white'">
                  <svg v-if="showMandatory" class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                <span>Mandatory</span>
              </div>
              <div class="w-px h-3 bg-slate-200"></div>
              <div @click="showOptional = !showOptional" class="flex items-center gap-2 cursor-pointer hover:text-slate-800 transition-colors">
                <span class="w-3.5 h-3.5 rounded-sm flex items-center justify-center border transition-all pointer-events-none"
                  :class="showOptional ? 'border-slate-400 bg-slate-400 text-white' : 'border-slate-300 bg-white'">
                  <svg v-if="showOptional" class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                <span>Optional</span>
              </div>
            </div>
          </div>

          <!-- Grid Items -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!-- Item 1: Brisk Walk -->
            <div v-show="showMandatory" @click="toggleItem(1)" class="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all duration-200 select-none"
              :class="checklistItems[0].checked ? 'bg-emerald-50/50 border-[#118c13]/30 shadow-sm' : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-white'">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 5a2 2 0 11-4 0 2 2 0 014 0zM9 20h2l1-4h3m-5-4v4m3-10l-1.5 3L13 14"/>
                  </svg>
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-0.5">
                    <span class="text-[10px] font-medium text-[#118c13] bg-emerald-50 px-1.5 py-0.5 rounded">Wajib</span>
                    <span class="text-sm font-medium text-slate-800">30-min Brisk Walk</span>
                  </div>
                  <p class="text-xs text-slate-500 font-medium">Focus on maintaining 120-130 BPM heart rate.</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span v-if="checklistItems[0].checked" class="bg-[#118c13] text-white text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1 shrink-0 shadow-sm">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Selesai
                </span>
              </div>
            </div>

            <!-- Item 2: Stair Climb -->
            <div v-show="showMandatory" @click="toggleItem(2)" class="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all duration-200 select-none"
              :class="checklistItems[1].checked ? 'bg-emerald-50/50 border-[#118c13]/30 shadow-sm' : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-white'">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 21h-4v-4h-4v-4H7V9H3"/>
                  </svg>
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-0.5">
                    <span class="text-[10px] font-medium text-[#118c13] bg-emerald-50 px-1.5 py-0.5 rounded">Wajib</span>
                    <span class="text-sm font-medium text-slate-800">15 Floors Stair Climb</span>
                  </div>
                  <p class="text-xs text-slate-500 font-medium">Simulating vertical ascent with a 5kg pack.</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span v-if="checklistItems[1].checked" class="bg-[#118c13] text-white text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1 shrink-0 shadow-sm">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Selesai
                </span>
              </div>
            </div>

            <!-- Item 3: Core Stability -->
            <div v-show="showOptional" @click="toggleItem(3)" class="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all duration-200 select-none"
              :class="checklistItems[2].checked ? 'bg-slate-100/80 border-slate-300 shadow-sm' : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-white'">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M5.636 5.636a9 9 0 000 12.728m0 0l2.829-2.829m-2.829 2.829L3 21M21 3L3 21"/>
                  </svg>
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-0.5">
                    <span class="text-[10px] font-medium text-slate-500 bg-slate-200/50 px-1.5 py-0.5 rounded">Opsional</span>
                    <span class="text-sm font-medium text-slate-800">Core Stability Session</span>
                  </div>
                  <p class="text-xs text-slate-500 font-medium">15 mins of planks and mountain climbers.</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span v-if="checklistItems[2].checked" class="bg-slate-600 text-white text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1 shrink-0 shadow-sm">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Selesai
                </span>
              </div>
            </div>

            <!-- Item 4: Altitude Breathing -->
            <div v-show="showOptional" @click="toggleItem(4)" class="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all duration-200 select-none"
              :class="checklistItems[3].checked ? 'bg-slate-100/80 border-slate-300 shadow-sm' : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-white'">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17m9-9H3"/>
                  </svg>
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-0.5">
                    <span class="text-[10px] font-medium text-slate-500 bg-slate-200/50 px-1.5 py-0.5 rounded">Opsional</span>
                    <span class="text-sm font-medium text-slate-800">Altitude Breathing Work</span>
                  </div>
                  <p class="text-xs text-slate-500 font-medium">Controlled breathing exercises (Box Breathing).</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span v-if="checklistItems[3].checked" class="bg-slate-600 text-white text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1 shrink-0 shadow-sm">
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
    </main>
  </div>
</template>
