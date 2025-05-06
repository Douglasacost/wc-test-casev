<template>
  <div>
    <h1>Embedded Wallet Info:</h1>
    <span class="simple-component">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.simple-component {
  font-size: 16px;
  color: #333;
}
</style>
