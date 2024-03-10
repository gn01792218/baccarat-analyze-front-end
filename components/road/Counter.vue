<template>
    <div class="bg-primary-500 flex justify-between items-center">
        <div class="flex flex-col items-start justify-between mr-5 h-full">
            <p :class="[roadCounter.win >= 0 ? 'text-black' : 'text-red-500']"><span class="font-extrabold">上下</span> {{ roadCounter.win }}</p>
            <p> 轉碼 {{ roadCounter.total }}</p>
        </div>
        <div class="flex h-full">
            <div class="flex flex-col items-center justify-between mr-5 h-full">
                <p>下局預測</p>
                <UButton class="flex w-[30px] justify-center" label="莊" color="red" />
            </div>
            <div class="flex flex-col items-center h-full">
                <p>下局注碼</p>
                <p>1</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type RoadCounter } from "~/types/roadmap"
defineProps<{
    roadCounter:RoadCounter
}>() 
</script>