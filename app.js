document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YyH4ddnf7bp2cWWU0qXmDeSPoHk1xBkF';
    const form = document.getElementById('search-form');
    const queryInput = document.getElementById('query');
    const resultsDiv = document.getElementById('results');
    const paginationDiv = document.getElementById('pagination');
    const searchButton = document.getElementById('search-button');

    let currentPage = 1;
    let currentQuery = '';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        currentQuery = queryInput.value;
        currentPage = 1;
        await fetchAndDisplayGIFs(currentQuery, currentPage);
    });
    async function fetchAndDisplayGIFs(query, page) {
        const limit = 9;
        const offset = (page - 1) * limit;
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${offset}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayGIFs(data.data);
            setupPagination(data.pagination.total_count, page);
        } catch (error) {
            console.error('Error fetching GIFs:', error);
        }
    }

    function displayGIFs(gifs) {
        resultsDiv.innerHTML = '';
        gifs.forEach(gif => {
            const gifItem = document.createElement('div');
            gifItem.className = 'gif-item';
            gifItem.innerHTML = `<img src="${gif.images.fixed_height.url}" alt="${gif.title}">`;
            resultsDiv.appendChild(gifItem);
        });
    }

    function setupPagination(totalResults, page) {
        paginationDiv.innerHTML = '';
        const totalPages = Math.ceil(totalResults / 10);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.disabled = i === page;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                fetchAndDisplayGIFs(currentQuery, currentPage);
            });
            paginationDiv.appendChild(pageButton);
        }
    }
});