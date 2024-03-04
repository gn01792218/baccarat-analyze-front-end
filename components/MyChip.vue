<template>
    <div class="flex rounded-full bg-slate-500 relative">
        <div class="rounded-full w-[30px] h-[30px] flex justify-center items-center p-2 text-white" :class="[`bg-${color}-500`]">{{ counter }}</div>
        <div class="p-2 text-white">
            <p><span>{{ position }}</span> <span class="">{{ title }}</span></p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    counter:number,
    position:string
    title:string,
    color:'primary' | 'blue' | 'red' | 'green'
}>()

</script>