function render_2_3(data) {
  let peopleCount = new Array(29).fill(0);
  let bookTime = new Array(29).fill(0);
  const getMonthIndex = (time) =>
    time.getMonth() - 11 + (time.getFullYear() - 2021) * 12;

  data.forEach((element) => {
    let startTime = new Date(element[0]);
    let monthIndex = getMonthIndex(startTime);
    peopleCount[monthIndex]++;
    bookTime[monthIndex] += (element[1] - element[0]) / 3600000;
  });
  function generateDateRange(startYear, startMonth, endYear, endMonth) {
    let dateList = [];
    let currentYear = startYear;
    let currentMonth = startMonth;

    while (
      currentYear < endYear ||
      (currentYear === endYear && currentMonth <= endMonth)
    ) {
      let dateString = currentYear + "年" + currentMonth + "月";
      dateList.push(dateString);

      // 增加月份，如果月份达到了12，则增加年份，并重置月份为1
      if (currentMonth === 12) {
        currentYear++;
        currentMonth = 1;
      } else {
        currentMonth++;
      }
    }

    return dateList;
  }

  // 调用函数生成日期范围
  let startDate = { year: 2021, month: 11 };
  let endDate = { year: 2024, month: 3 };
  let dateRange = generateDateRange(
    startDate.year,
    startDate.month,
    endDate.year,
    endDate.month
  );

  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter:"{b}<br />{a0}: {c0}人<br />{a1}: {c1}小时"
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "20%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: dateRange,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          textStyle: {
            color: "#ffffff",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: "#ffffff",
          },
        },
      },
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: "#ffffff",
          },
        },
      },
    ],
    legend: {
      data: ["预约人数", "预约时长"],
      textStyle: {
        color: "#ffffff",
      },
    },
    series: [
      {
        name: "预约人数",
        type: "bar",
        barWidth: "60%",
        yAxisIndex: 0,
        data: peopleCount,
      },
      {
        name: "预约时长",
        type: "line",

        smooth: true,
        yAxisIndex: 1,
        data: bookTime,
      },
    ],
  };
  let container = document.getElementById("co-working-space-container");
  let chartContainer = container.querySelector(".view-content");
  let myChart = echarts.init(chartContainer);
  myChart.setOption(option);

  // 窗口大小改变时，重置图表大小
  window.addEventListener("resize", function () {
    myChart.resize();
  });
}

export default render_2_3;
