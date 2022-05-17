let timer;
let isActive = true;
const counter = document.querySelector('#counter')
const minus = document.querySelector('#minus')
const plus = document.querySelector('#plus')
const heart = document.querySelector('#heart')
const pause = document.querySelector('#pause')
const likes = document.querySelector('.likes')
const commentForm = document.querySelector('form')
let intervalId;


document.addEventListener("DOMContentLoaded", startTimer)

function startTimer(){
    timer = setInterval(handlePlus, 1000)
}

//functions
const handleMinus = () => {
    if (Number(counter.textContent) > 0){
        counter.textContent = Number(counter.textContent)-1
    }
}
const handlePlus = () => counter.textContent = parseInt(counter.textContent, 10)+1

const addLike = () => {
    const currentCount = parseInt(counter.textContent, 10)
    //const previousLikes = document.querySelectorAll('.likes > li')
    const previousLikes = Array.from(likes.children)
    const previousLike = previousLikes.find(previousLikes =>{
        const previousLikesCount = parseInt(previousLikes.textContent.slice(0, 1), 10)
        return previousLikesCount === currentCount
    })
    if (previousLike) {
        const numberOfHearts = parseInt(previousLike.textContent.split(" ").slice(-2)[0], 10)
        //console.log(numberOfHearts)
        previousLike.textContent =
            `${currentCount} has been liked ${numberOfHearts + 1} times`
    } else {
        const newLike = document.createElement('li')
        newLike.textContent = `${currentCount} has been liked 1 time`
        likes.appendChild(newLike)
    }

    
}
const handleForm = (e) => {
    e.preventDefault();

    const commentFormData = new FormData(e.target)
    const commentText = commentFormData.get('comment')
    let p = document.createElement('p')
    p.textContent = commentText
    document.querySelector('div#list').append(p)
    e.target.reset()
}

function pauseOrResumeActivity(){
    const buttons = Array.from(document.querySelectorAll("button"))
    const notPauseButton = buttons.filter(button => button.id !== "pause")

    if (isActive){
        clearInterval(timer)
        isActive = false;
        pause.textContent = 'resume'
        notPauseButton.forEach(button => button.disabled = true)
    } else {
        startTimer()
        isActive = true;
        pause.textContent = 'pause'
        notPauseButton.forEach(button => button.disabled = false)
    }
    
}

//event listeners
minus.addEventListener('click', handleMinus)
plus.addEventListener('click', handlePlus)
heart.addEventListener('click', addLike)
pause.addEventListener('click', pauseOrResumeActivity)
commentForm.addEventListener('submit', handleForm)