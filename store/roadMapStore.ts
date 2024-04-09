import { defineStore } from 'pinia';
import type { RoadMapPatterns } from '~/types/roadmap';

// 使用composition API模式定义store
export const useRoadMapStore = defineStore('roadMapStore', () => {
  // 初始状态
  const initState = {
    roadMapPatternsSelector: {}
  };

  //state
  const roadMapPatternsSelector = ref<Partial<RoadMapPatterns>>(initState.roadMapPatternsSelector);

  //actions
  function setRoadMapPatternsSelector(payload:RoadMapPatterns) {
    roadMapPatternsSelector.value = payload
  }


  return { 
    roadMapPatternsSelector,
    setRoadMapPatternsSelector 
    };
});