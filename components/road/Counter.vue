<template>
    <div class="bg-primary-500 flex justify-between items-center">
        <p :class="[roadCounter.win >= 0 ? 'text-black' : 'text-red-500']" class="mr-5"><span class="font-extrabold">上下</span> {{ roadCounter.win }}</p>
        <p class="mr-5"> 轉碼 {{ roadCounter.total }}</p>
        <div class="flex items-center mr-5">
            <p class="mr-1">下局預測</p>
            <UButton class="flex w-[30px] justify-center" label="莊" color="red" />
        </div>
        <div class="flex">
            <p>下局注碼</p>
            <p>1</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type RoadCounter } from "~/types/roadmap"
defineProps<{
    roadCounter:RoadCounter
}>() 
</script>