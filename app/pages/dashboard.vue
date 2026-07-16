<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <Sidebar />
    <!-- MAIN CONTENT AREA -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 lg:p-10 space-y-6">
      
      <!-- MOUNTAIN SELECTOR & HERO CARD -->
      <section class="space-y-4">
        <!-- Mountain Tabs Selector -->
        <div class="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200/50 w-fit shadow-sm">
          <button
            v-for="(mt, idx) in mountains"
            :key="idx"
            @click="selectedMountainIndex = idx"
            :class="[
              selectedMountainIndex === idx
                ? 'bg-[#118c13] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50',
              'px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all'
            ]"
          >
            {{ mt.name }}
          </button>
        </div>

        <!-- HERO CARD -->
        <div class="h-80 rounded-[2.5rem] overflow-hidden relative shadow-lg flex flex-col justify-end p-8 bg-slate-800 transition-all duration-550">
          <img
            :src="selectedMountain.image"
            :alt="selectedMountain.name"
            class="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-550"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

          <!-- Hero Content (Front of overlay) -->
          <div class="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div class="space-y-3">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 backdrop-blur-sm border border-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                PEAK PROFILE • Category 5 Expedition
              </div>
              <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {{ selectedMountain.name }}
              </h1>
              <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/90 text-sm">
                <div class="flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                  </svg>
                  <span class="font-semibold">{{ selectedMountain.elevation }}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <span class="font-semibold">{{ selectedMountain.difficulty }}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span class="font-semibold">{{ selectedMountain.location }}</span>
                </div>
              </div>
            </div>

            <!-- CTA Button -->
            <button class="bg-[#118c13] hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl font-bold text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Start Planning
            </button>
          </div>
        </div>
      </section>

      <!-- ROW 1 (Physical Readiness & Logistical Progress) -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Physical Readiness & Training Progress -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-[#118c13] lg:col-span-2">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <!-- Readiness Score (Donut dial) -->
            <div class="flex items-center gap-6">
              <div class="relative w-28 h-28 flex items-center justify-center">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path class="text-slate-100" stroke="currentColor" stroke-width="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="text-[#118c13]" stroke="currentColor" stroke-width="3.5" stroke-dasharray="88, 100" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="absolute text-center">
                  <span class="text-2xl font-black text-slate-800 block leading-none">{{ physicalReadinessScore }}</span>
                  <span class="text-[8px] font-bold text-slate-400 tracking-wider">READINESS</span>
                </div>
              </div>
              <div>
                <h2 class="font-bold text-slate-800 text-lg">Physical Fitness Status</h2>
                <p class="text-xs text-slate-400 mt-0.5">Physical training metrics & adaptabilities</p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="px-2.5 py-0.5 bg-emerald-50 text-[#118c13] text-[10px] font-bold rounded border border-emerald-100">VO2 MAX: {{ trainingProgress.vo2max }}</span>
                  <span class="px-2.5 py-0.5 bg-sky-50 text-sky-600 text-[10px] font-bold rounded border border-sky-100">ALTITUDE: STABLE</span>
                </div>
              </div>
            </div>

            <!-- Training Metrics progress details -->
            <div class="flex-1 max-w-md space-y-3.5">
              <!-- Cardio Target -->
              <div>
                <div class="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>Weekly Cardio Target</span>
                  <span>{{ trainingProgress.cardioTarget }}%</span>
                </div>
                <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-[#118c13]" :style="`width: ${trainingProgress.cardioTarget}%`"></div>
                </div>
              </div>

              <!-- Elevation Target -->
              <div>
                <div class="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>Elevation Gain Goal</span>
                  <span>{{ trainingProgress.elevationProgress }} / {{ trainingProgress.elevationTarget }} ft</span>
                </div>
                <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-500" :style="`width: ${(trainingProgress.elevationProgress/trainingProgress.elevationTarget)*100}%`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Logistical Preparation Progress -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 flex flex-col justify-between min-h-[220px]">
          <div>
            <h2 class="font-bold text-slate-800 text-lg">Logistical Progress</h2>
            <p class="text-xs text-slate-400 mt-0.5">Expedition readiness and packing status</p>
          </div>

          <!-- Overall Logistics Bar -->
          <div class="my-3">
            <div class="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>Overall Progress</span>
              <span class="text-[#118c13]">{{ logisticalProgress.overall }}%</span>
            </div>
            <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-[#118c13]" :style="`width: ${logisticalProgress.overall}%`"></div>
            </div>
          </div>

          <!-- Mini steps checklists -->
          <div class="grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-semibold">
            <div class="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[7px] font-black">✓</span>
              Permit Secured
            </div>
            <div class="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[7px] font-black">✓</span>
              Insurance Set
            </div>
            <div class="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100 col-span-2 justify-between">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Gear packed</span>
              </div>
              <span class="text-[#118c13] font-bold">{{ logisticalProgress.logisticsStep }}%</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ROW 2 (Interactive Weather & Trail Profile) -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Interactive Weather Forecast Card (Tanggal Tertentu) -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 flex flex-col justify-between min-h-[220px]">
          <div>
            <div class="flex items-center justify-between">
              <h2 class="font-bold text-slate-800 text-lg">Weather Forecast</h2>
              <!-- Risk Warning Tag -->
              <span :class="[
                activeWeather.risk === 'CRITICAL' ? 'bg-red-100 text-red-600 border border-red-200' :
                activeWeather.risk === 'WARNING' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                'bg-green-50 text-[#118c13] border border-green-100',
                'rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase'
              ]">{{ activeWeather.risk }}</span>
            </div>
            
            <!-- Date Tabs Picker (July 14-17) -->
            <div class="flex gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/50 mt-3">
              <button
                v-for="(val, date) in weatherForecasts"
                :key="date"
                @click="selectedDate = date"
                :class="[
                  selectedDate === date ? 'bg-[#118c13] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800',
                  'flex-1 text-center py-1.5 rounded-lg text-[10px] font-bold transition-all'
                ]"
              >
                {{ date.split('-')[2] }} Jul
              </button>
            </div>
          </div>

          <!-- Dynamic Temp Details based on Date Selection -->
          <div class="flex items-center gap-4 my-4">
            <div class="p-3 bg-green-50 rounded-2xl border border-green-100/50 text-[#118c13]">
              <!-- Conditional SVG Icons for weather status -->
              <svg v-if="activeWeather.icon === 'snowflake'" class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m9-9H3m14.5-6.5l-11 11m11 0l-11-11" />
              </svg>
              <svg v-else-if="activeWeather.icon === 'sun'" class="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <svg v-else class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <span class="text-3xl font-black text-slate-900 leading-none">{{ activeWeather.temp }}</span>
              <p class="text-[10px] text-slate-400 mt-1 font-medium">RealFeel: {{ activeWeather.realFeel }} • Forecast</p>
            </div>
          </div>

          <!-- Dynamic sub stats -->
          <div class="space-y-2">
            <div class="bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-2 flex items-center justify-between text-xs">
              <span class="text-slate-500 font-semibold">Wind Speed</span>
              <span class="font-bold text-slate-800">{{ activeWeather.wind }}</span>
            </div>
            <div class="bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-2 flex items-center justify-between text-xs">
              <span class="text-slate-500 font-semibold">Visibility</span>
              <span class="font-bold text-slate-800">{{ activeWeather.visibility }}</span>
            </div>
          </div>
        </div>

        <!-- Trail Profile -->
        <div class="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="font-bold text-slate-800 text-lg md:text-4xl">Trail Profile</h2>
              <p class="text-xs md:text-2xl text-slate-400 mt-0.5">Elevation tracking profile & metrics</p>
            </div>
          </div>

          <!-- Dynamic Grid Stats of Trail based on selected mountain -->
          <div class="grid grid-cols-4 gap-4 mt-6">
            <div>
              <p class="text-[20px] text-slate-400 font-bold uppercase tracking-wider mb-1">ELEVATION</p>
              <p class="text-sm md:text-lg font-extrabold text-slate-800 leading-none">{{ selectedMountain.elevation }}</p>
            </div>
            <div>
              <p class="text-[20px text-slate-400 font-bold uppercase tracking-wider mb-1">DIFFICULTY</p>
              <p class="text-sm md:text-lg font-extrabold text-slate-800 leading-none">{{ selectedMountain.difficulty }}</p>
            </div>
            <div>
              <p class="text-[20px] text-slate-400 font-bold uppercase tracking-wider mb-1">ROUTE TYPE</p>
              <p class="text-sm md:text-lg font-extrabold text-slate-800 leading-none">Roundtrip</p>
            </div>
            <div>
              <p class="text-[20px] text-slate-400 font-bold uppercase tracking-wider mb-1">LOCATION</p>
              <p class="text-xs md:text-lg font-extrabold text-[#118c13] leading-none truncate" :title="selectedMountain.location">
                {{ selectedMountain.location.split(',')[0] }}
              </p>
            </div>
          </div>

          <!-- Elevation chart path -->
          <!-- <div class="mt-6 w-full h-24 bg-slate-50/50 rounded-xl relative overflow-hidden border border-slate-100">
            <svg class="absolute bottom-0 left-0 right-0 w-full h-full text-emerald-50/50" fill="currentColor" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M0,30 L0,24 Q15,22 30,17 T60,11 T90,6 L100,2 L100,30 Z" />
              <path d="M0,24 Q15,22 30,17 T60,11 T90,6 L100,2" class="stroke-[#118c13] fill-none" stroke-width="1.5" />
            </svg>
            <div class="absolute bottom-2 left-4 text-[9px] font-semibold text-slate-400">Base Camp</div>
            <div class="absolute top-2 right-4 text-[9px] font-semibold text-[#118c13]">Peak ({{ selectedMountain.elevation }})</div>
          </div> -->
        </div>
      </section>

      <!-- ROW 3 (Expedition Schedule) -->
      <section class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-[#0f4a5c]">
        <!-- Header -->
        <div class="flex items-start justify-between">
          <div>
            <h2 class="font-bold text-slate-800 text-lg">Expedition Schedule</h2>
            <p class="text-xs text-slate-400 mt-0.5">July 14 - July 16 • 3-Day Summit Window</p>
          </div>
          <span class="bg-sky-50 border border-sky-100 text-sky-600 rounded-full px-3 py-1 text-[9px] font-bold tracking-wider uppercase">CONFIRMED</span>
        </div>

        <!-- 3 Days Schedule Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <!-- Day 1 -->
          <div class="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-between min-h-[140px]">
            <div>
              <div class="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-2">
                <span>DAY 1</span>
                <!-- Sun icon -->
                <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m0 13.5V21M4.5 12h2.25m13.5 0H21m-2.803-5.697l-1.591 1.591M6.897 17.103l-1.591 1.591m0-10.206l1.591 1.591m10.206 10.206l1.591-1.591M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
                </svg>
              </div>
              <h3 class="font-bold text-slate-850 text-sm">Approach</h3>
              <p class="text-xs text-slate-400 mt-1">Whitney Portal to Trail Camp</p>
            </div>
            <div class="flex items-center gap-1.5 text-xs text-[#118c13] font-semibold mt-4">
              <!-- Location/Arrow icon -->
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
              18°F Clear
            </div>
          </div>

          <!-- Day 2 (Highlighted Summit Push) -->
          <div class="bg-green-50/50 border-2 border-[#118c13]/30 rounded-2xl p-5 flex flex-col justify-between min-h-[140px]">
            <div>
              <div class="flex justify-between items-center text-[10px] font-bold text-[#118c13] uppercase mb-2">
                <span>DAY 2</span>
                <!-- Mountain icon -->
                <svg class="w-4 h-4 text-[#118c13]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 20l7-12 5 8 2-3 4 7H3z" />
                </svg>
              </div>
              <h3 class="font-bold text-slate-850 text-sm">Summit Push</h3>
              <p class="text-xs text-slate-400 mt-1">Trail Camp to Summit & Back</p>
            </div>
            <div class="flex items-center gap-1.5 text-xs text-[#118c13] font-semibold mt-4">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
              12°F Peak Wind
            </div>
          </div>

          <!-- Day 3 -->
          <div class="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-between min-h-[140px]">
            <div>
              <div class="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-2">
                <span>DAY 3</span>
                <!-- Down arrow icon -->
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </div>
              <h3 class="font-bold text-slate-850 text-sm">Descent</h3>
              <p class="text-xs text-slate-400 mt-1">Trail Camp to Portal</p>
            </div>
            <div class="flex items-center gap-1.5 text-xs text-[#118c13] font-semibold mt-4">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
              20°F Warming
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
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Mt. Rinjani',
    elevation: '12,224 ft',
    difficulty: 'Hard',
    location: 'Lombok, Indonesia',
    image: 'https://images.unsplash.com/photo-1570530221087-0b1a03e1e247?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Mt. Semeru',
    elevation: '12,060 ft',
    difficulty: 'Hard',
    location: 'Java, Indonesia',
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

<style scoped>
/* Specific styling rules if needed */
</style>
