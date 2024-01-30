<template>
    <div class="w-full bg-red-100">
        <RoadBeadPlateMain class="" :roadmap="beadPlate" tableNum="A" />
    </div>
    <div class="w-[1000px] h-[200px] bg-slate-600 relative">
        <RoadBigRoadMain :roadmap="bigRoad" tableNum="B"/>
    </div>
</template>

<script setup lang="ts">
import { type BeadPlate, RoadSymbol, type BigRoad } from "~/types/roadmap";

const beadPlate = ref<BeadPlate>({
    blocks: [
        {
            symbol: RoadSymbol.Banker,
            tieCount: 0
        },
        {
            symbol: RoadSymbol.BankerAndBankerPair,
            tieCount: 0
        },
        {
            symbol: RoadSymbol.Player,
            tieCount: 1
        }
    ]
})
const bigRoad = ref<BigRoad>({
    columns:[
        {
            blocks: [
                {
                    symbol: RoadSymbol.Banker,
                    tieCount: 0
                },
                {
                    symbol: RoadSymbol.BankerAndBankerPair,
                    tieCount: 0
                },
                {
                    symbol: RoadSymbol.Player,
                    tieCount: 1
                }
            ]
        }
    ],
})

</script>