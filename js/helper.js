const eventList = [
    "222", "333", "444", "555", "666", "777",
    "333oh", "333fm", "333bf", "clock", "skewb",
    "sq1", "minx", "pyram", "444bf", "555bf", "333mbf"
]

const eventKind = {
    nxn: ['222', '333', '444', '555', '666', '777'],
    short: ['222', '333', 'pyram', 'skewb', '333oh', 'clock', 'sq1'],
    long: ['444', '555', '666', '777', 'minx'],
    side: ['clock', 'minx', 'pyram', 'skewb', 'sq1'],
    silent: ['333bf', '333mbf', '444bf', '555bf', '333fm']
};

const kindMap = {
    nxn: 'NxNxN',
    short: 'Short',
    long: 'Long',
    side: 'Side',
    silent: 'Silent'
}

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
    'wr': 'WR (100pts)',
    'top001': '0.1% (95pts)',
    'top1': '1% (90pts)',
    'top5': '5% (80pts)',
    'top10': '10% (70pts)',
    'top20': '20% (60pts)',
    'top50': '50% (50pts)',
    'slowest': 'Slowest (40pts)',
    '333mbf': '3x3 Multi-Blind'
};

const countryCodeMap = {
    'AF': 'Afghanistan',
    'AL': 'Albania',
    'DZ': 'Algeria',
    'AD': 'Andorra',
    'AO': 'Angola',
    'AG': 'Antigua and Barbuda',
    'AR': 'Argentina',
    'AM': 'Armenia',
    'AU': 'Australia',
    'AT': 'Austria',
    'AZ': 'Azerbaijan',
    'BS': 'Bahamas',
    'BH': 'Bahrain',
    'BD': 'Bangladesh',
    'BB': 'Barbados',
    'BY': 'Belarus',
    'BE': 'Belgium',
    'BZ': 'Belize',
    'BJ': 'Benin',
    'BT': 'Bhutan',
    'BO': 'Bolivia',
    'BA': 'Bosnia and Herzegovina',
    'BW': 'Botswana',
    'BR': 'Brazil',
    'BN': 'Brunei',
    'BG': 'Bulgaria',
    'BF': 'Burkina Faso',
    'BI': 'Burundi',
    'CV': 'Cabo Verde',
    'KH': 'Cambodia',
    'CM': 'Cameroon',
    'CA': 'Canada',
    'CF': 'Central African Republic',
    'TD': 'Chad',
    'CL': 'Chile',
    'CN': 'China',
    'CO': 'Colombia',
    'KM': 'Comoros',
    'CG': 'Congo',
    'CD': 'Democratic Republic of the Congo',
    'CR': 'Costa Rica',
    'CIV': 'Côte d\'Ivoire',
    'HR': 'Croatia',
    'CU': 'Cuba',
    'CY': 'Cyprus',
    'CZ': 'Czech Republic',
    'DK': 'Denmark',
    'DJ': 'Djibouti',
    'DM': 'Dominica',
    'DO': 'Dominican Republic',
    'EC': 'Ecuador',
    'EG': 'Egypt',
    'SV': 'El Salvador',
    'GQ': 'Equatorial Guinea',
    'ER': 'Eritrea',
    'EE': 'Estonia',
    'SZ': 'Eswatini',
    'ET': 'Ethiopia',
    'FJ': 'Fiji',
    'FI': 'Finland',
    'FR': 'France',
    'GA': 'Gabon',
    'GM': 'Gambia',
    'GE': 'Georgia',
    'DE': 'Germany',
    'GH': 'Ghana',
    'GR': 'Greece',
    'GD': 'Grenada',
    'GT': 'Guatemala',
    'GN': 'Guinea',
    'GW': 'Guinea Bissau',
    'GY': 'Guyana',
    'HT': 'Haiti',
    'HN': 'Honduras',
    'HK': 'Hong Kong, China',
    'HU': 'Hungary',
    'IS': 'Iceland',
    'IN': 'India',
    'ID': 'Indonesia',
    'IR': 'Iran',
    'IQ': 'Iraq',
    'IE': 'Ireland',
    'IL': 'Israel',
    'IT': 'Italy',
    'JM': 'Jamaica',
    'JP': 'Japan',
    'JO': 'Jordan',
    'KZ': 'Kazakhstan',
    'KE': 'Kenya',
    'KI': 'Kiribati',
    'XK': 'Kosovo',
    'KW': 'Kuwait',
    'KG': 'Kyrgyzstan',
    'LA': 'Laos',
    'LV': 'Latvia',
    'LB': 'Lebanon',
    'LS': 'Lesotho',
    'LR': 'Liberia',
    'LY': 'Libya',
    'LI': 'Liechtenstein',
    'LT': 'Lithuania',
    'LU': 'Luxembourg',
    'MO': 'Macau, China',
    'MK': 'North Macedonia',
    'MG': 'Madagascar',
    'MW': 'Malawi',
    'MY': 'Malaysia',
    'MV': 'Maldives',
    'ML': 'Mali',
    'MT': 'Malta',
    'MH': 'Marshall Islands',
    'MR': 'Mauritania',
    'MU': 'Mauritius',
    'MX': 'Mexico',
    'FM': 'Federated States of Micronesia',
    'MD': 'Moldova',
    'MC': 'Monaco',
    'MN': 'Mongolia',
    'ME': 'Montenegro',
    'MA': 'Morocco',
    'MZ': 'Mozambique',
    'MM': 'Myanmar',
    'NA': 'Namibia',
    'NR': 'Nauru',
    'NP': 'Nepal',
    'NL': 'Netherlands',
    'NZ': 'New Zealand',
    'NI': 'Nicaragua',
    'NE': 'Niger',
    'NG': 'Nigeria',
    'NO': 'Norway',
    'OM': 'Oman',
    'PK': 'Pakistan',
    'PW': 'Palau',
    'PS': 'Palestine',
    'PA': 'Panama',
    'PG': 'Papua New Guinea',
    'PY': 'Paraguay',
    'PE': 'Peru',
    'PH': 'Philippines',
    'PL': 'Poland',
    'PT': 'Portugal',
    'QA': 'Qatar',
    'RO': 'Romania',
    'RU': 'Russia',
    'RW': 'Rwanda',
    'KN': 'Saint Kitts and Nevis',
    'LC': 'Saint Lucia',
    'VC': 'Saint Vincent and the Grenadines',
    'WS': 'Samoa',
    'SM': 'San Marino',
    'ST': 'São Tomé and Príncipe',
    'SA': 'Saudi Arabia',
    'SN': 'Senegal',
    'RS': 'Serbia',
    'SC': 'Seychelles',
    'SL': 'Sierra Leone',
    'SG': 'Singapore',
    'SK': 'Slovakia',
    'SI': 'Slovenia',
    'SB': 'Solomon Islands',
    'SO': 'Somalia',
    'ZA': 'South Africa',
    'SS': 'South Sudan',
    'ES': 'Spain',
    'LK': 'Sri Lanka',
    'SD': 'Sudan',
    'SR': 'Suriname',
    'SE': 'Sweden',
    'CH': 'Switzerland',
    'SY': 'Syria',
    'TW': 'Chinese Taipei',
    'TJ': 'Tajikistan',
    'TZ': 'Tanzania',
    'TH': 'Thailand',
    'TL': 'Timor-Leste',
    'TG': 'Togo',
    'TO': 'Tonga',
    'TT': 'Trinidad and Tobago',
    'TN': 'Tunisia',
    'TR': 'Turkey',
    'TM': 'Turkmenistan',
    'TV': 'Tuvalu',
    'UG': 'Uganda',
    'UA': 'Ukraine',
    'AE': 'United Arab Emirates',
    'GB': 'United Kingdom',
    'US': 'United States',
    'UY': 'Uruguay',
    'UZ': 'Uzbekistan',
    'VU': 'Vanuatu',
    'VE': 'Venezuela',
    'VN': 'Viet Nam',
    'YE': 'Yemen',
    'ZM': 'Zambia',
    'ZW': 'Zimbabwe'
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

    const success = 99 - prefix + missed;       // 成功数
    const attempted = success + missed; // 总尝试数
    const timeMinutes = Math.floor(minutes / 60);
    const timeSeconds = minutes % 60;

    const timeStr = `${timeMinutes}:${timeSeconds.toString().padStart(2, '0')}`;
    return `${success}/${attempted} ${timeStr}`;
}

function isValidWcaId(id) {
    const pattern = /^[0-9]{4}[a-zA-Z]{4}[0-9]{2}$/;
    return pattern.test(id);
}


