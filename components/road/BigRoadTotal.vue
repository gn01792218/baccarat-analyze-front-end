<template>
  <section :id="`${RoadDomName.T_BIGROAD}`" class="bigRoad bg-white flex w-full h-full absolute top-0 left-0">
    <div class="bigRoad-column border-[1px] border-slate-500" :id="`${RoadDomName.T_BIGROAD}-column-${index}`"
      v-for="(tc, index) in roadColumns" :key="index">
      <div class="bigRoad-item flex border-[1px] border-slate-500" :class="[`bigRoad-item${index}`]" v-for="(tci, index) in roadRows" :key="index">
        <div></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import useBigRoad from "@/composables/road/useBigRoad"
import { RoadType, RoadDomName, type BigRoad } from "@/types/roadmap"

const props = defineProps<{
  roadmap: BigRoad
}>();

//表格
//如果要修改路圖size，除了修改這裡外，
//還要到assets/css/scss/base/_variable.scss
//修改對應的css變數
const roadColumns = new Array(40); //寬有幾個columns
const roadRows = new Array(6);     //高有幾個row

const {
  showAllRoad,
  resetRoad,
} = useBigRoad(
  RoadType.T_BIGROAD,
  roadColumns, roadRows)

onMounted(() => {
showAllRoad(props.roadmap)
})

watch(() => props.roadmap, () => {
  resetRoad();
  showAllRoad(props.roadmap);
});

</script>