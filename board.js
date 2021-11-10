for (let i = 0;i < board.length; i++){
    for (let j = 0; j < board[i].length; j++){
        if (board[i][j]==='cat'){
            let div = document.createElement('div')
            div.classList.add('category')
            document.querySelector('.board').append(div)
        }
        else {
            let div = document.createElement('div')
            div.classList.add('clueValue')
            document.querySelector('.board').append(div)
        }
    }
}

function startGame(){
    categoryPromise()
}

function appendCategory(obj){
    let h3 = document.createElement("h3")
    h3.innerHTML = obj.title
    document.querySelector(`.board>div:nth-child(${catIndex})`).append(h3)
    catIndex ++
}

const categoryPromise = function(){
    return new Promise(function resolve(){
        for (let i = 0; i < 6; i++){    
            fetch(`https://jservice.kenzie.academy/api/categories/${randomizeCategory()}`) // obtain random category
                .then(res => res.json())
                .then(res => appendCategory(res))
        }
    })
}

function generateValues(){
    let child = 7 // first 6 divs are categories
    for (let i = 1; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            let h3 = document.createElement('h3')
            h3.innerHTML = board[i][j]
            h3.classList.add(`a${board[i][j].slice(1,board[i][j].length)}`) // add class based on value but remove '$'
            h3.classList.add(`a${categoryID[j]}`) // add class based on category ID     // "a" added to class to make valid CSS selector
            document.querySelector(`.board>div:nth-child(${child})`).append(h3)
            child++
        }
    }
    for (let i = 1; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            let userSelect = document.querySelector(`h3.a${board[i][j].slice(1,board[i][j].length)}.a${categoryID[j]}`)
            userSelect.addEventListener('click', presentClue)
            userSelect.classList.remove(`a${board[i][j].slice(1,board[i][j].length)}`)
        }
    }
}

startGame()
setTimeout(() => {
    generateValues()
}, 1000);