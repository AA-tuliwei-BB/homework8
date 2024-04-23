function render_1_1() {
    fetch('./data/02-2023年全年入馆数据.json')
        .then(response => response.json())
        .then(data => {
            work(data);
        })
        .catch(error => console.error('Error loading JSON:', error));

    function work(data) {
        console.log(data.RECORDS[0]);
    }
}

export default render_1_1;