<template>
    <div class="relative flex items-center">
        <p class="cursor-pointer">套路</p>
        <USelect v-model="patternsShowText" :options="Object.values(patterns)" @change="setPattern" />
    </div>
</template>

<script setup lang="ts">
import useRoadAPI from '~/api/useRoadAPI';
import { type RoadMapPatterns, PatternSelector } from '~/types/roadmap';

const props = defineProps<{
    roadUuid: string,
    patternSelector: PatternSelector, //哪一個套路選擇器
    patterns: RoadMapPatterns | {}
}>()

const { updateRoadMapPatterns } = useRoadAPI()

const patternsShowText = ref<string>('?')

function setPattern() {
    let patternKey = ''
    Object.entries(props.patterns).find(([key, value]) => {
        patternKey = key
        return patternsShowText.value === value
    })
    switch (props.patternSelector) {
        case PatternSelector.SELECTOR1:
            updateRoadMapPatterns(props.roadUuid, {
                pattern1: patternKey
            })
            break
        case PatternSelector.SELECTOR2:
            updateRoadMapPatterns(props.roadUuid, {
                pattern2: patternKey
            })
            break
    }
}

</script>