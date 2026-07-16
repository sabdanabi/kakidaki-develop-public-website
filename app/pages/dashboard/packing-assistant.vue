<template>
  <NuxtLayout name="dashboard">
    <div class="h-full overflow-y-auto px-6 py-6 md:px-8 max-w-[1600px] mx-auto bg-slate-50 text-slate-900">
      
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="font-heading text-2xl font-medium tracking-tight">Asisten Packing</h1>
          <p class="text-sm text-slate-500 mt-1 font-normal tracking-tight">Ceklis perlengkapan pintar untuk ekspedisimu.</p>
        </div>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-min items-start pb-20">
        
        <!-- Readiness (Kesiapan Ekspedisi) -->
        <div class="col-span-1 md:col-span-5 md:row-span-2 rounded-xl bg-white p-6 flex flex-col justify-between shadow-sm transition-shadow hover:shadow-md h-full">
          <div class="flex items-center gap-2">
            <!-- Readiness Activity Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-10 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C1.118 12.87 5.477 9.246 10 8c2.656-.73 5.289-.529 7.551.454"/><path d="M15 15c-1.673 0-3-.385-3-1"/></svg>
            <span class="text-sm font-medium text-slate-500 tracking-tight">Kesiapan Ekspedisi</span>
          </div>
          <div class="mt-8">
            <div class="flex items-end justify-between mb-4">
              <div class="flex items-baseline gap-1">
                <span class="text-6xl font-medium tracking-tighter">{{ readinessPercent }}</span>
                <span class="text-lg font-normal text-slate-400">%</span>
              </div>
              <div class="text-right">
                <span class="text-lg font-medium text-slate-900 block">{{ packedCount }} / {{ totalCount }}</span>
                <span class="text-sm text-slate-500 font-normal">Barang Siap</span>
              </div>
            </div>
            <!-- Progress Bar -->
            <div class="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-primary transition-all duration-700 ease-out" :style="{ width: readinessPercent + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Destination (Destinasi) -->
        <div class="col-span-1 md:col-span-4 rounded-xl bg-white shadow-sm relative overflow-hidden group min-h-[160px] h-full flex flex-col justify-end p-6">
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
          
          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 22 10-10M16 8l-8 8M22 2 12 12" /><path d="m22 2-5.5 1.5L18 5l1.5 1.5Z" /></svg>
              <span class="text-sm font-medium text-white/80 tracking-tight">Destinasi</span>
            </div>
            <h2 class="text-2xl font-medium tracking-tight text-white leading-none">{{ destination }}</h2>
            <span class="text-sm text-white/80 mt-1.5 block font-normal tracking-tight">Estimasi Pendakian: 3 Hari</span>
          </div>
        </div>

        <!-- Weather (Cuaca & Kondisi) -->
        <div class="col-span-1 md:col-span-3 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 p-6 shadow-sm relative overflow-hidden flex flex-col justify-between text-white min-h-[160px] h-full">
          <div class="flex items-center gap-2 relative z-20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>
            <span class="text-sm font-medium text-blue-200 tracking-tight">Cuaca & Kondisi</span>
          </div>
          
          <div class="mt-4 relative z-20">
            <span class="text-4xl font-medium tracking-tighter text-white">{{ conditions.split('/')[0].trim() }}</span>
            <span class="text-sm font-normal text-blue-200 block mt-1">{{ conditions.split('/')[1].trim() }}</span>
          </div>

          <!-- Rain Animation Background -->
          <div class="absolute inset-0 z-10 opacity-60 overflow-hidden pointer-events-none">
            <div class="rain-container">
              <div class="drop"></div><div class="drop"></div><div class="drop"></div><div class="drop"></div>
              <div class="drop"></div><div class="drop"></div><div class="drop"></div><div class="drop"></div>
            </div>
          </div>
        </div>

        <!-- AI Scanner Button (Dark Green Theme Flat) -->
        <div class="col-span-1 md:col-span-7 rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer group" @click="openScanner">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <h3 class="text-sm font-medium text-slate-900 tracking-tight">Pindai AI Pintar</h3>
              <p class="text-sm text-slate-500 font-normal mt-0.5 tracking-tight">Gunakan kamera untuk otomatisasi ceklis.</p>
            </div>
          </div>
          <!-- Buka Kamera Button with Dark Green Color -->
          <button class="shrink-0 rounded-lg bg-[#023C23] px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors shadow-sm">
            Buka Kamera
          </button>
        </div>

        <!-- Category Bento Boxes -->
        <div 
          v-for="(cat) in categories" 
          :key="cat.key"
          class="rounded-xl bg-white shadow-sm flex flex-col overflow-hidden relative z-0 h-fit"
          :class="[cat.span]"
        >
          <!-- Big Background Icon Opacity 50% -->
          <div class="absolute -bottom-6 -right-6 h-40 w-40 opacity-50 z-[-1] pointer-events-none" :class="`text-${cat.color}-50`">
            <span v-html="cat.iconSvg" class="block w-full h-full"></span>
          </div>

          <!-- Category Header -->
          <div class="px-5 py-4 flex items-center justify-between" :class="`bg-${cat.color}-50/60`">
            <div class="flex items-center gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg" :class="`bg-${cat.color}-100 text-${cat.color}-600`">
                <span v-html="cat.iconSvg" class="h-4 w-4"></span>
              </div>
              <div>
                <h3 class="text-sm font-medium tracking-tight" :class="`text-${cat.color}-900`">{{ cat.label }}</h3>
                <p class="text-xs font-normal tracking-tight" :class="`text-${cat.color}-600/80`">
                  {{ cat.items.filter(i => i.packed).length }} dari {{ cat.items.length }} Siap
                </p>
              </div>
            </div>
          </div>

          <!-- Items List -->
          <div class="flex-1 px-3 py-3">
            <div
              v-for="item in cat.items"
              :key="item.name"
              @click="toggleItem(cat.key, item.name)"
              class="group flex cursor-pointer items-start gap-3 px-3 py-2.5 transition-colors hover:bg-slate-50/80 rounded-lg"
            >
              <!-- Checkbox -->
              <div
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border-[1.5px] transition-all mt-0.5 relative overflow-hidden"
                :class="item.packed ? `border-${cat.color}-500 bg-${cat.color}-500 text-white` : `border-slate-300 bg-white group-hover:border-${cat.color}-400`"
              >
                <div v-if="item.autoDetected" class="absolute inset-0 bg-white/30 animate-pulse"></div>
                <svg v-if="item.packed" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <span v-html="item.icon" class="h-4 w-4 text-slate-400"></span>
                  <p class="text-[13px] tracking-tight transition-colors truncate" :class="item.packed ? 'text-slate-400 line-through' : (item.required ? 'font-medium text-slate-800' : 'text-slate-600')">
                    {{ item.name }}
                  </p>
                  <span v-if="item.autoDetected" class="flex h-1.5 w-1.5 rounded-full animate-ping" :class="`bg-${cat.color}-500`"></span>
                </div>
                <div v-if="item.note || item.required" class="mt-1 flex items-center gap-2">
                  <span v-if="item.required && !item.packed" class="px-2 py-0.5 rounded-md text-[10px] font-medium tracking-tight" :class="`bg-${cat.color}-100 text-${cat.color}-700`">
                    Wajib
                  </span>
                  <p v-if="item.note" class="text-xs text-slate-400 font-normal truncate tracking-tight">{{ item.note }}</p>
                </div>
              </div>

              <!-- Quantity Badge -->
              <div class="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-normal transition-colors" :class="item.packed ? 'bg-slate-100 text-slate-400' : `bg-${cat.color}-100 text-${cat.color}-700`">
                {{ item.qty }}x
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- AI Scanner Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeScanner"></div>
      
      <div class="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <!-- Light Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white">
          <div class="flex items-center gap-2">
            <span class="flex h-2 w-2 rounded-full bg-danger animate-pulse"></span>
            <span class="text-sm font-medium text-slate-800 tracking-tight">Kamera Pintar AI</span>
          </div>
          <button @click="closeScanner" class="h-8 w-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        
        <!-- Camera Area -->
        <div class="relative h-72 w-full bg-slate-100 overflow-hidden flex flex-col items-center justify-center">
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596706798150-590fb69c4f74?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transition-all duration-700" :class="{'opacity-100': scanStatus === 'scanning' || scanStatus === 'success', 'opacity-50 grayscale': scanStatus === 'idle'}"></div>
          
          <div class="absolute inset-0 bg-white/20"></div>

          <div v-if="scanStatus === 'scanning'" class="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_15px_3px_rgba(17,140,19,0.5)] z-20 animate-scan"></div>
          
          <div v-if="scanStatus === 'success'" class="absolute top-[20%] left-[10%] w-32 h-24 border-2 border-primary rounded-xl bg-primary/10 z-10 animate-in zoom-in">
            <div class="absolute -top-3 left-2 bg-primary text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm tracking-tight">Carrier 60L (98%)</div>
          </div>
          <div v-if="scanStatus === 'success'" class="absolute bottom-[20%] right-[15%] w-24 h-16 border-2 border-primary rounded-xl bg-primary/10 z-10 animate-in zoom-in delay-100">
            <div class="absolute -top-3 left-2 bg-primary text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm tracking-tight">Headlamp</div>
          </div>

          <div v-if="scanStatus === 'idle'" class="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none text-slate-700">
            <svg class="h-10 w-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span class="text-sm font-medium bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm tracking-tight">Siap Memindai</span>
          </div>
        </div>

        <!-- Controls -->
        <div class="p-6 bg-white border-t border-slate-100">
          <button 
            v-if="scanStatus === 'idle'" 
            @click="startScan"
            class="w-full rounded-xl bg-[#023C23] py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-95"
          >
            Mulai Analisis Gambar
          </button>
          <button 
            v-if="scanStatus === 'scanning'" 
            disabled
            class="w-full rounded-xl bg-slate-100 py-3.5 text-sm font-medium text-slate-500 flex items-center justify-center gap-2"
          >
            <svg class="animate-spin h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Memproses Barang...
          </button>
          <button 
            v-if="scanStatus === 'success'" 
            @click="closeScanner"
            class="w-full rounded-xl bg-[#023C23] py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-95"
          >
            Selesai (2 Barang Diceklis)
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: false,
})

const destination = ref('Gn. Semeru')
const conditions = ref('15°C / Hujan Ringan')

const isModalOpen = ref(false)
const scanStatus = ref('idle')

const openScanner = () => {
  isModalOpen.value = true
  scanStatus.value = 'idle'
}
const closeScanner = () => {
  isModalOpen.value = false
}
const startScan = () => {
  scanStatus.value = 'scanning'
  setTimeout(() => {
    scanStatus.value = 'success'
    categories.value.forEach(cat => {
      cat.items.forEach(item => {
        if (item.name === 'Carrier 60L' || item.name === 'Headlamp') {
          item.packed = true
          item.autoDetected = true
        }
      })
    })
  }, 2000)
}

const iconSvg = {
  clothing: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a8 8 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>',
  gear: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
  nutrition: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"/><path d="M5 10c0 7 7 12 7 12s7-5 7-12a7 7 0 0 0-14 0"/></svg>',
  health: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  emergency: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
}

const itemIcon = {
  shirt: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a8 8 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>',
  pants: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3H2l2 18h4l2-10 2 10h4l2-18z"/></svg>',
  tool: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  water: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  meds: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  alert: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
}

const categories = ref([
  {
    key: 'clothing', label: 'Sistem Pakaian', color: 'blue', span: 'col-span-1 md:col-span-4', iconSvg: iconSvg.clothing,
    items: [
      { name: 'Pakaian Dalam (Dri-fit)', packed: true, qty: 2, note: null, required: false, autoDetected: false, icon: itemIcon.shirt },
      { name: 'Jaket Gunung Tebal', packed: false, qty: 1, note: null, required: false, autoDetected: false, icon: itemIcon.shirt },
      { name: 'Celana Trekking', packed: true, qty: 2, note: null, required: false, autoDetected: false, icon: itemIcon.pants },
      { name: 'Sarung Tangan Thermal', packed: false, qty: 1, note: 'Penting', required: true, autoDetected: false, icon: itemIcon.shirt },
      { name: 'Jas Hujan', packed: false, qty: 1, note: null, required: true, autoDetected: false, icon: itemIcon.shirt },
    ],
  },
  {
    key: 'gear', label: 'Peralatan Teknis', color: 'indigo', span: 'col-span-1 md:col-span-4', iconSvg: iconSvg.gear,
    items: [
      { name: 'Trekking Poles', packed: true, qty: 2, note: null, required: false, autoDetected: false, icon: itemIcon.tool },
      { name: 'Headlamp', packed: false, qty: 1, note: 'Minimal 400L', required: true, autoDetected: false, icon: itemIcon.tool },
      { name: 'Carrier 60L', packed: false, qty: 1, note: 'Pastikan pas di punggung', required: true, autoDetected: false, icon: itemIcon.tool },
      { name: 'Sleeping Bag', packed: false, qty: 1, note: null, required: true, autoDetected: false, icon: itemIcon.tool },
      { name: 'Matras Lipat', packed: true, qty: 1, note: null, required: false, autoDetected: false, icon: itemIcon.tool },
    ],
  },
  {
    key: 'nutrition', label: 'Nutrisi & Air', color: 'amber', span: 'col-span-1 md:col-span-4', iconSvg: iconSvg.nutrition,
    items: [
      { name: 'Air Minum (3 Liter)', packed: true, qty: 3, note: 'Wajib', required: true, autoDetected: false, icon: itemIcon.water },
      { name: 'Gel Energi', packed: false, qty: 6, note: null, required: false, autoDetected: false, icon: itemIcon.water },
      { name: 'Makanan Kering', packed: false, qty: 2, note: null, required: false, autoDetected: false, icon: itemIcon.water },
    ],
  },
  {
    key: 'health', label: 'Kesehatan & Medis', color: 'teal', span: 'col-span-1 md:col-span-6', iconSvg: iconSvg.health,
    items: [
      { name: 'P3K Pribadi', packed: true, qty: 1, note: 'Wajib', required: true, autoDetected: false, icon: itemIcon.meds },
      { name: 'Emergency Bivvy', packed: false, qty: 1, note: null, required: false, autoDetected: false, icon: itemIcon.meds },
      { name: 'Tabir Surya', packed: true, qty: 1, note: null, required: false, autoDetected: false, icon: itemIcon.meds },
    ],
  },
  {
    key: 'emergency', label: 'Komunikasi Darurat', color: 'rose', span: 'col-span-1 md:col-span-6', iconSvg: iconSvg.emergency,
    items: [
      { name: 'Pesan Satelit', packed: false, qty: 1, note: null, required: true, autoDetected: false, icon: itemIcon.alert },
      { name: 'Peluit Darurat', packed: true, qty: 1, note: null, required: true, autoDetected: false, icon: itemIcon.alert },
    ],
  },
])

const allItems = computed(() => categories.value.flatMap(c => c.items))
const packedCount = computed(() => allItems.value.filter(i => i.packed).length)
const totalCount = computed(() => allItems.value.length)
const readinessPercent = computed(() => Math.round((packedCount.value / totalCount.value) * 100))

const toggleItem = (catKey, itemName) => {
  const cat = categories.value.find(c => c.key === catKey)
  if (!cat) return
  const item = cat.items.find(i => i.name === itemName)
  if (item) {
    item.packed = !item.packed
    if (!item.packed && item.autoDetected) {
      item.autoDetected = false
    }
  }
}
</script>

<style>
/* Safe colors map for dynamic Tailwind classes */
/* bg-blue-50 bg-blue-100 bg-blue-500 text-blue-600 text-blue-900 border-blue-100 border-blue-200 border-blue-400 border-blue-500 text-blue-600/80 text-blue-50 bg-blue-50/60 */
/* bg-indigo-50 bg-indigo-100 bg-indigo-500 text-indigo-600 text-indigo-900 border-indigo-100 border-indigo-200 border-indigo-400 border-indigo-500 text-indigo-600/80 text-indigo-50 bg-indigo-50/60 */
/* bg-amber-50 bg-amber-100 bg-amber-500 text-amber-600 text-amber-900 border-amber-100 border-amber-200 border-amber-400 border-amber-500 text-amber-600/80 text-amber-50 bg-amber-50/60 */
/* bg-teal-50 bg-teal-100 bg-teal-500 text-teal-600 text-teal-900 border-teal-100 border-teal-200 border-teal-400 border-teal-500 text-teal-600/80 text-teal-50 bg-teal-50/60 */
/* bg-rose-50 bg-rose-100 bg-rose-500 text-rose-600 text-rose-900 border-rose-100 border-rose-200 border-rose-400 border-rose-500 text-rose-600/80 text-rose-50 bg-rose-50/60 */

@keyframes scan {
  0%, 100% { top: 0%; }
  50% { top: 100%; }
}
.animate-scan {
  animation: scan 2s ease-in-out infinite;
}

/* Rain Animation CSS */
.rain-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.drop {
  position: absolute;
  bottom: 100%;
  width: 2px;
  height: 15px;
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.8));
  animation: rain 1s linear infinite;
}
.drop:nth-child(1) { left: 10%; animation-delay: 0.1s; animation-duration: 0.8s; }
.drop:nth-child(2) { left: 25%; animation-delay: 0.5s; animation-duration: 0.9s; }
.drop:nth-child(3) { left: 40%; animation-delay: 0.2s; animation-duration: 0.7s; }
.drop:nth-child(4) { left: 55%; animation-delay: 0.7s; animation-duration: 1.1s; }
.drop:nth-child(5) { left: 70%; animation-delay: 0.4s; animation-duration: 0.8s; }
.drop:nth-child(6) { left: 85%; animation-delay: 0.9s; animation-duration: 1.0s; }
.drop:nth-child(7) { left: 15%; animation-delay: 0.3s; animation-duration: 0.6s; }
.drop:nth-child(8) { left: 65%; animation-delay: 0.8s; animation-duration: 0.9s; }

@keyframes rain {
  0% { transform: translateY(-20px); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(200px); opacity: 0; }
}

</style>
