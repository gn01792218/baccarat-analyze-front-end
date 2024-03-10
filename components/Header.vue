<template>
    <UContainer class="p-5 mb-10 bg-primary-500 flex items-center justify-between h-[110px]">
        <section class="mr-5 h-full flex flex-col justify-between">
            <UButton class="block" label="新局" color="blue" variant="outline" />
            <UButton class="block" label="存檔" color="blue" variant="outline" />
        </section>
        <section class="flex h-full">
            <div class="flex flex-col items-center justify-between h-full mr-5">
                <div class="flex flex-col items-center">
                    <p>套路</p>
                    <p>D</p>
                </div>
            </div>
            <div class="h-full flex flex-col justify-between  mr-5">
                <div class="flex">
                    <p class="mr-2">本金</p>
                    <p>50</p>
                </div>
                <div class="flex">
                    <p class="mr-2">編號</p>
                    <p>0050</p>
                </div>
            </div>
            <div class="h-full flex flex-col justify-between  mr-5">
                <div class="flex">
                    <p class="mr-2">檯面</p>
                    <p>50</p>
                </div>
                <div class="flex">
                    <p class="mr-2">名稱</p>
                    <p>0050</p>
                </div>
            </div>
        </section>
        <RoadCounter class="w-[250px] h-full" :road-counter="roadCounter" />
        <UButton class="block ml-auto" label="返回上局" color="blue" variant="outline" />
    </UContainer>
</template>

<script setup lang="ts">
import { type RoadCounter } from "~/types/roadmap"
defineProps<{
    roadCounter: RoadCounter
}>()

</script>