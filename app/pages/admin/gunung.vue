<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <AdminSidebar />

    <!-- MAIN CONTENT AREA -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 space-y-6">
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-100 text-[#023C23] text-xs font-medium mb-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-[#023C23]"></span>
            MOUNTAIN DIRECTORY
          </div>
          <h1 class="text-2xl font-heading font-medium text-slate-900">Add & Detail Gunung</h1>
          <p class="text-sm text-slate-500 mt-1">Kelola data detail gunung (nama, ketinggian, image, jarak puncak, koordinat, suhu, deskripsi).</p>
        </div>

        <button
          @click="openModal()"
          class="px-5 py-3 bg-[#023C23] hover:bg-emerald-800 text-white text-xs font-medium rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah Gunung Baru
        </button>
      </div>

      <!-- Search Bar -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between gap-4">
        <div class="relative flex-1 max-w-md">
          <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama gunung atau deskripsi..."
            class="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#023C23] transition-all"
          />
        </div>
        <div class="text-xs text-slate-400 font-medium hidden sm:block">
          Total: <span class="text-slate-800 font-medium">{{ filteredMountains.length }} Gunung</span>
        </div>
      </div>

      <!-- Mountains Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div
          v-for="mt in filteredMountains"
          :key="mt.id"
          class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <!-- Header with Image & Name -->
            <div class="flex items-start gap-4 mb-4">
              <img
                :src="mt.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'"
                :alt="mt.nama"
                class="w-20 h-20 rounded-2xl object-cover border border-slate-100 shadow-sm shrink-0"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <h3 class="text-base font-heading font-medium text-slate-900 group-hover:text-[#023C23] transition-colors truncate">
                    {{ mt.nama }}
                  </h3>
                  <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-[#023C23] text-xs font-medium border border-emerald-100 shrink-0">
                    {{ mt.ketinggian }} mdpl
                  </span>
                </div>
                <p class="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {{ mt.desc }}
                </p>
              </div>
            </div>

            <!-- Details Box -->
            <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100/80 mb-5 space-y-2 text-xs">
              <div class="flex items-center justify-between text-slate-600">
                <span class="font-medium text-slate-400">Jarak dari Basecamp ke Puncak:</span>
                <span class="font-medium text-slate-800">{{ mt.jarak_puncak }} km</span>
              </div>
              <div class="flex items-center justify-between text-slate-600">
                <span class="font-medium text-slate-400">Suhu Normal Puncak:</span>
                <span class="font-medium text-amber-700">{{ mt.suhu_normal }}°C</span>
              </div>
              <div class="flex items-center justify-between text-slate-600">
                <span class="font-medium text-slate-400">Koordinat (Lat, Long):</span>
                <span class="font-medium text-slate-800">{{ mt.latitude }}, {{ mt.longitude }}</span>
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
                <h3 class="font-heading text-lg font-medium text-slate-900">
                  {{ isEditing ? 'Edit Data Gunung' : 'Tambah Data Gunung Baru' }}
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">Lengkapi detail spesifikasi gunung</p>
              </div>
              <button @click="showModal = false" class="text-slate-400 hover:text-slate-600 p-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form @submit.prevent="saveMountain" class="space-y-4 text-xs">
              <!-- Nama Gunung & Ketinggian -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="sm:col-span-2">
                  <label class="block font-medium text-slate-700 mb-1">Nama Gunung</label>
                  <input
                    v-model="formModal.nama"
                    type="text"
                    placeholder="Contoh: Gunung Rinjani"
                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                    required
                  />
                </div>
                <div>
                  <label class="block font-medium text-slate-700 mb-1">Ketinggian (mdpl)</label>
                  <input
                    v-model.number="formModal.ketinggian"
                    type="number"
                    placeholder="3726"
                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                    required
                  />
                </div>
              </div>

              <!-- URL Image & Jarak ke Puncak -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-medium text-slate-700 mb-1">URL Image (Foto Gunung)</label>
                  <input
                    v-model="formModal.image"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                  />
                </div>
                <div>
                  <label class="block font-medium text-slate-700 mb-1">Jarak dari Basecamp ke Puncak (km - Integer)</label>
                  <input
                    v-model.number="formModal.jarak_puncak"
                    type="number"
                    placeholder="Contoh: 6"
                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                    required
                  />
                </div>
              </div>

              <!-- Latitude & Longitude -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-medium text-slate-700 mb-1">Latitude</label>
                  <input
                    v-model="formModal.latitude"
                    type="text"
                    placeholder="Contoh: -8.4113"
                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                    required
                  />
                </div>
                <div>
                  <label class="block font-medium text-slate-700 mb-1">Longitude</label>
                  <input
                    v-model="formModal.longitude"
                    type="text"
                    placeholder="Contoh: 116.4572"
                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                    required
                  />
                </div>
              </div>

              <!-- Suhu Normal Puncak -->
              <div>
                <label class="block font-medium text-slate-700 mb-1">Suhu Normal Puncak (°C - Integer)</label>
                <input
                  v-model.number="formModal.suhu_normal"
                  type="number"
                  placeholder="Contoh: 5"
                  class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                  required
                />
              </div>

              <!-- Deskripsi -->
              <div>
                <label class="block font-medium text-slate-700 mb-1">Deskripsi Gunung</label>
                <textarea
                  v-model="formModal.desc"
                  rows="3"
                  placeholder="Tuliskan deskripsi singkat gunung..."
                  class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#023C23]"
                  required
                ></textarea>
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
                  class="px-5 py-2.5 rounded-xl bg-[#023C23] hover:bg-emerald-800 text-white font-medium shadow-sm transition-all active:scale-[0.98]"
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
import { ref, computed, onMounted } from 'vue'
import { useExpeditionStore } from '~/stores/expedition'

const expeditionStore = useExpeditionStore()

const searchQuery = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const mappedMountains = computed(() => {
  return expeditionStore.mountains.map(m => ({
    id: m.id || m._id,
    nama: m.name || 'Gunung Tanpa Nama',
    ketinggian: m.elevationM || 0,
    image: m.imageUrl || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    jarak_puncak: m.distanceToPeakKm || 0,
    latitude: m.latitude || 0,
    longitude: m.longitude || 0,
    suhu_normal: m.baseTempC || 15,
    desc: m.description || ''
  }))
})

const formModal = ref({
  nama: '',
  ketinggian: '',
  image: '',
  jarak_puncak: '',
  latitude: '',
  longitude: '',
  suhu_normal: '',
  desc: ''
})

const filteredMountains = computed(() => {
  if (!searchQuery.value) return mappedMountains.value
  const q = searchQuery.value.toLowerCase()
  return mappedMountains.value.filter(mt =>
    mt.nama.toLowerCase().includes(q) || mt.desc.toLowerCase().includes(q)
  )
})

onMounted(async () => {
  await expeditionStore.fetchMountains()
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
      nama: '',
      ketinggian: '',
      image: '',
      jarak_puncak: '',
      latitude: '',
      longitude: '',
      suhu_normal: '',
      desc: ''
    }
  }
  showModal.value = true
}

const saveMountain = async () => {
  const payload = {
    name: formModal.value.nama,
    elevationM: Number(formModal.value.ketinggian),
    difficulty: 'HARD',
    distanceToPeakKm: Number(formModal.value.jarak_puncak),
    latitude: Number(formModal.value.latitude),
    longitude: Number(formModal.value.longitude),
    baseTempC: Number(formModal.value.suhu_normal),
    description: formModal.value.desc,
    imageUrl: formModal.value.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
  }
  
  if (isEditing.value && editingId.value) {
    const idx = expeditionStore.mountains.findIndex(m => m.id === editingId.value)
    if (idx !== -1) {
      expeditionStore.mountains[idx] = {
        ...expeditionStore.mountains[idx],
        name: payload.name,
        elevationM: payload.elevationM,
        imageUrl: payload.imageUrl,
        distanceToPeakKm: payload.distanceToPeakKm,
        latitude: payload.latitude,
        longitude: payload.longitude,
        baseTempC: payload.baseTempC,
        description: payload.description
      }
    }
  } else {
    const res = await expeditionStore.createMountain(payload)
    if (!res.success) {
      alert(res.message || 'Gagal menambahkan gunung.')
      return
    }
  }
  showModal.value = false
}

const deleteMountain = (id) => {
  expeditionStore.mountains = expeditionStore.mountains.filter(m => m.id !== id)
}
</script>
