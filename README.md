# Top trumps programming languages

## Description

This is a simple top trumps game based on programming languages. The deck is 32 cards

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the page
4. Open the index.html with live server

## Technologies

It's written in node and packaged with webpack. The tests are written in jest.

## Process

-   Write a mockup
    -   ~~of the board~~
    -   ~~of the game logic~~
    -   of the game flow
    -   of the computer player
    -   of a user-input form for card updates
-   Write the game logic
    -   ~~Create a deck of cards~~
    -   Shuffle the deck~~
    -   Deal the cards~~
    -   ~~Create a player~~
    -   Create a computer player
    -   Create a board
    -   Create a game
    -   Create a game flow
-   Style the board
    -   Make a user interface
    -   Add animations
    -   Highlight/move forward the hover card

## Wins and Blockers

### Wins

Game logic seems to be working ok!

### Blockers

~~I'm not sure how to manage the DOM update. I think I can probably manipulate it directly and add/remove elements for different stages of the game but i'll need to test it thoroughly and make sure i'm not missing any game logic this way.~~

## Future Features

-   Add a user-input form for card updates
-   Add a user-input form for adding new cards
-   Add a vote feature for card changes?
-   Show the played cards in the round
    -   Abstract the card render into a separate component
    -   use the card render to create new renders for the played cards
-   timer limits the decision time
    -   set a timer and make a random choice if the player doesn't choose in time
-   current hand count
    -   display the current length of hand for each player
    -   strikethrough the player name if they have no cards left
