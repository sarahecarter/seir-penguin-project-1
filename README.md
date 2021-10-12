# Project 1 Documentation
 Created by: Sarah Carter

## Introduction
This project is a trivia game app.

## Technologies Used
- HTML
- CSS
- JS
- jQuery

## Challenges
- I had trouble with figuring out how to determin when my game should end. The way I first set up my game, it was continuously generating new questions and showing repeat questions. I adjusted my `setBoard()` function so that every time a new question was added, that question was moved from the `questions` array to a `usedQuestions` array. Then, I added a conditional to my answers event listener that checked if there were any questions left in the `questions` array. If it was empty (`questions.length === 0`) then the game is over.


#### Example Table
| Column 1 | Column 2|
|----------|---------|
| Thing 1  | Thing 2 |
| Thing 3  | Thing 4 |