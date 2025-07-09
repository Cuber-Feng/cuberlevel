document.getElementById('lookupBtn').addEventListener('click', () => {
    const wcaId = document.getElementById('wcaIdInput').value.trim();
    if (!wcaId) {
        alert('Please enter a WCA ID.');
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
            <span><strong>WCA ID:</strong> ${person.wca_id}</span>
            <span><strong>Country:</strong> ${person.country?person.country.name : countryCodeMap[person.country_iso2]}</span>
            <span><strong>Gender:</strong> ${gender}</span>
            <span><strong>Competitions:</strong> ${data.competition_count}</span>
          `;
            // result
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            thead.innerHTML = `
            <tr>
            <th class='sticky-col'>Event</th><th>NR</th><th>CR</th><th>WR</th>
            <th>Single</th><th>Average</th><th>WR</th><th>CR</th><th>NR</th>
            </tr>
            `
            table.appendChild(thead);

            let tbody = document.createElement('tbody');

            Object.entries(data.personal_records).forEach(([eventId, record]) => {
                if (!eventList.includes(eventId))
                    return;
                let tr = document.createElement('tr');
                let th = document.createElement('th');
                th.id = 'event-cell';

                let img = document.createElement('img');
                img.src = `./cube_icons/${eventId}.svg`;
                img.style.width = "1.2rem";
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

                    if (record.average) {
                        if (eventId == '333fm') {
                            tr.appendChild(createEl('td', record.average.best));
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
                    }
                }

                tbody.appendChild(tr);
            });

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
            cells.forEach((cell, colIndex) => {
                const cellEl = document.createElement(rowIndex == 0 || colIndex == 0 ? 'th' : 'td');
                if (eventList.includes(cell)) {
                    let img = document.createElement('img');
                    img.src = `./cube_icons/${cell}.svg`;
                    img.style.width = "1.5rem";
                    cellEl.appendChild(img);
                    cellEl.id = 'event-cell';
                    cellEl.classList = 'sticky-col';
                } else if (cell == 'eventId') {
                    cellEl.textContent = 'Event';
                    cellEl.classList = 'sticky-col';
                }
                else if (cell == 'cnt' || cell == 'cnt\r' || cell == 'cnt\n' || cell.trim() == 'cnt') {
                    cellEl.textContent = 'Competitors';
                } else if (eventNameMap[cell]) {
                    cellEl.textContent = eventNameMap[cell];
                } else if (colIndex == cells.length - 1) {
                    cellEl.textContent = formatCompactNumber(cell);
                }
                else if (cells[0] == '333fm' && colIndex != cells.length - 1) {
                    cellEl.textContent = (cell / 100).toFixed(2);
                } else {
                    cellEl.textContent = formatResult(cell);
                }
                tr.appendChild(cellEl);
            });

            table.appendChild(tr);
        });

        const container = document.getElementById('table-container');
        container.innerHTML = '';
        container.appendChild(table);
    })
    .catch(error => {
        document.getElementById('table-container').textContent = 'Failed to load CSV: ' + error;
    });