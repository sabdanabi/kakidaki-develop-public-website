<template>
  <nav :class="[isScrolled ? 'shadow-[0_2px_10px_rgb(0,0,0,0.02)] bg-white/95 backdrop-blur-md' : 'bg-transparent', 'fixed top-0 w-full z-50 h-20 transition-all duration-300 border-b border-transparent', isScrolled ? 'border-slate-100' : '']">
    <div class="flex justify-between items-center px-6 lg:px-8 max-w-7xl mx-auto h-full">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3">
        <img src="~/assets/images/logo_.svg" alt="KakiDaki" class="w-9 h-9">
        <span class="font-heading text-xl md:text-2xl font-medium text-slate-900">KakiDaki</span>
      </NuxtLink>
      <!-- Navigation Links -->
      <div class="hidden md:flex items-center gap-8">
        <NuxtLink 
          to="/" 
          :class="[$route.path === '/' ? 'text-[#023C23] font-medium' : 'text-slate-500 hover:text-slate-900', 'font-sans text-sm transition-colors']"
        >
          Home
        </NuxtLink>
        <button 
          @click="scrollToAbout" 
          class="font-sans text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          About
        </button>
        <NuxtLink 
          to="/community" 
          :class="[$route.path === '/community' ? 'text-[#023C23] font-medium' : 'text-slate-500 hover:text-slate-900', 'font-sans text-sm transition-colors']"
        >
          Komunitas
        </NuxtLink>
      </div>

      <!-- Right Controls -->
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/login"
          class="hidden sm:block text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          Masuk
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="rounded-xl bg-[#023C23] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-800 active:scale-[0.98]"
        >
          Daftar
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isScrolled = ref(false)
const router = useRouter()
const route = useRoute()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const scrollToAbout = async () => {
  if (route.path !== '/') {
    await router.push('/')
    setTimeout(() => {
      const el = document.getElementById('about')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  } else {
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
