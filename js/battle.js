let hasSelectedOnce = false;
let person1;
let person2;
let player1 = new Player("1234ABCD56");
let player2 = new Player("1234ABCD56");
let compareTable = document.getElementById('compareTable');

let result1 = null;
let result2 = null;

window.addEventListener("load", () => {

    document.getElementById('battle-id-1').value = localStorage.getItem('lastSearch') || '';
    document.getElementById('battle-id-2').value = '';
    document.getElementById('battleBtn').click();
})

document.getElementById('battleBtn').addEventListener('click', () => {
    hasSelectedOnce = false;
    const wcaId1 = document.getElementById('battle-id-1').value.trim();
    const wcaId2 = document.getElementById('battle-id-2').value.trim();
    if (!wcaId1 || !wcaId2) {
        return;
    } else if (!isValidWcaId(wcaId1)) {
        window.open(`https://www.worldcubeassociation.org/search?q=${wcaId1}`, "_blank");
        return;
    } else if (!isValidWcaId(wcaId2)) {
        window.open(`https://www.worldcubeassociation.org/search?q=${wcaId2}`, "_blank");
        return;
    }

    const url1 = `https://www.worldcubeassociation.org/api/v0/persons/${wcaId1}`;
    const url2 = `https://www.worldcubeassociation.org/api/v0/persons/${wcaId2}`;


    fetch(url1)
        .then(response => {
            if (!response.ok) {
                throw new Error('Competitor not found.');
            } else {
                localStorage.setItem('lastSearch', wcaId1);
                console.log('get', wcaId1);
            }
            return response.json();
        })
        .then(data => {
            // info
            person1 = data;
            console.log(person1);
            player1.records = [];
            player1.id = person1.person.id;
            document.getElementById('player1').innerHTML = `
            <img src=${person1.person.avatar.url} style='height: 4rem'></img>
            <div>${person1.person.name}</div>
            <div>(${player1.id})</div>
            `;
            let myEventList = person1.personal_records;
            Object.entries(myEventList).forEach(([key, value]) => {
                if (!eventList.includes(key)) {
                    return;
                }
                let g = eventDict.get(key).getGrade(value.average ? value.average.best : -1).toFixed(2);
                player1.addRecord(key, value.average ? value.average.best : -1, g);
            });

            result1 = data;
            checkBothDone();
        })

        .catch(error => {
            if (error.message == 'Competitor not found.')
                alert(error.message);
            else
                console.log(error.message);
        });

    fetch(url2)
        .then(response => {
            if (!response.ok) {
                throw new Error('Competitor not found.');
            } else {
                localStorage.setItem('lastSearch', wcaId1);
                console.log('get', wcaId2);
            }
            return response.json();
        })
        .then(data => {
            // info
            person2 = data;
            console.log(person2);
            player2.records = [];
            player2.id = person2.person.id;
            document.getElementById('player2').innerHTML = `
            <img src=${person2.person.avatar.url} style='height: 4rem'></img>
            <div>${person2.person.name}</div>
            <div>(${player2.id})</div>
            `;
            let myEventList = person2.personal_records;
            Object.entries(myEventList).forEach(([key, value]) => {
                if (!eventList.includes(key)) {
                    return;
                }
                let g = eventDict.get(key).getGrade(value.average ? value.average.best : -1).toFixed(2);
                player2.addRecord(key, value.average ? value.average.best : -1, value.average ? g : 0);
            });

            result2 = data;
            checkBothDone();
        })

        .catch(error => {
            if (error.message == 'Competitor not found.')
                alert(error.message);
            else
                console.log(error.message);
        });


});

function checkBothDone() {
    if (result1 && result2) {
        // 你要做的事寫這裡
        const allEventIds = [...new Set(
            [...player1.records, ...player2.records].map(item => item.eventId)
        )];

        compareTable.innerHTML = ``;
        allEventIds.forEach(id => {
            if (['333bf', '444bf', '555bf', '333mbf'].includes(id)) {
                return;

            }
            const tr = document.createElement('tr'); // 創建 tr
            // event icon
            const eventIcon = document.createElement('td');
            let img = document.createElement('img');
            img.src = `../cube_icons/${id}.svg`;
            img.style.height = "1.2rem";
            eventIcon.appendChild(img);

            // player1 result & score
            const p1result = document.createElement('td');
            p1result.textContent = player1.getRecordById(id) && player1.getRecordById(id).result != -1 ? formatResult(player1.getRecordById(id).result) : 'N/A';
            const p1score = document.createElement('td');
            p1score.textContent = player1.getRecordById(id) && player1.getRecordById(id).result != -1 ? player1.getRecordById(id).score : '0.00';

            // player2 result & score
            const p2result = document.createElement('td');
            p2result.textContent = player2.getRecordById(id) && player2.getRecordById(id).result != -1 ? formatResult(player2.getRecordById(id).result) : 'N/A';
            const p2score = document.createElement('td');
            p2score.textContent = player2.getRecordById(id) && player2.getRecordById(id).result != -1 ? player2.getRecordById(id).score : '0.00';

            // Compare
            let p1resultValue = player1.getRecordById(id) && player1.getRecordById(id).result != -1 ? player1.getRecordById(id).result : Infinity;
            let p2resultValue = player2.getRecordById(id) && player2.getRecordById(id).result != -1 ? player2.getRecordById(id).result : Infinity;
          
            if (p1resultValue < p2resultValue) {
                p1score.style.backgroundColor = 'lightgreen';
                p2score.style.backgroundColor = 'pink';
            } else if (p1resultValue == p2resultValue) {
                p1score.style.backgroundColor = 'lightyellow';
                p2score.style.backgroundColor = 'lightyellow';
            }
            else {
                p1score.style.backgroundColor = 'pink';
                p2score.style.backgroundColor = 'lightgreen';
            }

            // tr append
            tr.appendChild(eventIcon);
            tr.appendChild(p1result);
            tr.appendChild(p1score);
            tr.appendChild(p2score);
            tr.appendChild(p2result);

            // 然後把 tr 插入到某個 <table> 或 <tbody>
            document.querySelector('tbody').appendChild(tr); // 需要先確保頁面有 <tbody>

            compareTable.appendChild(tr);
        });

        //compareTable.appendChild();
    }
}

document.getElementById('battle-id-2').addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.getElementById('battleBtn').click(); // 触发按钮点击事件
    }
});

// click the search bar will auto select all content
// document.getElementById("wcaIdInput").addEventListener("click", function () {
//     if (!hasSelectedOnce) {
//         this.select();
//         hasSelectedOnce = true;  // 之後不再自動選中
//     }
// });
