<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <AdminSidebar />

    
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 space-y-6">
      
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-100 text-[#023C23] text-xs font-medium mb-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-[#023C23] animate-ping"></span>
            OPERATION CENTER
          </div>
          <h1 class="text-2xl font-heading font-medium text-slate-900">Dashboard Administrator</h1>
          <p class="text-sm text-slate-500 mt-1">Pemantauan ekosistem KakiDaki, keamanan pos jalur, dan data satelit secara langsung.</p>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLink
            to="/admin/gunung"
            class="px-4 py-2.5 bg-[#023C23] hover:bg-emerald-800 text-white text-xs font-medium rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Tambah Gunung Baru
          </NuxtLink>
        </div>
      </div>

      
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div class="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-400 font-medium mb-1">TOTAL GUNUNG</p>
            <h3 class="text-2xl font-heading font-medium text-slate-900">824 Puncak</h3>
            <p class="text-[11px] text-emerald-600 font-medium mt-1">+12 ditambahkan bulan ini</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-[#023C23] flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 20h18L14 8l-4 6-3-4-4 10z" />
            </svg>
          </div>
        </div>

        
        <div class="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-400 font-medium mb-1">PENDAKI TERDAFTAR</p>
            <h3 class="text-2xl font-heading font-medium text-slate-900">54,230 User</h3>
            <p class="text-[11px] text-emerald-600 font-medium mt-1">98.4% akun terverifikasi</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div>
        </div>

        
        <div class="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-400 font-medium mb-1">ULASAN / KOMENTAR</p>
            <h3 class="text-2xl font-heading font-medium text-slate-900">14,890 Laporan</h3>
            <p class="text-[11px] text-amber-600 font-medium mt-1">5 menunggu moderasi</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>
        </div>
      </div>

      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-heading font-medium text-slate-900">Aksi Cepat & Manajemen Opsi</h3>
              <span class="text-xs text-slate-400">Sistem Administrator</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NuxtLink
                to="/admin/gunung"
                class="p-5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-100 transition-all group"
              >
                <div class="w-10 h-10 rounded-xl bg-[#023C23] text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <h4 class="font-heading font-medium text-slate-900 text-sm mb-1">Add & Detail Gunung</h4>
                <p class="text-xs text-slate-500 leading-relaxed">Kelola profil gunung, elevasi, basecamp, harga tiket, dan jalur resmi.</p>
              </NuxtLink>

              <NuxtLink
                to="/admin/users"
                class="p-5 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-100 transition-all group"
              >
                <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <h4 class="font-heading font-medium text-slate-900 text-sm mb-1">Control Akun User</h4>
                <p class="text-xs text-slate-500 leading-relaxed">Pantau pendaki aktif, verifikasi data fisik VO2Max, dan tangguhkan pelanggar.</p>
              </NuxtLink>

              <NuxtLink
                to="/admin/comments"
                class="p-5 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-100 transition-all group"
              >
                <div class="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </div>
                <h4 class="font-heading font-medium text-slate-900 text-sm mb-1">Control Komentar</h4>
                <p class="text-xs text-slate-500 leading-relaxed">Moderasi laporan cuaca langsung, ulasan jalur, dan verifikasi kondisi pos.</p>
              </NuxtLink>
            </div>
          </div>

          
          <div class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-heading font-medium text-slate-900">Gunung Terakhir Ditambahkan</h3>
              <NuxtLink to="/admin/gunung" class="text-xs text-[#023C23] font-medium hover:underline">Lihat Semua (824)</NuxtLink>
            </div>

            <div class="space-y-3">
              <div v-for="item in recentMountains" :key="item.id" class="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-[#023C23]/10 text-[#023C23] flex items-center justify-center font-heading font-bold text-xs">
                    {{ item.elev }}
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-slate-800">{{ item.name }}</h4>
                    <p class="text-[11px] text-slate-400">{{ item.location }} &bull; {{ item.basecamps }} Basecamp</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-md bg-emerald-100 text-[#023C23] text-[10px] font-medium">Aktif / Terverifikasi</span>
              </div>
            </div>
          </div>
        </div>

        
        <div class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div>
            <h3 class="text-base font-heading font-medium text-slate-900 mb-1">Antrean Moderasi Laporan</h3>
            <p class="text-xs text-slate-500 mb-5">Laporan jalur pendaki yang menunggu tindakan Anda</p>

            <div class="space-y-4">
              <div v-for="report in pendingReports" :key="report.id" class="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-[11px] font-medium text-slate-700">{{ report.user }}</span>
                  <span class="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 font-medium">Perlu Cek</span>
                </div>
                <p class="text-xs text-slate-600 mb-2 italic">"{{ report.comment }}"</p>
                <div class="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{{ report.mountain }}</span>
                  <NuxtLink to="/admin/comments" class="text-[#023C23] font-medium hover:underline">Tinjau &rarr;</NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-6 mt-6 border-t border-slate-100">
            <div class="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-slate-900">Sistem Telemetri AI</p>
                <p class="text-[11px] text-slate-600">Sinkron cuaca mikro otomatis berjalan normal.</p>
              </div>
              <span class="w-2.5 h-2.5 rounded-full bg-[#023C23] animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const recentMountains = ref([
  { id: 1, name: 'Gunung Rinjani', location: 'Lombok, NTB', elev: '3726m', basecamps: 4 },
  { id: 2, name: 'Gunung Semeru', location: 'Lumajang, Jatim', elev: '3676m', basecamps: 3 },
  { id: 3, name: 'Gunung Kerinci', location: 'Jambi, Sumbar', elev: '3805m', basecamps: 2 },
  { id: 4, name: 'Gunung Gede Pangrango', location: 'Cianjur, Jabar', elev: '2958m', basecamps: 3 }
])

const pendingReports = ref([
  { id: 101, user: 'Rizky Ramadhan', mountain: 'Mt. Rinjani (Pos Pelawangan)', comment: 'Jalur sedikit longsor akibat hujan deras semalam, butuh kehati-hatian ekstra dekat jalur letter E.' },
  { id: 102, user: 'Putri Andini', mountain: 'Mt. Merbabu (Jalur Suwanting)', comment: 'Mata air pos 2 kering kerontang sejak kemarin siang, disarankan bawa stok air ekstra dari basecamp.' }
])
</script>
