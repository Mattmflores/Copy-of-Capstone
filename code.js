// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

// YOUR CODE HERE!

function randomizeCategory(){
    let numOfCategories = 40950
    randomCategory = Math.floor(Math.random()*numOfCategories)
    categoryID.push(randomCategory)
    return randomCategory
}

function appendClue(clue){
    let div = document.createElement('div')
    div.classList.add('cluePresentation')
    let node = document.querySelector(`.userFeedback`)
   if (document.querySelector('.cluePresentation')!==null){
       document.querySelector('.cluePresentation').remove()
   }
    node.after(div)
    let h3 = document.createElement("h3")
    h3.innerHTML = clue.question
    document.querySelector('.cluePresentation').replaceChildren(h3)
    document.querySelector('.cluePresentation').append(createForm())
    let submitButton = document.getElementById("submitAnswer")
    submitButton.addEventListener("click", validateAnswer)
}

function presentClue(event){
    let classStr = this.className
    //this.innerHTML = ""
    if((fetch(`https://jservice.kenzie.academy/api/clues?value=${this.innerHTML.slice(1)}&category=${classStr.slice(1)}`)
    .then(res=>res.json())
    .then(res=>res['clues'][0]['question'])
    )===undefined){//some  games have double values so check if clue returns underfined
        fetch(`https://jservice.kenzie.academy/api/clues?value=${(this.innerHTML.slice(1))*2}&category=${classStr.slice(1)}`)
            .then(res=>{
                this.innerHTML= ""
                res.json()
            })
            .then(res=>{
                answer= res['clues'][0]['answer']
                appendClue(res['clues'][0])
            })
    }
    else [
        fetch(`https://jservice.kenzie.academy/api/clues?value=${this.innerHTML.slice(1)}&category=${classStr.slice(1)}`)
        .then(res=>{
            this.innerHTML = ""
            return res.json()
        })
        .then(res=>{
            answer = res['clues'][0]['answer']
            appendClue(res['clues'][0])
        })// fetch clues then append clue to present
    ]
}

function validateAnswer(event){
    event.preventDefault()
    let answerComparison = String(document.getElementById("answer").value)
    if (answerComparison.toLowerCase().includes(String(answer).toLowerCase())){
        answersCorrect++
        correct()
        let divCorrectAnswers = document.querySelector("#answersCorrect > div")
        divCorrectAnswers.replaceChildren(answersCorrect)
        resetAppendClue()
        removeClue()
    }
    else {
        resetAppendClue()
        wrong()
        setTimeout(() => {
            location.reload()
        }, 3000);
    }
}

function correct(){
    let img = document.createElement("img")
    img.src = "https://cdn.pixabay.com/photo/2012/04/24/16/22/check-40319_1280.png"
    img.classList.add("greenCheck")
    document.querySelector(".userFeedback").replaceChildren(img)
}

function wrong(){
    let img = document.createElement("img")
    img.src = "https://cdn.pixabay.com/photo/2014/03/25/15/19/cross-296507_1280.png"
    img.classList.add("redX")
    document.querySelector(".userFeedback").replaceChildren(img)
}

function resetAppendClue(){
    document.querySelector('.cluePresentation').remove()
}

function createForm(){
    // <form>
    //     <label for="answer"></label>
    //     <input type="text" id="answer" placeholder="Your Answer Here">
    //     <button id="submitAnswer">Submit</button>
    // </form>
    let form = document.createElement('form')
    let label = document.createElement('label')
    label.for = 'answer'
    let input = document.createElement('input')
    input.type = 'text'
    input.id = 'answer'
    input.placeholder = 'Your Answer Here'
    let button = document.createElement('button')
    button.id = 'submitAnswer'
    button.innerHTML = 'Submit'
    form.append(label)
    form.append(input)
    form.append(button)
    return form
}
