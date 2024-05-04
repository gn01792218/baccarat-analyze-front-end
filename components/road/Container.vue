<template>
    <UContainer class="w-full">
        <section class="flex items-center justify-between p-1">
            <UDivider class="my-1 mr-5 w-[300px]" :label="title" size="xl" type="dotted"
                :ui="{ 
                    label: 'text-xl text-black',
                    border: {
                        base: 'border-gray-800' 
                    }
            }" />
            <RoadCounter class="p-1 h-auto mr-5" :road-info="roadInfo" :road-prediction="roadPrediction"/>
            <div class="flex justify-between items-center">
                <MyChip class="mr-5" :counter="resultCounter.BankerCount" text="莊" color="red"/>
                <MyChip class="mr-5" :counter="resultCounter.PlayerCount" text="閒" color="blue"/>
                <MyChip class="mr-5" :counter="resultCounter.TieCount" text="和" color="green"/>
                <MyChip :counter="total" text="總" color="gray"/>
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
import { type RoadResultCounter, type RoadInfo, type RoadPrediction } from "~/types/roadmap"

 const props = defineProps<{
    title: string,
    resultCounter:RoadResultCounter
    roadInfo:RoadInfo
    roadPrediction:RoadPrediction | undefined
}>()    
const total = computed(()=>{
    return props.resultCounter.BankerCount + props.resultCounter.PlayerCount + props.resultCounter.TieCount
})

</script>