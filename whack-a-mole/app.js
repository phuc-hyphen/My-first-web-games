const square=document.querySelectorAll('.square')
const mole=document.querySelectorAll('.mole')
const time=document.getElementById('time-left')
let score = document.getElementById('score')

let result = 0

let current_time=time.textContent

function random_square(){
    // remove any class name for dom 
    square.forEach(Element => {
        Element.classList.remove('mole')
    })

    // create an random position

    let random_position= square[Math.floor(Math.random()*9)] 
    random_position.classList.add('mole')

    // assign the id of the random position to hit position for us to use later
    hit_position=random_position.id
    
}
square.forEach(id => {
    id.addEventListener('mouseup',()=>{
        if(id.id===hit_position)
        {
            result = result + 1
            score.textContent = result
        }
    })
})
function move_mole(){
    let timer=null
    timer = setInterval(random_square,1000)
}
function count_down(){
    current_time--
    time.textContent = current_time

    if(current_time===0) {
        clearInterval(timer)
        alert('GAME OVER !! your final score is ' + result)
    }
}

move_mole()