function getZipCodeInfo() {
    const zipCode = document.getElementById('zipCode').value;
    if (zipCode.length === 5 && !isNaN(zipCode)) {
        fetch(`https://api.zippopotam.us/us/${zipCode}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Zip code not found');
                }
                return response.json();
            })
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                document.getElementById('results').innerHTML = `<p>Error: ${error.message}</p>`;
            });
    } else {
        document.getElementById('results').innerHTML = '<p>Please enter a valid 5-digit zip code.</p>';
    }
}

function displayResults(data) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = `
        <p><strong>Country:</strong> ${data.country}</p>
        <p><strong>State:</strong> ${data.places[0].state}</p>
        <p><strong>City:</strong> ${data.places[0]['place name']}</p>
    `;
}
