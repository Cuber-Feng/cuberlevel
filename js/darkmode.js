const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

mediaQuery.addEventListener('change', (e) => {
    const isDark = e.matches;
    if (isDark) {
        goDark();
    } else {
        goLight();
    }
});

function goDark() {
    if (!document.getElementById('content').classList.contains('dark')) {
        document.getElementById('content').classList.add('dark');
    }
}

function goLight() {
    if (document.getElementById('content').classList.contains('dark')) {
        document.getElementById('content').classList.remove('dark');
    }
}

function toggleMode() {
    document.getElementById('content').classList.toggle('dark');
}