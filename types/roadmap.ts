export interface Roadmap {
  beadPlate: BeadPlate | null;
  bigRoad: BigRoad | null;
  bigEyeRoad: BigEyeRoad | null;
  smallRoad: SmallRoad | null;
  cockroachRoad: CockroachRoad | null;
}
export interface BeadPlate {
  blocks: RoadBlock[] | null;
}
export interface BigRoad {
  columns: RoadColumn[] | null;
}
export interface BigEyeRoad {
  columns: RoadColumn[] | null;
}
export interface SmallRoad {
  columns: RoadColumn[] | null;
}
export interface CockroachRoad {
  columns: RoadColumn[] | null;
}

export enum RoadSymbol {
  BlockDefault = 0,
  Banker = 1,
  Player = 2,
  Tie = 3,
  BankerAndBankerPair = 4,
  BankerAndPlayerPair = 5,
  BankerAndBothPair = 6,
  PlayerAndBankerPair = 7,
  PlayerAndPlayerPair = 8,
  PlayerAndBothPair = 9,
  TieAndBankerPair = 10,
  TieAndPlayerPair = 11,
  TieAndBothPair = 12,
  BankerAndTie = 13,
  BankerAndBankerPairAndTie = 14,
  BankerAndPlayerPairAndTie = 15,
  BankerAndBothPairAndTie = 16,
  PlayerAndTie = 17,
  PlayerAndBankerPairAndTie = 18,
  PlayerAndPlayerPairAndTie = 19,
  PlayerAndBothPairAndTie = 20,
}
interface RoadBlock {
  symbol: RoadSymbol;
  tieCount: number | null;
}
interface RoadColumn {
  blocks?: RoadBlock[] | null;
}
//M : 主要路圖
export enum RoadType {
  M_BEADPLATE,
  M_BIGROAD,
  T_BIGROAD,
  M_BIGEYESROAD,
  M_SMALLROAD,
  M_COCKROACHROAD,
}
//各種路圖的DOM元素使用的名稱
//以後要修改class或id名稱，只需要修改這裡以及css檔案
//無須修改vue檔案裏頭的template元素
export enum RoadDomName {
  BEADPLATE = "beadPlat",
  M_BIGROAD = "bigRoad-main", //主要大路
  T_BIGROAD = "bigRoad-total", //合計大路圖
  BIGEYESROAD = "bigEyesRoad",
  SMALLROAD = "smallRoad",
  COCKROACHROAD = "cockroachRoad",
}
export interface RoadInitRequest {
  name: string; //目前名稱隨意帶就好
}
export interface DrawRoadRequest {
  result: RoadSymbol;
}
