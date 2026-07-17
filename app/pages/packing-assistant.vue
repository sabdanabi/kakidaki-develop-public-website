<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false,
})

const authStore = useAuthStore()
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

const logisticsStore = useLogisticsStore()
const profileStore = useProfileStore()
const isLoadingLogistics = ref(true)
const isGenerating = ref(false)
const errorMessage = ref('')

const startScan = () => {
  scanStatus.value = 'scanning'
  setTimeout(() => {
    scanStatus.value = 'success'
    categories.value.forEach(cat => {
      cat.items.forEach(async (item) => {
        if (item.name === 'Carrier 60L' || item.name === 'Headlamp') {
          item.packed = true
          item.autoDetected = true
          
          if (item.id) {
            const payload = {
              itemName: item.raw?.itemName || item.name,
              amount: item.raw?.amount || `${item.qty} unit`,
              category: item.raw?.category || cat.key.toUpperCase(),
              isMandatory: item.raw?.isMandatory || item.required,
              note: item.raw?.note || item.note || '',
              isPacked: true
            }
            await logisticsStore.updateItemPackedStatus(item.id, payload)
          }
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
    key: 'clothing', label: 'Sistem Pakaian', color: 'blue', span: 'col-span-1 xl:col-span-2', iconSvg: iconSvg.clothing,
    items: [],
  },
  {
    key: 'gear', label: 'Peralatan Teknis', color: 'indigo', span: 'col-span-1 xl:col-span-2', iconSvg: iconSvg.gear,
    items: [],
  },
  {
    key: 'nutrition', label: 'Nutrisi & Air', color: 'amber', span: 'col-span-1 xl:col-span-2', iconSvg: iconSvg.nutrition,
    items: [],
  },
  {
    key: 'health', label: 'Kesehatan & Medis', color: 'teal', span: 'col-span-1 xl:col-span-2', iconSvg: iconSvg.health,
    items: [],
  },
  {
    key: 'emergency', label: 'Komunikasi Darurat', color: 'rose', span: 'col-span-1 xl:col-span-4', iconSvg: iconSvg.emergency,
    items: [],
  },
])

const mapCategoryKey = (backendCategory) => {
  if (!backendCategory) return 'gear'
  const cat = backendCategory.toUpperCase()
  if (cat.includes('CLOTHING') || cat.includes('WEAR') || cat.includes('PAKAIAN')) return 'clothing'
  if (cat.includes('GEAR') || cat.includes('TOOL') || cat.includes('SHELTER') || cat.includes('PERALATAN')) return 'gear'
  if (cat.includes('NUTRITION') || cat.includes('FOOD') || cat.includes('WATER') || cat.includes('NUTRISI')) return 'nutrition'
  if (cat.includes('HEALTH') || cat.includes('MED') || cat.includes('FIRST_AID') || cat.includes('KESEHATAN')) return 'health'
  if (cat.includes('EMERGENCY') || cat.includes('SAFETY') || cat.includes('DARURAT')) return 'emergency'
  return 'gear'
}

const getItemIcon = (categoryKey, itemName) => {
  const name = (itemName || '').toLowerCase()
  if (categoryKey === 'clothing') {
    if (name.includes('celana')) return itemIcon.pants
    return itemIcon.shirt
  }
  if (categoryKey === 'nutrition') return itemIcon.water
  if (categoryKey === 'health') return itemIcon.meds
  if (categoryKey === 'emergency') return itemIcon.alert
  return itemIcon.tool
}

const updateCategoriesFromStore = () => {
  categories.value.forEach(c => {
    c.items = []
  })

  logisticsStore.items.forEach(apiItem => {
    const categoryKey = mapCategoryKey(apiItem.category)
    const cat = categories.value.find(c => c.key === categoryKey)
    if (cat) {
      cat.items.push({
        id: apiItem.id,
        name: apiItem.itemName,
        packed: apiItem.isPacked || false,
        qty: parseInt(apiItem.amount) || 1,
        note: apiItem.note,
        required: apiItem.isMandatory || false,
        autoDetected: false,
        icon: getItemIcon(categoryKey, apiItem.itemName),
        raw: apiItem
      })
    }
  })
}

const allItems = computed(() => categories.value.flatMap(c => c.items))
const packedCount = computed(() => allItems.value.filter(i => i.packed).length)
const totalCount = computed(() => allItems.value.length)
const readinessPercent = computed(() => totalCount.value > 0 ? Math.round((packedCount.value / totalCount.value) * 100) : 0)

const toggleItem = async (catKey, itemName) => {
  errorMessage.value = ''
  const cat = categories.value.find(c => c.key === catKey)
  if (!cat) return
  const item = cat.items.find(i => i.name === itemName)
  if (item && item.id) {
    const newPackedState = !item.packed
    
    item.packed = newPackedState
    
    const payload = {
      itemName: item.raw?.itemName || item.name,
      amount: item.raw?.amount || `${item.qty} unit`,
      category: item.raw?.category || catKey.toUpperCase(),
      isMandatory: item.raw?.isMandatory || item.required,
      note: item.raw?.note || item.note || '',
      isPacked: newPackedState
    }
    
    const result = await logisticsStore.updateItemPackedStatus(item.id, payload)
    if (!result.success) {
      item.packed = !newPackedState
      errorMessage.value = result.message || 'Gagal memperbarui status barang.'
    } else {
      item.raw = result.data
    }
  }
}

const handleGeneratePackingList = async () => {
  errorMessage.value = ''
  isGenerating.value = true
  
  await logisticsStore.fetchExpeditions()
  
  const result = await logisticsStore.generatePackingList()
  isGenerating.value = false
  
  if (result.success) {
    updateCategoriesFromStore()
  } else {
    errorMessage.value = result.message || 'Gagal generate packing list.'
  }
}

onMounted(async () => {
  await profileStore.fetchProfile()
  if (authStore.user?.role?.toUpperCase() === 'ADMIN') {
    navigateTo('/admin/gunung')
    return
  }
  
  isLoadingLogistics.value = true
  const expRes = await logisticsStore.fetchExpeditions()
  let activeExpedition = null
  if (expRes.success && Array.isArray(expRes.data) && expRes.data.length > 0) {
    activeExpedition = expRes.data[0]
  }
  
  if (activeExpedition && activeExpedition.mountain) {
    destination.value = activeExpedition.mountain.name
  } else if (activeExpedition && activeExpedition.mountainName) {
    destination.value = activeExpedition.mountainName
  } else {
    destination.value = 'Gn. Rinjani'
  }
  
  await logisticsStore.fetchLogistics()
  updateCategoriesFromStore()
  isLoadingLogistics.value = false
})
</script>

<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    
    <Sidebar active="packing" />

    
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 lg:p-6 flex flex-col">
      
      <div v-if="isLoadingLogistics" class="flex-1 flex flex-col items-center justify-center space-y-4">
        <div class="h-8 w-8 rounded-full border-4 border-slate-200 border-t-[#118c13] animate-spin"></div>
        <p class="text-sm text-slate-500 font-medium">Memuat data logistik...</p>
      </div>

      <div v-else class="w-full max-w-[1600px] mx-auto space-y-6">
        
        
        <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 class="text-2xl font-heading font-medium text-slate-900">Asisten Packing</h1>
            <p class="text-sm text-slate-500 mt-1">Ceklis perlengkapan pintar untuk ekspedisimu</p>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <button 
              @click="handleGeneratePackingList"
              :disabled="isGenerating"
              class="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-medium transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
            >
              AI Gear Guide
            </button>
            <button 
              @click="handleGeneratePackingList"
              :disabled="isGenerating"
              class="inline-flex items-center justify-center gap-2 bg-[#023C23] hover:bg-[#012616] text-white px-4 py-2.5 rounded-xl text-xs font-medium transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
            >
              <svg v-if="isGenerating" class="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Auto-Generate Packing List
            </button>
          </div>
        </header>

        
        <div v-if="errorMessage" class="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-800 text-sm font-medium transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 auto-rows-max">
        
          
          <div class="xl:col-span-2 xl:row-span-2 bg-[#023C23] text-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div class="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div class="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-green-100 border border-white/5 w-fit">
                  <svg class="w-3.5 h-3.5 fill-current text-green-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-10 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C1.118 12.87 5.477 9.246 10 8c2.656-.73 5.289-.529 7.551.454"/><path d="M15 15c-1.673 0-3-.385-3-1"/></svg>
                  Kesiapan Ekspedisi
                </div>
                <h2 class="text-4xl lg:text-5xl font-medium mt-6 font-heading leading-tight">
                  Status Peralatan
                </h2>
                <p class="text-white/80 text-base mt-4 max-w-[400px]">
                  {{ totalCount > 0 ? 'Kamu sudah menyortir sebagian besar perlengkapan penting. Lanjutkan mengecek kategori teknis.' : 'Daftar logistik Anda kosong. Silakan generate untuk mulai menyortir perlengkapan.' }}
                </p>
              </div>

              <div class="mt-8 border-t border-white/10 pt-6">
                <div class="flex items-end justify-between mb-4">
                  <div class="flex items-baseline gap-1">
                    <span class="text-3xl font-medium font-heading">{{ readinessPercent }}</span>
                    <span class="text-lg font-medium text-green-300">%</span>
                  </div>
                  <div class="text-right">
                    <span class="text-xl font-medium text-white block">{{ packedCount }} / {{ totalCount }}</span>
                    <span class="text-xs text-white/50 font-medium">Barang Siap</span>
                  </div>
                </div>
                
                <div class="h-3 w-full bg-black/20 rounded-full overflow-hidden border border-white/5">
                  <div class="h-full bg-green-400 transition-all duration-700 ease-out" :style="{ width: readinessPercent + '%' }"></div>
                </div>
              </div>
            </div>
            
            <div class="absolute -right-20 -top-20 w-64 h-64 bg-green-500/20 blur-3xl rounded-full pointer-events-none"></div>
          </div>

          
          <div class="xl:col-span-1 xl:row-span-2 rounded-[2.5rem] bg-white shadow-sm relative overflow-hidden group min-h-[300px] flex flex-col justify-end p-6 border border-slate-100">
            <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            
            <div class="relative z-10">
              <div class="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 22 10-10M16 8l-8 8M22 2 12 12" /><path d="m22 2-5.5 1.5L18 5l1.5 1.5Z" /></svg>
                <span class="text-xs font-medium text-white/80">Destinasi</span>
              </div>
              <h2 class="text-3xl font-medium text-white leading-none font-heading">{{ destination }}</h2>
              <span class="text-xs text-white/80 mt-2 block font-medium">Estimasi Pendakian: 3 Hari</span>
            </div>
          </div>

          
          <div class="xl:col-span-1 xl:row-span-1 rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-sm relative overflow-hidden flex flex-col justify-center text-white border border-slate-700">
            <div class="flex items-center gap-2 relative z-20 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>
              <span class="text-xs font-medium text-sky-200">Cuaca & Kondisi</span>
            </div>
            <div class="relative z-20">
              <span class="text-3xl font-medium text-white font-heading">{{ conditions.split('/')[0].trim() }}</span>
              <span class="text-sm font-medium text-sky-200 block mt-1">{{ conditions.split('/')[1].trim() }}</span>
            </div>
            
            <div class="absolute inset-0 z-10 opacity-60 overflow-hidden pointer-events-none">
              <div class="rain-container">
                <div class="drop"></div><div class="drop"></div><div class="drop"></div><div class="drop"></div>
                <div class="drop"></div><div class="drop"></div><div class="drop"></div><div class="drop"></div>
              </div>
            </div>
          </div>

          
          <div class="xl:col-span-1 xl:row-span-1 rounded-[2.5rem] bg-white p-6 shadow-sm border border-slate-100 flex flex-col justify-center gap-4 cursor-pointer group" @click="openScanner">
            <div class="flex items-center gap-4">
              <div class="h-12 w-12 rounded-2xl bg-green-50 text-[#118c13] flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <h3 class="text-base font-medium text-slate-800">Pindai AI</h3>
                <p class="text-xs text-slate-500 font-medium mt-0.5">Otomatisasi ceklis</p>
              </div>
            </div>
            <button class="w-full rounded-xl bg-[#023C23] py-2.5 text-xs font-medium text-white transition-colors shadow-sm text-center">
              Buka Kamera
            </button>
          </div>

          
          <div v-if="allItems.length === 0" class="col-span-1 md:col-span-2 xl:col-span-4 bg-white rounded-[2.5rem] p-12 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center space-y-4 my-4">
            <div class="h-16 w-16 rounded-2xl bg-emerald-50 text-[#118c13] flex items-center justify-center">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-slate-800">Daftar Logistik Kosong</h3>
            <p class="text-sm text-slate-505 text-slate-500 max-w-md">Daftar perlengkapan untuk ekspedisi Anda belum dibuat. Silakan klik tombol "Auto-Generate Packing List" atau "AI Gear Guide" di atas untuk membuat daftar perlengkapan otomatis berbasis AI.</p>
          </div>

          
          <template v-else>
            <div 
              v-for="(cat) in categories" 
              :key="cat.key"
              class="rounded-[2.5rem] bg-white shadow-sm border border-slate-100 flex flex-col overflow-hidden relative z-0 h-fit"
              :class="[cat.span]"
            >
              
              <div class="absolute -bottom-6 -right-6 h-40 w-40 opacity-[0.15] z-[-1] pointer-events-none" :class="`text-${cat.color}-500`">
                <span v-html="cat.iconSvg" class="block w-full h-full"></span>
              </div>

              
              <div class="px-6 py-5 flex items-center justify-between" :class="`bg-${cat.color}-50/60`">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-xl" :class="`bg-${cat.color}-100 text-${cat.color}-600`">
                    <span v-html="cat.iconSvg" class="h-5 w-5"></span>
                  </div>
                  <div>
                    <h3 class="text-base font-medium text-slate-800">{{ cat.label }}</h3>
                    <p class="text-xs font-medium" :class="`text-${cat.color}-600/80`">
                      {{ cat.items.filter(i => i.packed).length }} dari {{ cat.items.length }} Siap
                    </p>
                  </div>
                </div>
              </div>

              
              <div class="flex-1 p-3">
                <div
                  v-for="item in cat.items"
                  :key="item.name"
                  @click="toggleItem(cat.key, item.name)"
                  class="group flex cursor-pointer items-start gap-3 px-3 py-3 transition-colors hover:bg-slate-50 rounded-xl"
                >
                  
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
                      <p class="text-sm transition-colors truncate" :class="item.packed ? 'text-slate-400 line-through' : (item.required ? 'font-medium text-slate-800' : 'text-slate-600')">
                        {{ item.name }}
                      </p>
                      <span v-if="item.autoDetected" class="flex h-1.5 w-1.5 rounded-full animate-ping" :class="`bg-${cat.color}-500`"></span>
                    </div>
                    <div v-if="item.note || item.required" class="mt-1 flex items-center gap-2">
                      <span v-if="item.required && !item.packed" class="px-2 py-0.5 rounded-md text-[10px] font-medium" :class="`bg-${cat.color}-100 text-${cat.color}-700`">
                        Wajib
                      </span>
                      <p v-if="item.note" class="text-xs text-slate-400 font-medium truncate">{{ item.note }}</p>
                    </div>
                  </div>

                  
                  <div class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium transition-colors" :class="item.packed ? 'bg-slate-100 text-slate-400' : `bg-${cat.color}-100 text-${cat.color}-700`">
                    {{ item.qty }}x
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      
      
      <Footer class="mt-8"/>
    </main>

    
    <div v-if="isModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeScanner"></div>
      
      <div class="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white">
          <div class="flex items-center gap-2">
            <span class="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            <span class="text-sm font-medium text-slate-800">Kamera Pintar AI</span>
          </div>
          <button @click="closeScanner" class="h-8 w-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        
        
        <div class="relative h-72 w-full bg-slate-100 overflow-hidden flex flex-col items-center justify-center">
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596706798150-590fb69c4f74?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transition-all duration-700" :class="{'opacity-100': scanStatus === 'scanning' || scanStatus === 'success', 'opacity-50 grayscale': scanStatus === 'idle'}"></div>
          
          <div class="absolute inset-0 bg-white/20"></div>

          <div v-if="scanStatus === 'scanning'" class="absolute left-0 right-0 h-0.5 bg-[#118c13] shadow-[0_0_15px_3px_rgba(17,140,19,0.5)] z-20 animate-scan"></div>
          
          <div v-if="scanStatus === 'success'" class="absolute top-[20%] left-[10%] w-32 h-24 border-2 border-[#118c13] rounded-xl bg-[#118c13]/10 z-10 animate-in zoom-in">
            <div class="absolute -top-3 left-2 bg-[#118c13] text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">Carrier 60L (98%)</div>
          </div>
          <div v-if="scanStatus === 'success'" class="absolute bottom-[20%] right-[15%] w-24 h-16 border-2 border-[#118c13] rounded-xl bg-[#118c13]/10 z-10 animate-in zoom-in delay-100">
            <div class="absolute -top-3 left-2 bg-[#118c13] text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">Headlamp</div>
          </div>

          <div v-if="scanStatus === 'idle'" class="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none text-slate-700">
            <svg class="h-10 w-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span class="text-xs font-medium bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm">Siap Memindai</span>
          </div>
        </div>

        
        <div class="p-6 bg-white border-t border-slate-100">
          <button 
            v-if="scanStatus === 'idle'" 
            @click="startScan"
            class="w-full rounded-xl bg-[#023C23] py-3.5 text-xs font-medium text-white transition-transform hover:scale-[1.02] active:scale-95"
          >
            Mulai Analisis Gambar
          </button>
          <button 
            v-if="scanStatus === 'scanning'" 
            disabled
            class="w-full rounded-xl bg-slate-100 py-3.5 text-xs font-medium text-slate-500 flex items-center justify-center gap-2"
          >
            <svg class="animate-spin h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Memproses Barang...
          </button>
          <button 
            v-if="scanStatus === 'success'" 
            @click="closeScanner"
            class="w-full rounded-xl bg-[#023C23] py-3.5 text-xs font-medium text-white transition-transform hover:scale-[1.02] active:scale-95"
          >
            Selesai (2 Barang Diceklis)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

@keyframes scan {
  0%, 100% { top: 0%; }
  50% { top: 100%; }
}
.animate-scan {
  animation: scan 2s ease-in-out infinite;
}

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
