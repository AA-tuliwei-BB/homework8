let newBookRankingCurrentScroll = 0;
let newBookList = [];
function render_2_2(data) {
  data.forEach((element) => {
    let cur = element[0] + "\t" + element.slice(1).join(",");
    newBookList.push(cur);
  });
  //   console.log(newBookList);
  refreshNewBookRanking();
}

function refreshNewBookRanking() {
  let rankingList = document.querySelector("#newBookRankingList");
  let base = newBookRankingCurrentScroll * 3;
  let end = 3;
  if (end > newBookList.length - base) {
    end = newBookList.length - base;
  }
  //   console.log(rankingList.children[0]);
  for (let i = 0; i < end; ++i) {
    rankingList.children[i].textContent = newBookList[base + i];
  }
}
document
  .getElementById("newBookRankingPageUpButton")
  .addEventListener("click", function () {
    if (newBookRankingCurrentScroll === 0) {
      alert("已经到顶了哦~");
    } else {
      --newBookRankingCurrentScroll;
      refreshNewBookRanking();
    }
  });
document
  .getElementById("newBookRankingPageDownButton")
  .addEventListener("click", function () {
    if (newBookRankingCurrentScroll * 3 + 3 >= newBookList.length) {
      alert("已经到底了哦~");
    } else {
      ++newBookRankingCurrentScroll;
      refreshNewBookRanking();
    }
  });
export default render_2_2;
