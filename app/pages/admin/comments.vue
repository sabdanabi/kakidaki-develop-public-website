<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <AdminSidebar />

    <!-- MAIN CONTENT AREA -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 space-y-6">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-100 text-[#023C23] text-xs font-medium mb-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-[#023C23]"></span>
            COMMENT & TRAIL REPORT CONTROL
          </div>
          <h1 class="text-2xl font-heading font-medium text-slate-900">Control Komentar & Ulasan</h1>
          <p class="text-sm text-slate-500 mt-1">Pantau ulasan dari komunitas pendaki. Hapus komentar yang tidak pantas atau tandai peringatan untuk dilaporkan langsung ke pihak basecamp.</p>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
          <p class="text-xs text-slate-400 font-medium">TOTAL KOMENTAR / ULASAN</p>
          <p class="text-2xl font-heading font-medium text-slate-900 mt-1">{{ comments.length }} Laporan</p>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
          <p class="text-xs text-slate-400 font-medium">DITANDAI & DILAPORKAN KE BASECAMP</p>
          <p class="text-2xl font-heading font-medium text-amber-600 mt-1">{{ comments.filter(c => c.isFlagged).length }} Laporan</p>
        </div>
      </div>

      <!-- Search & Filter -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="relative flex-1 max-w-md">
          <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari isi komentar, pos jalur, atau nama pendaki..."
            class="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#023C23] transition-all"
          />
        </div>

        <div class="flex items-center gap-1.5">
          <button
            v-for="f in ['Semua', 'Ditandai / Lapor Basecamp', 'Normal']"
            :key="f"
            @click="activeFilter = f"
            :class="[
              activeFilter === f ? 'bg-[#023C23] text-white font-medium shadow-sm' : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600',
              'px-3.5 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap'
            ]"
          >
            {{ f }}
          </button>
        </div>
      </div>

      <!-- Comments List -->
      <div class="space-y-4">
        <div
          v-for="c in filteredComments"
          :key="c.id"
          class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
        >
          <!-- Left: Comment Content -->
          <div class="flex-1 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-heading font-medium text-xs flex items-center justify-center border border-slate-200">
                  {{ c.avatar }}
                </div>
                <div>
                  <h4 class="font-heading font-medium text-slate-900 text-sm">
                    {{ c.author }}
                  </h4>
                  <p class="text-xs text-slate-400">{{ c.timestamp }} • {{ c.mountain }}</p>
                </div>
              </div>

              <!-- Flag Status Badge -->
              <span
                v-if="c.isFlagged"
                class="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-medium text-[11px] border border-amber-200 flex items-center gap-1.5 animate-pulse"
              >
                <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Peringatan Terlapor ke Basecamp
              </span>
              <span
                v-else
                class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-[11px] border border-slate-200"
              >
                Komentar Reguler
              </span>
            </div>

            <!-- Comment Box -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 text-xs leading-relaxed font-sans">
              "{{ c.text }}"
            </div>
          </div>

          <!-- Right: Simplistic Actions (Hapus & Tandai Lapor Basecamp) -->
          <div class="flex flex-wrap md:flex-col justify-end gap-2 shrink-0 md:w-56 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
            <button
              @click="toggleFlag(c)"
              :class="[
                c.isFlagged
                  ? 'bg-amber-100 hover:bg-amber-200/80 text-amber-800 border-amber-300'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200',
                'w-full py-2.5 px-3 rounded-xl font-medium text-xs transition-all border flex items-center justify-center gap-1.5 active:scale-[0.98]'
              ]"
            >
              <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              {{ c.isFlagged ? 'Batalkan Lapor Basecamp' : 'Tandai & Lapor Basecamp' }}
            </button>

            <button
              @click="deleteComment(c.id, c.author)"
              class="w-full py-2.5 px-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-1 active:scale-[0.98]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Hapus Komentar
            </button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCommentsStore } from '~/stores/comments'

const commentsStore = useCommentsStore()

const searchQuery = ref('')
const activeFilter = ref('Semua')

const comments = ref([
  {
    id: 1,
    author: 'Rizky Ramadhan',
    avatar: 'RR',
    timestamp: '15 menit lalu',
    mountain: 'Mt. Rinjani (Pos 3 Plawangan Sembalun)',
    text: 'Jalur sedikit longsor dan licin akibat hujan lebat semalam dekat tanjakan letter E. Harap berhati-hati dan gunakan tracking pole.',
    isFlagged: true
  },
  {
    id: 2,
    author: 'Putri Andini',
    avatar: 'PA',
    timestamp: '1 jam lalu',
    mountain: 'Mt. Merbabu (Jalur Suwanting)',
    text: 'Mata air di Pos 2 saat ini kering kerontang. Pendaki yang naik hari ini disarankan bawa stok air ekstra langsung dari basecamp bawah.',
    isFlagged: true
  },
  {
    id: 3,
    author: 'Fauzan Diwangkara',
    avatar: 'FD',
    timestamp: '3 jam lalu',
    mountain: 'Mt. Semeru (Ranu Kumbolo)',
    text: 'Suhu malam di Ranu Kumbolo menyentuh 4°C dengan embun beku tipis di tenda. Pastikan bawa sleeping bag comfort limit minimal 0°C.',
    isFlagged: false
  },
  {
    id: 4,
    author: 'Anonim Trekker',
    avatar: 'AT',
    timestamp: '5 jam lalu',
    mountain: 'Mt. Gede (Pos Puncak)',
    text: 'Jual open trip murah tanpa simaksi dan tanpa cek kesehatan, hubungi WA 08123456789 diskon 50%.',
    isFlagged: false
  }
])

const filteredComments = computed(() => {
  return comments.value.filter(c => {
    const matchQuery = c.author.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       c.mountain.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       c.text.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchFilter = activeFilter.value === 'Semua' ||
                        (activeFilter.value === 'Ditandai / Lapor Basecamp' && c.isFlagged) ||
                        (activeFilter.value === 'Normal' && !c.isFlagged)
    return matchQuery && matchFilter
  })
})

const toggleFlag = (c) => {
  c.isFlagged = !c.isFlagged
  if (c.isFlagged) {
    alert(`Peringatan dari ${c.author} telah ditandai dan diteruskan secara otomatis ke sistem Basecamp Resmi ${c.mountain} untuk tindak lanjut!`)
  }
}

const deleteComment = async (id, author) => {
  const blockReason = prompt(`Yakin ingin memblokir komentar dari ${author}? Masukkan alasannya:`, 'Mengandung kata-kata kasar atau promosi open trip ilegal')
  if (blockReason !== null) {
    const res = await commentsStore.blockComment(id, { blockReason })
    if (res.success) {
      comments.value = comments.value.filter(c => c.id !== id)
      alert('Komentar berhasil diblokir.')
    } else {
      alert(res.message || 'Gagal memblokir komentar.')
    }
  }
}
</script>
