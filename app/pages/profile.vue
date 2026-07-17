<script setup>
definePageMeta({
  layout: false,
})

const profileStore = useProfileStore()

const profile = ref({
  name: '',
  email: '',
  age: '',
  phone: '',
  gender: '',
})

const isEditing = ref(false)
const isLoading = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const fetchProfileData = async () => {
  isLoading.value = true
  errorMessage.value = ''

  const result = await profileStore.fetchProfile()
  if (result.success && result.data) {
    profile.value = {
      name: result.data.name || '',
      email: result.data.email || '',
      age: result.data.age || '',
      phone: result.data.phone || '',
      gender: result.data.gender || '',
    }
  } else {
    errorMessage.value = result.message || 'Gagal memuat profil.'
  }
  isLoading.value = false
}

const handlePhoneInput = (e) => {
  const value = e.target.value.replace(/[^0-9+]/g, '')
  profile.value.phone = value
  e.target.value = value
}

const saveProfile = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!profile.value.name.trim()) {
    errorMessage.value = 'Nama tidak boleh kosong.'
    return
  }

  if (!profile.value.age || parseInt(profile.value.age) <= 0) {
    errorMessage.value = 'Umur harus berupa angka positif.'
    return
  }

  if (!profile.value.phone) {
    errorMessage.value = 'Nomor HP tidak boleh kosong.'
    return
  }

  if (!profile.value.gender) {
    errorMessage.value = 'Jenis kelamin wajib dipilih.'
    return
  }

  isSaving.value = true
  const result = await profileStore.updateProfile({
    name: profile.value.name.trim(),
    age: parseInt(profile.value.age),
    phone: profile.value.phone,
    gender: profile.value.gender,
  })

  isSaving.value = false
  if (result.success) {
    successMessage.value = 'Profil berhasil diperbarui!'
    isEditing.value = false
    if (result.data) {
      profile.value = {
        name: result.data.name || '',
        email: result.data.email || '',
        age: result.data.age || '',
        phone: result.data.phone || '',
        gender: result.data.gender || '',
      }
    }
    setTimeout(() => {
      successMessage.value = ''
    }, 4000)
  } else {
    errorMessage.value = result.message || 'Gagal memperbarui profil.'
  }
}

onMounted(() => {
  fetchProfileData()
})
</script>

<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <!-- Sidebar Component -->
    <Sidebar active="profile" />

    <!-- MAIN CONTENT AREA -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 lg:p-8 flex flex-col">
      <div class="w-full max-w-4xl mx-auto space-y-6">

        <!-- HEADER -->
        <header class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-heading font-medium text-slate-900">Profile Saya</h1>
            <p class="text-sm text-slate-500 mt-1">Kelola data informasi personal dan biometrik pendakian Anda</p>
          </div>
        </header>

        <!-- ALERTS -->
        <div v-if="successMessage" class="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm font-medium transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#118c13]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{{ successMessage }}</span>
        </div>

        <div v-if="errorMessage" class="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-800 text-sm font-medium transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- MAIN CARD -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <!-- Loading State -->
          <div v-if="isLoading" class="p-12 flex flex-col items-center justify-center space-y-4">
            <div class="h-8 w-8 rounded-full border-4 border-slate-200 border-t-[#118c13] animate-spin"></div>
            <p class="text-sm text-slate-500 font-medium">Memuat data profil...</p>
          </div>

          <!-- Content State -->
          <div v-else class="p-6 md:p-8">
            <div class="flex flex-col md:flex-row items-start md:items-center gap-6 pb-8 border-b border-slate-100">
              <!-- Avatar placeholder -->
              <div class="h-20 w-20 rounded-2xl bg-[#023C23]/5 flex items-center justify-center text-2xl font-medium text-[#023C23] shrink-0">
                {{ profile.name ? profile.name.substring(0, 2).toUpperCase() : 'KD' }}
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-medium text-slate-900">{{ profile.name || 'Pendaki Kakidaki' }}</h2>
                <p class="text-sm text-slate-500 mt-1">{{ profile.email }}</p>
                <div class="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-[#118c13] text-xs font-medium border border-green-100">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#118c13]"></span>
                  Active User
                </div>
              </div>
              <div v-if="!isEditing" class="w-full md:w-auto mt-4 md:mt-0">
                <button
                  @click="isEditing = true"
                  class="w-full md:w-auto inline-flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 bg-white rounded-xl px-4 py-2.5 text-xs font-medium transition-all shadow-sm active:scale-[0.98]"
                >
                  <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                  </svg>
                  Edit Profil
                </button>
              </div>
            </div>

            <!-- View Mode -->
            <div v-if="!isEditing" class="py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-1">
                <span class="text-xs font-medium text-slate-400 uppercase tracking-wider block">Nama Lengkap</span>
                <span class="text-sm font-medium text-slate-800 block">{{ profile.name || '-' }}</span>
              </div>
              <div class="space-y-1">
                <span class="text-xs font-medium text-slate-400 uppercase tracking-wider block">Email</span>
                <span class="text-sm font-medium text-slate-800 block">{{ profile.email || '-' }}</span>
              </div>
              <div class="space-y-1">
                <span class="text-xs font-medium text-slate-400 uppercase tracking-wider block">Nomor HP</span>
                <span class="text-sm font-medium text-slate-800 block">{{ profile.phone || '-' }}</span>
              </div>
              <div class="space-y-1">
                <span class="text-xs font-medium text-slate-400 uppercase tracking-wider block">Umur</span>
                <span class="text-sm font-medium text-slate-800 block">{{ profile.age ? `${profile.age} Tahun` : '-' }}</span>
              </div>
              <div class="space-y-1">
                <span class="text-xs font-medium text-slate-400 uppercase tracking-wider block">Jenis Kelamin</span>
                <span class="text-sm font-medium text-slate-800 block">
                  {{ profile.gender === 'MALE' ? 'Laki-laki' : profile.gender === 'FEMALE' ? 'Perempuan' : '-' }}
                </span>
              </div>
            </div>

            <!-- Edit Mode -->
            <form v-else @submit.prevent="saveProfile" class="py-6 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name -->
                <div>
                  <label for="prof-name" class="mb-1.5 block text-sm font-medium text-slate-700">Nama Lengkap</label>
                  <input
                    id="prof-name"
                    v-model="profile.name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    class="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[#118c13] focus:outline-none focus:ring-2 focus:ring-[#118c13]/20"
                    required
                  />
                </div>

                <!-- Age -->
                <div>
                  <label for="prof-age" class="mb-1.5 block text-sm font-medium text-slate-700">Umur</label>
                  <input
                    id="prof-age"
                    v-model="profile.age"
                    type="number"
                    min="1"
                    max="120"
                    placeholder="Masukkan umur"
                    class="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[#118c13] focus:outline-none focus:ring-2 focus:ring-[#118c13]/20"
                    required
                  />
                </div>

                <!-- Phone -->
                <div>
                  <label for="prof-phone" class="mb-1.5 block text-sm font-medium text-slate-700">Nomor HP</label>
                  <input
                    id="prof-phone"
                    :value="profile.phone"
                    @input="handlePhoneInput"
                    type="tel"
                    placeholder="Masukkan nomor HP"
                    class="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[#118c13] focus:outline-none focus:ring-2 focus:ring-[#118c13]/20"
                    required
                  />
                </div>

                <!-- Gender -->
                <div>
                  <label for="prof-gender" class="mb-1.5 block text-sm font-medium text-slate-700">Jenis Kelamin</label>
                  <div class="relative">
                    <select
                      id="prof-gender"
                      v-model="profile.gender"
                      class="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-800 transition-all focus:border-[#118c13] focus:outline-none focus:ring-2 focus:ring-[#118c13]/20 appearance-none font-medium"
                      required
                    >
                      <option value="" disabled>Pilih jenis kelamin</option>
                      <option value="MALE">Laki-laki</option>
                      <option value="FEMALE">Perempuan</option>
                    </select>
                    <span class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Form Buttons -->
              <div class="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  @click="isEditing = false; errorMessage = ''"
                  :disabled="isSaving"
                  class="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 bg-white rounded-xl text-xs font-medium transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="isSaving"
                  class="px-5 py-2.5 bg-[#023C23] hover:bg-emerald-800 text-white rounded-xl text-xs font-medium transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
                >
                  <span v-if="isSaving" class="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                  {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>
    </main>
  </div>
</template>
