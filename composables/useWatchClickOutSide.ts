//往後有其他需要點擊自身以外關閉的元素
//直接來這裡添加id即可
const watcherElementsId = ["bet-set-1","bet-set-2"];

export default function useWatchClickOutSide() {
  //基本變數
  const isClickOutSide = ref(false);
  const showMenum = ref(false);

  //監聽
  watch(() => isClickOutSide.value,() => {
      toggleMenumByWatch();
    }
  );

  //方法
  function toggleMenumByWatch() {
    if (isClickOutSide.value) showMenum.value = false;
    else showMenum.value = true;
  }
  function getWatcherElement(id: string) {
    return document.getElementById(id);
  }
  function getWatcherElements() {
    return watcherElementsId.map((id) => {
      return getWatcherElement(id);
    });
  }
  function isClickOutSideHandler(e: Event) {
    const isClickElementSelf = getWatcherElements().some((element) =>
      element?.contains(e.target as Node)
    );
    if (!isClickElementSelf) removeClickOutSideHandler();
  }
  function removeClickOutSideHandler() {
    isClickOutSide.value = true;
    document.body.removeEventListener("click", isClickOutSideHandler);
  }
  function addWatchClickOutsideListener() {
    isClickOutSide.value = false; //重新初始化
    document.body.addEventListener("click", isClickOutSideHandler);
  }

  //暴露的方法
  function toggleMenum() {
    showMenum.value = !showMenum.value;
    if (showMenum.value) addWatchClickOutsideListener();
  }

  return {
    showMenum,
    toggleMenum,
  };
}
