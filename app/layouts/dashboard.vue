<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 transition-colors">
    <!-- Top Header Navigation -->
    <header class="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 transition-all duration-300" :class="isSidebarOpen ? 'lg:pl-64' : 'pl-4'">
      <div class="flex items-center gap-3">
        <!-- Hamburger Menu (Always visible or just for toggling) -->
        <button @click="isSidebarOpen = !isSidebarOpen" class="p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors focus:outline-none">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <!-- Logo when sidebar is closed on desktop, or always on mobile -->
        <div class="flex items-center gap-2" :class="{'lg:hidden': isSidebarOpen}">
          <img src="/images/logo.svg" alt="Kaki Daki" class="h-6 w-6" />
          <span class="font-heading text-sm font-bold tracking-tight">Kaki Daki</span>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <!-- User Profile Minimal -->
        <div class="flex items-center gap-2">
          <span class="hidden sm:block text-xs font-semibold text-slate-600">Fajar</span>
          <div class="h-7 w-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
            F
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar Overlay for Mobile -->
    <div 
      v-show="isSidebarOpen" 
      @click="isSidebarOpen = false" 
      class="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden transition-opacity"
    ></div>

    <!-- Sidebar -->
    <aside :class="[
      'fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]">
      <!-- Sidebar Header -->
      <div class="flex h-14 items-center justify-between px-4 border-b border-slate-100">
        <div class="flex items-center gap-2.5">
          <img src="/images/logo.svg" alt="Kaki Daki" class="h-6 w-6" />
          <span class="font-heading text-sm font-bold tracking-tight">Kaki Daki</span>
        </div>
        <button @click="isSidebarOpen = false" class="lg:hidden p-1.5 text-slate-400 hover:bg-slate-100 rounded-md">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="mt-4 flex-1 space-y-0.5 px-3">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 rounded-md px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          active-class="!bg-primary/10 !text-primary"
        >
          <component :is="item.icon" class="h-4 w-4" />
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Bottom actions -->
      <div class="p-4 border-t border-slate-100">
        <NuxtLink to="/login" class="flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Log Out
        </NuxtLink>
      </div>
    </aside>

    <!-- Main Content -->
    <main :class="['pt-14 transition-all duration-300 min-h-screen', isSidebarOpen ? 'lg:pl-64' : 'pl-0']">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { h, ref, onMounted } from 'vue'

const isSidebarOpen = ref(true)

// Auto close sidebar on mobile
onMounted(() => {
  if (window.innerWidth < 1024) {
    isSidebarOpen.value = false
  }
})

const IconDashboard = (_, { attrs }) => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...attrs }, [
  h('rect', { x: '3', y: '3', width: '7', height: '7', rx: '1' }),
  h('rect', { x: '14', y: '3', width: '7', height: '7', rx: '1' }),
  h('rect', { x: '14', y: '14', width: '7', height: '7', rx: '1' }),
  h('rect', { x: '3', y: '14', width: '7', height: '7', rx: '1' }),
])

const IconPacking = (_, { attrs }) => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...attrs }, [
  h('path', { d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' }),
  h('polyline', { points: '3.27 6.96 12 12.01 20.73 6.96' }),
  h('line', { x1: '12', y1: '22.08', x2: '12', y2: '12' }),
])

const IconTraining = (_, { attrs }) => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...attrs }, [
  h('path', { d: 'M18 20V10' }),
  h('path', { d: 'M12 20V4' }),
  h('path', { d: 'M6 20v-6' }),
])

const IconWeather = (_, { attrs }) => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...attrs }, [
  h('path', { d: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' }),
])

const IconSafety = (_, { attrs }) => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...attrs }, [
  h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }),
])

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: IconDashboard },
  { to: '/dashboard/packing-assistant', label: 'Packing Assistant', icon: IconPacking },
  { to: '/dashboard/training', label: 'Training', icon: IconTraining },
  { to: '/dashboard/weather', label: 'Weather', icon: IconWeather },
  { to: '/dashboard/safety', label: 'Safety', icon: IconSafety },
]
</script>
