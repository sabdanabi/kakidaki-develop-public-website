<template>
  <aside class="w-64 h-full flex flex-col border-r border-slate-200/60 bg-[#FAFAFA] hidden md:flex shrink-0">
    <!-- Sidebar Header -->
    <div class="p-6 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <svg class="w-7 h-7 text-[#023C23]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 20l7-12 5 8 2-3 4 7H3z" />
        </svg>
        <span class="text-xl font-medium tracking-tight text-[#023C23]">KakiDaki</span>
      </NuxtLink>
      <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-[#023C23] tracking-wide">
        ADMIN
      </span>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-4 py-4 space-y-1.5">
      <!-- Admin Dashboard -->
      <NuxtLink 
        to="/admin/dashboard" 
        class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100/65 rounded-xl font-medium text-sm transition-colors border border-transparent" 
        :class="{ '!text-[#023C23] !bg-emerald-50/60 !font-medium !border-emerald-100/50': $route.path === '/admin/dashboard' }"
      >
        <svg class="w-5 h-5 text-current" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
        Dashboard Admin
      </NuxtLink>

      <!-- Add Gunung / Manajemen Gunung -->
      <NuxtLink 
        to="/admin/gunung" 
        class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100/65 rounded-xl font-medium text-sm transition-colors border border-transparent" 
        :class="{ '!text-[#023C23] !bg-emerald-50/60 !font-medium !border-emerald-100/50': $route.path === '/admin/gunung' }"
      >
        <svg class="w-5 h-5 text-current" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add & Detail Gunung
      </NuxtLink>

      <!-- Control Akun User -->
      <NuxtLink 
        to="/admin/users" 
        class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100/65 rounded-xl font-medium text-sm transition-colors border border-transparent" 
        :class="{ '!text-[#023C23] !bg-emerald-50/60 !font-medium !border-emerald-100/50': $route.path === '/admin/users' }"
      >
        <svg class="w-5 h-5 text-current" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
        Control Akun User
      </NuxtLink>

      <!-- Control Komentar / Ulasan -->
      <NuxtLink 
        to="/admin/comments" 
        class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100/65 rounded-xl font-medium text-sm transition-colors border border-transparent" 
        :class="{ '!text-[#023C23] !bg-emerald-50/60 !font-medium !border-emerald-100/50': $route.path === '/admin/comments' }"
      >
        <svg class="w-5 h-5 text-current" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
        Control Komentar
      </NuxtLink>
    </nav>

    <!-- Sidebar Footer -->
    <div class="p-4 border-t border-slate-200/50 mt-auto space-y-3">
      <div class="bg-slate-100/80 rounded-xl p-3 flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-[#023C23] text-white flex items-center justify-center font-bold text-xs">
          AD
        </div>
        <div class="overflow-hidden">
          <p class="text-xs font-medium text-slate-800 truncate">Admin KakiDaki</p>
          <p class="text-[10px] text-slate-400 truncate">Super Administrator</p>
        </div>
      </div>

      <!-- Logout / Switch to User Portal -->
      <NuxtLink
        to="/login"
        class="w-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80 py-2.5 px-4 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
        Keluar / Switch Role
      </NuxtLink>
    </div>
  </aside>
</template>
