<template>
    <!-- <UContainer class="w-full h-[200px] flex max-w-none justify-center">
        <UCard class="w-[1300px] h-full relative">
            <RoadBeadPlateMain :roadmap="beadPlate" />
        </UCard>
        <div class="w-[100px] h-full flex flex-col justify-around items-center">
            <UButton class="block w-[50px]" label="莊" color="red" @click="fetchDrawRoadRequest(RoadSymbol.Banker)" />
            <UButton class="block w-[50px]" label="閒" color="blue" @click="fetchDrawRoadRequest(RoadSymbol.Player)" />
            <UButton class="block w-[50px]" label="和" color="green" @click="fetchDrawRoadRequest(RoadSymbol.Tie)" />
        </div>
    </UContainer> -->
    <UContainer class="w-full h-[200px] flex max-w-none justify-center">
        <UCard class="w-[1300px] h-full relative">
            <RoadBigRoadTotal :roadmap="bigRoad" />
        </UCard>
        <div class="w-[100px] h-full flex flex-col justify-around items-center">
            <UButton class="block w-[50px]" label="莊" color="red" @click="fetchDrawRoadRequest(RoadSymbol.Banker)" />
            <UButton class="block w-[50px]" label="閒" color="blue" @click="fetchDrawRoadRequest(RoadSymbol.Player)" />
            <UButton class="block w-[50px]" label="和" color="green" @click="fetchDrawRoadRequest(RoadSymbol.Tie)" />
        </div>
    </UContainer>

    <UDivider class="my-5" label="路圖顯示" :ui="{ label: 'text-xl text-primary-500 dark:text-primary-400' }" />

    <UContainer class="w-full h-[200px] flex max-w-none justify-center mb-2">
        <UCard class="w-[1300px] h-full relative">
            <RoadBigRoadMain :roadmap="bigRoad" />
        </UCard>
    </UContainer>
    <UContainer class="w-full h-[200px] flex max-w-none justify-center mb-2">
        <UCard class="w-[1300px] h-full relative">
            <RoadBigEyesRoadMain :roadmap="bigEyesRoad" />
        </UCard>
    </UContainer>
    <UContainer class="w-full h-[200px] flex max-w-none justify-center mb-2">
        <UCard class="w-[1300px] h-full relative">
            <RoadSmallRoadMain :roadmap="smallRoad" />
        </UCard>
    </UContainer>
    <UContainer class="w-full h-[200px] flex max-w-none justify-center">
        <UCard class="w-[1300px] h-full relative">
            <RoadCockroachMain :roadmap="cockroachRoad" />
        </UCard>
    </UContainer>
</template>

<script setup lang="ts">
import { type BeadPlate, RoadSymbol, type BigRoad, type BigEyeRoad, type SmallRoad, type CockroachRoad } from "~/types/roadmap";
import useRoadAPI from "~/api/useRoadAPI";
const { initRoadRequest, drawRoadRequest } = useRoadAPI()
const beadPlate = ref<BeadPlate>({
    blocks: [
        // {
        //     symbol: RoadSymbol.Banker,
        //     tieCount: 0
        // },
        // {
        //     symbol: RoadSymbol.BankerAndBankerPair,
        //     tieCount: 0
        // },
        // {
        //     symbol: RoadSymbol.Player,
        //     tieCount: 1
        // }
    ]
})
const bigRoad = ref<BigRoad>({
    columns: [
        // {
        //     blocks: [
        //         {
        //             symbol: RoadSymbol.Banker,
        //             tieCount: 0
        //         },
        //         {
        //             symbol: RoadSymbol.BankerAndBankerPair,
        //             tieCount: 0
        //         },
        //         {
        //             symbol: RoadSymbol.Player,
        //             tieCount: 1
        //         }
        //     ]
        // }
    ],
})
const bigEyesRoad = ref<BigEyeRoad>({
    columns: []
})
const smallRoad = ref<SmallRoad>({
    columns: []
})
const cockroachRoad = ref<CockroachRoad>({
    columns: []
})
const roadUuid = ref<string>('')

init()

async function init() {
    roadUuid.value = await initRoadRequest({ name: 'road' })
}
async function fetchDrawRoadRequest(roadSymbol: RoadSymbol) {
    const roadMap = await drawRoadRequest(roadUuid.value, { result: roadSymbol })
    if (roadMap.bigRoad) bigRoad.value = roadMap.bigRoad
    if (roadMap.beadPlate) beadPlate.value = roadMap.beadPlate
    if (roadMap.bigEyeRoad) bigEyesRoad.value = roadMap.bigEyeRoad
    if (roadMap.smallRoad) smallRoad.value = roadMap.smallRoad
    if (roadMap.cockroachRoad) cockroachRoad.value = roadMap.cockroachRoad
}
</script>