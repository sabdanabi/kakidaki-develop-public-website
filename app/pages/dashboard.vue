<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <Sidebar active="dashboard" />
    
    <!-- MAIN CONTENT AREA -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 flex flex-col justify-between">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex-1 flex flex-col items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-[#023C23] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-sm text-slate-500 font-medium">Memuat dashboard ekspedisi...</p>
      </div>

      <!-- No Active Expedition State -->
      <div v-else-if="dashboardMountains.length === 0" class="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center px-4 py-12">
        <div class="h-16 w-16 rounded-2xl bg-emerald-50 text-[#023C23] flex items-center justify-center mb-6">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/>
          </svg>
        </div>
        <h2 class="text-xl font-heading font-medium text-slate-900 mb-2">Belum Ada Ekspedisi Aktif</h2>
        <p class="text-sm text-slate-500 mb-6 leading-relaxed">
          Silakan mulai penilaian (Start Assessment) di halaman beranda terlebih dahulu untuk membuat ekspedisi baru dan melacak program kesiapan fisik, logistik, dan perkiraan cuaca Anda.
        </p>
        <NuxtLink to="/" class="px-6 py-2.5 bg-[#023C23] hover:bg-emerald-700 text-white rounded-full text-sm font-semibold transition-all shadow-sm">
          Kembali ke Beranda
        </NuxtLink>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center px-4 py-12">
        <div class="h-16 w-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h2 class="text-xl font-heading font-medium text-slate-900 mb-2">Gagal Memuat Dashboard</h2>
        <p class="text-sm text-slate-500 mb-6">{{ errorMessage }}</p>
      </div>

      <!-- Active Dashboard Content -->
      <div v-else class="w-full max-w-[1600px] mx-auto space-y-6">
        
        <!-- Top Section (Selector) -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-heading font-medium text-slate-900">Dashboard</h1>
            <p class="text-sm text-slate-500 mt-1">Your expedition overview and readiness metrics</p>
          </div>
          
          <!-- Mountain Tabs Selector -->
          <div class="flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200/50 shadow-sm w-full sm:w-auto overflow-x-auto">
            <button
              v-for="(mt, idx) in dashboardMountains"
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
        <section v-if="selectedMountain" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 auto-rows-max">
          
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
                    <path class="text-[#118c13] transition-all duration-500" stroke="currentColor" stroke-width="3" :stroke-dasharray="`${physicalReadinessScore}, 100`" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
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
                      <p class="text-xs text-slate-500 font-medium">Latihan Selesai</p>
                      <p class="text-sm font-medium text-slate-900">{{ completedCount }} / {{ totalCount }} Tugas</p>
                    </div>
                  </div>
                  <span class="text-xs font-medium text-[#118c13] bg-emerald-50 px-2 py-1 rounded-lg">GO</span>
                </div>
                
                <div>
                  <div class="flex justify-between text-xs font-medium text-slate-600 mb-1.5">
                    <span>Cardio Consistency</span>
                    <span>{{ cardioProgressPercent }}%</span>
                  </div>
                  <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-[#118c13] rounded-full transition-all duration-500" :style="`width: ${cardioProgressPercent}%`"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. WEATHER WIDGET (Spans 1 col, 1 row) -->
          <div class="bg-[#023C23] rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between group min-h-[180px]">
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            
            <div class="relative z-10" v-if="activeWeather">
              <div class="flex items-center justify-between">
                <h3 class="font-heading font-medium text-white text-lg">Forecast</h3>
                <!-- Date Picker Mini -->
                <select v-model="selectedDate" class="bg-white/10 text-white text-xs border border-white/20 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-emerald-500">
                  <option v-for="item in weekOutlook" :key="item.date" :value="item.date" class="text-slate-900">
                    {{ formatDate(item.date) }}
                  </option>
                </select>
              </div>

              <div class="flex items-center gap-4 mt-6">
                <div class="text-white">
                  <!-- Dynamic Weather Icon -->
                  <svg v-if="getWeatherIcon(activeWeather.weatherCode) === 'snowflake'" class="w-12 h-12 text-sky-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m9-9H3m14.5-6.5l-11 11m11 0l-11-11" />
                  </svg>
                  <svg v-else-if="getWeatherIcon(activeWeather.weatherCode) === 'sun'" class="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                  <svg v-else-if="getWeatherIcon(activeWeather.weatherCode) === 'rain'" class="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a6.002 6.002 0 0111.127-3.349A5.25 5.25 0 0018 10.5a5.25 5.25 0 10-10.233 2.33A4.502 4.502 0 002.25 15v3.75z" />
                  </svg>
                  <svg v-else-if="getWeatherIcon(activeWeather.weatherCode) === 'warning'" class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <svg v-else class="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                  </svg>
                </div>
                <div>
                  <div class="flex items-baseline gap-2">
                    <span class="text-4xl font-heading font-medium text-white">{{ activeWeather.tempMeanC }}°C</span>
                  </div>
                  <p class="text-xs text-emerald-200/80 mt-1">Feels like {{ activeWeather.tempMinC }}°C - {{ activeWeather.tempMaxC }}°C</p>
                </div>
              </div>
            </div>
            
            <div class="relative z-10" v-else>
              <p class="text-xs text-emerald-200/80">Weather forecasts are not available for this target window.</p>
            </div>
            
            <div class="relative z-10 mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-emerald-100" v-if="activeWeather">
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path></svg>
                {{ activeWeather.windSpeedMax }} km/h
              </span>
              <span :class="[
                  activeWeather.tempMeanC <= 5 ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                  activeWeather.tempMeanC <= 12 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-white/10 text-emerald-200 border border-white/10',
                  'px-2 py-1 rounded font-medium'
                ]">
                {{ activeWeather.tempMeanC <= 5 ? 'CRITICAL' : activeWeather.tempMeanC <= 12 ? 'WARNING' : 'NORMAL' }}
              </span>
            </div>
          </div>

          <!-- 4. LOGISTICAL PROGRESS (Spans 1 col, 1 row) -->
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 flex flex-col justify-between group hover:shadow-md transition-shadow min-h-[180px]">
            <div>
              <h3 class="font-heading font-medium text-slate-800 text-lg">Logistics</h3>
              <p class="text-xs text-slate-400 mt-0.5">Preparation checklist</p>
            </div>

            <div class="my-5">
              <div class="flex justify-between items-end mb-2">
                <span class="text-2xl font-heading font-medium text-slate-800 leading-none">{{ logisticalProgressPercent }}<span class="text-sm text-slate-400">%</span></span>
                <span class="text-[10px] font-medium text-slate-400">COMPLETED</span>
              </div>
              <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-slate-800 rounded-full transition-all duration-500" :style="`width: ${logisticalProgressPercent}%`"></div>
              </div>
            </div>

            <div class="space-y-2 text-xs font-medium text-slate-600">
              <div class="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
                <div :class="[logisticalProgressPercent > 0 ? 'bg-[#118c13] border-transparent text-white' : 'border-slate-300 bg-white', 'w-4 h-4 rounded-full border flex items-center justify-center shrink-0']">
                  <svg v-if="logisticalProgressPercent > 0" class="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                </div>
                Gear Checklist ({{ packedItemsCount }}/{{ totalItems }} packed)
              </div>
            </div>
          </div>
        </section>

        <!-- 5. EXPEDITION SCHEDULE TIMELINE (Spans full width) -->
        <section class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40" v-if="selectedMountain">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 class="font-heading font-medium text-slate-800 text-lg">Expedition Plan</h3>
              <p class="text-xs text-slate-400 mt-0.5">{{ formatFullDateRange }} • {{ durationDays }}-Day Window</p>
            </div>
            <span class="bg-emerald-50 border border-emerald-100 text-[#118c13] rounded-full px-3 py-1.5 text-xs font-medium w-fit">Status: Active</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5" v-if="weekOutlook && weekOutlook.length > 0">
            <!-- Dynamic Days in Forecast -->
            <div 
              v-for="(day, index) in weekOutlook.slice(0, 3)" 
              :key="day.date"
              :class="[
                index === 1 
                  ? 'border-2 border-[#118c13]/30 bg-emerald-50/30 hover:bg-emerald-50/70' 
                  : 'border border-slate-100 bg-slate-50/50 hover:bg-white',
                'relative p-5 rounded-2xl hover:shadow-md transition-all group'
              ]"
            >
              <div 
                :class="[
                  index === 1 
                    ? 'bg-[#118c13] text-white border-2 border-white' 
                    : 'bg-white border border-slate-200 text-slate-600 group-hover:border-[#118c13] group-hover:text-[#118c13]',
                  'absolute -top-3 left-5 px-3 py-1 rounded-full text-xs font-medium shadow-sm transition-colors'
                ]"
              >
                Day {{ index + 1 }} • {{ getDayName(day.date) }}
              </div>
              <div class="mt-2">
                <h4 class="font-heading font-medium text-slate-900">{{ getWeatherLabel(day.weatherCode) }}</h4>
                <p class="text-xs text-slate-500 mt-1.5">{{ day.summary || 'Ramalan cuaca untuk kesiapan mendaki.' }}</p>
                
                <div class="flex items-center gap-3 mt-4 text-xs font-medium text-slate-600">
                  <span class="flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-100 shadow-sm">
                    Mean: {{ day.tempMeanC }}°C
                  </span>
                  <span class="flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-100 shadow-sm">
                    Min/Max: {{ day.tempMinC }}°C - {{ day.tempMaxC }}°C
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="py-6 text-center text-slate-400 text-xs font-medium border border-dashed border-slate-200 rounded-2xl bg-slate-50/30" v-else>
            No day plan details loaded.
          </div>
        </section>
      </div>
      
      <!-- Footer Component -->
      <Footer class="mt-8"/>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'
import { useExpeditionStore } from '~/stores/expedition'
import { useWeatherStore } from '~/stores/weather'
import { useLogisticsStore } from '~/stores/logistics'

definePageMeta({
  layout: false
})

const authStore = useAuthStore()
const profileStore = useProfileStore()
const expeditionStore = useExpeditionStore()
const weatherStore = useWeatherStore()
const logisticsStore = useLogisticsStore()

const isLoading = ref(true)
const errorMessage = ref('')
const selectedMountainIndex = ref(0)
const selectedDate = ref('')

const dashboardMountains = computed(() => {
  return expeditionStore.expeditions.map((exp) => {
    const mt = exp.mountain || {}
    return {
      id: exp.id || exp._id,
      name: mt.name || 'Gunung',
      elevation: mt.elevationM ? `${mt.elevationM.toLocaleString('id-ID')} m` : '3.000 m',
      difficulty: mt.difficulty || 'MEDIUM',
      jarak_puncak: mt.distanceToPeakKm || 0,
      suhu_normal: mt.baseTempC || 15,
      location: mt.description || 'Jawa, Indonesia',
      image: mt.imageUrl || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
      startDate: exp.startDate,
      endDate: exp.endDate
    }
  })
})

const selectedMountain = computed(() => {
  return dashboardMountains.value[selectedMountainIndex.value] || null
})

watch(selectedMountain, async (newMt) => {
  if (!newMt) return
  
  selectedDate.value = ''
  
  await expeditionStore.fetchExpeditionById(newMt.id)
  await weatherStore.fetchWeather(newMt.id)
  if (weekOutlook.value && weekOutlook.value.length > 0) {
    selectedDate.value = weekOutlook.value[0].date
  }
  
  await logisticsStore.fetchLogistics(newMt.id)
}, { immediate: false })

onMounted(async () => {
  await profileStore.fetchProfile()
  if (authStore.user?.role?.toUpperCase() === 'ADMIN') {
    navigateTo('/admin/gunung')
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  
  await expeditionStore.fetchMountains()
  
  const expRes = await expeditionStore.fetchExpeditions()
  if (!expRes.success) {
    errorMessage.value = expRes.message || 'Gagal memuat data ekspedisi.'
    isLoading.value = false
    return
  }
  
  if (dashboardMountains.value.length > 0) {
    const defaultMt = dashboardMountains.value[0]
    
    await expeditionStore.fetchExpeditionById(defaultMt.id)
    await weatherStore.fetchWeather(defaultMt.id)
    if (weekOutlook.value && weekOutlook.value.length > 0) {
      selectedDate.value = weekOutlook.value[0].date
    }
    
    await logisticsStore.fetchLogistics(defaultMt.id)
  }
  
  isLoading.value = false
})

const physicalReadinessScore = computed(() => {
  return expeditionStore.activeExpeditionDetails?.readinessScore || 0
})

const trainingPlan = computed(() => {
  return expeditionStore.activeExpeditionDetails?.trainingPlan || null
})

const tasks = computed(() => {
  return trainingPlan.value?.tasks || []
})

const completedTasks = computed(() => {
  return tasks.value.filter(t => t.isCompleted)
})

const totalCount = computed(() => tasks.value.length)
const completedCount = computed(() => completedTasks.value.length)

const cardioProgressPercent = computed(() => {
  if (tasks.value.length === 0) return 0
  return Math.round((completedTasks.value.length / tasks.value.length) * 100)
})

const weekOutlook = computed(() => weatherStore.weatherData?.weekOutlook || [])

const activeWeather = computed(() => {
  if (!selectedDate.value || !weekOutlook.value.length) return null
  return weekOutlook.value.find(w => w.date === selectedDate.value) || null
})

const totalItems = computed(() => logisticsStore.items.length)
const packedItemsCount = computed(() => logisticsStore.items.filter(item => item.isPacked).length)
const logisticalProgressPercent = computed(() => {
  if (totalItems.value === 0) return 0
  return Math.round((packedItemsCount.value / totalItems.value) * 100)
})

const durationDays = computed(() => {
  if (!selectedMountain.value?.startDate || !selectedMountain.value?.endDate) return 0
  const start = new Date(selectedMountain.value.startDate)
  const end = new Date(selectedMountain.value.endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}

const formatFullDateRange = computed(() => {
  if (!selectedMountain.value?.startDate || !selectedMountain.value?.endDate) return ''
  const start = new Date(selectedMountain.value.startDate)
  const end = new Date(selectedMountain.value.endDate)
  const startStr = start.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })
  const endStr = end.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  return `${startStr} - ${endStr}`
})

const getDayName = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { weekday: 'long' })
}

const getWeatherIcon = (code) => {
  if ([0, 1].includes(code)) return 'sun'
  if ([2, 3].includes(code)) return 'cloudy'
  if ([45, 48].includes(code)) return 'cloudy'
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snowflake'
  if ([95, 96, 99].includes(code)) return 'warning'
  return 'cloudy'
}

const getWeatherLabel = (code) => {
  if ([0, 1].includes(code)) return 'Cerah'
  if ([2, 3].includes(code)) return 'Berawan'
  if ([45, 48].includes(code)) return 'Berkabut'
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Hujan'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Salju'
  if ([95, 96, 99].includes(code)) return 'Badai Guruh'
  return 'Berawan'
}
</script>
