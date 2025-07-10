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
            let sumScore = 0;
            let myEventCnt = 0;
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
                    tr.appendChild(createEl('td', record.single.country_rank));
                    tr.appendChild(createEl('td', record.single.continent_rank));
                    tr.appendChild(createEl('td', record.single.world_rank));
                    if (eventId == '333fm') {
                        tr.appendChild(createEl('td', record.single.best));
                    } else if (eventId == '333mbf' || eventId == '333mbo') {
                        tr.appendChild(createEl('td', decodeMultiBlind(record.single.best)));
                    } else {
                        tr.appendChild(createEl('td', formatResult(record.single.best)));
                    }

                    if (['333bf', '333mbf', '444bf', '555bf'].includes(eventId)) {
                        myEventCnt += 1;
                        let sc = createEl('td', eventDict.get(eventId).getGrade(record.single.best).toFixed(2));
                        sc.classList = 'score';
                        tr.appendChild(sc);
                        sumScore = sumScore + eventDict.get(eventId).getGrade(record.single.best);
                    }

                    if (record.average) {
                        if (!['333bf', '333mbf', '444bf', '555bf'].includes(eventId)) {
                            myEventCnt += 1;
                            let sc = createEl('td', eventDict.get(eventId).getGrade(record.average.best).toFixed(2));
                            sc.classList = 'score';
                            tr.appendChild(sc);
                            sumScore = sumScore + eventDict.get(eventId).getGrade(record.average.best);
                        }
                        if (eventId == '333fm') {
                            tr.appendChild(createEl('td', (record.average.best / 100).toFixed(2)));
                        } else if (eventId == '333mbf' || eventId == '333mbo') {
                            tr.appendChild(createEl('td', decodeMultiBlind(record.average.best)));
                        } else {
                            tr.appendChild(createEl('td', formatResult(record.average.best)));
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

            let overall = (sumScore / 17).toFixed(2);
            let scoreofMY = (sumScore / myEventCnt).toFixed(2);
            document.getElementById('overallScore').classList.remove('hidden');
            document.getElementById('overallScore').innerHTML = `
            <strong>Overall Score: </strong>
            <span>${overall}</span>
            `;

            document.getElementById('scoreOfMyEvents').classList.remove('hidden');
            document.getElementById('scoreOfMyEvents').innerHTML = `
            <strong>My Events Score: </strong>
            <span>${scoreofMY}</span>
            <span> (${myEventCnt} events)</span>
            `;

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
                if (eventList.includes(cell)) {
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
                } else if (eventNameMap[cell]) {
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