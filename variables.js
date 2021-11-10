let randomCategory
let randomClue
let answer
let answersCorrect = 0
let catIndex = 1 // category iteration variable for append loop

let board =
[['cat','cat','cat','cat','cat','cat'],
['$200','$200','$200','$200','$200','$200'],
['$400','$400','$400','$400','$400','$400'],
['$600','$600','$600','$600','$600','$600'],
['$800','$800','$800','$800','$800','$800'],
['$1000','$1000','$1000','$1000','$1000','$1000']]

let categoryID = []

let divBoard = document.createElement('div')
divBoard.classList.add('board')
document.body.prepend(divBoard)