<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <AdminSidebar />

    <!-- MAIN CONTENT AREA -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 space-y-6">
      
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-100 text-[#023C23] text-xs font-semibold mb-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-[#023C23]"></span>
            MOUNTAIN MANAGEMENT
          </div>
          <h1 class="text-2xl font-heading font-medium text-slate-900">Add & Detail Gunung</h1>
          <p class="text-sm text-slate-500 mt-1">Kelola direktori gunung Nusantara, data elevasi, basecamp simaksi, dan status jalur pendakian.</p>
        </div>

        <button
          @click="openModal()"
          class="px-5 py-3 bg-[#023C23] hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah Gunung Baru
        </button>
      </div>

      <!-- Filters & Search Bar -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <!-- Search Input -->
        <div class="relative flex-1 max-w-md">
          <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama gunung, provinsi, atau basecamp..."
            class="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#023C23] transition-all"
          />
        </div>

        <!-- Filter Buttons -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            v-for="filter in ['Semua', 'Buka / Aman', 'Siaga Cuaca', 'Tutup Ekosistem']"
            :key="filter"
            @click="activeFilter = filter"
            :class="[
              activeFilter === filter
                ? 'bg-[#023C23] text-white shadow-sm font-medium'
                : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600',
              'px-3.5 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap'
            ]"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Mountains List / Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div
          v-for="mt in filteredMountains"
          :key="mt.id"
          class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <!-- Header Row -->
            <div class="flex items-start justify-between gap-3 mb-4">
              <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#023C23] to-emerald-800 text-white flex flex-col items-center justify-center shadow-sm">
                  <span class="text-xs font-heading font-bold">{{ mt.elev }}</span>
                  <span class="text-[9px] text-emerald-200 uppercase tracking-tighter">MDPL</span>
                </div>
                <div>
                  <h3 class="text-base font-heading font-semibold text-slate-900 group-hover:text-[#023C23] transition-colors">
                    {{ mt.name }}
                  </h3>
                  <p class="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {{ mt.location }}
                  </p>
                </div>
              </div>

              <!-- Status Badge -->
              <span
                :class="[
                  mt.status === 'Buka / Aman' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                  mt.status === 'Siaga Cuaca' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                  'bg-red-100 text-red-800 border-red-200',
                  'px-3 py-1 rounded-full text-[10px] font-semibold border'
                ]"
              >
                {{ mt.status }}
              </span>
            </div>

            <!-- Details Box -->
            <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100/80 mb-5 space-y-2.5 text-xs">
              <div class="flex items-center justify-between text-slate-600">
                <span class="font-medium text-slate-400">Jalur Resmi (Basecamp):</span>
                <span class="font-medium text-slate-800">{{ mt.basecamps }}</span>
              </div>
              <div class="flex items-center justify-between text-slate-600">
                <span class="font-medium text-slate-400">Stasiun Telemetri Cuaca:</span>
                <span class="font-medium text-[#023C23] flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#023C23]"></span>
                  {{ mt.telemetry }}
                </span>
              </div>
              <div class="flex items-center justify-between text-slate-600">
                <span class="font-medium text-slate-400">Simaksi / Tiket Resmi:</span>
                <span class="font-medium text-slate-800">Rp {{ mt.ticket.toLocaleString('id-ID') }} / Hari</span>
              </div>
            </div>
          </div>

          <!-- Actions Footer -->
          <div class="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              @click="deleteMountain(mt.id)"
              class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
              title="Hapus Gunung"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
            <button
              @click="openModal(mt)"
              class="px-4 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
              Edit Detail
            </button>
          </div>
        </div>
      </div>

      <!-- MODAL TAMBAH / EDIT GUNUNG -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div class="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 class="font-heading text-lg font-semibold text-slate-900">
                  {{ isEditing ? 'Edit Data Gunung' : 'Tambah Data Gunung Baru' }}
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">Lengkapi profil elevasi dan konfigurasi stasiun telemetri</p>
              </div>
              <button @click="showModal = false" class="text-slate-400 hover:text-slate-600 p-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form @submit.prevent="saveMountain" class="space-y-4 text-xs">
              <!-- Nama Gunung & Elevasi -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="sm:col-span-2">
                  <label class="block font-medium text-slate-700 mb-1">Nama Gunung</label>
                  <input
                    v-model="formModal.name"
                    type="text"
                    placeholder="Contoh: Gunung Rinjani"
                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                    required
                  />
                </div>
                <div>
                  <label class="block font-medium text-slate-700 mb-1">Ketinggian (MDPL)</label>
                  <input
                    v-model="formModal.elev"
                    type="number"
                    placeholder="3726"
                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                    required
                  />
                </div>
              </div>

              <!-- Lokasi & Status -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-medium text-slate-700 mb-1">Lokasi / Provinsi</label>
                  <input
                    v-model="formModal.location"
                    type="text"
                    placeholder="Contoh: Lombok, NTB"
                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                    required
                  />
                </div>
                <div>
                  <label class="block font-medium text-slate-700 mb-1">Status Pendakian</label>
                  <select
                    v-model="formModal.status"
                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                  >
                    <option value="Buka / Aman">Buka / Aman</option>
                    <option value="Siaga Cuaca">Siaga Cuaca</option>
                    <option value="Tutup Ekosistem">Tutup Ekosistem</option>
                  </select>
                </div>
              </div>

              <!-- Basecamps & Telemetry ID -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-medium text-slate-700 mb-1">Daftar Basecamp & Jalur Resmi</label>
                  <input
                    v-model="formModal.basecamps"
                    type="text"
                    placeholder="Senaru, Sembalun, Torean, Aik Berik"
                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                    required
                  />
                </div>
                <div>
                  <label class="block font-medium text-slate-700 mb-1">ID Stasiun Telemetri</label>
                  <input
                    v-model="formModal.telemetry"
                    type="text"
                    placeholder="ST-RNJ-01 (Lombok Nord)"
                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                    required
                  />
                </div>
              </div>

              <!-- Tiket Simaksi -->
              <div>
                <label class="block font-medium text-slate-700 mb-1">Harga Tiket Simaksi (IDR / Hari)</label>
                <input
                  v-model.number="formModal.ticket"
                  type="number"
                  placeholder="35000"
                  class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                  required
                />
              </div>

              <!-- Submit Footer -->
              <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  @click="showModal = false"
                  class="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="px-5 py-2.5 rounded-xl bg-[#023C23] hover:bg-emerald-800 text-white font-semibold shadow-md transition-all active:scale-[0.98]"
                >
                  {{ isEditing ? 'Simpan Perubahan' : 'Tambah Gunung' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const activeFilter = ref('Semua')
const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const mountains = ref([
  {
    id: 1,
    name: 'Gunung Rinjani',
    location: 'Lombok, Nusa Tenggara Barat',
    elev: 3726,
    basecamps: 'Senaru, Sembalun, Torean, Aik Berik',
    telemetry: 'ST-RNJ-01 (12°C, Angin 24km/h)',
    status: 'Buka / Aman',
    ticket: 35000
  },
  {
    id: 2,
    name: 'Gunung Semeru',
    location: 'Lumajang, Jawa Timur',
    elev: 3676,
    basecamps: 'Ranu Pani (Taman Nasional Bromo Tengger Semeru)',
    telemetry: 'ST-SMR-04 (10°C, Angin 18km/h)',
    status: 'Tutup Ekosistem',
    ticket: 29000
  },
  {
    id: 3,
    name: 'Gunung Kerinci',
    location: 'Jambi, Sumatra Barat',
    elev: 3805,
    basecamps: 'Kersik Tuo, Solok Selatan',
    telemetry: 'ST-KRC-02 (11°C, Kelembaban 85%)',
    status: 'Buka / Aman',
    ticket: 40000
  },
  {
    id: 4,
    name: 'Gunung Gede Pangrango',
    location: 'Cianjur - Sukabumi, Jawa Barat',
    elev: 2958,
    basecamps: 'Cibodas, Gunung Putri, Selabintana',
    telemetry: 'ST-GDE-01 (14°C, Hujan Ringan)',
    status: 'Siaga Cuaca',
    ticket: 30000
  },
  {
    id: 5,
    name: 'Gunung Merbabu',
    location: 'Boyolali - Magelang, Jawa Tengah',
    elev: 3145,
    basecamps: 'Selo, Suwanting, Wekas, Cuntel, Thekelan',
    telemetry: 'ST-MRB-03 (13°C, Angin 15km/h)',
    status: 'Buka / Aman',
    ticket: 25000
  }
])

const formModal = ref({
  name: '',
  location: '',
  elev: '',
  basecamps: '',
  telemetry: '',
  status: 'Buka / Aman',
  ticket: 30000
})

const filteredMountains = computed(() => {
  return mountains.value.filter(mt => {
    const matchQuery = mt.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       mt.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       mt.basecamps.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchFilter = activeFilter.value === 'Semua' || mt.status === activeFilter.value
    return matchQuery && matchFilter
  })
})

const openModal = (mt = null) => {
  if (mt) {
    isEditing.value = true
    editingId.value = mt.id
    formModal.value = { ...mt }
  } else {
    isEditing.value = false
    editingId.value = null
    formModal.value = {
      name: '',
      location: '',
      elev: '',
      basecamps: '',
      telemetry: 'ST-NEW-01 (Sensor Aktif)',
      status: 'Buka / Aman',
      ticket: 35000
    }
  }
  showModal.value = true
}

const saveMountain = () => {
  if (isEditing.value && editingId.value) {
    const idx = mountains.value.findIndex(m => m.id === editingId.value)
    if (idx !== -1) {
      mountains.value[idx] = { ...formModal.value, id: editingId.value }
    }
  } else {
    const newId = Date.now()
    mountains.value.unshift({
      ...formModal.value,
      id: newId
    })
  }
  showModal.value = false
}

const deleteMountain = (id) => {
  mountains.value = mountains.value.filter(m => m.id !== id)
}
</script>
