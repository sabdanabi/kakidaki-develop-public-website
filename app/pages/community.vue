<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#023C23]/20 selection:text-[#023C23] overflow-x-hidden pb-20">
    <!-- Top Navigation Bar -->
    <Navbar />

    <!-- Main Content Area -->
    <div class="pt-32 px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      
      <!-- SCREEN 1: Mountain Selection list-view -->
      <div v-if="!selectedMountainId" class="space-y-8">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="font-heading text-4xl sm:text-5xl mb-6 text-slate-900 leading-[1.1] font-medium tracking-tight">Komunitas Pegunungan Indonesia</h1>
          <p class="font-sans text-base sm:text-lg text-slate-500 mb-8 max-w-3xl mx-auto leading-relaxed">
            Temukan dan bagikan laporan jalur pendakian langsung dari lapangan. Dapatkan info valid tentang cuaca mikro, ketersediaan air bersih di pos, serta kondisi jalur ekstrem dari pendaki lain.
          </p>
        </div>

        <!-- Search input on Selection Screen -->
        <div class="relative max-w-xl mx-auto">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
          </div>
          <input 
            v-model="mountainSearchQuery"
            type="text" 
            placeholder="Cari nama gunung (Rinjani, Semeru, Gede...)"
            class="w-full bg-white border border-slate-200 rounded-[1.5rem] py-3.5 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#023C23]/20 focus:border-[#023C23]/30 transition-all font-sans shadow-sm"
          />
        </div>

        <!-- Mountains Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="mountain in filteredMountains" 
            :key="mountain.id"
            @click="selectMountain(mountain.id)"
            class="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-[280px] relative"
          >
            <!-- Background Image -->
            <div class="absolute inset-0 z-0">
              <img 
                :src="mountain.image" 
                :alt="mountain.name" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
            </div>

            <!-- Content overlay -->
            <div class="relative z-10 p-6 mt-auto flex flex-col text-white">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-heading text-2xl font-medium tracking-tight">{{ mountain.name }}</h3>
                <span class="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-medium uppercase tracking-wider">
                  {{ mountain.elevation }}
                </span>
              </div>
              <p class="text-xs text-slate-300 line-clamp-2 mb-4 max-w-sm">{{ mountain.description }}</p>
              
              <div class="flex justify-between items-center border-t border-white/10 pt-4">
                <div class="flex items-center gap-4 text-xs">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    4.8
                  </span>
                  <span class="text-slate-300">{{ getMountainCommentCount(mountain.id) }} Ulasan</span>
                </div>
                <span class="text-xs font-semibold text-emerald-400 group-hover:text-white flex items-center gap-1 transition-colors">
                  Masuk Komunitas
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredMountains.length === 0" class="text-center py-16">
          <p class="text-slate-500 font-sans">Gunung tidak ditemukan. Coba ketik kata kunci lain.</p>
        </div>
      </div>


      <!-- SCREEN 2: Mountain Community (Comments & Reviews list) -->
      <div v-else class="space-y-6">
        <!-- Back Button -->
        <button 
          @click="selectedMountainId = null" 
          class="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
          Kembali ke Daftar Gunung
        </button>

        <!-- Selected Mountain Header Card -->
        <div class="rounded-[2.5rem] bg-[#023C23] p-8 md:p-10 text-white relative overflow-hidden shadow-lg">
          <div class="absolute inset-0 z-0">
            <img :src="selectedMountain.image" :alt="selectedMountain.name" class="w-full h-full object-cover opacity-20 mix-blend-overlay" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#023C23] via-[#023C23]/80 to-transparent"></div>
          </div>
          <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white mb-4">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
                <span class="font-sans text-[10px] font-medium tracking-wide">{{ selectedMountain.location }}</span>
              </div>
              <h2 class="font-heading text-3xl md:text-5xl font-medium mb-3">{{ selectedMountain.name }}</h2>
              <p class="font-sans text-emerald-50 text-sm max-w-lg leading-relaxed">{{ selectedMountain.description }}</p>
            </div>
            <div class="flex gap-4 w-full md:w-auto">
              <div class="flex-1 md:flex-none bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[100px]">
                <p class="text-xs text-emerald-200 mb-1">Ulasan</p>
                <p class="font-heading text-2xl font-medium">{{ filteredAndSortedComments.length }}</p>
              </div>
              <div class="flex-1 md:flex-none bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[100px]">
                <p class="text-xs text-emerald-200 mb-1">Ketinggian</p>
                <p class="font-heading text-2xl font-medium">{{ selectedMountain.elevation }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Write Review Form Container (Toggles locally) -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform scale-95 opacity-0 -translate-y-4"
          enter-to-class="transform scale-100 opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform scale-100 opacity-100 translate-y-0"
          leave-to-class="transform scale-95 opacity-0 -translate-y-4"
        >
          <div v-if="showReviewForm" class="bg-[#fcf9f8] rounded-[2.5rem] p-6 sm:p-8 border border-emerald-100 shadow-[0_12px_30px_rgb(2,60,35,0.06)] mt-4">
            <div class="flex justify-between items-center mb-6">
              <h3 class="font-heading text-xl font-medium text-slate-900">Bagikan Pengalaman Mendakimu</h3>
              <button @click="showReviewForm = false" class="text-slate-400 hover:text-slate-600 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="submitReview" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-500 mb-1.5 font-sans">Nama Pendaki</label>
                  <input 
                    v-model="newReview.author" 
                    type="text" 
                    required
                    placeholder="Masukkan nama lengkap Anda..."
                    class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#023C23]/10 focus:border-[#023C23]/20 transition-all text-slate-800"
                  />
                </div>
                
                <!-- Custom Premium Dropdown for Jalur Pendakian -->
                <div class="relative">
                  <label class="block text-xs font-semibold text-slate-500 mb-1.5 font-sans">Jalur Pendakian</label>
                  <button 
                    type="button"
                    @click.stop="toggleRouteDropdown"
                    class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#023C23]/15 transition-all text-slate-800 flex justify-between items-center"
                  >
                    <span :class="newReview.route ? 'text-slate-800' : 'text-slate-400'">
                      {{ newReview.route || 'Pilih Jalur Resmi...' }}
                    </span>
                    <svg 
                      class="w-4 h-4 text-slate-400 transition-transform duration-200"
                      :class="{ 'rotate-180': routeDropdownOpen }"
                      fill="none" 
                      stroke="currentColor" 
                      stroke-width="2.5" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                    </svg>
                  </button>
                  
                  <!-- Dropdown List Options -->
                  <div 
                    v-if="routeDropdownOpen" 
                    class="absolute z-30 w-full mt-1.5 bg-white border border-slate-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] overflow-hidden"
                  >
                    <div class="max-h-48 overflow-y-auto divide-y divide-slate-50">
                      <button
                        v-for="route in selectedMountainRoutes"
                        :key="route"
                        type="button"
                        @click="selectRoute(route)"
                        class="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-emerald-50 hover:text-[#023C23] transition-colors"
                      >
                        Jalur {{ route }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Custom Premium Dropdown for Kondisi Cuaca -->
              <div class="relative">
                <label class="block text-xs font-semibold text-slate-500 mb-1.5 font-sans">Kondisi Cuaca & Jalur</label>
                <button 
                  type="button"
                  @click.stop="toggleConditionDropdown"
                  class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#023C23]/15 transition-all text-slate-800 flex justify-between items-center"
                >
                  <span>
                    {{ weatherConditions.find(c => c.value === newReview.condition)?.label }}
                  </span>
                  <svg 
                    class="w-4 h-4 text-slate-400 transition-transform duration-200"
                    :class="{ 'rotate-180': conditionDropdownOpen }"
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2.5" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                  </svg>
                </button>
                
                <!-- Dropdown List Options -->
                <div 
                  v-if="conditionDropdownOpen" 
                  class="absolute z-30 w-full mt-1.5 bg-white border border-slate-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] overflow-hidden"
                >
                  <div class="divide-y divide-slate-50">
                    <button
                      v-for="cond in weatherConditions"
                      :key="cond.value"
                      type="button"
                      @click="selectCondition(cond.value)"
                      class="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-emerald-50 hover:text-[#023C23] transition-colors"
                    >
                      {{ cond.label }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Premium Image Upload Section -->
              <div>
                <label class="block text-xs font-semibold text-slate-500 mb-1.5 font-sans">Foto Kondisi Rute (Opsional)</label>
                <div 
                  class="border-2 border-dashed border-slate-200 hover:border-[#023C23] bg-white rounded-xl p-6 transition-colors flex flex-col items-center justify-center cursor-pointer relative"
                  @click="triggerImageSelect"
                >
                  <input 
                    ref="imageInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleImageUpload"
                  />
                  
                  <div v-if="!imagePreview" class="text-center space-y-2">
                    <svg class="mx-auto h-10 w-10 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="text-xs font-medium text-slate-600">Klik untuk mengunggah gambar jalur</p>
                    <p class="text-[10px] text-slate-400">Hanya format gambar (PNG, JPG, WEBP)</p>
                  </div>
                  
                  <!-- Preview container -->
                  <div v-else class="w-full flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                      <img :src="imagePreview" class="w-16 h-16 object-cover rounded-lg border border-slate-100" />
                      <div class="text-left">
                        <p class="text-xs font-medium text-slate-700">Gambar Terpilih</p>
                        <p class="text-[10px] text-slate-400">Siap dikirim bersama ulasan</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      @click.stop="clearImageSelect" 
                      class="bg-red-50 text-red-500 hover:bg-red-100 p-2 rounded-lg transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-500 mb-1.5 font-sans">Ulasan Detail</label>
                <textarea 
                  v-model="newReview.text" 
                  rows="4" 
                  required
                  placeholder="Bagikan info penting seperti ketersediaan air, keamanan jalur, atau tips logistik..."
                  class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#023C23]/10 focus:border-[#023C23]/20 transition-all text-slate-800 resize-none"
                ></textarea>
              </div>

              <div class="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  @click="showReviewForm = false" 
                  class="px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  class="px-6 py-2.5 bg-[#023C23] hover:bg-emerald-800 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                  Kirim Ulasan
                </button>
              </div>
            </form>
          </div>
        </Transition>

        <!-- Sorting Selector & Title -->
        <div class="mt-10 border-t border-slate-200/60 pt-8">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h3 class="font-heading text-2xl font-medium text-slate-900">Ulasan Pendaki Terbaru</h3>
            </div>
            
            <div class="flex items-center gap-2 self-start md:self-auto">
              <span class="text-xs text-slate-500 font-sans font-medium">Urutkan:</span>
              <div class="inline-flex bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button 
                  @click="sortBy = 'terbaru'" 
                  class="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  :class="sortBy === 'terbaru' ? 'bg-[#023C23] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
                >
                  Terbaru
                </button>
                <button 
                  @click="sortBy = 'terpopuler'" 
                  class="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  :class="sortBy === 'terpopuler' ? 'bg-[#023C23] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
                >
                  Terpopuler
                </button>
                <button 
                  @click="sortBy = 'ulasan_saya'" 
                  class="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  :class="sortBy === 'ulasan_saya' ? 'bg-[#023C23] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
                >
                  Ulasan Saya
                </button>
              </div>
              <button @click="toggleForm" class="text-sm font-semibold text-[#023C23] bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors border border-emerald-200 ml-2">
                {{ showReviewForm ? 'Tutup Form' : '+ Tulis Ulasan' }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredAndSortedComments.length === 0" class="text-center py-16 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p class="text-slate-500 font-sans">Belum ada ulasan untuk gunung ini. Jadilah yang pertama memberikan ulasan!</p>
        </div>

        <!-- Comments ListView -->
        <div v-else class="grid grid-cols-1 gap-5">
          <div 
            v-for="comment in filteredAndSortedComments" 
            :key="comment.id"
            class="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all"
          >
            <!-- Normal Comment View -->
            <div v-if="editingCommentId !== comment.id" class="space-y-4">
              <div class="flex items-start justify-between gap-4">
                <!-- Info (No Avatar) -->
                <div>
                  <h4 class="font-sans text-sm font-semibold text-slate-900 mb-0.5 flex items-center gap-1.5">
                    {{ comment.author }}
                    <span v-if="comment.isEdited" class="text-[10px] text-slate-400 font-normal font-sans">(diedit)</span>
                  </h4>
                  <p class="font-sans text-xs text-slate-500">{{ comment.date }} • Jalur: <span class="font-medium text-[#023C23]">{{ comment.route }}</span></p>
                </div>
                
                <div class="flex items-center gap-3">
                  <!-- Edit & Delete buttons if current user comment -->
                  <div v-if="comment.isCurrentUser" class="flex gap-2 text-xs mr-2">
                    <button @click="startEdit(comment)" class="text-slate-400 hover:text-[#023C23] font-semibold transition-colors">Edit</button>
                    <span class="text-slate-200">|</span>
                    <button @click="deleteComment(comment.id)" class="text-slate-400 hover:text-red-600 font-semibold transition-colors">Hapus</button>
                  </div>

                  <!-- Badge condition -->
                  <div class="hidden sm:block">
                    <span class="px-3 py-1.5 text-[10px] font-medium rounded-lg" :class="getConditionBadge(comment.condition)">
                      {{ comment.condition }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Comment Body -->
              <div class="space-y-4">
                <p class="font-sans text-slate-600 text-sm leading-relaxed">{{ comment.text }}</p>
                
                <!-- Uploaded Image Display -->
                <div v-if="comment.image" class="relative mt-3 rounded-2xl overflow-hidden border border-slate-100 max-w-md shadow-sm">
                  <img :src="comment.image" alt="Lampiran ulasan" class="w-full h-auto max-h-80 object-cover" />
                </div>
              </div>

              <!-- Voting Action -->
              <div class="flex items-center gap-4 pt-2">
                <div class="flex items-center bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <button 
                    @click="vote(comment, 'up')"
                    class="flex items-center gap-1.5 px-3 py-2 transition-colors hover:bg-slate-100"
                    :class="comment.userVote === 'up' ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100 font-semibold' : 'text-slate-500'"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"/></svg>
                    <span class="text-xs">{{ comment.upvotes }}</span>
                  </button>
                  <div class="w-[1px] h-4 bg-slate-200"></div>
                  <button 
                    @click="vote(comment, 'down')"
                    class="flex items-center gap-1.5 px-3 py-2 transition-colors hover:bg-slate-100"
                    :class="comment.userVote === 'down' ? 'text-red-500 bg-red-50 hover:bg-red-100 font-semibold' : 'text-slate-500'"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"/></svg>
                    <span class="text-xs">{{ comment.downvotes }}</span>
                  </button>
                </div>

                <!-- Laporkan Button -->
                <button
                  @click="openReportModal(comment)"
                  class="flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all text-xs font-medium"
                  :class="comment.isReported 
                    ? 'bg-amber-50 border-amber-200 text-amber-700' 
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50'"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                  </svg>
                  <span>{{ comment.isReported ? 'Dilaporkan' : 'Laporkan' }}</span>
                </button>
              </div>
            </div>

            <!-- Inline Edit Comment Form -->
            <div v-else class="space-y-4">
              <h4 class="font-heading text-lg font-medium text-[#023C23]">Edit Ulasan Anda</h4>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Rute</label>
                  <!-- Premium inline route select -->
                  <div class="relative">
                    <button 
                      type="button"
                      @click.stop="toggleEditRouteDropdown"
                      class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm transition-all text-slate-800 flex justify-between items-center"
                    >
                      <span>Jalur {{ editForm.route }}</span>
                      <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>
                    </button>
                    <div v-if="editRouteDropdownOpen" class="absolute z-40 w-full mt-1 bg-white border border-slate-100 rounded-xl shadow-lg">
                      <button
                        v-for="route in selectedMountainRoutes"
                        :key="route"
                        type="button"
                        @click="selectEditRoute(route)"
                        class="w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-50 hover:text-[#023C23] transition-colors"
                      >
                        Jalur {{ route }}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Cuaca</label>
                  <select 
                    v-model="editForm.condition"
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800"
                  >
                    <option v-for="cond in weatherConditions" :key="cond.value" :value="cond.value">
                      {{ cond.label }}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Isi Ulasan</label>
                <textarea 
                  v-model="editForm.text" 
                  rows="3"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#023C23]/25 text-slate-800"
                ></textarea>
              </div>

              <!-- Edit Image Area -->
              <div class="flex items-center gap-3">
                <div v-if="editForm.image" class="relative">
                  <img :src="editForm.image" class="w-16 h-16 object-cover rounded-lg border" />
                  <button 
                    type="button" 
                    @click="editForm.image = null" 
                    class="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 shadow-sm"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
                <button 
                  type="button" 
                  @click="triggerEditImageSelect"
                  class="px-4 py-2 border border-dashed border-slate-300 hover:border-[#023C23] hover:bg-emerald-50/20 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Ganti/Tambah Foto
                </button>
                <input 
                  ref="editImageInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleEditImageUpload"
                />
              </div>

              <div class="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  @click="editingCommentId = null" 
                  class="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="button" 
                  @click="saveEdit" 
                  class="px-4 py-2 bg-[#023C23] hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Modal Laporkan Komentar -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="showReportModal && activeReportingComment" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 class="font-heading text-lg font-semibold text-slate-900">Laporkan Komentar & Ulasan</h3>
                <p class="text-xs text-slate-400 mt-0.5">Bantu kami menjaga validitas info dan keamanan jalur pendakian</p>
              </div>
              <button @click="closeReportModal" class="text-slate-400 hover:text-slate-600 p-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <!-- Preview Komentar -->
            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 mb-5">
              <p class="text-xs text-slate-400 mb-1">Komentar dari <span class="font-semibold text-slate-700">{{ activeReportingComment.author }}</span>:</p>
              <p class="text-xs text-slate-800 italic leading-relaxed">"{{ activeReportingComment.text }}"</p>
            </div>

            <form @submit.prevent="submitReport" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-2">Pilih Alasan Pelaporan:</label>
                <div class="space-y-2">
                  <label
                    v-for="reason in [
                      'Informasi Palsu / Misleading (Tidak Sesuai Lapangan)',
                      'Spam / Open Trip Ilegal Tanpa Simaksi Resmi',
                      'Kondisi Jalur Berbahaya (Perlu Diteruskan ke Basecamp)',
                      'Bahasa Kasar / Pelecehan / SARA',
                      'Lainnya'
                    ]"
                    :key="reason"
                    class="flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all"
                    :class="reportReason === reason ? 'border-[#023C23] bg-emerald-50/50 text-[#023C23] font-medium' : 'border-slate-200 hover:bg-slate-50 text-slate-700'"
                  >
                    <input
                      type="radio"
                      v-model="reportReason"
                      :value="reason"
                      name="report_reason"
                      class="text-[#023C23] focus:ring-[#023C23]"
                      required
                    />
                    <span class="text-xs">{{ reason }}</span>
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Keterangan Tambahan (Opsional):</label>
                <textarea
                  v-model="reportNotes"
                  placeholder="Jelaskan detail ketidaksesuaian atau situasi di lapangan agar admin dapat segera mengecek..."
                  rows="3"
                  class="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#023C23]"
                ></textarea>
              </div>

              <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  @click="closeReportModal"
                  class="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md transition-all active:scale-[0.98]"
                >
                  Kirim Laporan
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useExpeditionStore } from '~/stores/expedition'
import { useCommentsStore } from '~/stores/comments'

const authStore = useAuthStore()
const expeditionStore = useExpeditionStore()
const commentsStore = useCommentsStore()

// Click outside handling for dropdowns
const closeDropdowns = () => {
  routeDropdownOpen.value = false
  conditionDropdownOpen.value = false
  editRouteDropdownOpen.value = false
}

onMounted(async () => {
  window.addEventListener('click', closeDropdowns)
  if (authStore.user) {
    newReview.value.author = authStore.user.name
  }
  
  // Fetch real mountains from API
  const res = await expeditionStore.fetchMountains()
  if (res.success && expeditionStore.mountains.length > 0) {
    mountains.forEach(mockMt => {
      const apiMt = expeditionStore.mountains.find(
        m => m.name.toLowerCase().includes(mockMt.name.toLowerCase()) || 
             mockMt.name.toLowerCase().includes(m.name.toLowerCase())
      )
      if (apiMt) {
        mockMt.id = apiMt.id
      }
    })
  }
  
  // Fetch comments for all mountains to populate comment counts
  for (const m of mountains) {
    await commentsStore.fetchComments(m.id)
  }
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdowns)
})

// Search states
const mountainSearchQuery = ref('')
const selectedMountainId = ref(null)

// Custom Dropdown states
const routeDropdownOpen = ref(false)
const conditionDropdownOpen = ref(false)
const editRouteDropdownOpen = ref(false)

const toggleRouteDropdown = () => {
  routeDropdownOpen.value = !routeDropdownOpen.value
  conditionDropdownOpen.value = false
}

const toggleConditionDropdown = () => {
  conditionDropdownOpen.value = !conditionDropdownOpen.value
  routeDropdownOpen.value = false
}

const toggleEditRouteDropdown = () => {
  editRouteDropdownOpen.value = !editRouteDropdownOpen.value
}

const selectRoute = (route) => {
  newReview.value.route = route
  routeDropdownOpen.value = false
}

const selectEditRoute = (route) => {
  editForm.value.route = route
  editRouteDropdownOpen.value = false
}

const selectCondition = (condValue) => {
  newReview.value.condition = condValue
  conditionDropdownOpen.value = false
}

// Image upload helpers
const imageInput = ref(null)
const imagePreview = ref(null)

const triggerImageSelect = () => {
  imageInput.value.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (!file.type.startsWith('image/')) {
      alert('Format file tidak didukung! Mohon unggah file format gambar.')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const clearImageSelect = () => {
  imagePreview.value = null
  if (imageInput.value) imageInput.value.value = ''
}

// Edit image helpers
const editImageInput = ref(null)
const triggerEditImageSelect = () => {
  editImageInput.value.click()
}
const handleEditImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (!file.type.startsWith('image/')) {
      alert('Format file tidak didukung! Mohon unggah file format gambar.')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      editForm.value.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Form & Review Submit State
const showReviewForm = ref(false)
const newReview = ref({
  author: '',
  route: '',
  condition: 'Cuaca Cerah',
  text: ''
})

const toggleForm = () => {
  showReviewForm.value = !showReviewForm.value
  clearImageSelect()
  if (showReviewForm.value && selectedMountain.value && selectedMountain.value.routes.length > 0) {
    newReview.value.route = selectedMountain.value.routes[0]
  }
}

const weatherConditions = [
  { value: 'Cuaca Cerah', label: '☀️ Cuaca Cerah & Kondisi Kering' },
  { value: 'Hujan Ringan', label: '🌧️ Hujan Ringan & Sedikit Licin' },
  { value: 'Berkabut', label: '🌫️ Berkabut & Jarak Pandang Terbatas' },
  { value: 'Hujan Lebat', label: '⛈️ Hujan Lebat & Angin Kencang' }
]

const submitReview = async () => {
  if (!selectedMountainId.value) return
  
  const payload = {
    mountainId: selectedMountainId.value,
    trailName: newReview.value.route || 'via Umum',
    text: newReview.value.text,
    imageUrl: imagePreview.value || ''
  }
  
  const res = await commentsStore.postComment(payload)
  if (res.success) {
    newReview.value = {
      author: authStore.user?.name || '',
      route: selectedMountain.value?.routes[0] || '',
      condition: 'Cuaca Cerah',
      text: ''
    }
    clearImageSelect()
    showReviewForm.value = false
  } else {
    alert(res.message || 'Gagal mengirim ulasan.')
  }
}

const saveEdit = () => {
  const list = commentsStore.comments[selectedMountainId.value] || []
  const comment = list.find(c => c.id === editForm.value.id)
  if (comment) {
    comment.trailName = editForm.value.route
    comment.condition = editForm.value.condition
    comment.text = editForm.value.text
    comment.imageUrl = editForm.value.image
    comment.isEdited = true
  }
  editingCommentId.value = null
}

const deleteComment = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) {
    if (commentsStore.comments[selectedMountainId.value]) {
      commentsStore.comments[selectedMountainId.value] = commentsStore.comments[selectedMountainId.value].filter(c => c.id !== id)
    }
  }
}

// Filtering & Sorting
const sortBy = ref('terbaru') // 'terbaru' or 'terpopuler'

// Mock Database of Mountains
import gunungRinjani from '~/assets/images/gunung_rinjani.webp'
import kumpulanGunung from '~/assets/images/kumpulan_gunung.webp'
import heroMountain from '~/assets/images/hero_mountain.png'
import rinjaniWebp from '~/assets/images/rinjani.webp'

const mountains = [
  {
    id: 'merbabu',
    name: 'Gunung Merbabu',
    location: 'Jawa Tengah, Indonesia',
    elevation: '3,142 mdpl',
    image: rinjaniWebp,
    description: 'Gunung yang populer dengan padang sabana luas dan pemandangan Gunung Merapi yang memukau dari rute Selo.',
    keywords: ['merbabu', 'selo', 'wekas', 'jawa tengah', 'jateng'],
    routes: ['Selo', 'Wekas', 'Thekelan']
  }
]

// Edit & Delete Comments State
const editingCommentId = ref(null)
const editForm = ref({
  id: null,
  route: '',
  condition: '',
  text: '',
  image: null
})

const startEdit = (comment) => {
  editingCommentId.value = comment.id
  editForm.value = {
    id: comment.id,
    route: comment.route,
    condition: comment.condition,
    text: comment.text,
    image: comment.image
  }
}

const filteredMountains = computed(() => {
  const query = mountainSearchQuery.value.toLowerCase().trim()
  if (!query) return mountains
  return mountains.filter(m => 
    m.name.toLowerCase().includes(query) || 
    m.location.toLowerCase().includes(query)
  )
})

const selectedMountain = computed(() => {
  return mountains.find(m => m.id === selectedMountainId.value)
})

const selectedMountainRoutes = computed(() => {
  return selectedMountain.value ? selectedMountain.value.routes : []
})

const getMountainCommentCount = (mountainId) => {
  const list = commentsStore.comments[mountainId] || []
  return list.length
}

const filteredAndSortedComments = computed(() => {
  if (!selectedMountainId.value) return []
  
  const mountainComments = commentsStore.comments[selectedMountainId.value] || []
  let comments = mountainComments.map(c => {
    const authorName = c.user?.name || 'Pendaki KakiDaki'
    const initials = authorName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
      
    let formattedDate = 'Baru saja'
    if (c.createdAt) {
      const date = new Date(c.createdAt)
      formattedDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    return {
      id: c.id,
      mountainId: c.mountainId,
      author: authorName,
      authorInitials: initials,
      date: formattedDate,
      route: c.trailName || 'via Umum',
      condition: c.condition || 'Cuaca Cerah',
      text: c.text,
      image: c.imageUrl,
      upvotes: c.upvotes || 0,
      downvotes: c.downvotes || 0,
      userVote: c.userVote || null,
      isCurrentUser: c.userId === authStore.user?.id || c.user?.id === authStore.user?.id,
      isReported: c.isReported || false,
      isEdited: c.isEdited || false,
      createdAt: c.createdAt
    }
  })
  
  if (sortBy.value === 'terpopuler') {
    return [...comments].sort((a, b) => b.upvotes - a.upvotes)
  } else if (sortBy.value === 'ulasan_saya') {
    return comments.filter(c => c.isCurrentUser)
  } else {
    return [...comments].sort((a, b) => new Date(b.createdAt || Date.now()).getTime() - new Date(a.createdAt || Date.now()).getTime())
  }
})

const selectMountain = async (id) => {
  selectedMountainId.value = id
  showReviewForm.value = false
  await commentsStore.fetchComments(id)
}

const getConditionBadge = (cond) => {
  if (cond.includes('Cerah')) return 'bg-sky-50 text-sky-600 border border-sky-100'
  if (cond.includes('Hujan')) return 'bg-indigo-50 text-[#023C23] border border-indigo-100'
  if (cond.includes('Kabut')) return 'bg-slate-100 text-slate-600 border border-slate-200'
  return 'bg-emerald-50 text-emerald-600 border border-emerald-100'
}

const vote = (comment, type) => {
  if (comment.userVote === type) {
    // Undo vote
    comment.userVote = null
    if (type === 'up') comment.upvotes--
    if (type === 'down') comment.downvotes--
  } else {
    // Change or new vote
    if (comment.userVote === 'up') comment.upvotes--
    if (comment.userVote === 'down') comment.downvotes--
    
    comment.userVote = type
    if (type === 'up') comment.upvotes++
    if (type === 'down') comment.downvotes++
  }
}

// Report Comment Modal logic
const showReportModal = ref(false)
const activeReportingComment = ref(null)
const reportReason = ref('Informasi Palsu / Misleading (Tidak Sesuai Lapangan)')
const reportNotes = ref('')

const openReportModal = (comment) => {
  activeReportingComment.value = comment
  reportReason.value = 'Informasi Palsu / Misleading (Tidak Sesuai Lapangan)'
  reportNotes.value = ''
  showReportModal.value = true
}

const closeReportModal = () => {
  showReportModal.value = false
  activeReportingComment.value = null
}

const submitReport = () => {
  if (activeReportingComment.value) {
    activeReportingComment.value.isReported = true
    alert(`Laporan atas komentar dari ${activeReportingComment.value.author} dengan alasan "${reportReason.value}" berhasil dikirim ke Admin untuk dievaluasi.`)
  }
  closeReportModal()
}

useHead({
  title: 'KakiDaki | Komunitas'
})
</script>
