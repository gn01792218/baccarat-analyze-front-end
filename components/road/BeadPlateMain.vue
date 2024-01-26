<template>
  這是朱盤路
  <section class="relative w-full h-[200px]">
    <!-- BeadPlateGrid -->
    <div class="beadPlateGrid flex absolute">
      <div v-for="(mc, index) in roadColumns" :key="index" class="beadPlateGrid-column flex"
        :class="[
          { beadPlateboundary: index === roadColumns - 1 },
        ]"></div>
    </div>
    <div class="main-row absolute">
      <div class="beadPlateGrid-row flex" v-for="(mr, index) in roadRows" :key="index"></div>
    </div>
    <!-- BeadPlate -->
    <div class="beadPlate-container absolute">
      <div :id="RoadDomName.BEADPLATE" class="beadPlate flex">
        <div class="beadPlate-column flex" :id="`beadPlate-column-${tableNum}-${index}`"
          v-for="(mc, index) in roadColumns" :key="index">
          <div class="beadPlate-item flex" v-for="(mr, index) in roadRows" :key="index"
            :class="[`beadPlate-item${index}`]">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type BeadPlate, RoadType, RoadDomName } from "@/types/roadmap";
import useBeadPlate from "../../composables/road/useBeadPlate";
const props = defineProps<{
  roadmap: BeadPlate
  tableNum: string
}>();
//如果要修改路圖size，除了修改這裡外，
//還要到assets/css/scss/base/_variable.scss
//修改對應的css變數
const roadColumns = ref(8);
const roadRows = new Array(6);
const {
  askRoad,
  showAllRoad,
  resetRoad
} = useBeadPlate(
  props.tableNum,
  RoadType.G_BEADPLATE,
  roadColumns,
  roadRows
);
onMounted(() => {
  showAllRoad(props.roadmap);
})
// watch(
//   () => props.tableNum,
//   () => {
//     // console.log("換桌豬盤路重置")
//     resetRoad();
//   }
// );
// watch(
//   () => props.roadmap,
//   () => {
//     if (props.roadmap) {
//       resetRoad();
//       showAllRoad(props.roadmap);
//     }
//   }
// );

</script>
