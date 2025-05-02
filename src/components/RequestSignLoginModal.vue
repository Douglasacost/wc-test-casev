<template>
  <BaseModal
    :model-value="modelValue"
    class="p-2 pt-4 md:p-4 md:pt-8 gap-0 !rounded-2xl w-[96vw] md:w-[420px] !max-w-[none] max-h-[96vh] md:max-h-[90%] h-auto"
    description=" "
    @update:model-value="updateModelValue"
  >
    <!-- Content (with higher z-index) -->
    <template #header>
      <div class="pr-10">
        <h1
          class="text-lavender text-justify text-4xl md:text-[48px] leading-8 md:leading-10 font-medium tracking-[-2.4px]"
        >
          Welcome 🎉 You're<br>
          Almost There
        </h1>
      </div>
    </template>
    <template #description>
      <span
        class="text-purple-gray text-xl leading-6 font-normal tracking-[-0.6px] pr-20"
      >
        Just sign the message with your wallet to <br>
        complete the setup or <strong
          role="button"
          class="text-[#FFBC70] cursor-pointer underline"
          @click="disconnect"
        >disconnect</strong> to use another wallet.
      </span>
    </template>
    <template #footer>
      <div class="p-0 pb-3.5 w-full flex justify-center mt-8">
        <button
          v-if="!isSigning && !isWalletConnected"
          class="w-full bg-lavender text-black rounded-full px-4 py-2 cursor-pointer z-10"
          @click="sign"
        >
          <span> Sign Message </span>
        </button>
        <div
          v-else
          class="w-full"
        >
          <ol class="space-y-1">
            <li
              class="p-1 pl-4 h-10 relative rounded-full flex justify-between items-center overflow-hidden"
            >
              <div
                :class="{
                  'bg-[rgba(38,38,56,0.72)] opacity-100': isWalletConnected,
                }"
                class="opacity-80 inset-shadow-[0px_-4px_16px_-2px_rgba(222,_206,_235,_0.08)] bg-[rgba(38,38,56,0.32)] rounded-full absolute top-0 left-0 w-full h-full"
              />
              <span
                :class="{ 'text-lavender': isSigning }"
                class="text-purple-gray text-base leading-5 font-semibold tracking-[-0.6px]"
              >Signing in...</span>
              <div class="flex items-center">
                <div
                  :class="{ 'opacity-100': isWalletConnected }"
                  class="opacity-0 w-96 h-10 absolute top-0 right-0"
                >
                  <div
                    class="w-14 h-10 -right-[28px] -top-[3px] absolute bg-[#33F] rounded-full blur-[16px]"
                  />
                  <div
                    class="w-18 h-8 -right-[1px] -top-[28px] absolute bg-[#FF7847] rounded-full blur-[24px]"
                  />
                  <div
                    class="w-8 h-4 right-[2px] -top-[8px] absolute bg-[#6D6D8F] rounded-full blur-[8px] mix-blend-plus-lighter"
                  />
                </div>
                <span
                  v-if="isWalletConnected"
                  class="size-8 z-10 bg-green-500 text-black rounded-full"
                >OK</span>
                <InlineSvg
                  v-else-if="isSigning"
                  class="animate-[spin_2s_linear_infinite_reverse] size-4 m-3 z-10"
                  :src="loaderIcon"
                />
              </div>
            </li>
          </ol>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/ui/dialog/BaseModal.vue'
import { isWalletConnected } from '@/composables/auth'
import loaderIcon from '@/assets/icons/loader.svg'
import InlineSvg from 'vue-inline-svg'

defineProps<{
  modelValue: boolean
  isSigning: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'sign'): void
  (e: 'disconnect'): void
}>()

const updateModelValue = (val: boolean) => {
  emit('update:modelValue', val)
}

const sign = () => {
  emit('sign')
}

const disconnect = () => {
  emit('disconnect')
}
</script>
