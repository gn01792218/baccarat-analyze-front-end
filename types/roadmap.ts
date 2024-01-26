
export interface BeadPlate {
  blocks: RoadBlock[] | null;
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
//G : 遊戲路圖
//T : 大廳桌牌路圖
//H : 熱門牌桌路圖
//S : 切桌路圖
export enum RoadType {
  G_BEADPLATE,
  G_BIGROAD,
  G_BIGEYESROAD,
  G_SMALLROAD,
  G_COCKROACHROAD,
  T_BEADPLATE,
  T_BIGROAD,
  T_BIGEYESROAD,
  T_SMALLROAD,
  T_COCKROACHROAD,
  H_BIGROAD,
  S_BIGROAD,
}
//各種路圖的DOM元素使用的名稱
//以後要修改class或id名稱，只需要修改這裡以及css檔案
//無須修改vue檔案裏頭的template元素
export enum RoadDomName {
  BEADPLATE = "beadPlat",
  G_BIGROAD = "bigRoad",
  T_BIGROAD = "table-bigRoad",
  H_BIGROAD = "hotTable-bigRoad",
  S_BIGROAD = "switchTable-bigRoad",
  BIGEYESROAD = "bigEyesRoad",
  SMALLROAD = "smallRoad",
  COCKROACHROAD = "cockroachRoad",
}
