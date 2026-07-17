<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useExpeditionStore } from '~/stores/expedition'
import { useWeatherStore } from '~/stores/weather'

definePageMeta({
  layout: false,
})

const authStore = useAuthStore()
const expeditionStore = useExpeditionStore()
const weatherStore = useWeatherStore()

const isLoading = ref(true)
const errorMessage = ref('')
const activeExpedition = ref(null)

const weekOutlook = computed(() => weatherStore.weatherData?.weekOutlook || [])

onMounted(async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  // 1. Fetch expeditions
  const expRes = await expeditionStore.fetchExpeditions()
  if (!expRes.success) {
    errorMessage.value = expRes.message || 'Gagal memuat data ekspedisi.'
    isLoading.value = false
    return
  }
  
  if (expeditionStore.expeditions.length === 0) {
    activeExpedition.value = null
    isLoading.value = false
    return
  }
  
  // Get active expedition (e.g. the first one)
  const exp = expeditionStore.expeditions[0]
  activeExpedition.value = exp
  
  // 2. Fetch weather for active expedition
  const weatherRes = await weatherStore.fetchWeather(exp.id || exp._id)
  if (!weatherRes.success) {
    errorMessage.value = weatherRes.message || 'Gagal memuat data cuaca.'
  }
  
  isLoading.value = false
})

const formatDayName = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { weekday: 'short' })
}

const getWeatherIcon = (code) => {
  // WMO Weather interpretation codes mapping
  if (code === 0) return '☀️' // Clear sky
  if (code >= 1 && code <= 3) return '⛅' // Mainly clear, partly cloudy, and overcast
  if (code >= 45 && code <= 48) return '🌫️' // Fog
  if (code >= 51 && code <= 57) return '🌦️' // Drizzle
  if (code >= 61 && code <= 67) return '🌧️' // Rain
  if (code >= 71 && code <= 77) return '❄️' // Snow fall
  if (code >= 80 && code <= 82) return '🌦️' // Rain showers
  if (code >= 95 && code <= 99) return '⛈️' // Thunderstorm
  return '☀️'
}

const getRiskLabel = (precip, wind) => {
  if (precip > 5 || wind > 25) return 'Challenging'
  if (precip > 2 || wind > 15) return 'Moderate'
  return 'Easy'
}

const getRiskClass = (precip, wind) => {
  if (precip > 5 || wind > 25) return 'bg-red-50 text-red-600'
  if (precip > 2 || wind > 15) return 'bg-slate-200 text-slate-600'
  return 'bg-green-100 text-green-700'
}

const bestDay = computed(() => {
  if (weekOutlook.value.length === 0) return null
  // Sort by safest conditions: low precipitation, low wind speed
  return [...weekOutlook.value].sort((a, b) => {
    const scoreA = a.precipitationMm * 2.5 + a.windSpeedMax
    const scoreB = b.precipitationMm * 2.5 + b.windSpeedMax
    return scoreA - scoreB
  })[0]
})

const bestDayFormatted = computed(() => {
  if (!bestDay.value) return ''
  const date = new Date(bestDay.value.date)
  const dayName = date.toLocaleDateString('id-ID', { weekday: 'long' })
  return `${dayName} at 08:00`
})

const visibilityText = computed(() => {
  if (!bestDay.value) return '25km+'
  return bestDay.value.precipitationMm > 2 ? '10km' : '25km+'
})

const windSpeedText = computed(() => {
  if (!bestDay.value) return '12km/h'
  return `${Math.round(bestDay.value.windSpeedMax)} km/h`
})

const successRateText = computed(() => {
  if (!bestDay.value) return '92%'
  const windFactor = Math.max(0, 100 - bestDay.value.windSpeedMax * 2)
  const rainFactor = Math.max(0, 100 - bestDay.value.precipitationMm * 10)
  return `${Math.round((windFactor + rainFactor) / 2)}%`
})

const todayWeather = computed(() => {
  return weekOutlook.value[0] || null
})

const goStatusLabel = computed(() => {
  if (!todayWeather.value) return 'Optimal'
  const precip = todayWeather.value.precipitationMm
  const wind = todayWeather.value.windSpeedMax
  if (precip > 5 || wind > 25) return 'Danger'
  if (precip > 2 || wind > 15) return 'Caution'
  return 'Optimal'
})

const goStatusColorClass = computed(() => {
  const label = goStatusLabel.value
  if (label === 'Danger') return 'text-red-600'
  if (label === 'Caution') return 'text-amber-600'
  return 'text-[#118c13]'
})

const goStatusDescription = computed(() => {
  if (!todayWeather.value) return 'Current window is safe for high-altitude trekking.'
  const label = goStatusLabel.value
  if (label === 'Danger') return 'Bahaya: Kecepatan angin tinggi atau curah hujan tinggi terdeteksi di jalur.'
  if (label === 'Caution') return 'Peringatan: Kondisi cuaca sedang kurang stabil. Lakukan persiapan ekstra.'
  return 'Optimal: Kondisi cuaca stabil dan aman untuk pendakian malam/pagi.'
})

const atmosphericStability = computed(() => {
  if (!todayWeather.value) return 'Stable'
  const wind = todayWeather.value.windSpeedMax
  if (wind > 25) return 'Unstable'
  if (wind > 15) return 'Moderate'
  return 'Stable'
})

const atmosphericStabilityPercent = computed(() => {
  if (!todayWeather.value) return '100%'
  const wind = todayWeather.value.windSpeedMax
  return `${Math.max(10, Math.min(100, Math.round(100 - wind * 2.5)))}%`
})

const frostbiteRisk = computed(() => {
  if (!todayWeather.value) return 'Low'
  const temp = todayWeather.value.tempMinC
  if (temp < 0) return 'High'
  if (temp < 10) return 'Moderate'
  return 'Low'
})

const frostbiteRiskPercent = computed(() => {
  if (!todayWeather.value) return '15%'
  const temp = todayWeather.value.tempMinC
  const score = Math.max(10, Math.min(100, Math.round(50 - temp * 3)))
  return `${score}%`
})

const currentTempText = computed(() => {
  if (!todayWeather.value) return '-4°c'
  return `${Math.round(todayWeather.value.tempMeanC)}°c`
})

const feelsLikeTempText = computed(() => {
  if (!todayWeather.value) return '-11°c'
  return `${Math.round(todayWeather.value.tempMeanC - 4)}°c`
})

const microClimateTitle = computed(() => {
  return todayWeather.value?.summary || 'Clear Skies'
})

const microClimateDescription = computed(() => {
  if (!todayWeather.value) return 'No storm fronts detected within a 200km radius.'
  const precip = todayWeather.value.precipitationMm
  if (precip > 5) return 'Peringatan: Hujan deras terdeteksi di sekitar gunung.'
  if (todayWeather.value.windSpeedMax > 25) return 'Peringatan: Angin kencang di area puncak.'
  return `Curah hujan ${precip} mm dengan angin bersahabat.`
})
</script>

<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <!-- Sidebar Component -->
    <Sidebar active="weather"/>

    <!-- Main Content Area -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 flex flex-col justify-between">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex-1 flex flex-col items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-[#023C23] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-sm text-slate-500 font-medium">Memuat data cuaca...</p>
      </div>

      <!-- No Active Expedition State -->
      <div v-else-if="!activeExpedition" class="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center px-4">
        <div class="h-16 w-16 rounded-2xl bg-emerald-50 text-[#023C23] flex items-center justify-center mb-6">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          </svg>
        </div>
        <h2 class="text-xl font-heading font-medium text-slate-900 mb-2">Belum Ada Ekspedisi Aktif</h2>
        <p class="text-sm text-slate-500 mb-6 leading-relaxed">
          Silakan mulai penilaian (Start Assessment) di halaman beranda terlebih dahulu untuk membuat ekspedisi baru dan memantau perkiraan cuaca gunung tujuan.
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
        <h2 class="text-xl font-heading font-medium text-slate-900 mb-2">Gagal Memuat Cuaca</h2>
        <p class="text-sm text-slate-500 mb-6">{{ errorMessage }}</p>
      </div>

      <!-- Main Weather Dashboard Content -->
      <div v-else class="w-full max-w-[1600px] mx-auto space-y-6">
        <!-- Header -->
        <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 class="text-2xl font-heading font-medium text-slate-900">Weather Forecast</h1>
            <p class="text-sm text-slate-500 mt-1">Precision micro-climate data for safe high-altitude expeditions</p>
          </div>
        </header>

        <!-- Bento Grid Container -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 auto-rows-max">
          
          <!-- Hero Card: AI Recommendation (2x2) -->
          <div class="xl:col-span-2 xl:row-span-2 bg-[#023C23] text-white rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div class="relative z-10">
              <!-- Badge -->
              <div class="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-green-100 border border-white/5 w-fit">
                <svg class="w-3.5 h-3.5 fill-current text-green-200" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                AI Recommendation
              </div>
              
              <!-- Title -->
              <h2 class="text-4xl lg:text-5xl font-medium mt-6 leading-tight font-heading">
                Summit Golden Window
              </h2>
              
              <!-- Description -->
              <p class="text-white/80 text-base leading-relaxed mt-4 max-w-[400px]">
                Our AI identifies the optimal window starting <strong class="font-medium text-green-200 underline decoration-green-200/50 decoration-2 underline-offset-4">{{ bestDayFormatted }}</strong>. High visibility, low wind shear, and zero precipitation forecast.
              </p>
            </div>

            <!-- Lower Metrics inside Hero -->
            <div class="flex flex-wrap gap-8 mt-8 border-t border-white/10 pt-6 relative z-10">
              <div>
                <div class="text-xs text-white/50 font-medium">Visibility</div>
                <div class="text-2xl font-medium mt-1 text-white font-heading">{{ visibilityText }}</div>
              </div>
              <div class="border-l border-white/10 pl-8">
                <div class="text-xs text-white/50 font-medium">Wind Speed</div>
                <div class="text-2xl font-medium mt-1 text-white font-heading">{{ windSpeedText }}</div>
              </div>
              <div class="border-l border-white/10 pl-8">
                <div class="text-xs text-white/50 font-medium">Success Rate</div>
                <div class="text-2xl font-medium mt-1 text-green-300 font-heading">{{ successRateText }}</div>
              </div>
            </div>

            <!-- Decorative blur element -->
            <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-green-500/20 blur-3xl rounded-full pointer-events-none"></div>
          </div>

          <!-- Go Status Card (1x2) -->
          <div class="xl:col-span-1 xl:row-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-[#118c13]">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <h2 class="font-medium text-slate-800 text-lg leading-tight">Go Status</h2>
                  <p class="font-medium text-sm" :class="goStatusColorClass">{{ goStatusLabel }}</p>
                </div>
              </div>
              <p class="text-sm text-slate-500 font-normal leading-relaxed mt-6">
                {{ goStatusDescription }}
              </p>
            </div>

            <!-- Progress Bars -->
            <div class="mt-8 space-y-5 bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div>
                <div class="flex justify-between text-xs font-medium text-slate-500 mb-2.5">
                  <span>Atmospheric Stability</span>
                  <span :class="goStatusColorClass">{{ atmosphericStability }}</span>
                </div>
                <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-[#118c13] h-full rounded-full transition-all duration-1000 ease-out" :style="{ width: atmosphericStabilityPercent }"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between text-xs font-medium text-slate-500 mb-2.5">
                  <span>Frostbite Risk</span>
                  <span class="text-slate-700">{{ frostbiteRisk }}</span>
                </div>
                <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-red-500 h-full rounded-full transition-all duration-1000 ease-out" :style="{ width: frostbiteRiskPercent }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Current Temperature Card (1x1) -->
          <div class="xl:col-span-1 xl:row-span-1 bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <svg class="w-12 h-12 text-amber-400 fill-current animate-spin-slow" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <div class="text-4xl font-medium text-slate-800 mt-4 font-heading">{{ currentTempText }}</div>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-xs text-slate-400 font-medium">Feels like</span>
              <span class="text-sm text-slate-600 font-medium">{{ feelsLikeTempText }}</span>
            </div>
          </div>

          <!-- Micro-climate Warning Card (1x1) -->
          <div class="xl:col-span-1 xl:row-span-1 bg-[#FDF9F3] border border-orange-100 rounded-[2.5rem] p-6 shadow-sm flex flex-col justify-center">
            <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="font-medium text-slate-800">{{ microClimateTitle }}</h3>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">{{ microClimateDescription }}</p>
          </div>

          <!-- 7-Day Forecast (4x1) -->
          <div class="xl:col-span-4 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-medium text-slate-800">7-Day Mountain Forecast</h2>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div 
                v-for="(day, index) in weekOutlook" 
                :key="day.date"
                class="bg-slate-50 rounded-xl flex flex-col items-center p-5 border transition-all hover:bg-slate-100"
                :class="index === 0 ? 'border-[#118c13] bg-green-50/20' : 'border-slate-100'"
              >
                <span class="text-xs font-medium text-slate-400">{{ formatDayName(day.date) }}</span>
                
                <!-- Weather Icon -->
                <span class="mt-4 text-3xl">{{ getWeatherIcon(day.weatherCode) }}</span>
                
                <div class="flex items-baseline gap-1 mt-4">
                  <span class="text-xl font-medium text-slate-800">{{ Math.round(day.tempMaxC) }}°</span>
                  <span class="text-xs text-slate-400 font-medium">{{ Math.round(day.tempMinC) }}°</span>
                </div>
                
                <div class="w-full mt-4 border-t border-slate-200 pt-3 space-y-1.5">
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-sky-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3"/>
                    </svg>
                    <span>{{ day.precipitationMm }} mm</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9"/>
                    </svg>
                    <span>{{ Math.round(day.windSpeedMax) }} km/h</span>
                  </div>
                </div>
                
                <span 
                  class="px-2.5 py-1 text-xs font-medium rounded-lg mt-5 w-full text-center"
                  :class="getRiskClass(day.precipitationMm, day.windSpeedMax)"
                >
                  {{ getRiskLabel(day.precipitationMm, day.windSpeedMax) }}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <!-- Footer Component -->
      <Footer class="mt-8"/>
    </main>
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 12s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
