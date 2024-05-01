<template>
    <div class="flex items-center">
        <div class="w-[40px] h-[40px] rounded-full flex justify-center items-center mr-1" :class="[`bg-${color}-500`]">{{ text }}</div>
        <p>
            {{ counter }}
        </p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    counter:number,
    text:string
    color:'gray' | 'blue' | 'red' | 'green'|'none'
}>()

</script>