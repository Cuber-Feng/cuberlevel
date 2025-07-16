const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    content.classList.toggle('shift');
});

document.addEventListener('click', (event) => {
    // 判斷點擊目標是不是sidebar本身或者sidebar的子元素
    if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
        // 點擊在sidebar外面，關閉sidebar
        content.classList.remove('shift');
        sidebar.classList.remove('active');
    }
});