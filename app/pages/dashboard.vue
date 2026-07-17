<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <Sidebar />
    
    <!-- MAIN CONTENT AREA -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 space-y-6">
      
      <!-- Top Section (Selector) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-heading font-medium text-slate-900">Dashboard</h1>
          <p class="text-sm text-slate-500 mt-1">Your expedition overview and readiness metrics</p>
        </div>
        
        <!-- Mountain Tabs Selector -->
        <div class="flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200/50 shadow-sm w-full sm:w-auto overflow-x-auto">
          <button
            v-for="(mt, idx) in mountains"
            :key="idx"
            @click="selectedMountainIndex = idx"
            :class="[
              selectedMountainIndex === idx
                ? 'bg-[#118c13] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50',
              'px-4 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap'
            ]"
          >
            {{ mt.name }}
          </button>
        </div>
      </div>

      <!-- BENTO GRID -->
      <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 auto-rows-max">
        
        <!-- 1. HERO CARD (Spans 2 cols, 2 rows in XL) -->
        <div class="md:col-span-2 xl:col-span-2 xl:row-span-2 h-[380px] xl:h-full rounded-[2.5rem] overflow-hidden relative shadow-md group border border-slate-200/40">
          <img
            :src="selectedMountain.image"
            :alt="selectedMountain.name"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#023C23]/95 via-[#023C23]/40 to-transparent"></div>

          <!-- Hero Content -->
          <div class="absolute inset-0 p-6 flex flex-col justify-end">
            <div class="space-y-4">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Target Expedition
              </div>
              
              <h2 class="text-3xl md:text-4xl font-heading font-medium text-white tracking-tight">
                {{ selectedMountain.name }}
              </h2>
              
              <div class="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <div class="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10">
                  <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                  </svg>
                  <span class="font-medium">{{ selectedMountain.elevation }}</span>
                </div>
                <div class="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10">
                  <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <span class="font-medium">{{ selectedMountain.difficulty }}</span>
                </div>
                <div class="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10">
                  <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                  <span class="font-medium">{{ selectedMountain.jarak_puncak }} km</span>
                </div>
                <div class="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10">
                  <svg class="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                  </svg>
                  <span class="font-medium">{{ selectedMountain.suhu_normal }}°C</span>
                </div>
                <div class="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10 truncate max-w-[200px]">
                  <svg class="w-4 h-4 text-sky-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span class="font-medium truncate">{{ selectedMountain.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. PHYSICAL READINESS (Spans 1 col, 2 rows in XL) -->
        <div class="xl:col-span-1 xl:row-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
          <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
          
          <div class="relative z-10 flex-1 flex flex-col">
            <h3 class="font-heading font-medium text-slate-800 text-lg">Physical Readiness</h3>
            <p class="text-xs text-slate-400 mt-0.5">Overall fitness and adaptability</p>

            <!-- Radial Progress -->
            <div class="flex items-center justify-center my-6 flex-1">
              <div class="relative w-48 h-48 flex items-center justify-center">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path class="text-slate-100" stroke="currentColor" stroke-width="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="text-[#118c13]" stroke="currentColor" stroke-width="3" stroke-dasharray="88, 100" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="absolute text-center flex flex-col items-center">
                  <span class="text-5xl font-heading font-medium text-slate-800 leading-none">{{ physicalReadinessScore }}</span>
                  <span class="text-xs font-medium text-slate-400 mt-1">SCORE</span>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="space-y-4">
              <div class="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-100 text-[#118c13] flex items-center justify-center">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  </div>
                  <div>
                    <p class="text-xs text-slate-500 font-medium">VO2 Max</p>
                    <p class="text-sm font-medium text-slate-900">{{ trainingProgress.vo2max }} mL/kg</p>
                  </div>
                </div>
                <span class="text-xs font-medium text-[#118c13] bg-emerald-50 px-2 py-1 rounded-lg">Excellent</span>
              </div>
              
              <div>
                <div class="flex justify-between text-xs font-medium text-slate-600 mb-1.5">
                  <span>Weekly Cardio</span>
                  <span>{{ trainingProgress.cardioTarget }}%</span>
                </div>
                <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-[#118c13] rounded-full" :style="`width: ${trainingProgress.cardioTarget}%`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. WEATHER WIDGET (Spans 1 col, 1 row) -->
        <div class="bg-[#023C23] rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between group">
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <h3 class="font-heading font-medium text-white text-lg">Forecast</h3>
              <!-- Date Picker Mini -->
              <select v-model="selectedDate" class="bg-white/10 text-white text-xs border border-white/20 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-emerald-500">
                <option v-for="(val, date) in weatherForecasts" :key="date" :value="date" class="text-slate-900">
                  {{ date.split('-')[2] }} Jul
                </option>
              </select>
            </div>

            <div class="flex items-center gap-4 mt-6">
              <div class="text-white">
                <svg v-if="activeWeather.icon === 'snowflake'" class="w-12 h-12 text-sky-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m9-9H3m14.5-6.5l-11 11m11 0l-11-11" />
                </svg>
                <svg v-else-if="activeWeather.icon === 'sun'" class="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                <svg v-else class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <div class="flex items-baseline gap-2">
                  <span class="text-4xl font-heading font-medium text-white">{{ activeWeather.temp }}</span>
                </div>
                <p class="text-xs text-emerald-200/80 mt-1">Feels like {{ activeWeather.realFeel }}</p>
              </div>
            </div>
          </div>
          
          <div class="relative z-10 mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-emerald-100">
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path></svg>
              {{ activeWeather.wind }}
            </span>
            <span :class="[
                activeWeather.risk === 'CRITICAL' ? 'bg-red-500/20 text-red-300' :
                activeWeather.risk === 'WARNING' ? 'bg-amber-500/20 text-amber-300' :
                'bg-white/10 text-emerald-200',
                'px-2 py-1 rounded border border-white/10 font-medium'
              ]">
              {{ activeWeather.risk }}
            </span>
          </div>
        </div>

        <!-- 4. LOGISTICAL PROGRESS (Spans 1 col, 1 row) -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div>
            <h3 class="font-heading font-medium text-slate-800 text-lg">Logistics</h3>
            <p class="text-xs text-slate-400 mt-0.5">Preparation checklist</p>
          </div>

          <div class="my-5">
            <div class="flex justify-between items-end mb-2">
              <span class="text-2xl font-heading font-medium text-slate-800 leading-none">{{ logisticalProgress.overall }}<span class="text-sm text-slate-400">%</span></span>
              <span class="text-[10px] font-medium text-slate-400">COMPLETED</span>
            </div>
            <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-slate-800 rounded-full" :style="`width: ${logisticalProgress.overall}%`"></div>
            </div>
          </div>

          <div class="space-y-2 text-xs font-medium text-slate-600">
            <div class="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
              <div class="w-4 h-4 rounded-full bg-[#118c13] flex items-center justify-center text-white shrink-0"><svg class="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></div>
              Permits Secured
            </div>
            <div class="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
              <div class="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0"></div>
              Pack Gear ({{ logisticalProgress.logisticsStep }}%)
            </div>
          </div>
        </div>
      </section>

      <!-- 5. EXPEDITION SCHEDULE TIMELINE (Spans full width) -->
      <section class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 class="font-heading font-medium text-slate-800 text-lg">Expedition Plan</h3>
            <p class="text-xs text-slate-400 mt-0.5">July 14 - July 16 • 3-Day Window</p>
          </div>
          <span class="bg-emerald-50 border border-emerald-100 text-[#118c13] rounded-full px-3 py-1.5 text-xs font-medium w-fit">Status: Confirmed</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Day 1 -->
          <div class="relative p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
            <div class="absolute -top-3 left-5 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-medium text-slate-600 shadow-sm group-hover:border-[#118c13] group-hover:text-[#118c13] transition-colors">
              Day 1
            </div>
            <div class="mt-2">
              <h4 class="font-heading font-medium text-slate-900">Base Approach</h4>
              <p class="text-xs text-slate-500 mt-1.5">Ascent to high camp for acclimatization. Steady pace required.</p>
              
              <div class="flex items-center gap-3 mt-4 text-xs font-medium text-slate-600">
                <span class="flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-100 shadow-sm"><svg class="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m0 13.5V21M4.5 12h2.25m13.5 0H21m-2.803-5.697l-1.591 1.591M6.897 17.103l-1.591 1.591m0-10.206l1.591 1.591m10.206 10.206l1.591-1.591M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" /></svg> Clear</span>
                <span class="flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-100 shadow-sm">8 mi</span>
              </div>
            </div>
          </div>

          <!-- Day 2 (Target) -->
          <div class="relative p-5 rounded-2xl border-2 border-[#118c13]/30 bg-emerald-50/30 hover:bg-emerald-50/70 hover:shadow-md transition-all group">
            <div class="absolute -top-3 left-5 bg-[#118c13] border-2 border-white px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm">
              Day 2 • Summit
            </div>
            <div class="mt-2">
              <h4 class="font-heading font-medium text-slate-900">Alpine Push</h4>
              <p class="text-xs text-slate-500 mt-1.5">Pre-dawn start. Steep technical climbing towards the peak.</p>
              
              <div class="flex items-center gap-3 mt-4 text-xs font-medium text-slate-600">
                <span class="flex items-center gap-1 bg-white px-2 py-1 rounded border border-emerald-100 shadow-sm"><svg class="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m9-9H3m14.5-6.5l-11 11m11 0l-11-11" /></svg> Cold</span>
                <span class="flex items-center gap-1 bg-white px-2 py-1 rounded border border-emerald-100 shadow-sm">12°F</span>
              </div>
            </div>
          </div>

          <!-- Day 3 -->
          <div class="relative p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
            <div class="absolute -top-3 left-5 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-medium text-slate-600 shadow-sm group-hover:border-[#118c13] group-hover:text-[#118c13] transition-colors">
              Day 3
            </div>
            <div class="mt-2">
              <h4 class="font-heading font-medium text-slate-900">Rapid Descent</h4>
              <p class="text-xs text-slate-500 mt-1.5">Return to trailhead. Focus on joint preservation and pace.</p>
              
              <div class="flex items-center gap-3 mt-4 text-xs font-medium text-slate-600">
                <span class="flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-100 shadow-sm"><svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg> Downhill</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Footer Component -->
      <Footer />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: false
})

// Mountain mock data
const mountains = [
  {
    name: 'Mt. Whitney',
    elevation: '14,505 ft',
    difficulty: 'Hard',
    location: 'Sierra Nevada, CA',
    jarak_puncak: 17,
    suhu_normal: 2,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Mt. Rinjani',
    elevation: '12,224 ft',
    difficulty: 'Hard',
    location: 'Lombok, Indonesia',
    jarak_puncak: 6,
    suhu_normal: 5,
    image: 'https://images.unsplash.com/photo-1570530221087-0b1a03e1e247?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Mt. Semeru',
    elevation: '12,060 ft',
    difficulty: 'Hard',
    location: 'Java, Indonesia',
    jarak_puncak: 5,
    suhu_normal: 3,
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1200&auto=format&fit=crop'
  }
]

const selectedMountainIndex = ref(0)
const selectedMountain = computed(() => mountains[selectedMountainIndex.value])

// Interactive Date Weather Forecast
const weatherForecasts = {
  '2026-07-14': { temp: '18° F', realFeel: '4° F', wind: '22 mph', visibility: 'Excellent', risk: 'NORMAL', icon: 'sun' },
  '2026-07-15': { temp: '14° F', realFeel: '-2° F', wind: '28 mph', visibility: 'Good', risk: 'WARNING', icon: 'snowflake' },
  '2026-07-16': { temp: '12° F', realFeel: '-6° F', wind: '35 mph', visibility: 'Moderate', risk: 'CRITICAL', icon: 'warning' },
  '2026-07-17': { temp: '20° F', realFeel: '10° F', wind: '15 mph', visibility: 'Excellent', risk: 'NORMAL', icon: 'sun' }
}

const selectedDate = ref('2026-07-15')
const activeWeather = computed(() => weatherForecasts[selectedDate.value])

// Physical Readiness Metrics
const physicalReadinessScore = ref(88)
const trainingProgress = ref({
  vo2max: 52,
  cardioTarget: 82,
  elevationProgress: 3500,
  elevationTarget: 4000
})

// Logistical Progress
const logisticalProgress = ref({
  overall: 85,
  permit: true,
  insurance: true,
  logisticsStep: 84
})
</script>
