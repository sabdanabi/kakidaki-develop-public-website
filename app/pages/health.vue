<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <!-- Sidebar Component (Auto-imported) -->
    <Sidebar />

    <!-- MAIN CONTENT AREA -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 lg:p-10 flex flex-col justify-between">
      
      <!-- Top Content Container -->
      <div class="space-y-8">
        
        <!-- HEADER & BREADCRUMB -->
        <header class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div class="space-y-1">
            <!-- Breadcrumb -->
            <nav class="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <span>Account</span>
              <span class="text-slate-300">></span>
              <span class="text-[#118c13]">Health Profile</span>
            </nav>
            <!-- Title -->
            <h1 class="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mt-1">
              Health & Readiness
            </h1>
            <p class="text-xs md:text-sm text-slate-400">
              Personal biometric data and physiological validation for alpine missions.
            </p>
          </div>

          <!-- Update Profile Button -->
          <button class="inline-flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 bg-white rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-sm active:scale-[0.98]">
            <!-- Pencil/Edit Icon -->
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Update Profile
          </button>
        </header>

        <!-- ROW 1 (High-Altitude Readiness & Strava Sync) -->
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- High-Altitude Readiness Card -->
          <div class="lg:col-span-2 bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
            <!-- Physical score donut dial -->
            <div class="relative w-36 h-36 flex items-center justify-center shrink-0">
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
              <div class="absolute text-center">
                <span class="text-4xl font-extrabold text-slate-800 block tracking-tight leading-none">85</span>
                <span class="text-[9px] font-bold text-slate-400 tracking-wider">SKORFISIK</span>
              </div>
            </div>

            <!-- Details -->
            <div class="flex-1 space-y-3 w-full">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-100/60 text-[#118c13] text-[9px] font-bold uppercase tracking-wider w-fit">
                <span class="w-1.5 h-1.5 rounded-full bg-[#118c13]"></span>
                PHYSICAL VALIDATION ACTIVE
              </div>
              <h2 class="text-2xl font-extrabold text-slate-800">
                High-Altitude Readiness
              </h2>
              
              <!-- Metrics row -->
              <div class="grid grid-cols-2 gap-4 border-y border-slate-100 py-4 my-3">
                <div>
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">BMI INDEX</p>
                  <div class="flex items-center gap-1.5">
                    <span class="text-base font-extrabold text-slate-800">23.1</span>
                    <span class="text-xs font-bold text-[#118c13]">Healthy</span>
                  </div>
                </div>
                <div>
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">RISK CATEGORY</p>
                  <div class="flex items-center gap-1.5 text-[#118c13]">
                    <!-- Shield Check Icon -->
                    <svg class="w-4 h-4 text-[#118c13] shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <span class="text-base font-extrabold text-slate-800">Optimal</span>
                  </div>
                </div>
              </div>

              <p class="text-xs text-slate-400 leading-relaxed">
                Your current biometrics indicate high aerobic capacity and optimal strength-to-weight ratio for peaks above 3,000m.
              </p>
            </div>
          </div>

          <!-- Strava Sync Card -->
          <div class="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[260px]">
            <div class="flex items-start justify-between">
              <!-- Orange Strava Thunder Badge -->
              <div class="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center text-[#fc5200]">
                <!-- Thunder SVG -->
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="bg-emerald-50 text-[#118c13] border border-emerald-100 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase">Connected</span>
            </div>

            <div class="mt-4 space-y-1">
              <h3 class="font-extrabold text-slate-800 text-lg">Strava Sync</h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                Automated data extraction for heart rate variability and VO2 Max metrics.
              </p>
            </div>

            <!-- Last Synced box -->
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[10px] text-slate-500 font-bold flex justify-between items-center my-3">
              <span>Last Synced</span>
              <span class="text-slate-800">Today, 08:45 AM</span>
            </div>

            <button class="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs tracking-wider transition-colors active:scale-[0.98]">
              Manage Connection
            </button>
          </div>
        </section>

        <!-- ROW 2 (Biometrics & Medical Insights) -->
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Kolom Kiri: Biometrics & Personal Data -->
          <div class="space-y-3">
            <h3 class="font-bold text-slate-400 text-[11px] uppercase tracking-widest pl-1">
              Biometrics & Personal Data
            </h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Tinggi Badan -->
              <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3.5">
                <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[#118c13]">
                  <!-- Ruler SVG -->
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0v-1.5m0 1.5v1.5m15-1.5v-1.5m0 1.5v1.5M6 10.5v3M9 10.5v1.5M12 10.5v3M15 10.5v1.5M18 10.5v3" />
                  </svg>
                </div>
                <div>
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">TINGGI BADAN</p>
                  <p class="text-sm font-extrabold text-slate-800">182 cm</p>
                </div>
              </div>

              <!-- Berat Badan -->
              <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3.5">
                <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[#118c13]">
                  <!-- Scale SVG -->
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18M3 12h18m-9-9l3 3m-3-3L9 6m3 15l3-3m-3 3l-3-3" />
                  </svg>
                </div>
                <div>
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">BERAT BADAN</p>
                  <p class="text-sm font-extrabold text-slate-800">76 kg</p>
                </div>
              </div>

              <!-- Umur -->
              <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3.5">
                <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[#118c13]">
                  <!-- Calendar SVG -->
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">UMUR</p>
                  <p class="text-sm font-extrabold text-slate-800">28 Tahun</p>
                </div>
              </div>

              <!-- Jenis Kelamin -->
              <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3.5">
                <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[#118c13]">
                  <!-- Person SVG -->
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div>
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">JENIS KELAMIN</p>
                  <p class="text-sm font-extrabold text-slate-800">Laki-laki</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Kolom Kanan: Medical Insights -->
          <div class="space-y-3">
            <h3 class="font-bold text-slate-400 text-[11px] uppercase tracking-widest pl-1">
              Medical Insights
            </h3>

            <!-- Medical card -->
            <div class="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
              <!-- Header info card -->
              <div class="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div class="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shrink-0">
                  <!-- Medical briefcase SVG -->
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 3h6M4 7h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7zm5-4v4m6-4v4" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-extrabold text-slate-800 text-sm leading-tight">Riwayat Penyakit</h4>
                  <p class="text-[10px] text-slate-400 font-medium">Known conditions & past injuries</p>
                </div>
              </div>

              <!-- Illness List -->
              <div class="space-y-2">
                <!-- Asthma -->
                <div class="bg-slate-50 border border-slate-200/40 rounded-xl p-4 flex items-center justify-between">
                  <div class="flex items-center gap-3 text-slate-700 font-bold text-xs md:text-sm">
                    <!-- Lungs / Breathe SVG -->
                    <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697-.056-4.024-.166C6.845 7.996 6 7.11 6 6.062V5.25m6 3c1.355 0 2.697-.056 4.024-.166C17.155 7.996 18 7.11 18 6.062V5.25M6 6.062c0-1.243.912-2.311 2.148-2.42A42.164 42.164 0 0112 3.5c1.282 0 2.56.037 3.824.11C17.088 3.722 18 4.79 18 6.033" />
                    </svg>
                    Asthma (Mild)
                  </div>
                  <span class="bg-amber-50 text-amber-600 border border-amber-100 rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">Monitor</span>
                </div>

                <!-- Knee ACL Repair -->
                <div class="bg-slate-50 border border-slate-200/40 rounded-xl p-4 flex items-center justify-between">
                  <div class="flex items-center gap-3 text-slate-700 font-bold text-xs md:text-sm">
                    <!-- Knee Joint SVG representation -->
                    <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" />
                    </svg>
                    Knee ACL Repair
                  </div>
                  <span class="bg-emerald-50 text-[#118c13] border border-emerald-100 rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">Recovered</span>
                </div>
              </div>

              <!-- Footer card links -->
              <div class="flex justify-between items-center border-t border-slate-100 pt-4 mt-2">
                <div class="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                  <!-- Small Calendar icon -->
                  <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Last Checkup: Oct 12, 2023</span>
                </div>
                <NuxtLink to="#" class="text-[10px] font-black text-[#118c13] hover:underline uppercase tracking-wide">
                  View Medical Docs
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- Footer Component (Auto-imported) -->
      <Footer />
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})
</script>

<style scoped>
/* Specific custom styles if needed */
</style>
