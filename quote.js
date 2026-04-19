const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const button = document.getElementById('newQuoteBtn');

let quotes = [

    "The New York City subway system has over 472 stations",
    "Despite being called the Underground the 55% of the London Underground is oveground",
    "Italy has the 5th fastest trains in the world running too cities like Rome",
    "Most London Underground trains do not have air conditioning making it really hot in the summer",
    "The highest rapid transit station in the world is the Smith-9th Streets station in NYC",
    "When building the Rome Metro many archaeological discoveries where found beneath the city making the line feel like an underground musuem",
    "Every station in NYC is always open and served by a line making the system a 24/7 served system someting really rare in the world"

];


function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex]    

}
button.addEventListener(`click`, showRandomQuote);
showRandomQuote();
