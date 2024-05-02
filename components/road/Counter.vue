<template>
    <div class="flex justify-between items-center">
        <p :class="[roadCounter.win >= 0 ? 'text-black' : 'text-red-500']" class="mr-5"><span class="font-extrabold">上下</span> {{ roadCounter.win }}</p>
        <p class="mr-5"> 轉碼 {{ roadCounter.total }}</p>
        <div class="flex items-center mr-5">
            <p class="mr-1">下局預測</p>
            <UButton v-show="roadPrediction?.betArea === BetArea.BANKER" class="flex w-[30px] justify-center" :label="predictBetArea" color="red" />
            <UButton v-show="roadPrediction?.betArea === BetArea.PLAYER" class="flex w-[30px] justify-center" :label="predictBetArea" color="blue" />
        </div>
        <div class="flex">
            <p>下局注碼</p>
            <p v-show="roadPrediction && roadPrediction.bet >0">{{ roadPrediction?.bet }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type RoadCounter, type RoadPrediction, BetArea } from "~/types/roadmap"
const props = defineProps<{
    roadCounter: RoadCounter
    roadPrediction:RoadPrediction | undefined
}>() 
const { getPredictionText } = usePrediction()
const predictBetArea = computed(()=>getPredictionText(props.roadPrediction?.betArea))
</script>