import render_1_1 from './components/component_1_1.js';
import render_1_2 from './components/component_1_2.js';
import render_1_3 from './components/component_1_3.js';
import render_2_1 from './components/component_2_1.js';
import render_2_2 from './components/component_2_2.js';
import render_2_3 from './components/component_2_3.js';
import render_3_1 from './components/component_3_1.js';
import render_3_2 from './components/component_3_2.js';
import render_3_3 from './components/component_3_3.js';

// main.js
document.addEventListener("DOMContentLoaded", function () {
    render_bar();
    loadData02().then(data => {
        render_1_1(data.RECORDS);
        render_1_3(data.RECORDS);
    }).catch(error => {
        console.error('Failed to process data:', error);
    });
    render_1_2();
    render_2_1();
    render_2_2();
    render_2_3();
    render_3_1();
    render_3_2();
    render_3_3();
});

async function loadData02() {
    try {
        const response = await fetch('./data/02-2023年全年入馆数据.json');
        return await response.json();
    } catch (error) {
        return console.error('Error loading JSON:', error);
    }
}