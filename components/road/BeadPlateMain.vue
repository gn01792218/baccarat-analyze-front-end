<template>
  <section class="absolute w-full h-full left-0 top-0">
    <!-- BeadPlate -->
    <div class="beadPlate-container absolute">
      <div :id="RoadDomName.BEADPLATE" class="beadPlate flex">
        <div class="beadPlate-column flex border-[1px]" :id="`beadPlate-column-${index}`"
          v-for="(mc, index) in roadColumns" :key="index">
          <div class="beadPlate-item flex border-[1px]" v-for="(mr, index) in roadRows" :key="index"
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
}>();
//如果要修改路圖size，除了修改這裡外，
//還要到assets/css/scss/base/_variable.scss
//修改對應的css變數
const roadColumns = new Array(40);
const roadRows = new Array(6);
const {
  showAllRoad,
  resetRoad
} = useBeadPlate(
  RoadType.M_BEADPLATE,
  roadColumns,
  roadRows
);
onMounted(() => {
  showAllRoad(props.roadmap);
})
watch(() => props.roadmap, () => {
  resetRoad();
  showAllRoad(props.roadmap);
});
</script>
