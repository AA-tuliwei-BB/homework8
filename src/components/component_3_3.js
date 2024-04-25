function render_3_3(rawData) {
    console.log('render_3_3', rawData[0]);
    // 打印 rawData[0] 的内容的[7][8]两个元素，即开始时间和结束时间，以日期格式显示
    console.log('render_3_3', new Date(rawData[0][7]).toLocaleDateString(), new Date(rawData[0][8]).toLocaleDateString());
    // data中每个元素是一个数组，按下标含义分别为 "主题", "ID", "二级机构", "预约提交时间", "房间名称", "房间所属馆舍", "设备类型", "开始时间", "结束时间", "有效预约", "主预约人"
    // 要用到的是 "有效预约" "房间名称" "房间所属馆舍" "开始时间" 和 "结束时间"
    // "有效愉悦" 为 "是" 或 "否"
    // "开始时间" 和 "结束时间" 为时间戳格式

    // 从rawData中筛选出有效预约，并且所属馆舍为"闵行校区-包玉刚图书馆"的数据，存入data
    let data = rawData.filter(element => element[9] === '是' && element[5] === '闵行校区-包玉刚图书馆');


    // 从data中统计所有房间名称，按字典序排序取前10个，存入rooms
    let rooms = Array.from(new Set(data.map(element => element[4]))).sort().slice(0, 10);

    // 从data中选出所有房间名称为rooms中的房间的数据，并以此更新data
    data = data.filter(element => rooms.includes(element[4]));

    //选定一天
    let startDate = '2023-11-14';
    // 选定日期范围为这一天及往后6天，将这三天每一天的起始时间和结束时间存入begin和end数组，并且将日期格式存入date数组
    let begin = [], end = [], date = [];
    for (let i = 0; i < 7; i++) {
        let tmp = new Date(startDate);
        tmp.setDate(tmp.getDate() + i);
        date.push(tmp.toLocaleDateString());
        begin.push(new Date(tmp).getTime());
        end.push(new Date(tmp).getTime() + 24 * 60 * 60 * 1000);
    }

    // 从data中的数据统计每个房间每一天的总时间，存入一个二维数组time，time[i][j]表示第i个房间在第j天的总时间
    let time = [];
    for (let i = 0; i < rooms.length; i++) {
        let tmp = [];
        for (let j = 0; j < 7; j++) {
            tmp.push(0);
        }
        time.push(tmp);
    }
    data.forEach(element => {
        let roomIndex = rooms.indexOf(element[4]);
        for (let i = 0; i < 7; i++) {
            if (element[7] < end[i] && element[8] > begin[i]) {
                time[roomIndex][i] += Math.min(element[8], end[i]) - Math.max(element[7], begin[i]);
            }
        }
    });
    // 将time内的时间从毫秒转换为分钟
    time = time.map(element => element.map(value => Math.floor(value / 60000)));

    render_chart(time, rooms, date);

    function render_chart(time, rooms, date) {
        console.log('render_chart 3 3', time, rooms, date, begin, end);
        // 初始化echarts实例
        const container = document.getElementById('group-study-space-container');
        const content = container.querySelector('.view-content');
        content.style.height = '100%';
        let myChart = echarts.init(content);

        // render_chart 渲染一个热力图，横轴为日期，纵轴为房间名称，颜色深浅表示时间长短
        let option = {
            width: '85%',
            title: {
                left: 'center',
                text: '包图研讨室已预约时长（分钟）',
                textStyle: {
                    color: 'rgba(200, 200, 200, 0.8)'
                }
            },
            tooltip: {
                position: 'top',
                // 不显示行列，显示date, room, value
                formatter: function (params) {
                    return `${date[params.value[0]]}, ${rooms[params.value[1]]}, ${params.value[2]}分钟`;
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
                data: date,
                axisLabel: {
                    color: 'rgba(200, 200, 200, 0.8)'
                }
            },
            yAxis: {
                type: 'category',
                data: rooms,
                axisLabel: {
                    color: 'rgba(200, 200, 200, 0.8)'
                }
            },
            visualMap: {
                min: 0,
                max: 1440,
                calculable: true,
                // 显示在右侧垂直居中的位置
                orient: 'vertical',
                left: 'right',
                top: 'center',
                textStyle: {
                    color: 'rgba(200, 200, 200, 0.8)'
                },
                // 颜色渐变，从浅蓝色到深蓝色
                inRange: {
                    color: ['#e0ffff', '#006edd']
                }
            },
            series: [{
                name: '使用时长',
                type: 'heatmap',
                data: time.map((element, index) => {
                    return element.map((value, i) => {
                        return [i, index, value];
                    });
                }).flat(),
                label: {
                    show: true
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        });
    }
}

export default render_3_3;