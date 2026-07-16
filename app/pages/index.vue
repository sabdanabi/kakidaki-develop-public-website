<template>
  <NuxtLayout name="auth">
    <div class="flex min-h-screen flex-col">

      <nav class="flex items-center justify-between px-6 py-5 md:px-12 lg:px-20">
        <div class="flex items-center gap-3">
          <img
            src="/images/logo.svg"
            alt="Kaki Daki"
            class="h-9 w-9"
          />
          <span class="text-xl font-bold tracking-tight text-slate-800">Kaki Daki</span>
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/login"
            class="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]"
          >
            Masuk
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="rounded-lg bg-023C23 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-023C23-600 active:scale-[0.98]"
          >
            Daftar
          </NuxtLink>
        </div>
      </nav>

      <main class="flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-10 md:px-12">
        <div class="mx-auto max-w-2xl text-center">
          <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-023C23-200 bg-023C23-50 px-4 py-1.5 text-sm font-medium text-023C23-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Flight Decision Platform
          </div>

          <h1 class="mb-5 font-heading text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
            Keputusan Tepat<br class="hidden md:block" /> untuk Setiap Penerbangan
          </h1>

          <p class="mx-auto mb-10 max-w-lg text-base leading-relaxed text-slate-500 md:text-lg">
            Platform AI untuk memantau dan mengoptimasi keputusan Go/No-Go penerbangan secara real-time.
          </p>

          <div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <NuxtLink
              to="/register"
              class="w-full rounded-xl bg-023C23 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-023C23-600 active:scale-[0.98] sm:w-auto"
            >
              Mulai Sekarang
            </NuxtLink>
            <NuxtLink
              to="/dashboard/packing-assistant"
              class="w-full rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98] sm:w-auto"
            >
              Masuk ke Dashboard
            </NuxtLink>
          </div>
        </div>
      </main>

      <footer class="pb-8 text-center text-xs text-slate-400">
        &copy; {{ new Date().getFullYear() }} Kaki Daki. All rights reserved.
      </footer>

    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false,
})
</script>
