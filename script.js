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
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
});


window.addEventListener('load', () => {
    let region = 'HK';
    let type = 'single';
    let event = '333';
    //let urlEvents = `https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/rank/${region}/${type}/${event}.json`;
    let urlEvents = `https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/rank/${region}/${type}/${event}.json`;

    fetch(urlEvents)
        .then(response => response.json())  // 这里把 ReadableStream 解析为 JSON
        .then(data => {
            console.log(data); // 这里才是真正的JSON数据
            let show;
            show = 
            `<p><strong>Total: </strong>${data.total}</p>
            <p><strong>?: </strong>${data.items[100].best}</p>
            `;
            document.getElementById('rank-result').innerHTML = show;
        })
        .catch(error => {
            console.error('Error:', error);
        });

});