import { BetArea } from "~/types/roadmap";

export default function usePrediction() {
  //方法
  function getPredictionText(betArea:BetArea | undefined){
    switch(betArea){
        case BetArea.BANKER:
            return '莊'
        case BetArea.PLAYER:
            return '閒'
        default :
            return ''
    }
  }

  return {
    getPredictionText
  };
}
