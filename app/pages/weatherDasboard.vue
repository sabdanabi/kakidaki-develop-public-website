<script setup>
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="flex h-screen bg-[#F9FAFB] overflow-hidden font-sans text-slate-800">
    <!-- Sidebar Component -->
    <Sidebar active="weather" />

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col h-full overflow-y-auto">
      <div class="flex-1 p-8 lg:p-12 max-w-[1600px] mx-auto w-full">
        <!-- Header -->
        <header class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <div class="w-6 h-[2px] bg-green-600 rounded-full"></div>
            <span class="text-xs font-bold text-green-700 tracking-wider uppercase">Alpine Intelligence</span>
          </div>
          <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Weather Forecast: Mont Blanc Massif</h1>
          <p class="text-slate-500 text-sm lg:text-base max-w-[800px] leading-relaxed mt-1">
            Precision micro-climate data powered by KakiDaki AI to ensure safe and successful high-altitude expeditions.
          </p>
        </header>

        <!-- Row 1: AI Recommendation & Go Status -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <!-- Left: AI Recommendation Card (2/3 width) -->
          <div class="lg:col-span-2 bg-[#337a35] text-white rounded-[28px] p-8 flex flex-col md:flex-row justify-between gap-6 shadow-sm">
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <!-- Badge -->
                <div class="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-green-100 border border-white/5 w-fit">
                  <svg class="w-3.5 h-3.5 fill-current text-green-200" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  AI RECOMMENDATION
                </div>
                <!-- Title -->
                <h2 class="text-3xl font-extrabold mt-6 leading-tight">Summit Golden Window</h2>
                <!-- Description -->
                <p class="text-white/90 text-sm leading-relaxed mt-4 max-w-[500px]">
                  Our AI identifies the optimal 48-hour window starting <strong class="font-bold text-green-200 underline decoration-green-200/50 decoration-2 underline-offset-4">Tuesday at 04:00</strong>. High visibility, low wind shear, and zero precipitation forecast.
                </p>
              </div>

              <!-- Lower Metrics -->
              <div class="flex flex-wrap gap-8 mt-8 border-t border-white/10 pt-6">
                <div>
                  <div class="text-[10px] text-white/60 font-bold uppercase tracking-wider">Visibility</div>
                  <div class="text-xl font-bold mt-1 text-white">25km+</div>
                </div>
                <div class="border-l border-white/10 pl-8">
                  <div class="text-[10px] text-white/60 font-bold uppercase tracking-wider">Wind Speed</div>
                  <div class="text-xl font-bold mt-1 text-white">12km/h</div>
                </div>
                <div class="border-l border-white/10 pl-8">
                  <div class="text-[10px] text-white/60 font-bold uppercase tracking-wider">Success Rate</div>
                  <div class="text-xl font-bold mt-1 text-white">92%</div>
                </div>
              </div>
            </div>

            <!-- Right inside temperature box -->
            <div class="flex flex-col items-center justify-center bg-white/10 border border-white/15 rounded-2xl p-6 min-w-[170px] shrink-0 text-center self-center md:self-stretch">
              <!-- Sun Icon -->
              <svg class="w-10 h-10 text-amber-300 fill-current animate-spin-slow" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <!-- Temp -->
              <div class="text-4xl font-extrabold text-white mt-4">-4°C</div>
              <!-- Feels Like -->
              <div class="flex flex-col mt-1.5">
                <span class="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Feels like</span>
                <span class="text-sm text-white font-bold mt-0.5">-11°C</span>
              </div>
            </div>
          </div>

          <!-- Right: Go Status Card (1/3 width) -->
          <div class="lg:col-span-1 bg-white rounded-[28px] p-8 border border-slate-100 shadow-sm border-l-4 border-l-[#118c13] flex flex-col justify-between">
            <div>
              <!-- Title -->
              <div class="flex items-center gap-2">
                <svg class="w-6 h-6 text-[#118c13]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <h2 class="font-extrabold text-slate-800 text-lg">Go Status: Optimal</h2>
              </div>
              <!-- Description -->
              <p class="text-xs text-slate-400 font-medium leading-relaxed mt-4">
                Current window (next 12h) is safe for high-altitude trekking. Pressure is stable. No storm fronts detected within 200km radius.
              </p>
            </div>

            <!-- Progress Bars -->
            <div class="mt-8 space-y-6">
              <!-- Bar 1 -->
              <div>
                <div class="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Atmospheric Stability</span>
                  <span class="text-[#118c13]">Stable</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-[#118c13] h-full rounded-full w-full"></div>
                </div>
              </div>
              <!-- Bar 2 -->
              <div>
                <div class="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Frostbite Risk</span>
                  <span class="text-[#118c13]">Low</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-[#118c13] h-full rounded-full w-[15%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: 7-Day Mountain Forecast -->
        <h2 class="text-xl font-bold text-slate-800 mt-10 mb-6">7-Day Mountain Forecast</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <!-- MON -->
          <div class="bg-white rounded-[2rem] flex flex-col items-center p-5 border-2 border-[#118c13] shadow-sm select-none hover:shadow-md transition-all hover:scale-[1.02]">
            <span class="text-xs font-extrabold text-slate-400 tracking-wider">MON</span>
            <!-- Cloudy Icon -->
            <svg class="w-8 h-8 text-slate-400 fill-current mt-4" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            <div class="flex items-baseline gap-1 mt-4">
              <span class="text-xl font-black text-slate-800">-2°</span>
              <span class="text-xs text-slate-400 font-bold">-8°</span>
            </div>
            <!-- Stats -->
            <div class="w-full mt-4 border-t border-slate-100 pt-3 space-y-1.5">
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-sky-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3" />
                </svg>
                <span>15%</span>
              </div>
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9" />
                </svg>
                <span>22km/h</span>
              </div>
            </div>
            <!-- Badge -->
            <span class="px-2.5 py-1 text-[9px] font-extrabold uppercase rounded-lg mt-5 bg-gray-100 text-gray-600 w-full text-center">MODERATE</span>
          </div>

          <!-- TUE -->
          <div class="bg-white rounded-[2rem] flex flex-col items-center p-5 border border-slate-100 shadow-sm select-none hover:shadow-md transition-all hover:scale-[1.02]">
            <span class="text-xs font-extrabold text-slate-400 tracking-wider">TUE</span>
            <!-- Sunny Icon -->
            <svg class="w-8 h-8 text-amber-500 fill-current mt-4 animate-spin-slow" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            <div class="flex items-baseline gap-1 mt-4">
              <span class="text-xl font-black text-slate-800">-4°</span>
              <span class="text-xs text-slate-400 font-bold">-11°</span>
            </div>
            <!-- Stats -->
            <div class="w-full mt-4 border-t border-slate-100 pt-3 space-y-1.5">
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-sky-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3" />
                </svg>
                <span>0%</span>
              </div>
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9" />
                </svg>
                <span>12km/h</span>
              </div>
            </div>
            <!-- Badge -->
            <span class="px-2.5 py-1 text-[9px] font-extrabold uppercase rounded-lg mt-5 bg-green-100 text-green-700 w-full text-center">EASY</span>
          </div>

          <!-- WED -->
          <div class="bg-white rounded-[2rem] flex flex-col items-center p-5 border border-slate-100 shadow-sm select-none hover:shadow-md transition-all hover:scale-[1.02]">
            <span class="text-xs font-extrabold text-slate-400 tracking-wider">WED</span>
            <!-- Sunny Icon -->
            <svg class="w-8 h-8 text-amber-500 fill-current mt-4 animate-spin-slow" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            <div class="flex items-baseline gap-1 mt-4">
              <span class="text-xl font-black text-slate-800">-3°</span>
              <span class="text-xs text-slate-400 font-bold">-9°</span>
            </div>
            <!-- Stats -->
            <div class="w-full mt-4 border-t border-slate-100 pt-3 space-y-1.5">
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-sky-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3" />
                </svg>
                <span>5%</span>
              </div>
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9" />
                </svg>
                <span>14km/h</span>
              </div>
            </div>
            <!-- Badge -->
            <span class="px-2.5 py-1 text-[9px] font-extrabold uppercase rounded-lg mt-5 bg-green-100 text-green-700 w-full text-center">EASY</span>
          </div>

          <!-- THU -->
          <div class="bg-white rounded-[2rem] flex flex-col items-center p-5 border border-slate-100 shadow-sm select-none hover:shadow-md transition-all hover:scale-[1.02]">
            <span class="text-xs font-extrabold text-slate-400 tracking-wider">THU</span>
            <!-- Sun + Cloud Icon -->
            <svg class="w-8 h-8 mt-4" viewBox="0 0 24 24" fill="none">
              <circle cx="16" cy="8" r="3.5" fill="#f59e0b" />
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#94a3b8" />
            </svg>
            <div class="flex items-baseline gap-1 mt-4">
              <span class="text-xl font-black text-slate-800">-1°</span>
              <span class="text-xs text-slate-400 font-bold">-5°</span>
            </div>
            <!-- Stats -->
            <div class="w-full mt-4 border-t border-slate-100 pt-3 space-y-1.5">
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-sky-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3" />
                </svg>
                <span>30%</span>
              </div>
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9" />
                </svg>
                <span>35km/h</span>
              </div>
            </div>
            <!-- Badge -->
            <span class="px-2.5 py-1 text-[9px] font-extrabold uppercase rounded-lg mt-5 bg-gray-100 text-gray-600 w-full text-center">MODERATE</span>
          </div>

          <!-- FRI -->
          <div class="bg-white rounded-[2rem] flex flex-col items-center p-5 border border-slate-100 shadow-sm select-none hover:shadow-md transition-all hover:scale-[1.02]">
            <span class="text-xs font-extrabold text-slate-400 tracking-wider">FRI</span>
            <!-- Snowflake Icon -->
            <svg class="w-8 h-8 text-sky-400 fill-none stroke-current mt-4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
              <path d="M12 6l3 3M12 18l-3-3M18 12l-3-3M6 12l3 3" stroke-width="2.5" />
            </svg>
            <div class="flex items-baseline gap-1 mt-4">
              <span class="text-xl font-black text-slate-800">-6°</span>
              <span class="text-xs text-slate-400 font-bold">-15°</span>
            </div>
            <!-- Stats -->
            <div class="w-full mt-4 border-t border-slate-100 pt-3 space-y-1.5">
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-sky-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3" />
                </svg>
                <span>80%</span>
              </div>
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9" />
                </svg>
                <span>55km/h</span>
              </div>
            </div>
            <!-- Badge -->
            <span class="px-2.5 py-1 text-[9px] font-extrabold uppercase rounded-lg mt-5 bg-red-100 text-red-600 w-full text-center">CHALLENGING</span>
          </div>

          <!-- SAT -->
          <div class="bg-white rounded-[2rem] flex flex-col items-center p-5 border border-slate-100 shadow-sm select-none hover:shadow-md transition-all hover:scale-[1.02]">
            <span class="text-xs font-extrabold text-slate-400 tracking-wider">SAT</span>
            <!-- Cloud + Heavy Snow Icon -->
            <svg class="w-8 h-8 mt-4" viewBox="0 0 24 24" fill="none">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#94a3b8" />
              <!-- Mini snowflakes -->
              <circle cx="8" cy="22" r="1" fill="#38bdf8" />
              <circle cx="12" cy="22" r="1" fill="#38bdf8" />
              <circle cx="16" cy="22" r="1" fill="#38bdf8" />
            </svg>
            <div class="flex items-baseline gap-1 mt-4">
              <span class="text-xl font-black text-slate-800">-8°</span>
              <span class="text-xs text-slate-400 font-bold">-20°</span>
            </div>
            <!-- Stats -->
            <div class="w-full mt-4 border-t border-slate-100 pt-3 space-y-1.5">
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-sky-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3" />
                </svg>
                <span>95%</span>
              </div>
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9" />
                </svg>
                <span>70km/h</span>
              </div>
            </div>
            <!-- Badge -->
            <span class="px-2.5 py-1 text-[9px] font-extrabold uppercase rounded-lg mt-5 bg-red-100 text-red-600 w-full text-center">CHALLENGING</span>
          </div>

          <!-- SUN -->
          <div class="bg-white rounded-[2rem] flex flex-col items-center p-5 border border-slate-100 shadow-sm select-none hover:shadow-md transition-all hover:scale-[1.02]">
            <span class="text-xs font-extrabold text-slate-400 tracking-wider">SUN</span>
            <!-- Cloud Icon -->
            <svg class="w-8 h-8 text-slate-400 fill-current mt-4" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            <div class="flex items-baseline gap-1 mt-4">
              <span class="text-xl font-black text-slate-800">-4°</span>
              <span class="text-xs text-slate-400 font-bold">-10°</span>
            </div>
            <!-- Stats -->
            <div class="w-full mt-4 border-t border-slate-100 pt-3 space-y-1.5">
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-sky-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.35 10.04A7.49 7.49 0 0118 14H6a5 5 0 01-1-9.9m0 0A7.5 7.5 0 0116 8.5" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 18v2M12 18v2M16 18v2" stroke-width="3" />
                </svg>
                <span>40%</span>
              </div>
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 justify-center">
                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4M17 12H7M15 17H9" />
                </svg>
                <span>40km/h</span>
              </div>
            </div>
            <!-- Badge -->
            <span class="px-2.5 py-1 text-[9px] font-extrabold uppercase rounded-lg mt-5 bg-gray-100 text-gray-600 w-full text-center">MODERATE</span>
          </div>
        </div>
      </div>

      <!-- Footer Component -->
      <Footer />
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
