const apikey = "050418a268e6486b9f6fa0875827afa1";
const newsContainer = document.getElementById("news-container");
const searchField = document.getElementById("search-input"); 
const searchButton = document.getElementById("search-button");

async function fetchRandomNews(query) {
    
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchRandomNews(query);
            
            displayNews(articles);
        } catch (error) {
            console.error("Error fetching news by query", error);
        }
    }
});

function displayNews(articles) {
    newsContainer.innerHTML = "";
    if (articles.length > 0) { // Check if articles array is not empty
        articles.forEach((article) => {
            const newsCard = document.createElement("div");
            newsCard.classList.add("news-card");
            const img = document.createElement("img");
            img.src = article.urlToImage; 
            img.alt = article.title;
            const title = document.createElement("h2");
            const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
            title.textContent = truncatedTitle;
            const description = document.createElement("p");
            const truncatedDes = article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
            description.textContent = truncatedDes;

            newsCard.appendChild(img);
            newsCard.appendChild(title);
            newsCard.appendChild(description);
            newsCard.addEventListener("click", () => {
                window.open(article.url, "_blank");
            });
            newsContainer.appendChild(newsCard);

        });
    } else {
        newsContainer.innerHTML = "No articles found."; // Display a message when no articles are found
    }
}


(async () => {
    try {
        const articles = await fetchRandomNews("technology"); // Provide a default query
        displayNews(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
