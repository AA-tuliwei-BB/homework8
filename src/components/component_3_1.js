function render_3_1(data) {
    console.log('render_3_1', data[0]);
    let date = '20230914';
    let month = date.slice(4, 6);
    let numBorrow = 0;
    let numReturn = 0;
    let numBorrowOfMonth = Array(32).fill(0);
    let numReturnOfMonth = Array(32).fill(0);
    data.forEach(element => {
        if (element['发生时间'].startsWith(date)) {
            if (element['事件类型'] === '借阅') {
                numBorrow++;
            } else if (element['事件类型'] === '归还'){
                numReturn++;
            }
        }
        if (element['发生时间'].slice(4, 6) === month) {
            if (element['事件类型'] === '借阅') {
                numBorrowOfMonth[parseInt(element['发生时间'].slice(6, 8))] += 1;
            } else if (element['事件类型'] === '归还') {
                numReturnOfMonth[parseInt(element['发生时间'].slice(6, 8))] += 1;
            }
        }
    });
    // get the number of days of month
    let days = new Date(2023, month, 0).getDate();
    renderLeft(numBorrow, numReturn);
    renderRight(numBorrowOfMonth, numReturnOfMonth, days);

    function renderLeft(numBorrow, numReturn) {
        const style = 'font-size: 1.5vh; font-weight: bold; display: inline-block; text-align: center; vertical-align: middle; line-height: 1.5;';
        const fontStyle = 'font-size: 4vh; color: #FFD700; font-weight: bold;';
        const div = document.getElementById('TodayBorrowReturn');
        // 在div下创造borrow和return两个div
        let borrowDiv = document.createElement('div');
        borrowDiv.style = style;
        borrowDiv.innerHTML = `今日借阅次数：<br> <span style='${fontStyle}'>${numBorrow}</span> 次`;
        let tmp = document.createElement('div');
        // tmp 内部元素垂直居中
        tmp.style = 'display: flex; justify-content: space-around; width: 100%; height: 100%; align-items: center;';
        tmp.appendChild(borrowDiv);
        div.appendChild(tmp);
        let returnDiv = document.createElement('div');
        returnDiv.style = style;
        returnDiv.innerHTML = `今日归还次数：<br> <span style='${fontStyle}'>${numReturn}</span> 次`;
        tmp = document.createElement('div');
        // tmp 内部元素垂直居中
        tmp.style = 'display: flex; justify-content: space-around; width: 100%; height: 100%; align-items: center;';
        tmp.appendChild(returnDiv);
        div.appendChild(tmp);
    }

    // renderRight 用当月数据渲染右侧图表，参数为借阅次数数组，归还次数数组，当月天数
    // 函数在bookTrendsChart div上创建并初始化echarts实例，设置图表配置项，显示图表
    function renderRight(numBorrowOfMonth, numReturnOfMonth, days) {
        const container = document.getElementById('bookTrendsChart');
        container.style.width = '100%';
        let myChart = echarts.init(container);

        let option = {
            // 添加标题：本月借还趋势
            title: {
                text: '本月借还趋势',
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: 20,
                    fontWeight: 'bold'
                },
                left: 'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            // 图例不应该与标题碰撞
            legend: {
                top: '12%',
                data: ['借阅次数', '归还次数'],
                icon: 'line',
                textStyle: {
                    color: 'rgba(200, 200, 200, 0.8)'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '24%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    color: 'rgba(200, 200, 200, 0.8)'
                },
                data: Array.from({length: days}, (v, k) => k + 1)
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'rgba(200, 200, 200, 0.8)'
                },
            },
            series: [
                {
                    name: '借阅次数',
                    type: 'line',
                    showSymbol: false,
                    areaStyle: {},
                    data: numBorrowOfMonth.slice(1, days + 1)
                },
                {
                    name: '归还次数',
                    type: 'line',
                    showSymbol: false,
                    areaStyle: {},
                    data: numReturnOfMonth.slice(1, days + 1)
                }
            ]
        };

        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        });
    }
}

export default render_3_1;