import useApiBase from "./useApiBase"
import {  type DrawRoadRequest, type RoadInitRequest, type Roadmap } from "~/types/roadmap";
import useFormData from "~/composables/road/useFormData";
export default () => {
  const { getFormData } = useFormData()
  const { fetchApiBase } = useApiBase()

  //MyModel API
  async function initRoadRequest(payload:RoadInitRequest){ //用來初始化一個路圖，已獲得uuid
   const { uuid } = await fetchApiBase(`/roadmap`,'post', payload) 
   return uuid as string
  }
  async function drawRoadRequest(uuid:string ,payload: DrawRoadRequest) {
    const { roadmaps } = await fetchApiBase(`/roadmap/${uuid}`,"patch", getFormData(payload));
    return roadmaps as Roadmap
  }
 
  return {
    //data
    //methods
    initRoadRequest,
    drawRoadRequest
  }
};
