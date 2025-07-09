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
            const person = data.person;
            const html = `
            <img src=${person.avatar.url} style='width: 10rem'></img>
            <h2>${person.name}</h2>
            <p><strong>WCA ID:</strong> ${person.wca_id}
            &nbsp;&nbsp;&nbsp;&nbsp;<strong>Country:</strong> ${person.country.name} 
            &nbsp;&nbsp;&nbsp;&nbsp; <strong>Gender:</strong> ${person.gender}&nbsp;&nbsp;&nbsp;&nbsp;<strong>Competitions:</strong> ${data.competition_count}</p>
          `;
            document.getElementById('result').innerHTML = html;
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            thead.innerHTML = `
            <tr>
            <th>Event</th><th>NR</th><th>CR</th><th>WR</th>
            <th>Single</th><th>Average</th><th>WR</th><th>CR</th><th>NR</th>
            </tr>
            `
            table.appendChild(thead);

            let tbody = document.createElement('tbody');

            Object.entries(data.personal_records).forEach(([eventId, record]) => {
                let tr = document.createElement('tr');
                let th = document.createElement('th');
                console.log(`Event ID: ${eventId}`);
                th.textContent = eventNameMap[eventId];
                tr.appendChild(th);
                if (record.single) {
                    let td=document.createElement('td');
                    td.textContent=record.single.best;
                    tr.appendChild(td);
                }
                if (record.average) {
                    console.log('  Average:', record.average);
                }
                tbody.appendChild(tr);
            });

            table.appendChild(tbody);

            document.getElementById('gradeTable').innerHTML = ``;
            document.getElementById('gradeTable').appendChild(table);
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
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
                const cellEl = document.createElement(rowIndex === 0 ? 'th' : 'td');

                if (eventNameMap[cell]) {
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