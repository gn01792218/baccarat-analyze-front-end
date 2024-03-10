<template>
    <UContainer class="w-full mb-2">
        <section class="flex">
            <UDivider class="my-5 w-[300px] mr-auto" :label="title" size="xl" color="orange" type="dotted"
                :ui="{ label: 'text-xl text-primary-500 dark:text-primary-400' }" />
            <RoadCounter class="p-2" :road-counter="roadCounter"/>
        </section>
        <section class="flex h-[200px]">
            <div class="w-[1300px] h-full relative">
                <slot name="roadmap" />
            </div>
            <div class="w-[200px] h-full flex flex-col justify-around items-center p-2">
                <MyChip :counter="resultCounter.BankerCount" position="莊" title="局數" color="red"/>
                <MyChip :counter="resultCounter.PlayerCount" position="閒" title="局數" color="blue"/>
                <MyChip :counter="resultCounter.TieCount" position="和" title="局數" color="green"/>
                <MyChip :counter="total" position="總" title="局數" color="primary"/>
            </div>
        </section>
    </UContainer>
</template>

<script setup lang="ts">
import { type RoadResultCounter, type RoadCounter } from "~/types/roadmap"

 const props = defineProps<{
    title: string,
    resultCounter:RoadResultCounter
    roadCounter:RoadCounter
}>()    
const total = computed(()=>{
    return props.resultCounter.BankerCount + props.resultCounter.PlayerCount + props.resultCounter.TieCount
})

</script>