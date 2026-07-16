<script setup>
const props = defineProps({
  active: {
    type: String,
    default: 'dashboard'
  }
})
</script>

<template>
    <aside class="w-64 h-full flex flex-col border-r border-slate-200/60 bg-[#FAFAFA] hidden md:flex shrink-0">
      <!-- Sidebar Header -->
      <div class="p-6 flex items-center gap-2">
        <svg class="w-7 h-7 text-[#118c13]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 20l7-12 5 8 2-3 4 7H3z" />
        </svg>
        <span class="text-xl font-bold tracking-tight text-[#118c13]">KakiDaki</span>
      </div>

      <!-- Hiker Profile Card (Matching image mockup) -->
      <div class="mx-4 mb-4 p-3 bg-slate-100/75 rounded-2xl flex items-center gap-3 border border-slate-200/30">
        <div class="w-8 h-8 rounded-full bg-slate-200/80 flex items-center justify-center text-xs font-bold text-slate-500">
          <svg class="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="flex flex-col">
          <span class="text-xs font-semibold text-slate-800 tracking-tight">Hiker Profile</span>
          <span class="text-[10px] font-medium text-slate-400">Alpine Enthusiast</span>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-4 py-2 space-y-1.5">
        <!-- Dashboard -->
        <NuxtLink to="/dashboard/packing-assistant" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors border"
          :class="active === 'dashboard' ? 'text-[#118c13] bg-green-50/60 font-semibold border-green-100/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/65 font-medium border-transparent'">
          <svg class="w-5 h-5" :class="active === 'dashboard' ? 'text-[#118c13]' : 'text-slate-400'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
          DASHBOARD
        </NuxtLink>

        <!-- Training -->
        <NuxtLink to="/trainingDasboard" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors border"
          :class="active === 'training' ? 'text-[#118c13] bg-green-50/60 font-semibold border-green-100/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/65 font-medium border-transparent'">
          <svg class="w-5 h-5" :class="active === 'training' ? 'text-[#118c13]' : 'text-slate-400'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          TRAINING
        </NuxtLink>

        <!-- Gear -->
        <NuxtLink to="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors border"
          :class="active === 'gear' ? 'text-[#118c13] bg-green-50/60 font-semibold border-green-100/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/65 font-medium border-transparent'">
          <svg class="w-5 h-5" :class="active === 'gear' ? 'text-[#118c13]' : 'text-slate-400'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v3.5m-3.35 0h14.2v9.75a1.5 1.5 0 01-1.5 1.5H5.4a1.5 1.5 0 01-1.5-1.5V10.5z" />
          </svg>
          GEAR
        </NuxtLink>

        <!-- Weather -->
        <NuxtLink to="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors border"
          :class="active === 'weather' ? 'text-[#118c13] bg-green-50/60 font-semibold border-green-100/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/65 font-medium border-transparent'">
          <svg class="w-5 h-5" :class="active === 'weather' ? 'text-[#118c13]' : 'text-slate-400'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          </svg>
          WEATHER
        </NuxtLink>

        <!-- Safety -->
        <NuxtLink to="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors border"
          :class="active === 'safety' ? 'text-[#118c13] bg-green-50/60 font-semibold border-green-100/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/65 font-medium border-transparent'">
          <svg class="w-5 h-5" :class="active === 'safety' ? 'text-[#118c13]' : 'text-slate-400'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          SAFETY
        </NuxtLink>
      </nav>

      <!-- Sidebar Footer -->
      <div class="p-4 border-t border-slate-200/50 mt-auto space-y-4">
        <!-- Profile Link -->
        <NuxtLink to="#" class="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:text-slate-800 rounded-xl font-medium text-sm transition-colors">
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          PROFILE
        </NuxtLink>

        <!-- Upgrade Button -->
        <button class="w-full bg-[#118c13] hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-semibold text-xs tracking-wider transition-all hover:shadow-md active:scale-[0.98]">
          Upgrade to Pro
        </button>
      </div>
    </aside>
</template>