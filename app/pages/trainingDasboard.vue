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
</script>

<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
    <!-- Sidebar -->
    <Sidebar active="training" />

    <!-- Main Content Area -->
    <main class="flex-1 h-full overflow-y-auto">
      <div class="p-8 lg:p-10 max-w-[1600px] mx-auto flex flex-col justify-between min-h-full">
        <div>
          <!-- Header Section -->
          <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 class="font-heading text-3xl font-bold text-slate-900 tracking-tight">Expedition Training Planner</h1>
              <p class="text-sm text-slate-500 mt-1 font-normal">Preparing for Mt. Whitney Summit Expedition</p>
            </div>
            <button class="border border-slate-200 rounded-full px-5 py-2.5 text-xs font-bold text-slate-700 bg-white shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors active:scale-95">
              <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Sync Strava
            </button>
          </header>

          <!-- Top Metrics Row (Row 1) -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 items-stretch">
            <!-- Card 1: Physical Validation Score -->
            <div class="border-l-[5px] border-[#118c13] bg-white rounded-r-[24px] rounded-l-md shadow-sm p-6 flex flex-col justify-between min-h-[300px] h-full">
              <span class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">PHYSICAL VALIDATION SCORE</span>
              <div class="relative flex items-center justify-center my-4">
                <svg class="w-36 h-36" viewBox="0 0 100 100">
                  <circle class="text-slate-100" stroke-width="8" stroke="currentColor" fill="transparent" r="38" cx="50" cy="50" />
                  <circle class="text-[#118c13] transition-all duration-500 ease-out" stroke-width="8" stroke-dasharray="238.76" :stroke-dashoffset="dashoffset" stroke-linecap="round" stroke="currentColor" fill="transparent" r="38" cx="50" cy="50" transform="rotate(-90 50 50)" />
                </svg>
                <div class="absolute flex flex-col items-center justify-center">
                  <span class="text-4xl font-extrabold text-slate-900 leading-none">{{ score }}</span>
                  <span class="text-[10px] font-bold text-slate-400 mt-1">of 100</span>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-bold text-slate-900">SkorFisik: {{ physicalStatus }}</h4>
                <p class="text-[11px] text-slate-400 leading-relaxed mt-0.5">"You are {{ readinessPercent }}% ready for high-altitude endurance requirements."</p>
              </div>
            </div>

            <!-- Card 2: Distance -->
            <div class="bg-white rounded-[24px] p-6 shadow-sm flex flex-col justify-between min-h-[160px] h-full">
              <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#118c13] mb-4">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <span class="text-xs font-semibold text-slate-400 block">Distance (2w)</span>
                <span class="text-2xl font-bold text-slate-900 mt-1 block">{{ enduranceVolume.toFixed(1) }} km</span>
              </div>
              <div class="flex items-center gap-1 text-[11px] font-bold text-[#118c13] mt-4">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                <span>+12% from last cycle</span>
              </div>
            </div>

            <!-- Card 3: Frequency -->
            <div class="bg-white rounded-[24px] p-6 shadow-sm flex flex-col justify-between min-h-[160px] h-full">
              <div class="w-10 h-10 rounded-xl bg-blue-50/60 flex items-center justify-center text-blue-600 mb-4">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <span class="text-xs font-semibold text-slate-400 block">Frequency</span>
                <span class="text-2xl font-bold text-slate-900 mt-1 block">4.2 <span class="text-sm font-normal text-slate-500">days/wk</span></span>
              </div>
              <span class="text-[11px] font-semibold text-slate-400 block mt-4">Maintaining consistency</span>
            </div>

            <!-- Card 4: Elev. Gain -->
            <div class="bg-white rounded-[24px] p-6 shadow-sm flex flex-col justify-between min-h-[160px] h-full">
              <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-4">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 20l7-12 5 8 2-3 4 7H3z" />
                </svg>
              </div>
              <div>
                <span class="text-xs font-semibold text-slate-400 block">Elev. Gain</span>
                <span class="text-2xl font-bold text-slate-900 mt-1 block">{{ verticalStamina.toLocaleString('en-US') }} m</span>
              </div>
              <div class="flex items-center gap-1.5 text-[11px] font-bold text-red-600 mt-4">
                <span class="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center text-[10px]">!</span>
                <span>450m below target</span>
              </div>
            </div>
          </div>

          <!-- Row 2: Readiness & AI Coach -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 items-stretch">
            <!-- Left Card: Mt. Whitney Readiness -->
            <div class="bg-white rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-full min-h-[260px]">
              <div class="flex items-center gap-2.5 mb-6">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                </svg>
                <h3 class="text-sm font-bold text-slate-800 tracking-tight">Mt. Whitney Readiness</h3>
              </div>
              
              <div class="space-y-5 flex-1 flex flex-col justify-center">
                <!-- Vertical Stamina -->
                <div>
                  <div class="flex justify-between items-center text-xs font-bold text-slate-600">
                    <span>Vertical Stamina</span>
                    <span>{{ verticalStamina.toLocaleString('en-US') }}m / 2,500m</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                    <div class="bg-[#118c13] h-full rounded-full transition-all duration-500" :style="{ width: verticalStaminaPercent + '%' }"></div>
                  </div>
                </div>

                <!-- Endurance Volume -->
                <div>
                  <div class="flex justify-between items-center text-xs font-bold text-slate-600">
                    <span>Endurance Volume</span>
                    <span>{{ enduranceVolume.toFixed(1) }}km / 50km</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                    <div class="bg-blue-500 h-full rounded-full transition-all duration-500" :style="{ width: enduranceVolumePercent + '%' }"></div>
                  </div>
                </div>

                <!-- Consistency -->
                <div>
                  <div class="flex justify-between items-center text-xs font-bold text-slate-600">
                    <span>Training Load Consistency</span>
                    <span>{{ consistency }}% Consistency</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                    <div class="bg-[#118c13] h-full rounded-full transition-all duration-500" :style="{ width: consistency + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Card: AI Coach Narrative -->
            <div class="bg-[#0b381e] rounded-[24px] p-6 shadow-sm relative overflow-hidden flex flex-col justify-between h-full min-h-[260px] text-white">
              <!-- Watermark Icon Overlay -->
              <div class="absolute -right-6 -top-6 w-32 h-32 opacity-10 pointer-events-none text-white">
                <svg fill="currentColor" viewBox="0 0 24 24" class="w-full h-full">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C8.07 12.31 7 10.74 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.74-1.07 3.31-2.15 4.1zM9 19c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z"/>
                </svg>
              </div>

              <div>
                <h3 class="text-sm font-bold text-white/95">AI Coach Narrative</h3>
                <p class="text-sm font-medium leading-relaxed text-slate-100/90 mt-5 max-w-[90%]">
                  To reach the Whitney summit safely, we recommend focusing on <strong class="font-bold text-white text-green-200">steady incline walks</strong>. You're doing great with frequency, but we need to boost your vertical gain to simulate the final push.
                </p>
              </div>

              <div class="mt-6">
                <span class="inline-flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl text-xs font-bold text-green-100 border border-white/5 shadow-inner">
                  <svg class="w-4 h-4 text-green-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  Target Readiness: 14 Days
                </span>
              </div>
            </div>
          </div>

          <!-- Row 3: Weekly Preparation Checklist -->
          <div class="bg-white rounded-[24px] p-6 shadow-sm mt-6">
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-3">
                <h3 class="text-sm font-bold text-slate-800 tracking-tight">Weekly Preparation Checklist</h3>
                <span :class="checklistProgressClass" class="text-[10px] font-bold px-2 py-0.5 rounded-full transition-all duration-300">
                  {{ checklistProgressText }}
                </span>
              </div>
              <!-- Legends -->
              <div class="flex items-center gap-4 text-xs font-semibold text-slate-400 select-none">
                <div @click="showMandatory = !showMandatory" class="flex items-center gap-2 cursor-pointer hover:text-slate-600 transition-colors">
                  <span class="w-4 h-4 rounded-full flex items-center justify-center border-2 transition-all pointer-events-none"
                    :class="showMandatory ? 'border-[#118c13] bg-[#118c13] text-white' : 'border-slate-300 bg-white'">
                    <svg v-if="showMandatory" class="w-2 h-2" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Mandatory</span>
                </div>
                <div @click="showOptional = !showOptional" class="flex items-center gap-2 cursor-pointer hover:text-slate-600 transition-colors">
                  <span class="w-4 h-4 rounded-full flex items-center justify-center border-2 transition-all pointer-events-none"
                    :class="showOptional ? 'border-slate-400 bg-slate-400 text-white' : 'border-slate-300 bg-white'">
                    <svg v-if="showOptional" class="w-2 h-2" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Optional</span>
                </div>
              </div>
            </div>

            <!-- Grid Items -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <!-- Item 1: Brisk Walk -->
              <div v-show="showMandatory" @click="toggleItem(1)" class="border rounded-2xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-all duration-200 select-none"
                :class="checklistItems[0].checked ? 'bg-green-100/50 border-green-300 shadow-sm' : 'bg-slate-50 border-slate-200/60 hover:border-slate-300'">
                <div class="flex items-center gap-3">
                  <div>
                    <div>
                      <span class="text-xs font-extrabold text-[#118c13] uppercase tracking-wider">Wajib</span>
                      <span class="text-sm font-bold text-slate-800 ml-2">30-min Brisk Walk</span>
                    </div>
                    <p class="text-xs text-slate-400 mt-1 font-medium">Focus on maintaining 120-130 BPM heart rate.</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span v-if="checklistItems[0].checked" class="bg-green-100 text-[#118c13] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Selesai
                  </span>
                  <!-- Walking Icon -->
                  <svg class="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 5a2 2 0 11-4 0 2 2 0 014 0zM9 20h2l1-4h3m-5-4v4m3-10l-1.5 3L13 14" />
                  </svg>
                </div>
              </div>

              <!-- Item 2: Stair Climb -->
              <div v-show="showMandatory" @click="toggleItem(2)" class="border rounded-2xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-all duration-200 select-none"
                :class="checklistItems[1].checked ? 'bg-green-100/50 border-green-300 shadow-sm' : 'bg-slate-50 border-slate-200/60 hover:border-slate-300'">
                <div class="flex items-center gap-3">
                  <div>
                    <div>
                      <span class="text-xs font-extrabold text-[#118c13] uppercase tracking-wider">Wajib</span>
                      <span class="text-sm font-bold text-slate-800 ml-2">15 Floors Stair Climb</span>
                    </div>
                    <p class="text-xs text-slate-400 mt-1 font-medium">Simulating vertical ascent with a 5kg pack.</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span v-if="checklistItems[1].checked" class="bg-green-100 text-[#118c13] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Selesai
                  </span>
                  <!-- Stair Icon -->
                  <svg class="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 21h-4v-4h-4v-4H7V9H3" />
                  </svg>
                </div>
              </div>

              <!-- Item 3: Core Stability -->
              <div v-show="showOptional" @click="toggleItem(3)" class="border rounded-2xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-all duration-200 select-none"
                :class="checklistItems[2].checked ? 'bg-slate-100 border-slate-300 shadow-sm' : 'bg-slate-50 border-slate-200/60 hover:border-slate-300'">
                <div class="flex items-center gap-3">
                  <div>
                    <div>
                      <span class="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Opsional</span>
                      <span class="text-sm font-bold text-slate-800 ml-2">Core Stability Session</span>
                    </div>
                    <p class="text-xs text-slate-400 mt-1 font-medium">15 mins of planks and mountain climbers.</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span v-if="checklistItems[2].checked" class="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Selesai
                  </span>
                  <!-- Dumbbell Icon -->
                  <svg class="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M5.636 5.636a9 9 0 000 12.728m0 0l2.829-2.829m-2.829 2.829L3 21M21 3L3 21" />
                  </svg>
                </div>
              </div>

              <!-- Item 4: Altitude Breathing -->
              <div v-show="showOptional" @click="toggleItem(4)" class="border rounded-2xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-all duration-200 select-none"
                :class="checklistItems[3].checked ? 'bg-slate-100 border-slate-300 shadow-sm' : 'bg-slate-50 border-slate-200/60 hover:border-slate-300'">
                <div class="flex items-center gap-3">
                  <div>
                    <div>
                      <span class="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Opsional</span>
                      <span class="text-sm font-bold text-slate-800 ml-2">Altitude Breathing Work</span>
                    </div>
                    <p class="text-xs text-slate-400 mt-1 font-medium">Controlled breathing exercises (Box Breathing).</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span v-if="checklistItems[3].checked" class="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Selesai
                  </span>
                  <!-- Wind Icon -->
                  <svg class="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17m9-9H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <Footer />
      </div>
    </main>
  </div>
</template>
