import { type BeadPlate, RoadType, RoadDomName, RoadSymbol, type RoadBlock } from "@/types/roadmap";
import useRoadBase from "./useRoadBase";
export default function useBeadPlate(
  roadType: RoadType,
  roadColumns: Array<number>,
  roadRows: Array<number>
) {
  const { roadElement } = useRoadBase()
  const roadColumnCount = ref(0); //畫到第幾欄
  const roadIndex = ref(0); //畫到第幾格
  const overflowCount = ref(0);
  
  function getRoadDomName() {
    switch (roadType) {
      case RoadType.M_BEADPLATE:
        return RoadDomName.BEADPLATE;
    }
  }
  async function putRoad(
    columnNum: number,
    roadnum: number,
    gameResult: number
  ) {
    let beadPlateCol = document.getElementById(
      `beadPlate-column-${columnNum}`
    ) as HTMLElement;

    let beadPlateColItem = beadPlateCol.children[roadnum]
      .firstChild as HTMLElement;
    switch (gameResult) {
      case RoadSymbol.Banker:
        beadPlateColItem.classList.add("BeadPlate-B");
        break;
      case RoadSymbol.Player:
        beadPlateColItem.classList.add("BeadPlate-P");
        break;
      case RoadSymbol.Tie:
        beadPlateColItem.classList.add("BeadPlate-T");
        break;
      case RoadSymbol.BankerAndBankerPair:
        beadPlateColItem.classList.add("BeadPlate-B-BPair");
        break;
      case RoadSymbol.BankerAndPlayerPair:
        beadPlateColItem.classList.add("BeadPlate-B-PPair");
        break;
      case RoadSymbol.BankerAndBothPair:
        beadPlateColItem.classList.add("BeadPlate-B-BothPair");
        break;
      case RoadSymbol.PlayerAndBankerPair:
        beadPlateColItem.classList.add("BeadPlate-P-BPair");
        break;
      case RoadSymbol.PlayerAndPlayerPair:
        beadPlateColItem.classList.add("BeadPlate-P-PPair");
        break;
      case RoadSymbol.PlayerAndBothPair:
        beadPlateColItem.classList.add("BeadPlate-P-BothPair");
        break;
      case RoadSymbol.TieAndBankerPair:
        beadPlateColItem.classList.add("BeadPlate-T-BPair");
        break;
      case RoadSymbol.TieAndPlayerPair:
        beadPlateColItem.classList.add("BeadPlate-T-PPair");
        break;
      case RoadSymbol.TieAndBothPair:
        beadPlateColItem.classList.add("BeadPlate-T-BothPair");
        break;
    }
    roadIndex.value++;
  }
  function showAllRoad(roadMap: BeadPlate) {
    roadMap.blocks?.forEach((i: RoadBlock) => {
      showRoad(i.symbol);
    });
  }
  function showRoad(gameResult: number) {
    if (
      roadColumnCount.value >= roadColumns.length - 1 &&
      roadIndex.value > roadRows.length - 1
    ) {
      addColumn();
    }
    if (roadIndex.value > roadRows.length - 1) {
      //row放滿時
      roadColumnCount.value++;
      roadIndex.value = 0;
    }
    putRoad(roadColumnCount.value, roadIndex.value, gameResult);
  }
  function addColumn() {
    //滿格時一次增加一格的方法
    roadColumnCount.value++;
    roadIndex.value = 0;
    let beadPlateContainer = roadElement.value as HTMLElement;
    let firstChild = beadPlateContainer.firstElementChild as HTMLElement; //抓取第一個元素
    beadPlateContainer.removeChild(firstChild); //刪除第一行
    let newCol = document.createElement("div");
    newCol.classList.add("beadPlate-column");
    newCol.classList.add("border-[1px]")
    newCol.classList.add("border-slate-500")
    newCol.classList.add("flex");
    newCol.id = `beadPlate-column-${roadColumnCount.value}`;
    for (let i = 0; i < roadRows.length; i++) {
      let newColItem = document.createElement("div");
      let itemDiv = document.createElement("div");
      newColItem.classList.add("beadPlate-item");
      newColItem.classList.add("border-[1px]")
      newColItem.classList.add("border-slate-500")
      newColItem.classList.add("flex");
      newColItem.classList.add(`beadPlate-item${i}`);
      newColItem.appendChild(itemDiv);
      newCol.appendChild(newColItem);
    }
    //貼上去
    beadPlateContainer.appendChild(newCol);
    overflowCount.value++;
  }
  function resetRoad() {
    //路圖全部清空，換靴時呼叫
    //還要重置所有col原本的class
    //使用document.setAttribute("class","")
    //萬全版本:
    //1.直接刪除beadPlatRoadPlace下所有的beadPlate-column
    let beadPlateContainer = roadElement.value as HTMLElement;
    let firstChild = beadPlateContainer.lastElementChild;
    while (firstChild) {
      beadPlateContainer.removeChild(firstChild); //移除行數
      firstChild = beadPlateContainer.lastElementChild; //抓下一個child
    }
    //2.建立新的八條beadPlate-column，記得包beadPlate-item下要再增加一個空div
    for (let i = 0; i < roadColumns.length; i++) {
      let col = document.createElement("div");
      col.classList.add("beadPlate-column");
      col.classList.add("border-[1px]")
      col.classList.add("flex");
      col.id = `beadPlate-column-${i}`;
      for (let i = 0; i < roadRows.length; i++) {
        let colItem = document.createElement("div");
        let itemDiv = document.createElement("div");
        colItem.classList.add("beadPlate-item");
        colItem.classList.add("border-[1px]")
        colItem.classList.add("flex");
        colItem.classList.add(`beadPlate-item${i}`);
        colItem.appendChild(itemDiv);
        col.appendChild(colItem);
      }
      beadPlateContainer.appendChild(col);
    }
    roadColumnCount.value = 0;
    roadIndex.value = 0;
  }
  return {
    //data
    roadElement,
    showAllRoad,
    resetRoad,
  };
}
