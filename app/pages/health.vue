<script setup>
definePageMeta({
  layout: false
})
</script>

<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <!-- Sidebar Component (Auto-imported) -->
    <Sidebar active="health" />

    <!-- MAIN CONTENT AREA -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 lg:p-6 flex flex-col">
      <div class="w-full max-w-[1600px] mx-auto space-y-6">
        
        <!-- HEADER -->
        <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 class="text-2xl font-heading font-medium text-slate-900">Health & Readiness</h1>
            <p class="text-sm text-slate-500 mt-1">Personal biometric data and physiological validation for alpine missions</p>
          </div>

          <button class="inline-flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 bg-white rounded-xl px-4 py-2.5 text-xs font-medium transition-all shadow-sm active:scale-[0.98]">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
            </svg>
            Update Profile
          </button>
        </header>

        <!-- BENTO GRID -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 auto-rows-max">

          <!-- Hero Card: High Altitude Readiness (2x2) -->
          <div class="xl:col-span-2 xl:row-span-2 bg-[#023C23] rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div class="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-100 text-xs font-medium w-fit">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse"></span>
                  Physical Validation Active
                </div>
                <h2 class="text-4xl lg:text-5xl font-medium text-white mt-6 font-heading leading-tight">
                  High-Altitude Readiness
                </h2>
                <p class="text-white/80 text-base leading-relaxed mt-4 max-w-[400px]">
                  Your current biometrics indicate high aerobic capacity and optimal strength-to-weight ratio for peaks above 3,000m.
                </p>
              </div>

              <!-- Metrics row inside Hero -->
              <div class="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 mt-8">
                <div>
                  <p class="text-xs text-white/50 font-medium mb-1">BMI Index</p>
                  <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-medium text-white font-heading">23.1</span>
                    <span class="text-xs font-medium text-green-300">Healthy</span>
                  </div>
                </div>
                <div>
                  <p class="text-xs text-white/50 font-medium mb-1">Risk Category</p>
                  <div class="flex items-center gap-2 text-green-300">
                    <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                    </svg>
                    <span class="text-xl font-medium">Optimal</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Decorative blur element -->
            <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-green-500/20 blur-3xl rounded-full pointer-events-none"></div>
          </div>

          <!-- Skorfisik Radial Dial (1x2) -->
          <div class="xl:col-span-1 xl:row-span-2 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden group">
            <h3 class="font-medium text-slate-800 text-lg absolute top-6 left-6">Validation Score</h3>
            
            <div class="relative w-48 h-48 flex items-center justify-center mt-8">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <!-- Background circle -->
                <path
                  class="text-slate-100"
                  stroke="currentColor"
                  stroke-width="2.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <!-- Progress circle (85%) -->
                <path
                  class="text-[#118c13]"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-dasharray="85, 100"
                  stroke-linecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div class="absolute text-center flex flex-col items-center justify-center">
                <span class="text-5xl font-medium text-slate-800 block leading-none font-heading">85</span>
                <span class="text-xs font-medium text-slate-400 mt-1">/ 100</span>
              </div>
            </div>
            <p class="text-xs text-slate-400 text-center mt-6">Based on VO2 Max and strength metrics</p>
          </div>

          <!-- Strava Sync Card (1x2) -->
          <div class="xl:col-span-1 xl:row-span-2 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[300px]">
            <div class="flex items-start justify-between">
              <div class="w-12 h-12 bg-[#FFF0E5] rounded-2xl flex items-center justify-center text-[#fc5200]">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <span class="bg-emerald-50 text-[#118c13] border border-emerald-100 rounded-full px-2.5 py-1 text-xs font-medium flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-[#118c13]"></div>
                Connected
              </span>
            </div>

            <div class="mt-8 space-y-2 flex-1">
              <h3 class="font-medium text-slate-800 text-xl font-heading">Strava Sync</h3>
              <p class="text-sm text-slate-400 leading-relaxed">
                Automated data extraction for heart rate variability and VO2 Max metrics.
              </p>
            </div>

            <div>
              <div class="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-500 font-medium flex justify-between items-center mb-4">
                <span>Last Synced</span>
                <span class="text-slate-800">Today, 08:45 AM</span>
              </div>

              <button class="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-3 rounded-xl font-medium text-xs transition-colors active:scale-[0.98]">
                Manage Connection
              </button>
            </div>
          </div>

          <!-- Biometrics & Medical Insights (4x1) -->
          <div class="xl:col-span-4 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <!-- Left: Biometrics -->
              <div>
                <h3 class="font-medium text-slate-800 text-lg mb-4">Biometrics & Personal Data</h3>
                <div class="grid grid-cols-2 gap-4">
                  <!-- Tinggi Badan -->
                  <div class="bg-slate-50 rounded-xl p-4 flex items-center gap-3.5 border border-slate-100">
                    <div class="w-10 h-10 bg-green-100/50 rounded-xl flex items-center justify-center text-[#118c13]">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0v-1.5m0 1.5v1.5m15-1.5v-1.5m0 1.5v1.5M6 10.5v3M9 10.5v1.5M12 10.5v3M15 10.5v1.5M18 10.5v3"/>
                      </svg>
                    </div>
                    <div>
                      <p class="text-xs text-slate-400 font-medium">Tinggi Badan</p>
                      <p class="text-sm font-medium text-slate-800">182 cm</p>
                    </div>
                  </div>

                  <!-- Berat Badan -->
                  <div class="bg-slate-50 rounded-xl p-4 flex items-center gap-3.5 border border-slate-100">
                    <div class="w-10 h-10 bg-green-100/50 rounded-xl flex items-center justify-center text-[#118c13]">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18M3 12h18m-9-9l3 3m-3-3L9 6m3 15l3-3m-3 3l-3-3"/>
                      </svg>
                    </div>
                    <div>
                      <p class="text-xs text-slate-400 font-medium">Berat Badan</p>
                      <p class="text-sm font-medium text-slate-800">76 kg</p>
                    </div>
                  </div>

                  <!-- Umur -->
                  <div class="bg-slate-50 rounded-xl p-4 flex items-center gap-3.5 border border-slate-100">
                    <div class="w-10 h-10 bg-green-100/50 rounded-xl flex items-center justify-center text-[#118c13]">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                    <div>
                      <p class="text-xs text-slate-400 font-medium">Umur</p>
                      <p class="text-sm font-medium text-slate-800">28 Tahun</p>
                    </div>
                  </div>

                  <!-- Jenis Kelamin -->
                  <div class="bg-slate-50 rounded-xl p-4 flex items-center gap-3.5 border border-slate-100">
                    <div class="w-10 h-10 bg-green-100/50 rounded-xl flex items-center justify-center text-[#118c13]">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                      </svg>
                    </div>
                    <div>
                      <p class="text-xs text-slate-400 font-medium">Jenis Kelamin</p>
                      <p class="text-sm font-medium text-slate-800">Laki-laki</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right: Medical Insights -->
              <div>
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-medium text-slate-800 text-lg">Medical Insights</h3>
                  <div class="flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-md">
                    <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>Last Checkup: Oct 12, 2023</span>
                  </div>
                </div>

                <div class="space-y-3">
                  <!-- Asthma -->
                  <div class="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-between">
                    <div class="flex items-center gap-3 text-slate-700 font-medium text-sm">
                      <div class="w-8 h-8 rounded-lg bg-emerald-100/50 flex items-center justify-center text-emerald-600">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697-.056-4.024-.166C6.845 7.996 6 7.11 6 6.062V5.25m6 3c1.355 0 2.697-.056 4.024-.166C17.155 7.996 18 7.11 18 6.062V5.25M6 6.062c0-1.243.912-2.311 2.148-2.42A42.164 42.164 0 0112 3.5c1.282 0 2.56.037 3.824.11C17.088 3.722 18 4.79 18 6.033"/>
                        </svg>
                      </div>
                      Asthma (Mild)
                    </div>
                    <span class="bg-amber-50 text-amber-600 border border-amber-100 rounded-md px-2 py-0.5 text-xs font-medium">Monitor</span>
                  </div>

                  <!-- Knee ACL Repair -->
                  <div class="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-between">
                    <div class="flex items-center gap-3 text-slate-700 font-medium text-sm">
                      <div class="w-8 h-8 rounded-lg bg-emerald-100/50 flex items-center justify-center text-emerald-600">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v7"/>
                        </svg>
                      </div>
                      Knee ACL Repair
                    </div>
                    <span class="bg-emerald-50 text-[#118c13] border border-emerald-100 rounded-md px-2 py-0.5 text-xs font-medium">Recovered</span>
                  </div>
                </div>

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
/* Custom animations if needed */
</style>
