<template>  
  <footer class="bg-slate-200/30 rounded-3xl p-8 text-center space-y-4 border border-slate-200/50 mt-8">
    <!-- Logo -->
    <div class="text-[#118c13] font-extrabold text-base tracking-wider uppercase">
      KakiDaki
    </div>

    <!-- Navigation links -->
    <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
      <NuxtLink to="#" class="hover:text-[#118c13] transition-colors">Privacy Policy</NuxtLink>
      <NuxtLink to="#" class="hover:text-[#118c13] transition-colors">Terms of Service</NuxtLink>
      <NuxtLink to="#" class="hover:text-[#118c13] transition-colors">Safety Guides</NuxtLink>
      <NuxtLink to="#" class="hover:text-[#118c13] transition-colors">Support</NuxtLink>
    </div>

    <!-- Copyright -->
    <div class="text-[10px] font-semibold text-slate-400">
      &copy; 2024 KakiDaki AI. Lead the Way.
    </div>
  </footer>
</template>

<script setup>
// No setup required
</script>
