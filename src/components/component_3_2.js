function render_3_2(data) {
    console.log('render_3_2', data);
const chartDom = document.getElementById('hot-search-container');
const content = chartDom.querySelector('.view-content');
const myChart = echarts.init(content);
const option = {
    tooltip: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: data.data.map(item => item[0]),
        axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        type: 'custom',
        renderItem: function (params, api) {
            const value = api.value(1);
            const point = api.coord([api.value(0), value]);
            
            // 根据频率值调整六边形大小
            const size = value * 0.8; // 示例大小计算，可根据需要调整

            return {
                type: 'polygon',
                shape: {
                    points: echarts.graphic.clipPointsByRect(makeHexagon(point, size), {
                        x: params.coordSys.x,
                        y: params.coordSys.y,
                        width: params.coordSys.width,
                        height: params.coordSys.height
                    })
                },
                style: api.style({
                    fill: '#3399FF', // 六边形颜色
                    stroke: echarts.color.lift('#3399FF'), // 边框颜色
                    lineWidth: 1 // 边框宽度
                })
            };
        },
        data: data.data
    }]
};

// 绘制六边形的函数
function makeHexagon(center, size) {
    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i + 30);
        const x = center[0] + size * Math.cos(angle);
        const y = center[1] + size * Math.sin(angle);
        points.push([x, y]);
    }
    return points;
}

myChart.setOption(option);
window.addEventListener('resize', function () {
    myChart.resize();
});
}

export default render_3_2;