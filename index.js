/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // create a new div element, which will become the game card
        const game = document.createElement("div");

        // add the class game-card to the list
        game.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        game.innerHTML = `
            <img class="game-img" src="${games[i].img}" alt="${games[i].name}" />
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p>Goal: $${games[i].goal.toLocaleString()}</p>
            <p>Pledged: $${games[i].pledged.toLocaleString()}</p>
            <p>Backers: ${games[i].backers.toLocaleString()}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(game);
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const sumContributions = GAMES_JSON.reduce( (total, item) => {
    return total + item.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    <p>${sumContributions.toLocaleString()}</p>
`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
raisedCard.innerHTML = `
    <p>$${GAMES_JSON.reduce( (total, item) => {
        return total + item.pledged;
    }, 0).toLocaleString()}</p>
`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `
    <p>${GAMES_JSON.length}</p>
`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter( (item) => {
        return item.pledged < item.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter( (item) => {
        return item.pledged >= item.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfunded = GAMES_JSON.filter( (item) => {
    return item.pledged < item.goal;
}).length;

// Use a template string to display how much money has been raised and for how many games, as well as explaining how many games currently remain unfunded. Use the ternary operatory (?) to make sure the statement is grammatically correct regardless of the number of unfunded games. Here's an example format:
// We have raised $XXX for X games, but we still need to raise $XXX for X games.
// We currently have X games that are not yet fully funded.
// create a string that explains the amount of money raised and for how many games
const moneyRaisedString = `A total of $${GAMES_JSON.reduce( (total, item) => {
    return total + item.pledged;
}, 0).toLocaleString()} has been raised for ${GAMES_JSON.length} games.`;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedString = numUnfunded === 1 ? "1 game" : `${numUnfunded} games`;

// create a new DOM element containing the template string and append it to the descriptionContainer
const displayString = document.createElement("p");

displayString.innerHTML = `${moneyRaisedString} Currently, ${unfundedString} remain unfunded. We need your help to fund these amazing games!`;

descriptionContainer.appendChild(displayString);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item