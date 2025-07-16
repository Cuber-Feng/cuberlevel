const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const body = document.body;

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
    }
}

function goLight() {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
    }
}

function toggleMode() {
    body.classList.toggle('dark');
}

// 页面加载时
window.addEventListener('load', () => {
    // check the device's mode
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (isDark) {
        goDark();
    }
});