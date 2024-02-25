import { ref } from "vue";
import { RoadSymbol, RoadType, RoadDomName, type BigEyeRoad, type SmallRoad, type CockroachRoad } from "@/types/roadmap";
import useRoadBase from "@/composables/road/useRoadBase"
export default function useDownThreeRoad(
  roadType: RoadType,
  roadColumns: Array<number>,
  roadRows: Array<number>
) {
  //roadBase
  const { initRoadColArr } = useRoadBase(roadColumns.length, roadRows.length)

  let roadColArr = initRoadColArr(); //大路的Array
  const roadColumn = ref(0); //畫到第幾欄
  const roadItemIndex = ref(0); //畫到第幾格
  const currentRoadResult = ref(0); //現在是哪個陣營
  const lastRoadResult = ref(0); //上次是哪個陣營
  const roadOverFlowerTimes = ref(0); //超出格子幾次
  const addRoadColumnCount = ref(0);
  const lastRoadDataLength = ref(0);
  const lastDataColumnLength = ref(0);
  const askRoadtimer = ref(); //問路的計時器
  const asking = ref(false); //是否在問路中
  
  function getRoadDomName() {
    switch (roadType) {
      case RoadType.M_BIGEYESROAD:
        return RoadDomName.BIGEYESROAD;
      case RoadType.M_SMALLROAD:
        return RoadDomName.SMALLROAD;
      case RoadType.M_COCKROACHROAD:
        return RoadDomName.COCKROACHROAD;
    }
  }
  function getRoadContainerElement() {
    return document.getElementById(`${getRoadDomName()}`) as HTMLElement;
  }
  function putRoad(
    gameResult: number,
    roadmap: CockroachRoad | SmallRoad | BigEyeRoad
  ) {
    let RoadCol = document.getElementById(
      `${getRoadDomName()}-column-${roadColumn.value}`
    ) as HTMLElement;
    let roadColItem = RoadCol.children[roadItemIndex.value]
      .firstChild as HTMLElement;
    switch (gameResult) {
      case RoadSymbol.Banker:
        roadColItem.classList.add(`${getRoadDomName()}-red`);
        break;
      case RoadSymbol.Player:
        roadColItem.classList.add(`${getRoadDomName()}-blue`);
        break;
    }
    roadColArr[roadColumn.value][roadItemIndex.value] = 1; //代表那一格已經畫過了
    roadItemIndex.value++; //增加當前的index
    lastRoadResult.value = currentRoadResult.value; //將這次陣營記錄到下一次的陣營中
    const roadmapColumns = roadmap.columns;
    const preColumnsBlocks = roadmapColumns[roadmapColumns?.length! - 1].blocks!;
    lastRoadDataLength.value = preColumnsBlocks.length;
    lastDataColumnLength.value = roadmapColumns?.length!;
    // console.log("現在是第",roadColumn.value,"行；","下一格格子",roadItemIndex.value)
  }
  function recordRoad(gameResult: number) {
    switch (gameResult) {
      case RoadSymbol.Banker:
        currentRoadResult.value = RoadSymbol.Banker;
        break;
      case RoadSymbol.Player:
        currentRoadResult.value = RoadSymbol.Player;
        break;
    }
  }
  function addRoadCoulmn() {
    let Road = getRoadContainerElement()!;
    let firstChild = Road.firstElementChild as HTMLElement; //抓取第一個元素
    Road.removeChild(firstChild); //刪除第一行
    let newCol = document.createElement("div");
    newCol.classList.add(`${getRoadDomName()}-column`);
    newCol.id = `${getRoadDomName()}-column-${roadColumn.value}`;
    newCol.classList.add("border-[1px]")
    for (let i = 0; i < roadRows.length; i++) {
      let newColItem = document.createElement("div");
      let itemDiv = document.createElement("div");
      newColItem.classList.add(`${getRoadDomName()}-item`);
      newColItem.classList.add("flex");
      newColItem.classList.add(`${getRoadDomName()}-item${i}`);
      newColItem.classList.add("border-[1px]")
      newColItem.classList.add("justify-center")
      newColItem.classList.add("items-center")
      newColItem.appendChild(itemDiv);
      newCol.appendChild(newColItem);
    }
    //貼上去
    Road.appendChild(newCol);
    //記得也要增加bigRoadArr
    roadColArr.push([0, 0, 0, 0, 0, 0]);
    // console.log("加了一行","行",cockroachRoadColumn.value)
    addRoadColumnCount.value++;
    // roadOverFlowerTimes.value++
  }
  function resetRoad() {
    //1.直接刪除所有column
    let RoadColContainer = getRoadContainerElement()!;
    let lastChild = RoadColContainer.lastElementChild;
    while (lastChild) {
      RoadColContainer.removeChild(lastChild); //移除行數
      lastChild = RoadColContainer.lastElementChild; //抓下一個child
    }
    //2.建立新的四十四條col
    for (let i = 0; i < roadColumns.length; i++) {
      let col = document.createElement("div");
      col.classList.add(`${getRoadDomName()}-column`);
      col.classList.add("flex");
      col.classList.add("border-[1px]")
      col.id = `${getRoadDomName()}-column-${i}`;
      for (let i = 0; i < roadRows.length; i++) {
        let colItem = document.createElement("div");
        let itemDiv = document.createElement("div");
        colItem.classList.add(`${getRoadDomName()}-item`);
        colItem.classList.add("flex");
        colItem.classList.add(`${getRoadDomName()}-item${i}`);
        colItem.classList.add("border-[1px]")
        colItem.classList.add("justify-center")
        colItem.classList.add("items-center")
        colItem.appendChild(itemDiv);
        col.appendChild(colItem);
      }
      RoadColContainer.appendChild(col);
    }
    //3.計數器規0
    roadColumn.value = 0;
    roadItemIndex.value = 0;
    currentRoadResult.value = 0;
    lastRoadResult.value = 0;
    roadOverFlowerTimes.value = 0;
    addRoadColumnCount.value = 0;
    //大路陣列也要規0
    roadColArr = initRoadColArr();
    // console.log('先reset路圖',getRoadContainerElement())
  }
  function showRoad(
    roadNum: number,
    road: CockroachRoad | SmallRoad | BigEyeRoad
  ) {
    recordRoad(roadNum);
    if (
      currentRoadResult.value !== lastRoadResult.value &&
      currentRoadResult.value !== 0 &&
      lastRoadResult.value !== 0
    ) {
      // console.log("換陣營前","行",cockroachRoadColumn.value,"格",cockroachRoadItemIndex.value)
      if (roadOverFlowerTimes.value != 0) {
        //第一次恢復的時候
        if (roadItemIndex.value - 1 < 1) {
          //因為上一次已經被+過了，要減回來
          roadColumn.value++;
          // console.log("在第0格滿出，直接+行數","行",cockroachRoadColumn.value)
          roadOverFlowerTimes.value = 0;
        } else {
          roadColumn.value = roadColumn.value - roadOverFlowerTimes.value + 1;
          roadOverFlowerTimes.value = 0;
        }
        // console.log("溢出後恢復","行",cockroachRoadColumn.value)
      } else {
        roadColumn.value++;
      }
      if (
        roadColumn.value >=
        roadColumns.length + (roadColArr.length - roadColumns.length)
      ) {
        //溢出極限格子的時候要增加行數
        // console.log("滿了+行")
        addRoadCoulmn();
      }
      roadItemIndex.value = 0;
      // console.log("格",cockroachRoadItemIndex.value)
    }
    //換行二:溢出換行
    //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
    //溢出時如果遇到和局，其實不需要+行?!
    if (
      roadColArr[roadColumn.value][roadItemIndex.value] !== 0 ||
      roadItemIndex.value > roadRows.length - 1
    ) {
      // console.log("連贏溢出")
      roadColumn.value++; //換行
      //和局時不會進下面的addBigRoad
      if (
        roadColumn.value >=
        roadColumns.length + (roadColArr.length - roadColumns.length)
      ) {
        //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
        addRoadCoulmn();
      } //溢出極限格子的時候要增加行數
      if (roadItemIndex.value > 0) {
        //在第0格以上才要-1
        roadItemIndex.value = roadItemIndex.value - 1;
      }
      roadOverFlowerTimes.value++;
      // console.log("連贏溢出","行",cockroachRoadColumn.value,"格",cockroachRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
      for (let i = roadItemIndex.value; i < roadRows.length; i++) {
        //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
        roadColArr[roadColumn.value][i] = 1;
      }
    }
    putRoad(roadNum, road);
  }
  function showAllRoad(
    road: CockroachRoad | SmallRoad | BigEyeRoad
  ) {
    road.columns?.forEach((item: any) => {
      item.blocks.forEach((i: any) => showRoad(i.symbol, road));
    });
    // console.log('全劃路圖')
  }
  function askRoad(
    roadmap: CockroachRoad | SmallRoad | BigEyeRoad,
    askRoadSymbol: number
  ) {
    asking.value = true;
    //1.先清除計時器
    if (askRoadtimer.value) {
      clearTimeout(askRoadtimer.value);
    }
    //2.重置路圖
    resetRoad();
    showAllRoad(roadmap);
    //3.放置問路
    // let roadNum = askRoadSymbol?.cockroachRoadNext?.symbol!;
    showRoad(askRoadSymbol, roadmap);
    //4.添加動畫
    let column = document.getElementById(
      `${getRoadDomName()}-column-${roadColumn.value}`
    ) as HTMLElement;
    let road: HTMLElement;
    if (roadItemIndex.value > 0) {
      road = column.children[roadItemIndex.value - 1].firstChild as HTMLElement;
    } else {
      road = column.children[roadItemIndex.value].firstChild as HTMLElement;
    }
    road.classList.add("askRoadanimation");
    //5.畫完之後等二秒就reset路圖，並重新畫
    askRoadtimer.value = setTimeout(() => {
      resetRoad();
      showAllRoad(roadmap);
      road.classList.remove("askRoadanimation");
      asking.value = false;
    }, 2000);
  }
  return {
    showAllRoad,
    resetRoad,
    askRoad,
  };
}
