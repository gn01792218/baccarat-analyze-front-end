<template>
    <section class="flex h-full">
        <div class="h-full flex flex-col justify-between mx-12">
            <div class="flex" :class="[roadInfo.result >= 0 ? 'text-black' : 'text-red-500']">
                <p class="mr-2">上下</p>
                <p>{{ roadInfo.result }}</p>
            </div>
            <div class="flex">
                <p class="mr-2">轉碼</p>
                <p>{{ roadInfo.totalBet }}</p>
            </div>
        </div>
        <div class="h-full flex flex-col justify-between  mr-5">
            <div class="flex items-center">
                <p class="mr-2">下局預測</p>
                <UButton v-show="roadPrediction?.betArea === BetArea.BANKER" class="flex w-[30px] justify-center"
                    :label="predictBetArea" color="red" />
                <UButton v-show="roadPrediction?.betArea === BetArea.PLAYER" class="flex w-[30px] justify-center mr-1"
                    :label="predictBetArea" color="blue" />
                <p v-show="roadPrediction && roadPrediction.bet >0">{{ roadPrediction?.bet }}</p>
            </div>
            <!-- <div class="flex">
                <p class="mr-2">下局注碼</p>
                <p v-show="roadPrediction && roadPrediction.bet >0">{{ roadPrediction?.bet }}</p>
            </div> -->
        </div>
    </section>
</template>

<script lang="ts" setup>
import { type RoadInfo, type RoadPrediction, BetArea } from "~/types/roadmap"
const props = defineProps<{
    roadInfo: RoadInfo
    roadPrediction: RoadPrediction | undefined
}>()
const { getPredictionText } = usePrediction()
const predictBetArea = computed(()=>getPredictionText(props.roadPrediction?.betArea))
</script>