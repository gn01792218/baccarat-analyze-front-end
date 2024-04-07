<template>
    <UContainer class="p-5 mb-1 bg-primary-500 flex items-center justify-between h-[110px]">
        <section class="mr-5 h-full flex flex-col justify-between">
            <UButton class="block" label="新局" color="blue" variant="outline" />
            <UButton class="block" label="存檔" color="blue" variant="outline" />
        </section>
        <section class="flex h-full">
            <div class="flex items-center justify-between h-full mr-5">
                <BetSetSelector id="bet-set-1" :set-number="1" :set-values="['A','B','C','D']"/>
                <p> + </p>
                <BetSetSelector id="bet-set-2" :set-number="2" :set-values="['A','E','D','G']"/>
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
            <div class="h-full flex flex-col justify-between  mr-5">
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
        <RoadHeaderCounter class="w-[250px] h-full" :road-counter="roadCounter" />
        <div class="h-full flex justify-around items-center p-2 ml-auto">
            <UButton class="block w-[55px] mr-5" :label="`莊 ${bigRoadResultCount.BankerCount}`" color="red" @click="drawRoadRequest(RoadSymbol.Banker)" />
            <UButton class="block w-[55px] mr-5" :label="`閒 ${bigRoadResultCount.PlayerCount}`" color="blue" @click="drawRoadRequest(RoadSymbol.Player)" />
            <UButton class="block w-[55px] mr-5" :label="`和 ${bigRoadResultCount.TieCount}`" color="green" @click="drawRoadRequest(RoadSymbol.Tie)" />
            <MyChip :counter="bigRoadResultCount.BankerCount + bigRoadResultCount.PlayerCount + bigRoadResultCount.TieCount" position="總" title="局數" color="primary"/>
        </div>
        <UButton class="block ml-auto" label="返回上局" color="blue" variant="outline" />
    </UContainer>
</template>

<script setup lang="ts">
import { type RoadResultCounter, type RoadCounter, RoadSymbol } from "~/types/roadmap"
defineProps<{
    roadCounter: RoadCounter,
    bigRoadResultCount:RoadResultCounter,
    drawRoadRequest:(symbol:RoadSymbol)=>void
}>()

</script>