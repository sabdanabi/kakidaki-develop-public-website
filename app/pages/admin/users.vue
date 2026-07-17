<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <AdminSidebar />

    <!-- MAIN CONTENT AREA -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 space-y-6">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-100 text-[#023C23] text-xs font-semibold mb-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-[#023C23]"></span>
            USER MANAGEMENT
          </div>
          <h1 class="text-2xl font-heading font-medium text-slate-900">Control Akun User</h1>
          <p class="text-sm text-slate-500 mt-1">Pantau pendaki terdaftar dan hapus akun jika terdapat nama atau aktivitas yang tidak jelas / mencurigakan.</p>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
          <p class="text-xs text-slate-400 font-medium">TOTAL PENDAKI TERDAFTAR</p>
          <p class="text-2xl font-heading font-semibold text-slate-900 mt-1">{{ users.length }} User</p>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
          <p class="text-xs text-slate-400 font-medium">AKUN TERVERIFIKASI</p>
          <p class="text-2xl font-heading font-semibold text-emerald-600 mt-1">{{ users.filter(u => u.status === 'Aktif').length }} User</p>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
          <p class="text-xs text-slate-400 font-medium">DITANDAI / MENCURIGAKAN</p>
          <p class="text-2xl font-heading font-semibold text-amber-600 mt-1">{{ users.filter(u => u.status !== 'Aktif').length }} User</p>
        </div>
      </div>

      <!-- Search Input -->
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
            placeholder="Cari nama pendaki atau email untuk mengecek..."
            class="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#023C23] transition-all"
          />
        </div>
      </div>

      <!-- Users Table Container -->
      <div class="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th class="py-4 px-6">Pendaki / User</th>
                <th class="py-4 px-6">Email</th>
                <th class="py-4 px-6">Status Akun</th>
                <th class="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs">
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                class="hover:bg-slate-50/60 transition-colors"
              >
                <!-- User Info -->
                <td class="py-4 px-6">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-heading font-bold text-xs border border-slate-200">
                      {{ user.avatar }}
                    </div>
                    <div>
                      <p class="font-heading font-semibold text-slate-900">{{ user.name }}</p>
                      <p class="text-[11px] text-slate-400">Terdaftar sejak {{ user.joined }}</p>
                    </div>
                  </div>
                </td>

                <!-- Email -->
                <td class="py-4 px-6 text-slate-600 font-medium">
                  {{ user.email }}
                </td>

                <!-- Status -->
                <td class="py-4 px-6">
                  <span
                    :class="[
                      user.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                      'bg-amber-100 text-amber-800 border-amber-200',
                      'px-2.5 py-1 rounded-full text-[10px] font-semibold border'
                    ]"
                  >
                    {{ user.status }}
                  </span>
                </td>

                <!-- Actions: Cuman hapus doang -->
                <td class="py-4 px-6 text-right">
                  <button
                    @click="deleteUser(user.id, user.name)"
                    class="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-medium text-xs transition-all inline-flex items-center gap-1.5 active:scale-[0.98]"
                    title="Hapus Akun"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Hapus Akun
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const users = ref([
  {
    id: 1,
    name: 'Fauzan Diwangkara',
    email: 'fauzan@kakidaki.id',
    avatar: 'FD',
    joined: '12 Jan 2026',
    status: 'Aktif'
  },
  {
    id: 2,
    name: 'Rizky Ramadhan',
    email: 'rizky.r@gmail.com',
    avatar: 'RR',
    joined: '04 Mar 2026',
    status: 'Aktif'
  },
  {
    id: 3,
    name: 'Putri Andini',
    email: 'putri.a@yahoo.com',
    avatar: 'PA',
    joined: '18 Apr 2026',
    status: 'Aktif'
  },
  {
    id: 4,
    name: 'xx_gajelas_12399 (Spam Bot)',
    email: 'bot_promo99@outlook.com',
    avatar: 'XG',
    joined: 'Hari Ini',
    status: 'Mencurigakan'
  },
  {
    id: 5,
    name: 'Clarissa Maharani',
    email: 'clarissa.m@kakidaki.id',
    avatar: 'CM',
    joined: '20 Mei 2026',
    status: 'Aktif'
  }
])

const filteredUsers = computed(() => {
  return users.value.filter(u => {
    return u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
           u.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

const deleteUser = (id, name) => {
  if (confirm(`Yakin ingin menghapus akun atas nama "${name}"? Akun yang dihapus tidak dapat dipulihkan.`)) {
    users.value = users.value.filter(u => u.id !== id)
  }
}
</script>
