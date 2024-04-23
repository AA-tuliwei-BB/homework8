function render_1_2(data) {
    console.log('render_1_2', data[0]);
    const date = '2023/9/14';
    let begin = -1, end = 0;
    for (let i = 0; i < data.length; i++) {
        if (begin == -1 && data[i]['logTime'].startsWith(date)) {
            begin = i;
        } else if (begin != -1 && !data[i]['logTime'].startsWith(date)) {
            end = i;
            break;
        }
    }
    render_chart(data.slice(begin, end));

    function render_chart(data) {
        console.log('render_chart 1 2', data);
        // 初始化echarts实例
        const container = document.getElementById('in-library-people-container');
        const content = container.querySelector('.view-content');
        let myChart = echarts.init(content);

        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['闵行校区主馆', '包玉刚图书馆', '李政道图书馆', '徐汇社科阅览室'],
                icon: 'line',
                textStyle: {
                    color: 'rgba(200, 200, 200, 0.8)'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    color: 'rgba(200, 200, 200, 0.8)'
                },
                data: data.map(element => element['logTime'].split(' ')[1])
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'rgba(200, 200, 200, 0.8)'
                },
            },
            series: [
                {
                    name: '闵行校区主馆',
                    type: 'line',
                    showSymbol: false, // 不显示折线图的数据点
                    areaStyle: {}, // 在折线下方添加颜色填充
                    data: data.map(element => element['zg'])
                },
                {
                    name: '李政道图书馆',
                    type: 'line',
                    showSymbol: false, // 不显示折线图的数据点
                    areaStyle: {}, // 在折线下方添加颜色填充
                    data: data.map(element => element['lzd'])
                },
                {
                    name: '包玉刚图书馆',
                    type: 'line',
                    showSymbol: false, // 不显示折线图的数据点
                    areaStyle: {}, // 在折线下方添加颜色填充
                    data: data.map(element => element['byg'])
                },
                {
                    name: '徐汇社科阅览室',
                    type: 'line',
                    showSymbol: false, // 不显示折线图的数据点
                    areaStyle: {}, // 在折线下方添加颜色填充
                    data: data.map(element => element['xhskg'])
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

export default render_1_2;