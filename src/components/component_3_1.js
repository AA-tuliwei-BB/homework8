function render_3_1(data03,data04) {
console.log('render_3_1', data03);
console.log('render_3_1', data04);
// 渲染新书榜单模块
const container1 = document.getElementById('new-books-rank-container').querySelector('.view-content');
    const table1 = document.createElement('table');
    table1.className = 'new-books-table';

    // Create table header
    const thead1= document.createElement('thead');
    const headerRow1 = document.createElement('tr');
    data04.columns.slice(0, -1).forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        headerRow1.appendChild(th);
    });
    thead1.appendChild(headerRow1);
    table1.appendChild(thead1);

    // Create table rows
    const tbody1 = document.createElement('tbody');
    data04.data.slice(0, 5).forEach(row => {
        const tr = document.createElement('tr');
        row.slice(0, -1).forEach(cell => {
            const td = document.createElement('td');

            td.textContent = cell;
            tr.appendChild(td);
            
        });
        tbody1.appendChild(tr);
    });
    table1.appendChild(tbody1);

    // Append the table to the container
    container1.appendChild(table1);

// 渲染检索热度模块
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
        data: data03.data.map(item => item[0]),
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
        data: data03.data
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
export default render_3_1;