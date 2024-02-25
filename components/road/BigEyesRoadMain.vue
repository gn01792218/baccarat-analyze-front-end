<template>
  <section class="w-full h-full flex absolute top-0 left-0"  
    :id="`${RoadDomName.BIGEYESROAD}`"
    :class="[`${RoadDomName.BIGEYESROAD}`]"
    >
    <div
      :class="[`${RoadDomName.BIGEYESROAD}-column border-[1px]`]"
      :id="`${RoadDomName.BIGEYESROAD}-column-${index}`"
      v-for="(cc, index) in roadColumns"
      :key="index"
    >
      <div
        :class="[
          `${RoadDomName.BIGEYESROAD}-item${index} border-[1px] items-center justify-center`,
          `${RoadDomName.BIGEYESROAD}-item`]"
        v-for="(cci, index) in roadRows"
        :key="index"
      >
        <div></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RoadType, RoadDomName, type BigEyeRoad } from '@/types/roadmap'
import useDownThreeRoad from '~/composables/road/useDownThreeRoad'
const props = defineProps<{
  roadmap: BigEyeRoad;
}>();

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
 }  = useDownThreeRoad(RoadType.M_BIGEYESROAD, roadColumns, roadRows)

watch(
  () => props.roadmap,
  () => {
    // console.log("偵測到大眼路",props.roadmap)
    resetRoad(); //不管怎樣都先reset，否則換薛時可能無法重置下三路( 直到下三路開始有新的路圖 )
    const roadmapFirstColumnsBlocks = props.roadmap.columns[0].blocks!
    if (roadmapFirstColumnsBlocks.length < 1) return
    showAllRoad(props.roadmap);
    // console.log('重置完且畫完大眼路')
  }
);
</script>
