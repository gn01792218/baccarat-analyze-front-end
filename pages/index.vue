<template>
    <div class="w-full h-screen bg-red-100">
        <RoadBeadPlateMain class="" :roadmap="beadPlate" tableNum="A" />
    </div>
</template>

<script setup lang="ts">
import { type BeadPlate, RoadSymbol } from "~/types/roadmap";

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

</script>