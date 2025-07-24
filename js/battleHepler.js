
fetch('../event_rank_summary.csv')
    .then(response => response.text())
    .then(csvText => {
        const rows = csvText.trim().split('\n');
        const table = document.createElement('table');

        rows.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            const cells = row.split(',');
            let cur_eventId;
            let event_obj;

            cells.forEach((cell, colIndex) => {
                const cellEl = document.createElement(rowIndex == 0 || colIndex == 0 ? 'th' : 'td');
                if (eventList.includes(cell) && colIndex == 0) {
                    cur_eventId = cell;
                    cellEl.id = 'event-cell';
                    cellEl.classList = 'sticky-col';

                    event_obj = new Event(cell);

                } else if (cell == 'eventId') {
                    cellEl.textContent = 'Event';
                    cellEl.classList = 'sticky-col';
                } else if (cell == 'cnt' || cell == 'cnt\r' || cell == 'cnt\n' || cell.trim() == 'cnt') {
                    cellEl.textContent = 'Competitors';
                } else if (eventNameMap[cell] && rowIndex == 0) {
                    cellEl.textContent = eventNameMap[cell];
                } else if (colIndex == cells.length - 1) {
                    cellEl.textContent = formatCompactNumber(cell);
                } else if (cells[0] == '333fm' && colIndex != cells.length - 1) {
                    cellEl.textContent = (cell / 100).toFixed(2);
                } else if ((cells[0] == '333mbf' && colIndex != cells.length - 1))
                    cellEl.textContent = decodeMultiBlind(cell);
                else {
                    cellEl.textContent = formatResult(cell);
                }

                if (event_obj) {
                    switch (colIndex) {
                        case 1:
                            event_obj.wr = cell;
                            break;
                        case 2:
                            event_obj.top01 = cell;
                            break;
                        case 3:
                            event_obj.top1 = cell;
                            break;
                        case 4:
                            event_obj.top5 = cell;
                            break;
                        case 5:
                            event_obj.top10 = cell;
                            break;
                        case 6:
                            event_obj.top20 = cell;
                            break;
                        case 7:
                            event_obj.top50 = cell;
                            break;
                        case 8:
                            event_obj.slowest = cell;
                            break;
                        case 9:
                            event_obj.count = cell.trim();
                            break;
                        default:
                    }
                    if (colIndex == cells.length - 1) {
                        eventDict.set(cur_eventId, event_obj);
                        // console.log(event_obj);
                        event_obj = null;
                    }
                }
                tr.appendChild(cellEl);
            });

            table.appendChild(tr);
        });
    })
    .catch(error => {
        console.log('Failed to load CSV: ' + error);
    });