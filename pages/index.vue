<template>
    <Header :road-counter="{
        total: 15,
        win: -55
    }" :big-road-result-count="bigRoadResultCount" :draw-road-request="fetchDrawRoadRequest" />

    <UContainer class="w-[1300px] mb-3">
        <RoadBigRoadTotal :roadmap="bigRoad" />
    </UContainer>

    <RoadContainer class="mb-1" :result-counter="bigRoadResultCount" :road-counter="{ total: 15, win: 10 }" title="大路合計"
        :total="5" :win="5">
        <template #roadmap>
            <RoadBigRoadMain :roadmap="bigRoad" />
        </template>
    </RoadContainer>
    <RoadContainer class="mb-1" :result-counter="bigEyesRoadResultCount" title="大眼路合計"
        :road-counter="{ total: 23, win: -149 }" :total="15" :win="5">
        <template #roadmap>
            <RoadBigEyesRoadMain :roadmap="bigEyesRoad" />
        </template>
    </RoadContainer>
    <RoadContainer class="mb-1" :result-counter="smallRoadResultCount" title="小路合計"
        :road-counter="{ total: 5, win: -1 }" :total="20" :win="-5">
        <template #roadmap>
            <RoadSmallRoadMain :roadmap="smallRoad" />
        </template>
    </RoadContainer>
    <RoadContainer class="mb-1" :result-counter="cockroachRoadResultCount" title="蟑螂路合計"
        :road-counter="{ total: 1, win: 99 }" :total="0" :win="0">
        <template #roadmap>
            <RoadCockroachMain :roadmap="cockroachRoad" />
        </template>
    </RoadContainer>
</template>

<script setup lang="ts">
import { RoadSymbol, type BigRoad, type BigEyeRoad, type SmallRoad, type CockroachRoad, type RoadResultCounter } from "~/types/roadmap";
import useRoadAPI from "~/api/useRoadAPI";
const { initRoadRequest, drawRoadRequest } = useRoadAPI()

const bigRoad = ref<BigRoad>({
    columns: [],
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
const bigRoadResultCount = ref<RoadResultCounter>({
    TieCount: 0,
    PlayerCount: 0,
    BankerCount: 0
})
const bigEyesRoadResultCount = ref<RoadResultCounter>({
    TieCount: 0,
    PlayerCount: 0,
    BankerCount: 0
})
const smallRoadResultCount = ref<RoadResultCounter>({
    TieCount: 0,
    PlayerCount: 0,
    BankerCount: 0
})
const cockroachRoadResultCount = ref<RoadResultCounter>({
    TieCount: 0,
    PlayerCount: 0,
    BankerCount: 0
})
const roadUuid = ref<string>('')

init()

async function init() {
    roadUuid.value = await initRoadRequest({ name: 'road' })
}
async function fetchDrawRoadRequest(roadSymbol: RoadSymbol) {
    const { roadmaps, result_counter } = await drawRoadRequest(roadUuid.value, { result: roadSymbol })
    if (roadmaps.bigRoad) {
        bigRoad.value = roadmaps.bigRoad
        // bigRoad.value = {
        //     columns: [
        //         {
        //             total: -1,
        //             blocks: [
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 }
        //             ]
        //         },
        //         {
        //             total: 5,
        //             blocks: [
        //                 {
        //                     symbol: 2,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 2,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     "symbol": 2,
        //                     "tieCount": 0
        //                 },
        //                 {
        //                     "symbol": 17,
        //                     "tieCount": 2
        //                 },
        //                 {
        //                     "symbol": 2,
        //                     "tieCount": 0
        //                 },
        //                 {
        //                     symbol: 2,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     "symbol": 2,
        //                     "tieCount": 0
        //                 },
        //             ]
        //         },
        //         {
        //             total: 252,
        //             blocks: [
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //                 {
        //                     symbol: 1,
        //                     tieCount: 0
        //                 },
        //             ]
        //         },
        //     ]
        // }
        bigRoadResultCount.value = result_counter.BigRoadCounts
    }

    if (roadmaps.bigEyeRoad) {
        bigEyesRoad.value = roadmaps.bigEyeRoad
        bigEyesRoadResultCount.value = result_counter.BigEyeRoadCounts
    }
    if (roadmaps.smallRoad) {
        smallRoad.value = roadmaps.smallRoad
        smallRoadResultCount.value = result_counter.SmallRoadCounts
    }
    if (roadmaps.cockroachRoad) {
        cockroachRoad.value = roadmaps.cockroachRoad
        cockroachRoadResultCount.value = result_counter.CockroachRoadCounts
    }
}
</script>