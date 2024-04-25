document.getElementById("yearButton").addEventListener("click", function () {
  document.getElementById("rankingTime").textContent = "2023年";
  refreshBorrowingRank(0);
});
document.getElementById("seasonButton").addEventListener("click", function () {
  document.getElementById("rankingTime").textContent = "2023年第四季度";
  refreshBorrowingRank(1);
});

document.getElementById("monthButton").addEventListener("click", function () {
  document.getElementById("rankingTime").textContent = "2023年12月";
  refreshBorrowingRank(2);
});
document.getElementById("weekButton").addEventListener("click", function () {
  document.getElementById("rankingTime").textContent = "2023年12月第五周";
  refreshBorrowingRank(3);
});

let borrowingRankMode2Array = [];
function render_2_1(data) {
  let borrowingRankWeekMap = new Map();
  let borrowingRankYearMap = new Map();
  let borrowingRankMonthMap = new Map();
  let borrowingRankSeasonMap = new Map();
  data.forEach((element) => {
    let key = element["图书书名"] + "," + element["著者"];
    if (element["事件类型"] === "借阅" && element["著者"] !== null) {
      if (parseInt(element["发生时间"]) > 20230000) {
        if (borrowingRankYearMap.has(key)) {
          borrowingRankYearMap.set(key, borrowingRankYearMap.get(key) + 1);
        } else {
          borrowingRankYearMap.set(key, 1);
        }
      }

      if (parseInt(element["发生时间"]) > 20230900) {
        if (borrowingRankSeasonMap.has(key)) {
          borrowingRankSeasonMap.set(key, borrowingRankSeasonMap.get(key) + 1);
        } else {
          borrowingRankSeasonMap.set(key, 1);
        }
      }
      if (parseInt(element["发生时间"]) > 20231224) {
        if (borrowingRankWeekMap.has(key)) {
          borrowingRankWeekMap.set(key, borrowingRankWeekMap.get(key) + 1);
        } else {
          borrowingRankWeekMap.set(key, 1);
        }
      }
      if (parseInt(element["发生时间"]) > 20231200) {
        if (borrowingRankMonthMap.has(key)) {
          borrowingRankMonthMap.set(key, borrowingRankMonthMap.get(key) + 1);
        } else {
          borrowingRankMonthMap.set(key, 1);
        }
      }
    }
  });

  function getTop(map, k) {
    const entries = Array.from(map.entries());
    entries.sort((a, b) => b[1] - a[1]);
    // console.log(entries);

    const topK = entries.slice(0, k);
    return topK;
  }
  borrowingRankMode2Array = [
    getTop(borrowingRankYearMap, 4),
    getTop(borrowingRankSeasonMap, 4),
    getTop(borrowingRankMonthMap, 4),
    getTop(borrowingRankWeekMap, 4),
  ];

  document.getElementById("rankingTime").textContent = "2023年";
  refreshBorrowingRank(0);
}
function refreshBorrowingRank(mode) {
  let curMap = borrowingRankMode2Array[mode];
  let list = document.getElementById("rankingList").children;
  for (let i = 0; i < 4; ++i) {
    let pair = curMap[i][0].split(",");
    // console.log(pair);
    list[i].querySelector(".bookName").textContent = pair[0];
    list[i].querySelector(".author").textContent = pair[1];
  }
}
export default render_2_1;
