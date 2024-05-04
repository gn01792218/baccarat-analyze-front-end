<template>
    <div class="flex justify-between items-center">
        <p :class="[roadInfo.result >= 0 ? 'text-black' : 'text-red-500']" class="mr-5"><span class="font-extrabold">上下</span> {{ roadInfo.result }}</p>
        <p class="mr-5"> 轉碼 {{ roadInfo.totalBet }}</p>
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
import { type RoadInfo, type RoadPrediction, BetArea } from "~/types/roadmap"
const props = defineProps<{
    roadInfo: RoadInfo
    roadPrediction:RoadPrediction | undefined
}>() 
const { getPredictionText } = usePrediction()
const predictBetArea = computed(()=>getPredictionText(props.roadPrediction?.betArea))
</script>