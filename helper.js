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
    'slowest': 'Slowest'
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
