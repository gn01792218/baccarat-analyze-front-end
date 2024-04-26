<template>
    <UContainer class="p-5 mb-1 bg-primary-500 flex items-center justify-between h-[110px]">
        <section class="mr-5 h-full flex flex-col justify-between">
            <UButton class="block" label="新局" color="blue" variant="outline" />
            <UButton class="block" label="存檔" color="blue" variant="outline" />
        </section>
        <section class="flex h-full">
            <div class="flex items-center justify-between h-full mr-5">
                <BetSetSelector id="bet-set-1" :road-uuid="roadUuid" :pattern-selector="PatternSelector.SELECTOR1" :patterns="roadPatterns"/>
                <p> + </p>
                <BetSetSelector id="bet-set-2" :road-uuid="roadUuid" :pattern-selector="PatternSelector.SELECTOR2" :patterns="roadPatterns"/>
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
            <div class="h-full flex flex-col justify-between">
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
        <RoadHeaderCounter class="h-full" :road-counter="roadCounter" :road-prediction="roadPrediction"/>
        <div class="h-full flex justify-around items-center p-2 ml-auto">
            <UButton class="block w-[55px] mr-5" :label="`莊 ${totalRoadResultCount.BankerCount}`" color="red" @click="drawRoadRequest(RoadSymbol.Banker)" />
            <UButton class="block w-[55px] mr-5" :label="`閒 ${totalRoadResultCount.PlayerCount}`" color="blue" @click="drawRoadRequest(RoadSymbol.Player)" />
            <UButton class="block w-[55px] mr-5" :label="`和 ${totalRoadResultCount.TieCount}`" color="green" @click="drawRoadRequest(RoadSymbol.Tie)" />
            <UButton class="block mr-5" icon="i-heroicons-arrow-uturn-left" color="gray" variant="solid" @click="roadBackRequest" />
            <MyChip :counter="totalRoadResultCount.BankerCount + totalRoadResultCount.PlayerCount + totalRoadResultCount.TieCount" position="總" title="" color="primary"/>
        </div>
        <!-- <UButton class="block ml-auto" label="返回上局" color="blue" variant="outline" /> -->
    </UContainer>
</template>

<script setup lang="ts">
import { type RoadResultCounter, type RoadCounter, RoadSymbol, type RoadMapPatterns, PatternSelector, type RoadPrediction as totalRoadResultCount } from "~/types/roadmap"
import useRoadAPI from '~/api/useRoadAPI';

defineProps<{
    roadUuid:string,
    roadCounter: RoadCounter,
    totalRoadResultCount:RoadResultCounter,
    roadPrediction:totalRoadResultCount | undefined
    drawRoadRequest:(symbol:RoadSymbol)=>void,
    roadBackRequest:()=>void
}>()

const { getRoadMapPatterns } = useRoadAPI()
const roadPatterns = ref<RoadMapPatterns | {}>({})
init()

async function init(){
    roadPatterns.value = await getRoadMapPatterns()
}
</script>