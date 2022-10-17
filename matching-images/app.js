// images array 
const cardArray=[
    {
        name: 'pikachu',
        img:'img/pikachu.png'
    },
    {
        name: 'pikachu',
        img:'img/pikachu.png'
    },
    {
        name: 'pichu',
        img:'img/pichu.png'
    },
    {
        name: 'pichu',
        img:'img/pichu.png'
    },
    {
        name: 'ampharos',
        img:'img/ampharos.png'
    },
    {
        name: 'ampharos',
        img:'img/ampharos.png'
    },
    {
        name: 'electabuzz',
        img:'img/electabuzz.png'
    },
    {
        name: 'electabuzz',
        img:'img/electabuzz.png'
    },
    {
        name: 'electivire',
        img:'img/electivire.png'
    },
    {
        name: 'electivire',
        img:'img/electivire.png'
    },
    {
        name: 'luxray',
        img:'img/luxray.png'
    },
    {
        name: 'luxray',
        img:'img/luxray.png'
    },
]
// randomize all cards array 
cardArray.sort(()=> 0.5 - Math.random())


// variables
const grid = document.querySelector('.grid') // select element as a variable - put defer in html so it can't be null 
const result=document.querySelector('#result')
var card_chosen = [] // make an empty array of card chosen 
var card_chosenID =[]
var card_won=[]

// functions --------------------------------------  
function create_board () {

    for(let i = 0; i< cardArray.length; i++)
    {
        var card = document.createElement('img') // create each card an image element 
        card.setAttribute('src','img/blue-sky_back.png')// set attribute for each card
        card.setAttribute('data_id',i)// give each card an id 
        card.addEventListener('click',flipCard) //set action for each card 
        grid.appendChild(card) // set up each card into the grid  

    }
} 
// flip function 

function flipCard(){
    var cardID = this.getAttribute("data_id")

    card_chosen.push(cardArray[cardID].name) // add in to card chosen array the name of the card

    card_chosenID.push(cardID)
 
    this.setAttribute('src',cardArray[cardID].img) // add card img base on the card ID it hold 

    if(card_chosen.length == 2 ){
        setTimeout(checkformatch, 500)
    }
}

function checkformatch(){
    var cards = document.querySelectorAll('img')

    const option_1=card_chosenID[0]
    const option_2=card_chosenID[1]
    
    if(card_chosen[0] === card_chosen[1]){ // if two cards are the same => set background white 
        alert("you found a match")

        cards[option_1].setAttribute('src','img/white_background.png') // set theses card to the white back ground
        cards[option_2].setAttribute('src','img/white_background.png')

        card_won.push(card_chosen)
    }
    else{
        cards[option_1].setAttribute('src','img/blue-sky_back.png') // set back theses card to the white back ground
        cards[option_2].setAttribute('src','img/blue-sky_back.png')
        alert('sorry, try again ')
    }

    //set back card chosen array to 0 
    card_chosen=[]
    card_chosenID=[]

    // display result
    result.textContent= card_won.length 

    // condition to win (card won array == card array / 2)
    
    if(card_won.length === cardArray.length/2)
    {
        result.textContent = "Congratulation !!! "
        alert(" Congratulation !! You won !!! ")
    }

}
 

/*---------------------------------------Main------------------------------------*/
// execution code 

if(document.readyState=='loading'){// if the document is still loading use this event code 
    
    document.addEventListener('DOMContentLoaded', () => {

        create_board()
    })
}
else {
    create_board()
}






