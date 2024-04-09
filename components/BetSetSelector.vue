<template>
    <div class="relative flex flex-col items-center" >
        <p class="cursor-pointer" @click="toggleMenum">套路{{ patternsShowText }}</p>
        <ul class="p-2 absolute z-[10] top-[25px] bg-black text-white w-full" v-show="showMenum">
            <li class="w-full hover:bg-slate-700" v-for="[patternKey,value] in Object.entries(patterns)" :key="patternKey" @click="setPattern(patternKey, value)">
                {{ value }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import useRoadAPI from '~/api/useRoadAPI';
import { type RoadMapPatterns, PatternSelector } from '~/types/roadmap';

const props = defineProps<{
    roadUuid:string,
    patternSelector:PatternSelector, //哪一個套路選擇器
    patterns:RoadMapPatterns | {}
}>()

const { toggleMenum, showMenum } = useWatchClickOutSide()
const { updateRoadMapPatterns } = useRoadAPI()

const patternsShowText = ref<string >('?')

function setPattern(patternKey:string, patternValue:string){
    console.log(props.roadUuid)

    patternsShowText.value = patternValue
    toggleMenum()
    switch(props.patternSelector){
        case PatternSelector.SELECTOR1:
            updateRoadMapPatterns(props.roadUuid, {
                pattern1:patternKey
            })
            break
        case PatternSelector.SELECTOR2:
            updateRoadMapPatterns(props.roadUuid, {
                pattern2:patternKey
            })
            break
    }
}

</script>