<template>
  <div class="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#023C23]/20 selection:text-[#023C23] overflow-x-hidden">
    <!-- Top Navigation Bar -->
    <Navbar />

    <!-- Hero Section -->
    <section class="relative pt-36 pb-20 lg:pt-44 lg:pb-32 px-6 lg:px-8 overflow-hidden">
      <!-- Minimalist background -->
      <div class="absolute inset-0 bg-slate-50/50 -z-10"></div>
      
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        <!-- Hero Column Left -->
        <div class="z-10 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[#023C23] mb-6 mx-auto lg:mx-0">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
            </svg>
            <span class="text-xs font-medium tracking-tight">Sistem Intelijen Pendakian Premium</span>
          </div>
          <h1 class="font-heading text-4xl sm:text-5xl lg:text-[4rem] mb-6 text-slate-900 leading-[1.1] font-medium tracking-tight">
            Siap Mencapai <span class="text-[#023C23]">Puncak</span>,<br class="hidden lg:block" />
            Terlindungi oleh <span class="text-[#023C23]">Data</span>.
          </h1>
          <p class="font-sans text-base sm:text-lg text-slate-500 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Persiapan kelas atas untuk para penggiat alam. KakiDaki menggabungkan analitik cuaca secara langsung dengan program pelatihan biomekanik personal untuk memastikan setiap puncak tercapai dengan aman.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <NuxtLink
              to="/onboarding"
              class="w-full sm:w-auto px-8 py-4 bg-[#023C23] hover:bg-emerald-800 text-white rounded-xl font-medium flex items-center justify-center gap-3 shadow-[0_8px_20px_rgb(2,60,35,0.15)] hover:shadow-[0_12px_24px_rgb(2,60,35,0.2)] hover:-translate-y-0.5 transition-all"
            >
              Mulai Penilaian
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Hero Column Right (Card Image Placeholder) -->
        <div class="relative lg:pl-12">
          <div class="bg-white rounded-[2.5rem] p-4 sm:p-5 shadow-[0_20px_60px_rgb(0,0,0,0.06)] relative border border-slate-100">
            <!-- Mountain Image Placeholder -->
            <div class="w-full bg-slate-100 rounded-[2rem] aspect-[4/3] flex flex-col justify-center items-center relative overflow-hidden">
              <img src="~/assets/images/gunung_rinjani.webp" alt="Puncak Gunung" class="w-full h-full object-cover">
            </div>

            <!-- Stats Overlay Container -->
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:bottom-8 sm:-left-12 bg-white/95 backdrop-blur-md border border-slate-100 p-5 rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] z-20 w-[90%] sm:w-72">
              <div class="flex justify-between items-center mb-4">
                <span class="font-sans text-slate-900 text-xs font-medium">Gunung Rinjani (Lombok)</span>
                <span class="px-2 py-0.5 bg-emerald-50 text-[#023C23] text-[10px] rounded-md font-medium tracking-wide">LANGSUNG</span>
              </div>
              <div class="grid grid-cols-3 gap-3 divide-x divide-slate-100">
                <div class="pl-0">
                  <p class="text-[10px] text-slate-400 mb-1">Ketinggian</p>
                  <p class="font-heading text-sm text-slate-900 font-medium">3,726m</p>
                </div>
                <div class="pl-3">
                  <p class="text-[10px] text-slate-400 mb-1">Cuaca</p>
                  <p class="font-heading text-sm text-sky-600 font-medium">12°c</p>
                </div>
                <div class="pl-3">
                  <p class="text-[10px] text-slate-400 mb-1">Keamanan</p>
                  <p class="font-heading text-sm text-emerald-600 font-medium">Optimal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bento Grid Services -->
    <section id="about" class="py-24 lg:py-32 px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div class="text-center mb-16">
        <h2 class="font-heading text-3xl md:text-4xl mb-4 text-slate-900 font-medium tracking-tight">Rekayasa Presisi di Setiap Langkah</h2>
        <p class="font-sans text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">Pendekatan empat pilar kami memastikan Anda siap secara fisik, mental, dan dilengkapi secara teknologi untuk menghadapi medan apapun.</p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[280px]">
        
        <!-- Dashboard Card (Kiri Besar) -->
        <div class="md:col-span-8 md:row-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-300">
          <div>
            <div class="w-12 h-12 bg-emerald-50 text-[#023C23] rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform border border-emerald-100">
              <!-- Mountain Telemetry Icon -->
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 20h18L14 8l-4 6-3-4-4 10zM12 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
              </svg>
            </div>
            <h3 class="font-heading text-2xl mb-3 text-slate-900 font-medium">Pusat Kendali Terpadu</h3>
            <p class="font-sans text-slate-500 max-w-sm text-sm leading-relaxed">Dasbor KakiDaki mengumpulkan data metrik kesehatan, tingkat kesulitan jalur, dan pencitraan satelit secara langsung dalam satu tampilan elegan.</p>
          </div>
          <!-- UI Placeholder -->
          <div class="relative w-full h-48 sm:h-56 bg-slate-50 rounded-2xl overflow-hidden mt-8 border border-slate-100 flex items-center justify-center">
            <img src="~/assets/images/ui.png" alt="UI Dashboard" class="w-full h-full object-cover">
          </div>
        </div>

        <!-- Training Card (Kanan Atas) -->
        <div class="md:col-span-4 md:row-span-1 bg-[#023C23] text-white rounded-[2rem] p-7 flex flex-col justify-between shadow-lg overflow-hidden relative group">
          <div class="absolute inset-0 bg-[url('~/assets/images/gunung_rinjani.webp')] bg-cover opacity-10 mix-blend-overlay"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#023C23] via-transparent to-transparent z-0"></div>
          <div class="relative z-10">
            <h3 class="font-heading text-xl mb-2 font-medium">Pelatihan Adaptif</h3>
            <p class="font-sans text-white/70 text-xs leading-relaxed">Program daya tahan fisik personal yang dirancang khusus untuk kondisi di ketinggian.</p>
          </div>
          <div class="relative z-10 flex justify-between items-end">
            <div>
              <span class="text-3xl font-heading font-medium tracking-tight">14.2k</span>
              <span class="block text-[10px] text-emerald-200 mt-1 tracking-wider font-medium">PENGGUNA AKTIF</span>
            </div>
            <div class="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Weather Card (Kanan Tengah) -->
        <div class="md:col-span-4 md:row-span-1 bg-white rounded-[2rem] p-7 border border-slate-100 flex flex-col justify-between shadow-sm group hover:shadow-md transition-shadow">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center text-sky-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                </svg>
              </div>
              <span class="font-sans text-xs font-medium text-slate-500">Intelijen Cuaca</span>
            </div>
            <h3 class="font-heading text-xl font-medium text-slate-900 mb-2">Prakiraan Cuaca Hyper-Lokal</h3>
            <p class="font-sans text-slate-500 text-xs leading-relaxed mb-6">Prediksi iklim mikro secara langsung yang ditenagai oleh jaringan satelit.</p>
          </div>
          <div class="flex flex-wrap items-center gap-1.5 pt-1">
            <span class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-[11px] font-medium text-[#023C23]">Mt. Rinjani</span>
            <span class="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-100 text-[11px] font-medium text-sky-700">Mt. Semeru</span>
            <span class="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-[11px] font-medium text-indigo-700">Mt. Kerinci</span>
            <span class="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-100 text-[11px] font-medium text-amber-700">Mt. Gede</span>
          </div>
        </div>

        <!-- Gear Card (Kiri Bawah) -->
        <NuxtLink to="/packing-assistant" class="md:col-span-6 lg:col-span-4 bg-slate-50 rounded-[2rem] p-7 flex items-center gap-6 shadow-sm border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
          <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-emerald-200 group-hover:text-[#023C23] transition-all text-slate-600">
            <!-- Trekking Backpack Equipment Icon -->
            <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6V4.5a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 012.25 2.25V6m-9.75 0h12a2.25 2.25 0 012.25 2.25v11.25A2.25 2.25 0 0115.75 21H8.25A2.25 2.25 0 016 18.75V8.25A2.25 2.25 0 018.25 6zm2.25 6.75h3m-3 3h3"/>
            </svg>
          </div>
          <div>
            <h3 class="font-heading text-lg sm:text-xl font-medium text-slate-900 mb-1 group-hover:text-[#023C23] transition-colors">Panduan Alat Cerdas</h3>
            <p class="font-sans text-slate-500 text-xs sm:text-sm leading-relaxed">Pemilihan perlengkapan optimal yang otomatis dibuat untuk rute spesifik Anda.</p>
          </div>
        </NuxtLink>
        
        <!-- Community Card (Kanan Bawah) -->
        <NuxtLink to="/community" class="md:col-span-6 lg:col-span-8 bg-emerald-50 rounded-[2rem] p-7 border border-emerald-100 flex flex-col sm:flex-row items-center gap-6 shadow-sm justify-between group hover:shadow-md hover:border-emerald-200 transition-all">
          <div class="sm:w-3/5">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-emerald-100 text-[#023C23] mb-4">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
              </svg>
              <span class="font-sans text-[10px] font-medium tracking-wide">KOMUNITAS PENDAKI</span>
            </div>
            <h3 class="font-heading text-xl md:text-2xl font-medium text-slate-900 mb-2 group-hover:text-[#023C23] transition-colors">Ulasan & Kondisi Jalur Terkini</h3>
            <p class="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">Akses ribuan ulasan terbaru langsung dari lapangan. Bagikan kondisi cuaca mikro, ketersediaan air di pos, dan rute kepada sesama pendaki.</p>
          </div>
          <!-- Community Stats Graphic -->
          <div class="sm:w-2/5 w-full">
            <div class="w-full h-28 bg-white/70 backdrop-blur rounded-2xl border border-emerald-100/60 p-4 flex flex-col justify-center gap-2 relative overflow-hidden group-hover:bg-white transition-colors shadow-sm">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-[#023C23] animate-pulse"></div>
                  <span class="text-xs font-medium text-slate-800">Mt. Rinjani (3.726 mdpl)</span>
                </div>
                <span class="text-[10px] bg-emerald-100 text-[#023C23] font-medium px-2 py-0.5 rounded-full">+128 ulasan</span>
              </div>
              <p class="text-[11px] text-slate-500 italic leading-snug line-clamp-2">"Pos 2 air melimpah, jalur menuju Pelawangan cerah tanpa badai..."</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Community Callout (CTA) -->
    <section class="py-24 bg-slate-50 px-6 lg:px-8 border-y border-slate-100">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight text-slate-900 font-medium">
          Jelajahi Laporan Pendaki,<br />
          <span class="text-[#023C23]">Bagikan Pengalaman Anda.</span>
        </h2>
        <p class="font-sans text-slate-500 mb-10 text-base leading-relaxed max-w-xl mx-auto">
          Temukan ulasan langsung dari lapangan, kondisi terkini jalur pendakian, serta diskusi hangat dari ribuan pendaki di seluruh Nusantara.
        </p>
        <div class="flex justify-center">
          <NuxtLink
            to="/community"
            class="bg-[#023C23] hover:bg-emerald-800 text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all text-base inline-flex items-center gap-3 active:scale-[0.98]"
          >
            <span>Masuk ke Komunitas</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white pt-20 pb-8 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <img src="~/assets/images/logo_.svg" alt="KakiDaki" class="w-8 h-8">
              <span class="font-heading text-xl font-medium text-slate-900">KakiDaki</span>
            </div>
            <p class="font-sans text-slate-500 max-w-sm mb-8 leading-relaxed text-sm">
              Persiapan pendakian ditenagai AI untuk petualangan yang lebih aman. Misi kami mendemokratisasi keahlian mendaki tingkat elit untuk semua.
            </p>
            <div class="flex gap-3">
              <button class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-[#023C23] hover:text-white hover:border-[#023C23] transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </button>
              <button class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-[#023C23] hover:text-white hover:border-[#023C23] transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </button>
            </div>
          </div>
          
          <div>
            <h4 class="font-heading text-slate-900 mb-5 text-sm font-medium">Eksplorasi</h4>
            <ul class="space-y-3">
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">Gunung</NuxtLink></li>
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="/health">Jalur Rute</NuxtLink></li>
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="/trainingDasboard">Pelatihan</NuxtLink></li>
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="/packing-assistant">Perlengkapan</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-heading text-slate-900 mb-5 text-sm font-medium">Perusahaan</h4>
            <ul class="space-y-3">
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">Tentang Kami</NuxtLink></li>
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">Prioritas Keamanan</NuxtLink></li>
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">Karir</NuxtLink></li>
              <li><NuxtLink class="text-slate-500 hover:text-[#023C23] text-sm transition-colors" to="#">Blog</NuxtLink></li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-[11px] text-slate-400 font-medium">© 2024 KakiDaki. Hak Cipta Dilindungi.</p>
          <div class="flex gap-4 text-[11px] text-slate-400">
            <NuxtLink class="hover:text-slate-600 transition-colors" to="#">Kebijakan Privasi</NuxtLink>
            <NuxtLink class="hover:text-slate-600 transition-colors" to="#">Syarat Ketentuan</NuxtLink>
            <NuxtLink class="hover:text-slate-600 transition-colors" to="#">Kuki</NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
useHead({
  title: 'KakiDaki | Intelijen Pegunungan'
})
</script>
