<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: false
})

const credits = ref(2)

const isSandboxOpen = ref(false)
const selectedPackage = ref('')
const selectedCredits = ref(0)
const selectedPrice = ref(0)
const paymentMethod = ref('QRIS')
const isProcessing = ref(false)
const isSuccess = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('user_ai_credits')
  if (saved !== null) {
    credits.value = parseInt(saved, 10)
  } else {
    credits.value = 2
    localStorage.setItem('user_ai_credits', '2')
  }
})

const saveCredits = (newAmount) => {
  credits.value = newAmount
  localStorage.setItem('user_ai_credits', newAmount.toString())
}

const resetDemoCredits = () => {
  saveCredits(2)
}

const openSandboxModal = (pkgName, creditAmount, price) => {
  selectedPackage.value = pkgName
  selectedCredits.value = creditAmount
  selectedPrice.value = price
  paymentMethod.value = 'QRIS'
  isProcessing.value = false
  isSuccess.value = false
  isSandboxOpen.value = true
}

const closeSandboxModal = () => {
  if (isProcessing.value) return
  isSandboxOpen.value = false
}

const processSandboxPayment = () => {
  isProcessing.value = true
  setTimeout(() => {
    isProcessing.value = false
    isSuccess.value = true
    saveCredits(credits.value + selectedCredits.value)
  }, 1500)
}

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number)
}
</script>

<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <Sidebar active="payment" />

    
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 p-6 sm:p-6 space-y-6">
      
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#023C23] text-xs font-medium mb-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#023C23]"></span>
            AI PREPARATION CREDITS
          </div>
          <h1 class="text-2xl font-heading font-medium text-slate-900">Top Up Credit</h1>
          <p class="text-sm text-slate-500 mt-1">Kelola kuota kredit AI Anda untuk menyusun rencana persiapan pendakian dengan data telemetri akurat.</p>
        </div>

        <div>
          <button
            @click="resetDemoCredits"
            class="px-4 py-2 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium transition-all shadow-sm flex items-center gap-1.5"
            title="Reset kredit ke awal (2 Kredit) untuk keperluan demo"
          >
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
            </svg>
            <span>Reset Demo (2 Kredit)</span>
          </button>
        </div>
      </div>

      
      <div class="bg-gradient-to-r from-[#023C23] via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-800/40">
        <div class="absolute right-0 top-0 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        
        <div class="space-y-2 relative z-10">
          <span class="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs font-medium text-emerald-300">
            Status Akun: Active Explorer
          </span>
          <h2 class="text-xs uppercase text-emerald-200/70 font-medium pt-2">Credit Saat Ini</h2>
          <div class="flex items-baseline gap-3">
            <span class="text-5xl font-heading font-medium text-white">{{ credits }}</span>
            <span class="text-lg text-emerald-300/80 font-medium">Kredit Tersedia</span>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl max-w-sm text-xs text-white/85 leading-relaxed relative z-10 space-y-2">
          <div class="flex items-center gap-2 font-heading font-medium text-emerald-300 text-sm">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>
            <span>Sistem Kredit KakiDaki</span>
          </div>
          <p>
            User baru memperoleh <strong>2 Credit gratis</strong>. Setiap 1 credit dapat digunakan untuk menyusun 1 rencana persiapan pendakian secara otomatis (AI Preparation Roadmap).
          </p>
        </div>
      </div>

      
      <div class="space-y-4 pt-2">
        <div>
          <h2 class="text-xl font-heading font-medium text-slate-900">Pilihan Paket Credit Tambahan</h2>
          <p class="text-xs text-slate-500 mt-0.5">Pilih paket yang sesuai untuk menambah kuota rencana pendakian Anda. Transaksi diproses instan via Sandbox.</p>
        </div>

        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          
          <div class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-xs">Paket Pemula</span>
                <span class="text-xs font-medium text-slate-500">+5 Credit</span>
              </div>
              <div>
                <h3 class="text-lg font-heading font-medium text-slate-900">Paket Explorer</h3>
                <div class="flex items-baseline gap-1 mt-2">
                  <span class="text-2xl font-heading font-medium text-slate-900">Rp 49.000</span>
                  <span class="text-xs text-slate-400 font-medium">/ 5 Credit</span>
                </div>
              </div>
              <div class="pt-4 border-t border-slate-100 text-xs text-slate-600">
                <p class="leading-relaxed">Mendapatkan <strong>5 Credit</strong> yang dapat langsung digunakan untuk <strong>5x Generate Rencana Persiapan Daki AI</strong>.</p>
              </div>
            </div>
            <button
              @click="openSandboxModal('Paket Explorer', 5, 49000)"
              class="w-full mt-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-[#023C23] hover:text-white text-slate-800 font-medium text-xs transition-all active:scale-[0.98]"
            >
              Pilih Paket Ini
            </button>
          </div>

          
          <div class="bg-white rounded-3xl p-6 border-2 border-[#023C23] shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative transform md:-translate-y-1">
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#023C23] text-white px-4 py-1 rounded-full text-[10px] font-medium uppercase shadow-sm">
              ✨ Paling Populer
            </div>
            <div class="space-y-4">
              <div class="flex items-center justify-between mt-2">
                <span class="px-3 py-1 rounded-full bg-emerald-100 text-[#023C23] font-medium text-xs">Recommended</span>
                <span class="text-xs font-medium text-emerald-600">+15 Credit</span>
              </div>
              <div>
                <h3 class="text-lg font-heading font-medium text-slate-900">Paket Summit Master</h3>
                <div class="flex items-baseline gap-1 mt-2">
                  <span class="text-2xl font-heading font-medium text-[#023C23]">Rp 119.000</span>
                  <span class="text-xs text-slate-400 font-medium">/ 15 Credit</span>
                </div>
              </div>
              <div class="pt-4 border-t border-slate-100 text-xs text-slate-600">
                <p class="leading-relaxed">Mendapatkan <strong>15 Credit</strong> yang dapat langsung digunakan untuk <strong>15x Generate Rencana Persiapan Daki AI</strong>.</p>
              </div>
            </div>
            <button
              @click="openSandboxModal('Paket Summit Master', 15, 119000)"
              class="w-full mt-6 py-3.5 rounded-2xl bg-[#023C23] hover:bg-emerald-800 text-white font-medium text-xs shadow-md transition-all active:scale-[0.98]"
            >
              Pilih Paket Ini
            </button>
          </div>

          
          <div class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium text-xs">Best Value</span>
                <span class="text-xs font-medium text-indigo-600">+50 Credit</span>
              </div>
              <div>
                <h3 class="text-lg font-heading font-medium text-slate-900">Paket Expedition</h3>
                <div class="flex items-baseline gap-1 mt-2">
                  <span class="text-2xl font-heading font-medium text-slate-900">Rp 299.000</span>
                  <span class="text-xs text-slate-400 font-medium">/ 50 Credit</span>
                </div>
              </div>
              <div class="pt-4 border-t border-slate-100 text-xs text-slate-600">
                <p class="leading-relaxed">Mendapatkan <strong>50 Credit</strong> yang dapat langsung digunakan untuk <strong>50x Generate Rencana Persiapan Daki AI</strong>.</p>
              </div>
            </div>
            <button
              @click="openSandboxModal('Paket Expedition', 50, 299000)"
              class="w-full mt-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-[#023C23] hover:text-white text-slate-800 font-medium text-xs transition-all active:scale-[0.98]"
            >
              Pilih Paket Ini
            </button>
          </div>

        </div>
      </div>
    </main>

    
    <div
      v-if="isSandboxOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-6 relative overflow-hidden animate-in zoom-in-95 duration-200"
      >
        
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-2xl bg-emerald-100 text-[#023C23] flex items-center justify-center font-heading font-medium text-sm">
              S
            </div>
            <div>
              <h3 class="font-heading font-medium text-base text-slate-900">Sandbox Payment Simulator</h3>
              <p class="text-[11px] text-slate-400">Mode Simulasi (Tanpa Transaksi Nyata)</p>
            </div>
          </div>
          <button
            @click="closeSandboxModal"
            class="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        
        <div v-if="isSuccess" class="py-6 text-center space-y-4 animate-in zoom-in duration-300">
          <div class="w-16 h-16 bg-emerald-100 text-[#023C23] rounded-full flex items-center justify-center mx-auto shadow-sm">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
          </div>
          <div>
            <h4 class="text-lg font-heading font-medium text-slate-900">Top Up Berhasil!</h4>
            <p class="text-xs text-slate-500 mt-1">
              <strong>{{ selectedPackage }}</strong> (+{{ selectedCredits }} Credit) telah ditambahkan ke akun Anda.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-500">Total Credit Anda Sekarang:</span>
            <span class="font-heading font-medium text-base text-[#023C23]">{{ credits }} Credit</span>
          </div>
          <button
            @click="closeSandboxModal"
            class="w-full py-3.5 rounded-2xl bg-[#023C23] text-white font-medium text-xs hover:bg-emerald-800 transition-all shadow-md active:scale-[0.98]"
          >
            Selesai & Kembali
          </button>
        </div>

        
        <div v-else class="space-y-5">
          
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5 text-xs">
            <div class="flex justify-between text-slate-600">
              <span>Paket Terpilih:</span>
              <span class="font-medium text-slate-900">{{ selectedPackage }}</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>Tambahan Kredit:</span>
              <span class="font-medium text-[#023C23]">+{{ selectedCredits }} Credit AI</span>
            </div>
            <div class="border-t border-slate-200/60 pt-2.5 flex justify-between items-baseline">
              <span class="text-slate-700 font-medium">Total Pembayaran:</span>
              <span class="font-heading font-medium text-base text-slate-900">{{ formatRupiah(selectedPrice) }}</span>
            </div>
          </div>

          
          <div class="space-y-2">
            <label class="block text-xs font-medium text-slate-700">Pilih Metode Pembayaran (Simulasi)</label>
            <div class="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                @click="paymentMethod = 'QRIS'"
                :class="paymentMethod === 'QRIS' ? 'border-[#023C23] bg-emerald-50/60 text-[#023C23]' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'"
                class="py-2.5 px-3 rounded-xl border text-xs font-medium transition-all text-center flex flex-col items-center gap-1"
              >
                <span>QRIS Instan</span>
              </button>
              <button
                type="button"
                @click="paymentMethod = 'BCA VA'"
                :class="paymentMethod === 'BCA VA' ? 'border-[#023C23] bg-emerald-50/60 text-[#023C23]' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'"
                class="py-2.5 px-3 rounded-xl border text-xs font-medium transition-all text-center flex flex-col items-center gap-1"
              >
                <span>BCA Virtual Account</span>
              </button>
              <button
                type="button"
                @click="paymentMethod = 'GoPay'"
                :class="paymentMethod === 'GoPay' ? 'border-[#023C23] bg-emerald-50/60 text-[#023C23]' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'"
                class="py-2.5 px-3 rounded-xl border text-xs font-medium transition-all text-center flex flex-col items-center gap-1"
              >
                <span>GoPay / E-Wallet</span>
              </button>
            </div>
          </div>

          
          <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-start gap-2.5 text-xs text-amber-800">
            <svg class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
            <div>
              <strong>Mode Sandbox Aktif:</strong> Klik tombol konfirmasi di bawah untuk mensimulasikan pembayaran sukses tanpa memotong saldo asli Anda.
            </div>
          </div>

          
          <div class="pt-2 flex items-center gap-3">
            <button
              @click="closeSandboxModal"
              :disabled="isProcessing"
              class="w-1/3 py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-all disabled:opacity-50"
            >
              Batal
            </button>
            <button
              @click="processSandboxPayment"
              :disabled="isProcessing"
              class="w-2/3 py-3.5 rounded-2xl bg-[#023C23] hover:bg-emerald-800 text-white font-medium text-xs shadow-md transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              <svg v-if="isProcessing" class="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isProcessing ? 'Memproses Pembayaran...' : `Bayar Sekarang (${paymentMethod})` }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
