<script setup>
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <!-- Sidebar Component -->
    <Sidebar active="weather"/>

    <!-- Main Content Area -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 lg:p-6 flex flex-col">
      <div class="w-full max-w-[1600px] mx-auto space-y-6">
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
                Our AI identifies the optimal 48-hour window starting <strong class="font-medium text-green-200 underline decoration-green-200/50 decoration-2 underline-offset-4">Tuesday at 04:00</strong>. High visibility, low wind shear, and zero precipitation forecast.
              </p>
            </div>

            <!-- Lower Metrics inside Hero -->
            <div class="flex flex-wrap gap-8 mt-8 border-t border-white/10 pt-6 relative z-10">
              <div>
                <div class="text-xs text-white/50 font-medium">Visibility</div>
                <div class="text-2xl font-medium mt-1 text-white font-heading">25km+</div>
              </div>
              <div class="border-l border-white/10 pl-8">
                <div class="text-xs text-white/50 font-medium">Wind Speed</div>
                <div class="text-2xl font-medium mt-1 text-white font-heading">12km/h</div>
              </div>
              <div class="border-l border-white/10 pl-8">
                <div class="text-xs text-white/50 font-medium">Success Rate</div>
                <div class="text-2xl font-medium mt-1 text-green-300 font-heading">92%</div>
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
                  <p class="text-[#118c13] font-medium text-sm">Optimal</p>
                </div>
              </div>
              <p class="text-sm text-slate-500 font-normal leading-relaxed mt-6">
                Current window (next 12h) is safe for high-altitude trekking. Pressure is stable. No storm fronts detected within 200km radius.
              </p>
            </div>

            <!-- Progress Bars -->
            <div class="mt-8 space-y-5 bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div>
                <div class="flex justify-between text-xs font-medium text-slate-500 mb-2.5">
                  <span>Atmospheric Stability</span>
                  <span class="text-[#118c13]">Stable</span>
                </div>
                <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-[#118c13] h-full rounded-full w-full transition-all duration-1000 ease-out"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between text-xs font-medium text-slate-500 mb-2.5">
                  <span>Frostbite Risk</span>
                  <span class="text-[#118c13]">Low</span>
                </div>
                <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-[#118c13] h-full rounded-full w-[15%] transition-all duration-1000 ease-out"></div>
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
            <div class="text-4xl font-medium text-slate-800 mt-4 font-heading">-4°c</div>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-xs text-slate-400 font-medium">Feels like</span>
              <span class="text-sm text-slate-600 font-medium">-11°c</span>
            </div>
          </div>

          <!-- Micro-climate Warning Card (1x1) -->
          <div class="xl:col-span-1 xl:row-span-1 bg-[#FDF9F3] border border-orange-100 rounded-[2.5rem] p-6 shadow-sm flex flex-col justify-center">
            <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="font-medium text-slate-800">Clear Skies</h3>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">No storm fronts detected within a 200km radius.</p>
          </div>

          <!-- 7-Day Forecast (4x1) -->
          <div class="xl:col-span-4 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-medium text-slate-800">7-Day Mountain Forecast</h2>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <!-- MON -->
              <div class="bg-slate-50 rounded-xl flex flex-col items-center p-5 border-2 border-[#118c13] transition-all">
                <span class="text-xs font-medium text-slate-400">Mon</span>
                <svg class="w-8 h-8 text-slate-400 fill-current mt-4" viewBox="0 0 24 24">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                </svg>
                <div class="flex items-baseline gap-1 mt-4">
                  <span class="text-xl font-medium text-slate-800">-2°</span>
                  <span class="text-xs text-slate-400 font-medium">-8°</span>
                </div>
                <div class="w-full mt-4 border-t border-slate-200 pt-3 space-y-1.5">
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-sky-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3"/>
                    </svg>
                    <span>15%</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9"/>
                    </svg>
                    <span>22km/h</span>
                  </div>
                </div>
                <span class="px-2.5 py-1 text-xs font-medium rounded-lg mt-5 bg-slate-200 text-slate-600 w-full text-center">Moderate</span>
              </div>

              <!-- TUE -->
              <div class="bg-slate-50 rounded-xl flex flex-col items-center p-5 border border-slate-100 transition-all hover:bg-slate-100">
                <span class="text-xs font-medium text-slate-400">Tue</span>
                <svg class="w-8 h-8 text-amber-500 fill-current mt-4 animate-spin-slow" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"/>
                  <path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
                <div class="flex items-baseline gap-1 mt-4">
                  <span class="text-xl font-medium text-slate-800">-4°</span>
                  <span class="text-xs text-slate-400 font-medium">-11°</span>
                </div>
                <div class="w-full mt-4 border-t border-slate-200 pt-3 space-y-1.5">
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-sky-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3"/>
                    </svg>
                    <span>0%</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9"/>
                    </svg>
                    <span>12km/h</span>
                  </div>
                </div>
                <span class="px-2.5 py-1 text-xs font-medium rounded-lg mt-5 bg-green-100 text-green-700 w-full text-center">Easy</span>
              </div>

              <!-- WED -->
              <div class="bg-slate-50 rounded-xl flex flex-col items-center p-5 border border-slate-100 transition-all hover:bg-slate-100">
                <span class="text-xs font-medium text-slate-400">Wed</span>
                <svg class="w-8 h-8 text-amber-500 fill-current mt-4 animate-spin-slow" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"/>
                  <path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
                <div class="flex items-baseline gap-1 mt-4">
                  <span class="text-xl font-medium text-slate-800">-3°</span>
                  <span class="text-xs text-slate-400 font-medium">-9°</span>
                </div>
                <div class="w-full mt-4 border-t border-slate-200 pt-3 space-y-1.5">
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-sky-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3"/>
                    </svg>
                    <span>5%</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9"/>
                    </svg>
                    <span>14km/h</span>
                  </div>
                </div>
                <span class="px-2.5 py-1 text-xs font-medium rounded-lg mt-5 bg-green-100 text-green-700 w-full text-center">Easy</span>
              </div>

              <!-- THU -->
              <div class="bg-slate-50 rounded-xl flex flex-col items-center p-5 border border-slate-100 transition-all hover:bg-slate-100">
                <span class="text-xs font-medium text-slate-400">Thu</span>
                <svg class="w-8 h-8 mt-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="16" cy="8" r="3.5" fill="#f59e0b"/>
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#94a3b8"/>
                </svg>
                <div class="flex items-baseline gap-1 mt-4">
                  <span class="text-xl font-medium text-slate-800">-1°</span>
                  <span class="text-xs text-slate-400 font-medium">-5°</span>
                </div>
                <div class="w-full mt-4 border-t border-slate-200 pt-3 space-y-1.5">
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-sky-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3"/>
                    </svg>
                    <span>30%</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9"/>
                    </svg>
                    <span>35km/h</span>
                  </div>
                </div>
                <span class="px-2.5 py-1 text-xs font-medium rounded-lg mt-5 bg-slate-200 text-slate-600 w-full text-center">Moderate</span>
              </div>

              <!-- FRI -->
              <div class="bg-slate-50 rounded-xl flex flex-col items-center p-5 border border-slate-100 transition-all hover:bg-slate-100">
                <span class="text-xs font-medium text-slate-400">Fri</span>
                <svg class="w-8 h-8 text-sky-400 fill-none stroke-current mt-4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5"/>
                  <path d="M12 6l3 3M12 18l-3-3M18 12l-3-3M6 12l3 3" stroke-width="2.5"/>
                </svg>
                <div class="flex items-baseline gap-1 mt-4">
                  <span class="text-xl font-medium text-slate-800">-6°</span>
                  <span class="text-xs text-slate-400 font-medium">-15°</span>
                </div>
                <div class="w-full mt-4 border-t border-slate-200 pt-3 space-y-1.5">
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-sky-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3"/>
                    </svg>
                    <span>80%</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9"/>
                    </svg>
                    <span>55km/h</span>
                  </div>
                </div>
                <span class="px-2.5 py-1 text-xs font-medium rounded-lg mt-5 bg-red-50 text-red-600 w-full text-center">Challenging</span>
              </div>

              <!-- SAT -->
              <div class="bg-slate-50 rounded-xl flex flex-col items-center p-5 border border-slate-100 transition-all hover:bg-slate-100">
                <span class="text-xs font-medium text-slate-400">Sat</span>
                <svg class="w-8 h-8 mt-4" viewBox="0 0 24 24" fill="none">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#94a3b8"/>
                  <circle cx="8" cy="22" r="1" fill="#38bdf8"/>
                  <circle cx="12" cy="22" r="1" fill="#38bdf8"/>
                  <circle cx="16" cy="22" r="1" fill="#38bdf8"/>
                </svg>
                <div class="flex items-baseline gap-1 mt-4">
                  <span class="text-xl font-medium text-slate-800">-8°</span>
                  <span class="text-xs text-slate-400 font-medium">-20°</span>
                </div>
                <div class="w-full mt-4 border-t border-slate-200 pt-3 space-y-1.5">
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-sky-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3"/>
                    </svg>
                    <span>95%</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9"/>
                    </svg>
                    <span>70km/h</span>
                  </div>
                </div>
                <span class="px-2.5 py-1 text-xs font-medium rounded-lg mt-5 bg-red-50 text-red-600 w-full text-center">Challenging</span>
              </div>

              <!-- SUN -->
              <div class="bg-slate-50 rounded-xl flex flex-col items-center p-5 border border-slate-100 transition-all hover:bg-slate-100">
                <span class="text-xs font-medium text-slate-400">Sun</span>
                <svg class="w-8 h-8 text-slate-400 fill-current mt-4" viewBox="0 0 24 24">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                </svg>
                <div class="flex items-baseline gap-1 mt-4">
                  <span class="text-xl font-medium text-slate-800">-4°</span>
                  <span class="text-xs text-slate-400 font-medium">-10°</span>
                </div>
                <div class="w-full mt-4 border-t border-slate-200 pt-3 space-y-1.5">
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-sky-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3"/>
                    </svg>
                    <span>40%</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 justify-center">
                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9"/>
                    </svg>
                    <span>40km/h</span>
                  </div>
                </div>
                <span class="px-2.5 py-1 text-xs font-medium rounded-lg mt-5 bg-slate-200 text-slate-600 w-full text-center">Moderate</span>
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
