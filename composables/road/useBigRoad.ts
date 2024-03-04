import { RoadType, RoadDomName, RoadSymbol, type BigRoad } from "@/types/roadmap";
import useRoadBase from "@/composables/road/useRoadBase";

export default function useDownThreeRoad(
  roadType: RoadType,
  roadColumns: Array<number>,
  roadRows: Array<number>
) {
  //roadBase
  const { initRoadColArr } = useRoadBase(roadColumns.length, roadRows.length);
  //基本資料
  let roadColArr = initRoadColArr(); //大路的Array
  const roadColumn = ref(0); //畫到第幾欄
  const roadItemIndex = ref(0); //畫到第幾格
  const currentroadResult = ref(0); //現在是哪個陣營
  const lastRoadResult = ref(0); //上次是哪個陣營
  const roadOverFlowerTimes = ref(0); //超出格子幾次
  const bigRoadTie = ref(false); //是否有和局狀態
  const addRoadColumnCount = ref(0);
  //問路相關
  const timer = ref();
  const asking = ref(false); //是否在問路中

  //方法
  function getRoadDomName() {
    switch (roadType) {
      case RoadType.M_BIGROAD:
        return RoadDomName.M_BIGROAD;
      case RoadType.T_BIGROAD:
        return RoadDomName.T_BIGROAD;
    }
  }
  function getRoadContainerElement() {
    return document.getElementById(`${getRoadDomName()}`) as HTMLElement;
  }
  function recordBigRoad(gameResult: number) {
    switch (gameResult) {
      case RoadSymbol.Banker:
      case RoadSymbol.BankerAndBankerPair:
      case RoadSymbol.BankerAndPlayerPair:
      case RoadSymbol.BankerAndBothPair:
      case RoadSymbol.BankerAndTie:
      case RoadSymbol.BankerAndBankerPairAndTie:
      case RoadSymbol.BankerAndPlayerPairAndTie:
      case RoadSymbol.BankerAndBothPairAndTie:
        currentroadResult.value = 1;
        break;
      case RoadSymbol.Player:
      case RoadSymbol.PlayerAndBankerPair:
      case RoadSymbol.PlayerAndPlayerPair:
      case RoadSymbol.PlayerAndBothPair:
      case RoadSymbol.PlayerAndTie:
      case RoadSymbol.PlayerAndBankerPairAndTie:
      case RoadSymbol.PlayerAndPlayerPairAndTie:
      case RoadSymbol.PlayerAndBothPairAndTie:
        currentroadResult.value = 2;
        break;
    }
  }
  function putBigRoad(gameResult: number, tieCount: number) {
    let bigRoadCol = document.getElementById(
      `${getRoadDomName()}-column-${roadColumn.value}`
    ) as HTMLElement;
    if (!bigRoadCol) return;
    let bigRoadColItem = bigRoadCol.children[roadItemIndex.value]
      .firstChild as HTMLElement;
    switch (gameResult) {
      case RoadSymbol.Tie:
        bigRoadColItem.classList.add("big-T");
        break;
      case RoadSymbol.Banker:
        bigRoadColItem.classList.add("big-B");
        break;
      case RoadSymbol.Player:
        bigRoadColItem.classList.add("big-P");
        break;
      case RoadSymbol.BankerAndBankerPair:
        bigRoadColItem.classList.add("big-B-BPair");
        break;
      case RoadSymbol.BankerAndPlayerPair:
        bigRoadColItem.classList.add("big-B-PPair");
        break;
      case RoadSymbol.BankerAndBothPair:
        bigRoadColItem.classList.add("big-B-BothPair");
        break;
      case RoadSymbol.PlayerAndBankerPair:
        bigRoadColItem.classList.add("big-P-BPair");
        break;
      case RoadSymbol.PlayerAndPlayerPair:
        bigRoadColItem.classList.add("big-P-PPair");
        break;
      case RoadSymbol.PlayerAndBothPair:
        bigRoadColItem.classList.add("big-P-BothPair");
        break;
      case RoadSymbol.BankerAndTie:
        if (bigRoadColItem.classList[0]) {
          bigRoadColItem.classList.replace(
            bigRoadColItem.classList[0],
            "big-BT"
          );
        } else {
          bigRoadColItem.classList.add("big-BT");
        }
        break;
      case RoadSymbol.BankerAndBankerPairAndTie:
        if (bigRoadColItem.classList[0]) {
          bigRoadColItem.classList.replace(
            bigRoadColItem.classList[0],
            "big-BT-BPair"
          );
        } else {
          bigRoadColItem.classList.add("big-BT-BPair");
        }
        break;
      case RoadSymbol.BankerAndPlayerPairAndTie:
        if (bigRoadColItem.classList[0]) {
          bigRoadColItem.classList.replace(
            bigRoadColItem.classList[0],
            "big-BT-PPair"
          );
        } else {
          bigRoadColItem.classList.add("big-BT-PPair");
        }
        break;
      case RoadSymbol.BankerAndBothPairAndTie:
        if (bigRoadColItem.classList[0]) {
          bigRoadColItem.classList.replace(
            bigRoadColItem.classList[0],
            "big-BT-BothPair"
          );
        } else {
          bigRoadColItem.classList.add("big-BT-BothPair");
        }
        break;
      case RoadSymbol.PlayerAndTie:
        if (bigRoadColItem.classList[0]) {
          bigRoadColItem.classList.replace(
            bigRoadColItem.classList[0],
            "big-PT"
          );
        } else {
          bigRoadColItem.classList.add("big-PT");
        }
        break;
      case RoadSymbol.PlayerAndBankerPairAndTie:
        if (bigRoadColItem.classList[0]) {
          bigRoadColItem.classList.replace(
            bigRoadColItem.classList[0],
            "big-PT-BPair"
          );
        } else {
          bigRoadColItem.classList.add("big-PT-BPair");
        }
        break;
      case RoadSymbol.PlayerAndPlayerPairAndTie:
        if (bigRoadColItem.classList[0]) {
          bigRoadColItem.classList.replace(
            bigRoadColItem.classList[0],
            "big-PT-PPair"
          );
        } else {
          bigRoadColItem.classList.add("big-PT-PPair");
        }
        break;
      case RoadSymbol.PlayerAndBothPairAndTie:
        if (bigRoadColItem.classList[0]) {
          bigRoadColItem.classList.replace(
            bigRoadColItem.classList[0],
            "big-PT-BothPair"
          );
        } else {
          bigRoadColItem.classList.add("big-PT-BothPair");
        }
        break;
    }
    if (tieCount > 0) {
      //貼上和局的數字
      let tienumber = document.createElement("div");
      tienumber.classList.add(`tie${tieCount}`);
      bigRoadColItem.appendChild(tienumber);
    }
    roadColArr[roadColumn.value][roadItemIndex.value] = 1; //代表那一格已經畫過了
    roadItemIndex.value++; //增加當前的index
    lastRoadResult.value = currentroadResult.value; //將這次陣營記錄到下一次的陣營中
    // console.log("現在是第",bigRoadCol,"行；","下一格格子",roadItemIndex.value)
  }
  function showRoad(gameResult: number, tieCount: number) {
    recordBigRoad(gameResult); //1.紀錄陣營
    //換行一:不同陣營
    if (
      currentroadResult.value !== lastRoadResult.value &&
      currentroadResult.value !== 0 &&
      lastRoadResult.value !== 0
    ) {
      // console.log("換陣營前","行",bigRoadColumn.value,"格",bigRoadItemIndex.value)
      if (roadOverFlowerTimes.value != 0) {
        //第一次恢復的時候
        if (roadItemIndex.value - 1 < 1) {
          //因為上一次已經被+過了，要減回來
          roadColumn.value++;
          // console.log("在第0格滿出，直接+行數","行",bigRoadColumn.value)
          roadOverFlowerTimes.value = 0;
        } else {
          roadColumn.value = roadColumn.value - roadOverFlowerTimes.value + 1;
          roadOverFlowerTimes.value = 0;
        }
        // console.log("溢出後恢復","行",bigRoadColumn.value)
      } else {
        roadColumn.value++;
      }
      if (
        roadColumn.value >=
        roadColumns.length + (roadColArr.length - roadColumns.length)
      ) {
        //溢出極限格子的時候要增加行數
        // console.log("滿了+行")
        addBigRoadColumn();
      }
      roadItemIndex.value = 0;
      //  console.log("格",bigRoadItemIndex.value)
    }
    //換行二:溢出換行
    //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
    //溢出時如果遇到和局，其實不需要+行?!
    if (
      roadColArr[roadColumn.value][roadItemIndex.value] !== 0 ||
      roadItemIndex.value > roadRows.length - 1
    ) {
      // console.log("連贏溢出")
      if (!bigRoadTie.value) {
        //不是和局時，才要+行
        roadColumn.value++; //換行
      }
      //和局時不會進下面的addBigRoad
      if (
        roadColumn.value >=
        roadColumns.length + (roadColArr.length - roadColumns.length)
      ) {
        //不可以固定監測，因為+了格子之後總行數也變多，必須+一個"增加的行數"
        addBigRoadColumn();
      } //溢出極限格子的時候要增加行數
      if (roadItemIndex.value > 0) {
        //在第0格以上才要-1
        roadItemIndex.value = roadItemIndex.value - 1;
      }
      roadOverFlowerTimes.value++;
      // console.log("連贏溢出","行",bigRoadColumn.value,"格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
      for (let i = roadItemIndex.value; i < roadRows.length; i++) {
        //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
        roadColArr[roadColumn.value][i] = 1;
      }
    }
    putBigRoad(gameResult, tieCount);
  }
  function showAllRoad(road: BigRoad) {
    road!.columns!.forEach((i: any) => {
      // console.log(i.blocks) //初始化時所有都畫
      i.blocks.forEach((item: any) => {
        showRoad(item.symbol, item.tieCount);
      });
    });
  }
  function addBigRoadColumn() {
    //滿格時一次增加一格的方法
    let bigRoad = getRoadContainerElement()!
    let firstChild = bigRoad.firstElementChild as HTMLElement; //抓取第一個元素
    bigRoad.removeChild(firstChild); //刪除第一行
    let newCol = document.createElement("div");
    newCol.classList.add("bigRoad-column");
    newCol.classList.add("border-[1px]")
    newCol.classList.add("border-slate-900")
    newCol.id = `${getRoadDomName()}-column-${roadColumn.value}`;
    for (let i = 0; i < roadRows.length; i++) {
      let newColItem = document.createElement("div");
      let itemDiv = document.createElement("div");
      newColItem.classList.add("bigRoad-item");
      newColItem.classList.add("border-[1px]")
      newColItem.classList.add("border-slate-900")
      newColItem.classList.add("flex");
      newColItem.classList.add(`bigRoad-item${i}`);
      newColItem.appendChild(itemDiv);
      newCol.appendChild(newColItem);
    }
    //貼上去
    bigRoad.appendChild(newCol);
    //記得也要增加bigRoadArr
    roadColArr.push([0, 0, 0, 0, 0, 0]);
    addRoadColumnCount.value++;
    // roadOverFlowerTimes.value++
  }
  function resetRoad() {
    //1.直接刪除所有的column
    let bigRoadColContainer = getRoadContainerElement()!;
    let lastChild = bigRoadColContainer.lastElementChild;
    while (lastChild) {
      bigRoadColContainer.removeChild(lastChild); //移除行數
      lastChild = bigRoadColContainer.lastElementChild; //抓下一個child
    }
    //2.建立新的n條col
    for (let i = 0; i < roadColumns.length; i++) {
      let col = document.createElement("div");
      col.classList.add("bigRoad-column");
      col.classList.add("border-[1px]")
      col.classList.add("border-slate-500")
      col.classList.add("flex");
      col.id = `${getRoadDomName()}-column-${i}`;
      for (let i = 0; i < roadRows.length; i++) {
        let colItem = document.createElement("div");
        let itemDiv = document.createElement("div");
        colItem.classList.add("bigRoad-item");
        colItem.classList.add("border-[1px]")
        colItem.classList.add("border-slate-500")
        colItem.classList.add("flex");
        colItem.classList.add(`bigRoad-item${i}`);
        colItem.appendChild(itemDiv);
        col.appendChild(colItem);
      }
      bigRoadColContainer.appendChild(col);
    }
    //3.計數器規0
    roadColumn.value = 0;
    roadItemIndex.value = 0;
    currentroadResult.value = 0;
    lastRoadResult.value = 0;
    roadOverFlowerTimes.value = 0;
    addRoadColumnCount.value = 0;
    //大路陣列也要規0
    let newbigRoadArr = [];

    for (let i = 0; i < roadColumns.length; i++) {
      //初始化大路陣列
      newbigRoadArr[i] = [0, 0, 0, 0, 0, 0];
    }
    roadColArr = newbigRoadArr;
    bigRoadTie.value = false;
  }
  function askRoad(roadmap:BigRoad,askRoadResult:number){
    asking.value = true;
    //1.先清除計時器
    if (timer.value) {
      clearTimeout(timer.value);
    }
    //2.重置路圖
    resetRoad();
    showAllRoad(roadmap);
    //3.放置問路
    showRoad(askRoadResult,0); //問路只有莊閒，不需要莊的數字
    //4.添加動畫
    let column = document.getElementById(
      `bigRoad-column-${roadColumn.value}`
    ) as HTMLElement;
    let road: HTMLElement;
    if (roadItemIndex.value > 0) {
      road = column.children[roadItemIndex.value - 1]
        .firstChild as HTMLElement;
    } else {
      road = column.children[roadItemIndex.value].firstChild as HTMLElement;
    }
    road.classList.add("askRoadanimation");
    //5.畫完之後等二秒就reset路圖，並重新畫
    timer.value = setTimeout(() => {
      resetRoad();
      showAllRoad(roadmap);
      road.classList.remove("askRoadanimation");
      asking.value = false;
    }, 2000);
  }

  return {
    showAllRoad,
    resetRoad,
    askRoad
  };
}
