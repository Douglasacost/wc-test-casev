<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen text-white flex flex-col p-8">
    <main
      class="mx-auto h-full flex-1 flex flex-col w-full"
      :class="{ container: true, 'px-[0]': true }"
    >
      <slot />
    </main>
  </div>
</template>
