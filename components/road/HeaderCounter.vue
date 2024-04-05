<template>
    <section class="flex h-full">
        <div class="h-full flex flex-col justify-between  mr-5">
            <div class="flex" :class="[roadCounter.win >= 0 ? 'text-black' : 'text-red-500']">
                <p class="mr-2">上下</p>
                <p>{{ roadCounter.win }}</p>
            </div>
            <div class="flex">
                <p class="mr-2">轉碼</p>
                <p>{{ roadCounter.total }}</p>
            </div>
        </div>
        <div class="h-full flex flex-col justify-between  mr-5">
            <div class="flex">
                <p class="mr-2">下局預測</p>
                <UButton class="flex w-[30px] justify-center" label="莊" color="red" />
            </div>
            <div class="flex">
                <p class="mr-2">下局注碼</p>
                <p>1</p>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { type RoadCounter } from "~/types/roadmap"
defineProps<{
    roadCounter: RoadCounter
}>() 
</script>