<template>
  <div class="min-h-screen bg-white text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
    <!-- Top Navigation Bar -->
    <nav :class="[isScrolled ? 'shadow-md bg-white/90 backdrop-blur-md' : 'shadow-sm bg-white', 'fixed top-0 w-full z-50 h-16 transition-all duration-300 border-b border-slate-100']">
      <div class="flex justify-between items-center px-gutter max-w-container-max mx-auto h-full">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="~/assets/images/logo_.svg" alt="" class="w-10 h-10">
          <span class="font-headline-md text-headline-md font-bold text-[#023C23] tracking-tight">KakiDaki</span>
        </NuxtLink>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink class="font-body-md text-[#023C23] font-bold border-b-2 border-[#023C23] pb-1 transition-colors" to="#">Explore</NuxtLink>
          <NuxtLink class="font-body-md text-on-surface-variant hover:text-[#023C23] transition-colors" to="#">Routes</NuxtLink>
          <NuxtLink class="font-body-md text-on-surface-variant hover:text-[#023C23] transition-colors" to="#">Community</NuxtLink>
        </div>

        <!-- Right Controls -->
        <div class="flex items-center gap-4">
           <div class="flex items-center gap-3">
          <NuxtLink
            to="/login"
            class="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]"
          >
            Masuk
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 active:scale-[0.98]"
          >
            Daftar
          </NuxtLink>
        </div>
          <!-- <NuxtLink to="#" class="bg-[#023C23] hover:bg-emerald-700 text-white py-2 px-6 rounded-full font-label-bold hover:shadow-lg hover:brightness-110 transition-all text-sm font-semibold tracking-wide">
            Start Assessment
          </NuxtLink> -->
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 px-gutter overflow-hidden hero-gradient">
      <div class="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Hero Column Left -->
        <div class="z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-[#023C23] mb-6">
            <svg class="w-4 h-4 text-[#023C23]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
            <span class="font-label-bold text-xs uppercase tracking-wider font-bold">PREMIUM ALPINE INTELLIGENCE</span>
          </div>
          <h1 class="font-display-hero text-display-hero-mobile md:text-display-hero mb-6 text-slate-900 tracking-tight leading-tight">
            Prepared for the <span class="text-[#023C23]">Peak</span>,<br />Protected by <span class="text-[#023C23]">Data</span>.
          </h1>
          <p class="font-body-lg text-body-lg text-slate-500 mb-10 max-w-xl leading-relaxed">
            High-performance preparation for outdoor enthusiasts. KakiDaki combines real-time weather analytics with personalized biomechanical training to ensure every summit is reached safely.
          </p>
          <div class="flex flex-wrap gap-4">
            <button class="px-8 py-4 bg-[#023C23] hover:bg-emerald-700 text-white rounded-full font-headline-sm flex items-center gap-3 shadow-xl hover:scale-105 transition-all font-semibold">
            Start Assessment
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button class="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full font-headline-sm flex items-center gap-3 transition-all font-semibold">
              Watch Journey
              <svg class="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Hero Column Right (Card Image Placeholder) -->
        <div class="relative">
          <div class="bg-white rounded-[3rem] p-5 shadow-2xl relative border border-slate-100/50">
            <!-- Mountain Image Placeholder -->
            <div class="w-full bg-indigo-50/70 rounded-[2.5rem] aspect-[4/3] flex flex-col justify-center items-center relative overflow-hidden">
              <img src="~/assets/images/gunung_rinjani.webp" alt="" class="w-full h-full object-cover rounded-3xl">

              <!-- Floating Action Button -->
              <!-- <button class="absolute -top-3 -right-3 w-14 h-14 bg-[#88d982] rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform z-10 text-emerald-800">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m9-9H3m14.5-6.5l-11 11m11 0l-11-11" />
                </svg>
              </button> -->
            </div>

            <!-- Stats Overlay Container -->
            <div class="bg-white/95 backdrop-blur border border-slate-100 p-6 rounded-2xl shadow-lg mt-5">
              <div class="flex justify-between items-center mb-4">
                <span class="font-label-bold text-slate-800 text-xs tracking-wider">MONT BLANC SOUTH RIDGE</span>
                <span class="px-2.5 py-1 bg-green-50 border border-green-100 text-[#023C23] text-[10px] rounded-full font-bold">LIVE STATUS</span>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <p class="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Elevation</p>
                  <p class="font-headline-sm text-[#023C23] font-bold">4,810m</p>
                </div>
                <div>
                  <p class="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Weather</p>
                  <p class="font-headline-sm text-[#005c7b] font-bold">-12°C</p>
                </div>
                <div>
                  <p class="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Safety</p>
                  <p class="font-headline-sm text-[#006e1c] font-bold">Optimal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bento Grid Services -->
    <section class="py-stack-lg px-gutter max-w-container-max mx-auto">
      <div class="text-center mb-16">
        <h2 class="font-headline-lg text-headline-lg mb-4 text-slate-900">Precision Engineering for Every Mile</h2>
        <p class="font-body-md text-slate-500 max-w-2xl mx-auto">Our four-pillar approach ensures you're physically ready, mentally sharp, and technologically equipped for any terrain.</p>
      </div>

      <!-- Bento Grid Asimetris -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
        <!-- Dashboard Card (Kiri Besar) -->
        <div class="md:col-span-8 md:row-span-2 bg-white rounded-[2rem] p-8 border border-slate-100 bento-card shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div>
            <div class="w-12 h-12 bg-green-50 text-[#023C23] rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform border border-green-100">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
            </div>
            <h3 class="font-headline-md text-headline-md mb-2 text-slate-900">Integrated Mission Control</h3>
            <p class="font-body-md text-slate-500 max-w-md">The KakiDaki Dashboard aggregates biometric health data, trail difficulty metrics, and live satellite imagery into a single, elegant interface.</p>
          </div>
          <!-- Layout/Map UI Placeholder -->
          <div class="relative w-full h-48 bg-indigo-50/70 rounded-2xl overflow-hidden mt-6 flex items-center justify-center border border-indigo-100/50">
            <img src="~/assets/images/ui.png" alt="" class="w-full h-full object-cover rounded-3xl">
          </div>
        </div>

        <!-- Training Card (Kanan Atas) -->
        <div class="md:col-span-4 md:row-span-1 bg-[#0f4a5c] text-white rounded-[2rem] p-8 bento-card flex flex-col justify-between shadow-lg overflow-hidden relative group hover:scale-[1.01] transition-transform duration-300">
          <div class="relative z-10">
            <h3 class="font-headline-sm text-headline-sm mb-2 font-bold">Adaptive Training</h3>
            <p class="font-label-md opacity-80 text-xs leading-relaxed max-w-[250px]">Personalized endurance programs designed for alpine environments.</p>
          </div>
          <div class="relative z-10 flex justify-between items-center">
            <span class="text-3xl font-extrabold tracking-tight">14.2k <span class="text-xs font-normal opacity-70 block md:inline">Active Users</span></span>
            <span class="p-2 bg-white/10 rounded-full">
              <!-- Expand / Arrow Icon -->
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 3h8m0 0v8m0-8L3 21" />
              </svg>
            </span>
          </div>
        </div>

        <!-- Weather Card (Kanan Tengah) -->
        <div class="md:col-span-4 md:row-span-1 bg-white rounded-[2rem] p-8 border border-slate-100 bento-card flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div>
            <div class="flex items-center gap-2 text-[#005c7b] mb-2">
              <svg class="w-5 h-5 text-[#005c7b]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </svg>
              <span class="font-label-bold text-[10px] tracking-widest uppercase font-bold text-[#005c7b]">WEATHER INTELLIGENCE</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm font-bold text-slate-900">Hyper-Local Forecasts</h3>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex -space-x-2">
              <div class="w-8 h-8 rounded-full border-2 border-white bg-[#a3f69c]"></div>
              <div class="w-8 h-8 rounded-full border-2 border-white bg-[#98f994]"></div>
              <div class="w-8 h-8 rounded-full border-2 border-white bg-[#75d1ff]"></div>
            </div>
            <span class="font-label-bold text-slate-500 text-xs font-semibold">+800 Peaks tracked</span>
          </div>
        </div>

        <!-- Gear Card (Kiri Bawah) -->
        <div class="md:col-span-4 md:row-span-1 bg-slate-50 rounded-[2rem] p-8 bento-card flex items-center gap-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
            <svg class="w-7 h-7 text-[#023C23]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v3.5m-3.35 0h14.2v9.75a1.5 1.5 0 01-1.5 1.5H5.4a1.5 1.5 0 01-1.5-1.5V10.5z" />
            </svg>
          </div>
          <div>
            <h3 class="font-headline-sm text-headline-sm font-bold text-slate-900">Smart Gear Guide</h3>
            <p class="font-body-sm text-slate-500 text-xs leading-relaxed">Optimal kit selection for every weather scenario.</p>
          </div>
        </div>

        <!-- Safety Card (Kanan Bawah) -->
        <div class="md:col-span-8 md:row-span-1 bg-green-50/60 rounded-[2rem] p-8 border border-green-100 bento-card flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-shadow justify-between">
          <div class="md:w-1/2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#023C23]/10 border border-[#023C23]/20 text-[#023C23] mb-4">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span class="font-label-bold text-[9px] tracking-widest font-bold">SAFETY FIRST PROTOCOL</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm font-bold text-slate-900 mb-2">AI-Powered SOS</h3>
            <p class="font-body-sm text-slate-500 text-xs leading-relaxed">Real-time hazard detection and automated emergency outreach even in low-signal areas.</p>
          </div>
          <!-- Biometric details container -->
          <div class="md:w-1/2 flex justify-center w-full">
            <div class="w-full h-24 bg-white border border-slate-100 rounded-2xl flex items-center justify-around px-4 shadow-sm">
              <div class="text-center flex flex-col items-center">
                <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">SIGNAL</p>
                <div class="flex gap-1 items-end h-5">
                  <div class="w-1 h-2 bg-[#023C23] rounded-full"></div>
                  <div class="w-1 h-3.5 bg-[#023C23] rounded-full"></div>
                  <div class="w-1 h-5 bg-[#023C23] rounded-full"></div>
                  <div class="w-1 h-1.5 bg-slate-200 rounded-full"></div>
                </div>
              </div>
              <div class="h-12 w-[1px] bg-slate-100"></div>
              <div class="text-center">
                <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">HEART RATE</p>
                <p class="text-lg font-extrabold text-[#023C23]">72 <span class="text-xs font-semibold text-slate-500">bpm</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trail Status Callout (CTA) -->
    <section class="py-stack-lg bg-slate-50/50 px-gutter">
      <div class="max-w-container-max mx-auto bg-white rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-xl border-l-[8px] border-[#023C23] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text Left -->
        <div>
          <h2 class="font-headline-lg text-headline-lg mb-6 leading-tight text-slate-900 font-extrabold text-3xl">
            Your Next Peak is Waiting.<br />
            <span class="text-[#023C23]">Are You Prepared?</span>
          </h2>
          <p class="font-body-lg text-slate-500 mb-8 text-sm leading-relaxed max-w-lg">
            Join over 50,000 professional mountaineers and weekend explorers who trust KakiDaki for their trail intelligence.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <input class="flex-1 bg-slate-50 border-0 rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-[#023C23] text-slate-800 text-sm" placeholder="Enter trail name..." type="text"/>
            <button class="bg-[#023C23] hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-label-bold hover:brightness-110 transition-all shadow-md text-sm font-semibold tracking-wide">
              Check Trail Status
            </button>
          </div>
        </div>

        <!-- Topo Map Placeholder Right -->
        <div class="w-full h-64 bg-slate-100 rounded-3xl overflow-hidden shadow-inner border border-slate-200/50 flex items-center justify-center relative pt10">
            <img src="~/assets/images/kumpulan_gunung.webp" alt="" class="w-full h-full rounded-3xl">
        </div>
      </div>
    </section>

    <footer class="bg-white border-t border-slate-100 pt-20 pb-10 px-gutter relative">
      <div class="max-w-container-max mx-auto">
         <div class="lg:col-span-2">
            <div class="flex items-center gap-2 mb-6">
              <svg class="w-7 h-7 text-[#023C23]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 20l7-12 5 8 2-3 4 7H3z" />
              </svg>
              <span class="font-headline-md text-headline-md font-extrabold text-[#023C23] tracking-tight">KakiDaki</span>
            </div>
            <p class="font-body-md text-slate-500 max-w-xs mb-8 leading-relaxed text-sm">
              AI-powered hiking preparation for safer adventures. Our mission is to democratize elite mountain expertise for everyone.
            </p>
            <div class="flex gap-4">
              <button class="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#023C23] hover:text-white transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 10.742l5.127-2.562M8.684 13.258l5.127 2.562M19.5 12a3 3 0 11-6 0 3 3 0 016 0zm-11.5-6a3 3 0 11-6 0 3 3 0 016 0zm0 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button class="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#023C23] hover:text-white transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                </svg>
              </button>
              <button class="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#023C23] hover:text-white transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </button>
            </div>
          </div>
        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 mt-10">

          <div>
            <h4 class="font-label-bold text-slate-900 mb-6 uppercase tracking-widest text-[11px] font-bold">Explore</h4>
            <ul class="space-y-4">
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">Mountains</NuxtLink></li>
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">Routes</NuxtLink></li>
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">Training</NuxtLink></li>
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">Gear</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-label-bold text-slate-900 mb-6 uppercase tracking-widest text-[11px] font-bold">Company</h4>
            <ul class="space-y-4">
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">About Us</NuxtLink></li>
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">Safety First</NuxtLink></li>
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">Careers</NuxtLink></li>
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">Blog</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-label-bold text-slate-900 mb-6 uppercase tracking-widest text-[11px] font-bold">Join the summit</h4>
            <p class="text-slate-500 mb-4 text-xs leading-relaxed">Get the latest trail alerts and alpine insights weekly.</p>
            <div class="space-y-3">
              <input class="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#023C23] outline-none text-slate-800" placeholder="Email address" type="email"/>
              <button class="w-full bg-[#023C23] hover:bg-emerald-700 text-white py-3 rounded-xl font-label-bold text-xs transition-all shadow-sm font-semibold tracking-wide">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div class="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p class="text-xs text-slate-400 font-medium">© 2024 KakiDaki. All rights reserved. Prepared for the peak.</p>
          <div class="flex gap-8 text-xs text-slate-400">
            <NuxtLink class="hover:text-[#023C23] transition-colors" to="#">Privacy Policy</NuxtLink>
            <NuxtLink class="hover:text-[#023C23] transition-colors" to="#">Terms of Service</NuxtLink>
            <NuxtLink class="hover:text-[#023C23] transition-colors" to="#">Cookies</NuxtLink>
          </div>
        </div>
      </div>
    </footer>

    <!-- Back to Top FAB -->
    <button class="fixed bottom-8 right-8 w-14 h-14 bg-[#023C23] hover:bg-emerald-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group" @click="scrollToTop">
      <span class="material-symbols-outlined group-hover:-translate-y-1 transition-transform">north</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

useHead({
  title: 'KakiDaki | Alpine Intelligence',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
    }
  ]
})

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Bento reveal animations on scroll
  const bentoCards = document.querySelectorAll('.bento-card')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0')
        entry.target.classList.remove('opacity-0', 'translate-y-10')
      }
    })
  }, { threshold: 0.1 })

  bentoCards.forEach(card => {
    card.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10')
    observer.observe(card)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  display: inline-block;
  vertical-align: middle;
}
.glass-nav {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.85);
}
.bento-card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.7s ease, transform 0.7s ease;
}
.bento-card:hover {
  transform: translateY(-8px) !important;
}
.hero-gradient {
  background: radial-gradient(circle at top right, rgba(163, 246, 156, 0.12) 0%, transparent 60%),
              radial-gradient(circle at bottom left, rgba(117, 209, 255, 0.08) 0%, transparent 60%);
}
</style>
