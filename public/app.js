document.addEventListener("DOMContentLoaded", function () {
    const manhwaList = document.getElementById('manhwa-list');

    // Fetch data from the server
    fetch('http://52.140.80.183/manhwa') // Make sure the URL matches your backend
        .then(response => response.json())
        .then(manhwaData => {
            // Function to display manhwa
            manhwaData.forEach(manhwa => {
                const card = document.createElement('div');
                card.classList.add('manhwa-card');

                card.innerHTML = `
                    <img src="${manhwa.image_url}" alt="${manhwa.title}">
                    <h3>${manhwa.title}</h3>
                    <p><strong>Genre:</strong> ${manhwa.genre}</p>
                    <p>${manhwa.description}</p>
                `;

                manhwaList.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching manhwa data:', error);
            manhwaList.innerHTML = '<p>Error loading manhwa data.</p>';
        });
});






// for running it on local ⬇️

// document.addEventListener("DOMContentLoaded", function () {
//     const manhwaList = document.getElementById('manhwa-list');

//     // Fetch data from the server
//     fetch('http://localhost:3000/manhwa')  // Make sure the URL matches your backend
//         .then(response => response.json())
//         .then(manhwaData => {
//             // Function to display manhwa
//             manhwaData.forEach(manhwa => {
//                 const card = document.createElement('div');
//                 card.classList.add('manhwa-card');

//                 card.innerHTML = `
//                     <img src="${manhwa.image_url}" alt="${manhwa.title}">
//                     <h3>${manhwa.title}</h3>
//                     <p><strong>Genre:</strong> ${manhwa.genre}</p>
//                     <p>${manhwa.description}</p>
//                 `;

//                 manhwaList.appendChild(card);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching manhwa data:', error);
//             manhwaList.innerHTML = '<p>Error loading manhwa data.</p>';
//         });
// });
