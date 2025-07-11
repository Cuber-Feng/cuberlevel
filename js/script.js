document.getElementById('lookupBtn').addEventListener('click', () => {
    const wcaId = document.getElementById('wcaIdInput').value.trim();
    if (!wcaId) {
        return;
    }
    if (!isValidWcaId(wcaId)) {
        window.open(`https://www.worldcubeassociation.org/search?q=${wcaId}`, "_blank");
        return;
    }

    const url = `https://www.worldcubeassociation.org/api/v0/persons/${wcaId}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Competitor not found.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // info
            const person = data.person;
            const gender = (data.person.gender == 'm' ? "Male" : "Female");

            document.getElementById('info-avator').innerHTML = `<img src=${person.avatar.url} style='height: 8rem'></img>`;
            document.getElementById('info-name').textContent = person.name;
            document.getElementById('info-other').innerHTML = `
            <div>
            <span><strong>WCA ID:</strong> ${person.wca_id}</span>
            <span><strong>Country:</strong> ${person.country ? person.country.name : countryCodeMap[person.country_iso2]}</span>
            </div>
            <div>
            <span><strong>Gender:</strong> ${gender}</span>
            <span><strong>Competitions:</strong> ${data.competition_count}</span>
            </div>
          `;
            // result
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            thead.innerHTML = `
            <tr>
            <th class='sticky-col'>Event</th><th>NR</th><th>CR</th><th>WR</th>
            <th>Single</th><th class='score'>Score</th><th>Average</th><th>WR</th><th>CR</th><th>NR</th>
            </tr>
            `
            table.appendChild(thead);

            let tbody = document.createElement('tbody');
            // the sum scores:
            let sumScore = 0;
            let myEventCnt = 0;
            let sumKind = {
                nxn: 0,
                short: 0,
                long: 0,
                side: 0,
                silent: 0
            };
            // now go through every event (eventId)
            Object.entries(data.personal_records).forEach(([eventId, record]) => {
                if (!eventList.includes(eventId))
                    return;
                let tr = document.createElement('tr');
                let th = document.createElement('th');
                th.id = 'event-cell';

                let img = document.createElement('img');
                img.src = `./cube_icons/${eventId}.svg`;
                img.style.height = "1.2rem";
                th.appendChild(img);
                th.classList = 'sticky-col';
                tr.appendChild(th);

                if (record.single) {
                    // the single result: record.single.best
                    // the single score: eventDict.get(eventId).getGrade(record.single.best) // only for bf events
                    let single_result = record.single.best;
                    console.log(eventId, single_result);

                    tr.appendChild(createEl('td', record.single.country_rank));
                    tr.appendChild(createEl('td', record.single.continent_rank));
                    tr.appendChild(createEl('td', record.single.world_rank));
                    if (eventId == '333fm') {
                        tr.appendChild(createEl('td', single_result));
                    } else if (eventId == '333mbf' || eventId == '333mbo') {
                        tr.appendChild(createEl('td', decodeMultiBlind(single_result)));
                    } else {
                        tr.appendChild(createEl('td', formatResult(single_result)));
                    }

                    if (['333bf', '333mbf', '444bf', '555bf'].includes(eventId)) {
                        let single_score = eventDict.get(eventId).getGrade(single_result);
                        console.log(eventId, single_score);
                        myEventCnt += 1;
                        let sc = createEl('td', single_score.toFixed(2));
                        sc.classList = 'score';
                        tr.appendChild(sc);
                        sumScore = sumScore + single_score;
                        for (const kind in sumKind) {
                            if (eventKind[kind].includes(eventId)) {
                                sumKind[kind] += single_score;
                            }
                        }
                    }

                    if (record.average) {
                        let average_result = record.average.best;
                        let average_score = eventDict.get(eventId).getGrade(average_result);

                        if (!['333bf', '333mbf', '444bf', '555bf'].includes(eventId)) {
                            myEventCnt += 1;
                            let sc = createEl('td', average_score.toFixed(2));
                            sc.classList = 'score';
                            tr.appendChild(sc);
                            sumScore = sumScore + average_score;
                            for (const kind in sumKind) {
                                if (eventKind[kind].includes(eventId)) {
                                    sumKind[kind] += average_score;
                                }
                            }
                        }
                        if (eventId == '333fm') {
                            tr.appendChild(createEl('td', (average_result / 100).toFixed(2)));
                        } else if (eventId == '333mbf' || eventId == '333mbo') {
                            tr.appendChild(createEl('td', decodeMultiBlind(average_result)));
                        } else {
                            tr.appendChild(createEl('td', formatResult(average_result)));
                        }
                        tr.appendChild(createEl('td', record.average.world_rank));
                        tr.appendChild(createEl('td', record.average.continent_rank));
                        tr.appendChild(createEl('td', record.average.country_rank));
                    } else {
                        tr.appendChild(createEl('td', ' '));
                        tr.appendChild(createEl('td', ' '));
                        tr.appendChild(createEl('td', ' '));
                        tr.appendChild(createEl('td', ' '));
                        tr.appendChild(createEl('td', ' '));
                    }
                }

                tbody.appendChild(tr);
            });

            // start to show the scores
            document.getElementById('scores').classList.remove('hidden');
            // overall
            let overall = (sumScore / 17).toFixed(2);
            document.getElementById('overallScore').innerHTML = `
            <strong>Overall: </strong>
            <span>${overall}</span>
            `;
            // my events
            let scoreofMY = (sumScore / myEventCnt).toFixed(2);
            document.getElementById('scoreOfMyEvents').innerHTML = `
            <strong>My Events: </strong>
            <span>${scoreofMY}</span>
            <span> (${myEventCnt} events)</span>
            `;
            // events by kind
            const cntKind = {
                nxn: 6,
                short: 7,
                long: 5,
                side: 5,
                silent: 5
            };

            for (const kind in sumKind) {
                let scoreTmp = (sumKind[kind] / cntKind[kind]).toFixed(2);
                document.getElementById('scoreOf' + kind).innerHTML = `
                    <strong>${kindMap[kind]} Events: </strong>
                    <span>${scoreTmp}</span>
                `;
            }

            table.appendChild(tbody);
            document.getElementById('gradeTable').innerHTML = ``;
            document.getElementById('gradeTable').appendChild(table);
        })

        .catch(error => {
            if (error.message == 'Competitor not found.')
                alert(error.message);
            else
                console.log(error.message);
        });
});

document.getElementById('wcaIdInput').addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.getElementById('lookupBtn').click(); // 触发按钮点击事件
    }
});

fetch('./event_rank_summary.csv')
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
                    let img = document.createElement('img');
                    img.src = `./cube_icons/${cell}.svg`;
                    img.style.width = "1.5rem";
                    cellEl.appendChild(img);
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
                        console.log(event_obj);
                        event_obj = null;
                    }
                }

                tr.appendChild(cellEl);
            });

            table.appendChild(tr);
        });

        console.log(eventDict);

        const container = document.getElementById('table-container');
        container.innerHTML = '';
        container.appendChild(table);
    })
    .catch(error => {
        document.getElementById('table-container').textContent = 'Failed to load CSV: ' + error;
    });


document.getElementById("wcaIdInput").addEventListener("click", function () {
    this.select();
});

const ul = document.getElementById('eventList');

for (const key in eventKind) {
    const li = document.createElement('li');
    let imgs = ``;
    console.log(eventKind[key]);

    for (const i in eventKind[key]) {
        imgs += `<img style='width: 1.5rem; margin: 0 4px' src=./cube_icons/${eventKind[key][i]}.svg>`
    }
    li.innerHTML = `<b>${kindMap[key]} Events</b>: ${imgs}`;
    ul.appendChild(li);
}