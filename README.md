# Project 1 Documentation
 Project: Trivia Game

 Created by: Sarah Carter

## Introduction
This project is a two player trivia game app. Players take turns answering questions to earn points. Whichever player earns the most points wins.

The game functionality was created using JavaScript and jQuery. The responsive styling was created using custom CSS. 

## How to Play
Players take turns selecting their answers. The player turn is indicated on the bottom of the gameboard by the border and animation on the active player's score. If a player answers a question correctly, the answer is highlighted in green and a point is added to their score. If the selected answer is incorrect, the answer is highlighted in red and no point is added to the player's score.

## Technologies Used
- HTML
- CSS
- JS
- jQuery

A game questions API was created using Contentful and is referenced using AJAX.

## Challenges
- I had trouble with figuring out how to determine when my game should end. The way I first set up my game, there was no end condition so the game repeated the questions indefinitely. To fix this, I adjusted my `setBoard()` function so that every time a new question was added to the board, that question was moved from the `questions` array to a `usedQuestions` array. I then added a conditional to my answers click event listener that checked if there were any questions left in the `questions` array. If the array is empty (`questions.length === 0`) then the game is over.
- I added animations to highlight an answer in green or red to indicate if it was correct or not. At first I had trouble getting these animations to show since the question would change right away. I ended up using `setTimeout()` to delay the board resetting and give time for the animations to show after the user has selected their answer.

