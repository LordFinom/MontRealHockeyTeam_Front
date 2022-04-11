<template>
<div class="main-loader-component" v-if="props.shown"></div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
// Interface
// Props
const props = defineProps({
  shown: {
    type: Boolean,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.main-loader-component{
    position: absolute;
    width: 100%;
    height: 100vh;
    background: black;
    background-image: url("~@/assets/loader.svg");
    background-position: center;
    background-repeat: no-repeat;
}
</style>
