<template>
    <Header
    :road-uuid="roadUuid" 
    :road-prediction="predictions?.totalRoad"
    :road-info="totalRoadCount" 
    :total-road-result-count="totalRoadResultCount" 
    :draw-road-request="fetchDrawRoadRequest" 
    :road-back-request="fetchRoadBackRequest"
    />
    <UContainer class="w-[1300px] mb-3 h-screen">
        <RoadBigRoadTotal :roadmap="totalRoadMap" />
    </UContainer>

    <!-- <RoadContainer  class="mb-1" :road-prediction="predictions?.bigRoad" :result-counter="bigRoadResultCount" :road-info="bigRoadCount" title="大路合計">
        <template #roadmap>
            <RoadBigRoadMain :roadmap="bigRoadMap" />
        </template>
    </RoadContainer> -->
    <!-- <RoadContainer class="mb-1" :road-prediction="predictions?.bigEyeRoad" :result-counter="bigEyesRoadResultCount" title="大眼路合計"
        :road-info="bigEyesRoadCount">
        <template #roadmap>
            <RoadBigEyesRoadMain :roadmap="bigEyesRoadMap" />
        </template>
    </RoadContainer> -->
    <!-- <RoadContainer class="mb-1" :road-prediction="predictions?.smallRoad" :result-counter="smallRoadResultCount" title="小路合計"
        :road-info="smallRoadCount">
        <template #roadmap>
            <RoadSmallRoadMain :roadmap="smallRoadMap" />
        </template>
    </RoadContainer> -->
    <!-- <RoadContainer class="mb-1" :road-prediction="predictions?.cockroachRoad" :result-counter="cockroachRoadResultCount" title="筆路合計"
        :road-info="cockroachRoadCount">
        <template #roadmap>
            <RoadCockroachMain :roadmap="cockroachRoadMap" />
        </template>
    </RoadContainer> -->
</template>

<script setup lang="ts">
import { RoadSymbol, type BigRoad, type BigEyeRoad, type SmallRoad, type CockroachRoad, type RoadResultCounter, type Predictions, type Roadmap, type RoadInfo } from "~/types/roadmap";
import useRoadAPI from "~/api/useRoadAPI";
const { initRoadRequest, drawRoadRequest, roadBackRequest } = useRoadAPI()

const totalRoadMap = ref<BigRoad>({
    columns:[]
})
const bigRoadMap = ref<BigRoad>({
    columns: [],
})
const bigEyesRoadMap = ref<BigEyeRoad>({
    columns: []
})
const smallRoadMap = ref<SmallRoad>({
    columns: []
})
const cockroachRoadMap = ref<CockroachRoad>({
    columns: []
})
const totalRoadResultCount = ref<RoadResultCounter>({
    TieCount: 0,
    PlayerCount: 0,
    BankerCount: 0
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
const totalRoadCount = ref<RoadInfo>({
    totalBet:0,
    result:0
})
const bigRoadCount = ref<RoadInfo>({
    totalBet:0,
    result:0
})
const bigEyesRoadCount = ref<RoadInfo>({
    totalBet:0,
    result:0
})
const smallRoadCount = ref<RoadInfo>({
    totalBet:0,
    result:0
})
const cockroachRoadCount = ref<RoadInfo>({
    totalBet:0,
    result:0
})
const predictions = ref<Predictions>() //各條路的下局預測、下局注碼
const roadUuid = ref<string>('')

init()

async function init() {
    roadUuid.value = await initRoadRequest({ name: 'road' })
}
async function fetchDrawRoadRequest(roadSymbol: RoadSymbol) {
    const { roadmaps, result_counter, predictions } = await drawRoadRequest(roadUuid.value, { result: roadSymbol })
    setRoadMaps(predictions, roadmaps, result_counter);
}
async function fetchRoadBackRequest(){
    const { roadmaps, result_counter, predictions } = await roadBackRequest(roadUuid.value)
    setRoadMaps(predictions, roadmaps, result_counter);
}
function setRoadMaps(predictionsRes: Predictions, roadmaps: Roadmap, result_counter: { BigRoadCounts: RoadResultCounter; BigEyeRoadCounts: RoadResultCounter; SmallRoadCounts: RoadResultCounter; CockroachRoadCounts: RoadResultCounter; }) {
  predictions.value=predictionsRes;
  const { totalRoad, bigRoad, bigEyeRoad, smallRoad, cockroachRoad } = roadmaps
  if(totalRoad) {
    totalRoadMap.value=totalRoad;
    totalRoadResultCount.value=result_counter.BigRoadCounts;
    totalRoadCount.value = {
        totalBet:totalRoad.TotalBet || 0,
        result:totalRoad.Result || 0
    }
  }
  if(bigRoad) {
    bigRoadMap.value=bigRoad;
    bigRoadResultCount.value=result_counter.BigRoadCounts;
    bigRoadCount.value = {
        totalBet:bigRoad.TotalBet || 0,
        result:bigRoad.Result || 0
    }
  }

  if(bigEyeRoad) {
    bigEyesRoadMap.value=bigEyeRoad;
    bigEyesRoadResultCount.value=result_counter.BigEyeRoadCounts;
    bigEyesRoadCount.value = {
        totalBet:bigEyeRoad.TotalBet || 0,
        result:bigEyeRoad.Result || 0
    }
  }
  if(smallRoad) {
    smallRoadMap.value=smallRoad;
    smallRoadResultCount.value=result_counter.SmallRoadCounts;
    smallRoadCount.value = {
        totalBet:smallRoad.TotalBet || 0,
        result:smallRoad.Result || 0
    }
  }
  if(cockroachRoad) {
    cockroachRoadMap.value=cockroachRoad;
    cockroachRoadResultCount.value=result_counter.CockroachRoadCounts;
    cockroachRoadCount.value = {
        totalBet:cockroachRoad.TotalBet || 0,
        result:cockroachRoad.Result || 0
    }
  }
}
definePageMeta({
  colorMode: 'light',
})
</script>