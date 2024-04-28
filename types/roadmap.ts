export interface Roadmap {
  totalRoad:BigRoad | null //目前和大路是一模一樣的
  beadPlate: BeadPlate | null;
  bigRoad: BigRoad | null;
  bigEyeRoad: BigEyeRoad | null;
  smallRoad: SmallRoad | null;
  cockroachRoad: CockroachRoad | null;
}
export enum PatternSelector{
  SELECTOR1 = "1",
  SELECTOR2 = "2"
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
export interface RoadBlock {
  symbol: RoadSymbol;
  tieCount: number | null;
  result:number
}
export interface RoadColumn {
  blocks?: RoadBlock[] | null;
  result:number
}
//M : 主要路圖
//T : 統計路圖
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
  T_BIGROAD_COUNT = "bigRoad-total-count", //合計大路圖的統計欄位
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
export interface DrawRoadRespon {
  roadmaps:Roadmap,
  result_counter:{
    BigRoadCounts:RoadResultCounter,
    BigEyeRoadCounts:RoadResultCounter,
    SmallRoadCounts:RoadResultCounter
    CockroachRoadCounts:RoadResultCounter
  }
  predictions:Predictions
}
export interface RestoreRoadRespon {
  roadmaps:Roadmap,
  result_counter:{
    BigRoadCounts:RoadResultCounter,
    BigEyeRoadCounts:RoadResultCounter,
    SmallRoadCounts:RoadResultCounter
    CockroachRoadCounts:RoadResultCounter
  }
  predictions:Predictions
}
export interface RoadResultCounter{
  TieCount:number
  PlayerCount:number
  BankerCount:number
}
export interface Predictions{
    totalRoad: RoadPrediction,
    bigRoad:RoadPrediction,
    bigEyeRoad: RoadPrediction
    smallRoad: RoadPrediction
    cockroachRoad:RoadPrediction
}
export interface RoadPrediction{
  bet:number,  //下局注碼
  betArea:BetArea //下局預測
}
export enum BetArea{
  BANKER = 1,
  PLAYER = 2
}
export interface RoadCounter{
  total:number,
  win:number
}
export interface UpdateRoadMapPatternsRequest{
  pattern1:string,
  pattern2:string
}
export interface RoadMapPatterns{
 "1":string,
 "2":string
}
