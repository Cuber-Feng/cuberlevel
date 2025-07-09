const eventList = [
    "222", "333", "444", "555", "666", "777",
    "333oh", "333fm", "333bf", "clock", "skewb",
    "sq1", "minx", "pyram", "444bf", "555bf", "333mbf"
]

const eventNameMap = {
    '222': '2x2x2 Cube',
    '333': '3x3x3 Cube',
    '444': '4x4x4 Cube',
    '555': '5x5x5 Cube',
    '666': '6x6x6 Cube',
    '777': '7x7x7 Cube',
    '333oh': '3x3 One-Handed',
    '333fm': '3x3 Fewest Moves',
    '333bf': '3x3 Blindfolded',
    '444bf': '4x4 Blindfolded',
    '555bf': '5x5 Blindfolded',
    'skewb': 'Skewb',
    'clock': 'Clock',
    'sq1': 'Square-1',
    'minx': 'Megaminx',
    'pyram': 'Pyraminx',
    'eventId': 'Event',
    'cnt\r': 'Competitors',
    'wr': 'WR',
    'top001': '0.1%',
    'top1': '1%',
    'top5': '5%',
    'top10': '10%',
    'top20': '20%',
    'top50': '50%',
    'slowest': 'Slowest',
    '333mbf': '3x3 Multi-Blind'
};

function formatCompactNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return '-';

    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';

    if (absNum >= 1_000_000_000) {
        return sign + (absNum / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (absNum >= 1_000_000) {
        return sign + (absNum / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (absNum >= 1_000) {
        return sign + (absNum / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        return sign + absNum.toString();
    }
}

function formatResult(tick) {
    const totalMs = tick * 10;
    let milliseconds = totalMs % 1000;
    let totalSeconds = Math.floor(totalMs / 1000);

    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    const subsec = Math.floor(milliseconds / 10); // 1/100 秒

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(subsec).padStart(2, '0')}`;
    } else if (minutes > 0) {
        return `${minutes}:${String(seconds).padStart(2, '0')}.${String(subsec).padStart(2, '0')}`;
    } else {
        return `${seconds}.${String(subsec).padStart(2, '0')}`;
    }
}

function createEl(_type, _text) {
    let tmp = document.createElement(_type);
    tmp.textContent = _text;
    return tmp;
}

function decodeMultiBlind(result) {
    const resultStr = result.toString().padStart(9, '0');

    const prefix = parseInt(resultStr.slice(0, 2)); // 前两位 (99 - success + missed)
    const minutes = parseInt(resultStr.slice(2, 7)); // 中间五位：分钟数
    const missed = parseInt(resultStr.slice(7, 9)); // 后两位：missed

    const success = 99 - prefix;       // 成功数
    const attempted = success + missed; // 总尝试数
    const timeMinutes = Math.floor(minutes / 60);
    const timeSeconds = minutes % 60;

    const timeStr = `${timeMinutes}:${timeSeconds.toString().padStart(2, '0')}`;
    return `${success}/${attempted} ${timeStr}`;
}
