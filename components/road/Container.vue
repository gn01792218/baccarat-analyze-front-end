<template>
    <UContainer class="w-full">
        <section class="flex items-center justify-between p-1">
            <UDivider class="my-1 mr-5 w-[300px]" :label="title" size="xl" color="orange" type="dotted"
                :ui="{ label: 'text-xl text-primary-500 dark:text-primary-400' }" />
            <RoadCounter class="p-1 h-auto mr-5" :road-counter="roadCounter" :road-prediction="roadPrediction"/>
            <div class="flex justify-between items-center">
                <MyChip class="mr-5" :counter="resultCounter.BankerCount" position="莊" title="" color="none"/>
                <MyChip class="mr-5" :counter="resultCounter.PlayerCount" position="閒" title="" color="none"/>
                <MyChip class="mr-5" :counter="resultCounter.TieCount" position="和" title="" color="none"/>
                <MyChip :counter="total" position="總" title="" color="primary"/>
            </div>
        </section>
        <section class="flex h-[200px]">
            <div class="w-[1300px] h-full relative">
                <slot name="roadmap" />
            </div>
        </section>
    </UContainer>
</template>

<script setup lang="ts">
import { type RoadResultCounter, type RoadCounter, type RoadPrediction } from "~/types/roadmap"

 const props = defineProps<{
    title: string,
    resultCounter:RoadResultCounter
    roadCounter:RoadCounter
    roadPrediction:RoadPrediction | undefined
}>()    
const total = computed(()=>{
    return props.resultCounter.BankerCount + props.resultCounter.PlayerCount + props.resultCounter.TieCount
})

</script>