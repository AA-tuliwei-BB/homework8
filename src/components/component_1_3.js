function render_1_3(data) {
    console.log('render_1_3', data[0]);
    const count = new Map();
    data.forEach(element => {
        if (element['身份'] && element['事件类型'] === '借阅' && element['发生时间'].startsWith('2023')) {
            count.set(element['身份'].trim(), (count.get(element['身份'].trim()) || 0) + 1);
        }
    });
    render_chart(count);

    function render_chart(data) {
        // 初始化echarts实例
        const container = document.getElementById('reader-profile-container');
        const content = container.querySelector('.view-content');
        let myChart = echarts.init(content);

        // 指定图表的配置项和数据
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                top: '25%',
                left: '70%',
                right: 'left',
                formatter: function (name) {
                    // 在这里我们通过 name 参数找到对应数据项的 value
                    return `${name}\t${data.get(name)}人`;
                }
            },
            series: [
                {
                    name: '读者身份',
                    type: 'pie',
                    radius: '70%', // 饼图的半径
                    center: ['40%', '50%'], // 饼图的中心（水平，垂直位置）
                    data: Array.from(data.keys()).map(element => {
                        return { value: data.get(element), name: element}
                    }),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
}

export default render_1_3;