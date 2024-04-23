function render_1_1(data02, data01) {
    console.log('render_1_1', data02[0]);
    const count01 = new Map();
    const count02 = new Map();
    data01.forEach(element => {
        if (element['学院'] && element['事件类型'] === '借阅' && element['发生时间'].startsWith('2023')) {
            count01.set(element['学院'], (count01.get(element['学院']) || 0) + 1);
        }
    });
    data02.forEach(element => {
        if (element['Department'] && element['EventDate'].endsWith('2023')) {
            count02.set(element['Department'], (count02.get(element['Department']) || 0) + 1);
        }
    });
    render_chart(getTop(count02, 5), count01);

    function getTop(map, k) {
        const entries = Array.from(map.entries());
        entries.sort((a, b) => b[1] - a[1]);
        const topK = entries.slice(0, k);
        const topKMap = new Map(topK);
        return topKMap;
    }

    function render_chart(data, count01) {
        console.log('render_chart', data);
        console.log('render_chart', count01);
        // 初始化echarts实例
        const container = document.getElementById('reader-distribution-container');
        const content = container.querySelector('.view-content');
        let myChart = echarts.init(content);

        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['入馆人数', '借阅量']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '12%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: Array.from(data.keys()).reverse()
            },
            series: [
                {
                    name: '入馆人数',
                    type: 'bar',
                    data: Array.from(data.values()).reverse()
                },
                {
                    name: '借阅量',
                    type: 'bar',
                    data: Array.from(data.keys()).reverse().map(key => count01.get(key) || 0)
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        // 窗口大小改变时，重置图表大小
        window.addEventListener('resize', function () {
            myChart.resize();
        });
    }
}

export default render_1_1;