export default function useRoadBase(
  roadColumns: number,
  roadRows: number
) {
  function initRoadColArr() {
    let newArr = new Array<number[]>(roadColumns);
    for( let i = 0 ; i< newArr.length ; i++){
        newArr[i] = new Array(roadRows)
        newArr[i] = newArr[i].fill(0)
    }
    return newArr;
  }
  return {
    initRoadColArr,
  };
}
