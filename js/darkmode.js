const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const body = document.body;
const topButton = document.getElementById('topimg');
const sideButton = document.getElementById('sideimg');

mediaQuery.addEventListener('change', (e) => {
    const isDark = e.matches;
    if (isDark) {
        goDark();
    } else {
        goLight();
    }
});

function goDark() {
    if (!body.classList.contains('dark')) {
        body.classList.add('dark');
        topButton.src = './web_icons/moon.png';
        sideButton.src = './web_icons/moon.png';
    }
}

function goLight() {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        topButton.src = './web_icons/sun.png';
        sideButton.src = './web_icons/sun.png';
    }
}

function toggleMode() {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        topButton.src = './web_icons/moon.png';
        sideButton.src = './web_icons/moon.png';
    } else {
        topButton.src = './web_icons/sun.png';
        sideButton.src = './web_icons/sun.png';
    }
}

// 页面加载时
window.addEventListener('load', () => {
    // check the device's mode
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (isDark) {
        goDark();
    }
});