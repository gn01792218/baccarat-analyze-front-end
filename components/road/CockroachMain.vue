<template>
  <div class="flex w-full h-full absolute top-0 left-0" 
  :id="`${RoadDomName.COCKROACHROAD}`"
  :class="[`${RoadDomName.COCKROACHROAD}`]"
  >
    <div
      :class="[`${RoadDomName.COCKROACHROAD}-column border-[1px] border-slate-500`]"
      :id="`${RoadDomName.COCKROACHROAD}-column-${index}`"
      v-for="(b1, index) in roadColumns"
      :key="index"
    >
      <div
        :class="[`${RoadDomName.COCKROACHROAD}-item border-[1px] border-slate-500 items-center justify-center`]"
        v-for="(bi, index) in roadRows"
        :key="index"
      >
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoadType, RoadDomName, type CockroachRoad } from '@/types/roadmap'
import useDownThreeRoad from '@/composables/road/useDownThreeRoad'
const props = defineProps<{
  roadmap:CockroachRoad
}>()
//基本資料
//如果要修改路圖size，除了修改這裡外，
//還要到assets/css/scss/base/_variable.scss
//修改對應的css變數
const roadColumns = new Array(40);
const roadRows = new Array(6);
const { 
  showAllRoad, 
  resetRoad,
  askRoad
 }  = useDownThreeRoad( RoadType.M_COCKROACHROAD, roadColumns, roadRows)
 
watch(()=>props.roadmap, () => {
  // console.log('偵測到蟑螂陸路圖')
  resetRoad();//不管怎樣都先reset，否則換薛時可能無法重置下三路( 直到下三路開始有新的路圖 )
 const roadmapFirstColumnsBlocks = props.roadmap.columns[0].blocks!
  if (roadmapFirstColumnsBlocks.length < 1 ) return
  showAllRoad(props.roadmap);
  // console.log('重置且畫完畫蟑螂路')
})
</script>
