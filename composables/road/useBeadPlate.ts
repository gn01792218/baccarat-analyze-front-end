import { ref } from "vue";
import { type BeadPlate, RoadType, RoadDomName, RoadSymbol } from "@/types/roadmap";
export default function useBeadPlate(
  tableNum: string,
  roadType: RoadType,
  roadColumns: Array<number>,
  roadRows: Array<number>
) {
  const roadColumnCount = ref(0); //畫到第幾欄
  const roadIndex = ref(0); //畫到第幾格
  const overflowCount = ref(0);
  const timer = ref();
  const asking = ref(false); //是否在問路中
  function getRoadDomName() {
    switch (roadType) {
      case RoadType.G_BEADPLATE:
      case RoadType.T_BEADPLATE:
        return RoadDomName.BEADPLATE;
    }
  }
  function getRoadContainerElement() {
    switch (roadType) {
      case RoadType.G_BEADPLATE:
        return document.getElementById(`${getRoadDomName()}`) as HTMLElement;
      case RoadType.T_BEADPLATE:
        return document.getElementById(`${getRoadDomName()}-${tableNum}`) as HTMLElement;
    }
  }
  async function putRoad(
    columnNum: number,
    roadnum: number,
    gameResult: number
  ) {
    let beadPlateCol = document.getElementById(
      `beadPlate-column-${tableNum}-${columnNum}`
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
  function askRoad(roadMap:BeadPlate,askRoadResult: number) {
    //有人問路時，就啟動
    asking.value = true;
    //1.先清除計時器
    if (timer.value) {
      clearTimeout(timer.value);
    }
    //2.重置路圖
    resetRoad();
    showAllRoad(roadMap);
    //3.放置問路
    showRoad(askRoadResult);
    //4.添加動畫
    let column = document.getElementById(
      `beadPlate-column-${tableNum}-${roadColumnCount.value}`
    ) as HTMLElement;
    let road: HTMLElement;
    if (roadIndex.value > 0) {
      road = column.children[roadIndex.value - 1].firstChild as HTMLElement;
    } else {
      road = column.children[roadIndex.value].firstChild as HTMLElement;
    }
    road.classList.add("askRoadanimation");
    //5.畫完之後等二秒就reset路圖，並重新畫
    timer.value = setTimeout(() => {
      resetRoad();
      showAllRoad(roadMap);
      road.classList.remove("askRoadanimation");
      asking.value = false;
    }, 2000);
  }
  function showAllRoad(roadMap: BeadPlate) {
    roadMap.blocks?.forEach((i: any) => {
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
    let beadPlateContainer = getRoadContainerElement() as HTMLElement;
    let firstChild = beadPlateContainer.firstElementChild as HTMLElement; //抓取第一個元素
    beadPlateContainer.removeChild(firstChild); //刪除第一行
    let newCol = document.createElement("div");
    newCol.classList.add("beadPlate-column");
    newCol.classList.add("d-flex");
    newCol.id = `beadPlate-column-${tableNum}-${roadColumnCount.value}`;
    for (let i = 0; i < roadRows.length; i++) {
      let newColItem = document.createElement("div");
      let itemDiv = document.createElement("div");
      newColItem.classList.add("beadPlate-item");
      newColItem.classList.add("d-flex");
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
    let beadPlateContainer = getRoadContainerElement() as HTMLElement;
    let firstChild = beadPlateContainer.lastElementChild;
    while (firstChild) {
      beadPlateContainer.removeChild(firstChild); //移除行數
      firstChild = beadPlateContainer.lastElementChild; //抓下一個child
    }
    //2.建立新的八條beadPlate-column，記得包beadPlate-item下要再增加一個空div
    for (let i = 0; i < roadColumns.length; i++) {
      let col = document.createElement("div");
      col.classList.add("beadPlate-column");
      col.classList.add("d-flex");
      col.id = `beadPlate-column-${tableNum}-${i}`;
      for (let i = 0; i < roadRows.length; i++) {
        let colItem = document.createElement("div");
        let itemDiv = document.createElement("div");
        colItem.classList.add("beadPlate-item");
        colItem.classList.add("d-flex");
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
    askRoad,
    showAllRoad,
    resetRoad,
  };
}
