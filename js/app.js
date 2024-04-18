// Testing the Pokemon Api
const pokemon1 = document.querySelector(".pokemon1");
const pokemon2 = document.querySelector(".pokemon2");
let pokemonBackgroundUrl = [];
const fetchBtn = document.querySelector(".fetch-pokemon");
const muteBtn = document.querySelector(".stop");

muteBtn.addEventListener("click",muteMusic);
function muteMusic(){
    if(document.querySelector("#audio").paused){
        document.querySelector('#audio').play();
        muteBtn.innerText="Mute Music";

    }else{
        document.querySelector('#audio').pause();
        muteBtn.innerText="Play Music";
    }
}

// fetching a single pokemon by id
function fetchPokemon(container,id,background_url){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(pokemon => {
            //console.dir(pokemon);
            // A pokemon object contains some useful data like name and url to image (sprites.other.dream_world.front_default)
            // console.dir(pokemon)

            // append pokemon image, name, and type to the container
            const img = document.createElement("img");
            img.src=pokemon.sprites.other.dream_world.front_default;

            pokemonBackgroundUrl.push(pokemon.sprites.other.dream_world.front_default);
            // console.log(pokemon.sprites.other.dream_world.front_default)
            const name = document.createElement("h2");
            name.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            // console.dir(pokemon.types);
            const pokeType = document.createElement("h3");
            pokemon.types.forEach(type =>{
                // console.dir(type)
                pokeType.innerText += type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1) + " ";
            })
            // empty the container then add the new pokemon
            container.innerHTML = "";
            container.append(img);
            container.append(name);
            container.append(pokeType);
        })
}

// get two random pokemon to start the game
fetchPokemon(pokemon1,3);
fetchPokemon(pokemon2,6);

// restart the game and get two random pokemon
const fetchRandomPokemon = (event) => {
    removeBackground();
    init();
    pokemonBackgroundUrl = [];
    fetchPokemon(pokemon1,Math.floor(Math.random() * 151));
    fetchPokemon(pokemon2,Math.floor(Math.random() * 151));
}

fetchBtn.addEventListener("click",fetchRandomPokemon);

// removeBackground
const removeBackground = (event) => {
    squareEls.forEach(square => {
        square.style.backgroundImage = "";
        square.style.backgroundColor = "";
    })
}


// lab Work
/******************************************************************************/
let board;
let turn;
let winner;
let tie;
let message;
const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]];

const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetEl = document.querySelector(".reset");

// initial state of the board
function init(){
    board = ["","","","","","","","",""];
    turn = "X";
    winner = false;
    tie = false;
    render(board,winner,tie,turn);
}

// render the inital board
function render(board,winner,tie,turn){
    updateBoard(board);
    updateMessage(winner,tie,turn);
}

// update the board
function updateBoard(){
    board.forEach((square,index) =>{
        squareEls[index].innerText = square;
    })
}

// switch player turn
function switchPlayerTurn(){
    if(!winner){
        if(turn==="X"){
            turn = "O";
        }else{
            turn = "X";
        }
    }
}

// update message
function updateMessage(){
    if(winner===false && tie===false){
        if(turn === "X"){
            messageEl.innerText = "Turn of Trainer Red"
        }else{
            messageEl.innerText = "Turn of Trainer Blue"
        }
    }else if(winner===false && tie===true){
        messageEl.innerText = "Tie Game"
    }else{
        if(winner){
            if(turn === "X"){
                messageEl.innerText = "Trainer Red Wins";
                resetEl.style.display = "block";
            }else{
                if(turn === "O"){
                    messageEl.innerText = "Trainer Blue Wins";
                    resetEl.style.display = "block";
                }
            }
        }
    }
}

// check for tie
function checkForTie(){
    if(!winner){
        if(!board.includes("")){
            tie = true;
        }
    }
}

// check for winner
function checkForWinner(){
    winningCombos.forEach(combo =>{
        if(board[combo[0]]==="X" & board[combo[1]]==="X" && board[combo[2]]==="X"){
            winner=true;
        }else{
            if(board[combo[0]]==="O" & board[combo[1]]==="O" && board[combo[2]]==="O"){
                winner=true;
            }
        }
    })
    return winner;
}

// place a piece
function placePiece(index){
    if(board[index]==="" && !winner){
        board[index] = turn;
    }else{
        switchPlayerTurn();
    }
}

// handle clicking and check game conditions
const handleClick = (event) => {
    // extra
    if(!winner){
        if(event.target.innerText === ""){
            if(turn==="X"){
                event.target.style.backgroundImage = 'url(' + pokemonBackgroundUrl[0] +')';
                event.target.style.backgroundColor = "#DF2E38";
            }else{
                event.target.style.backgroundImage = 'url(' + pokemonBackgroundUrl[1] +')';
                event.target.style.backgroundColor = "#0081C9";
    
            }
        }
    }
    // lab work
    placePiece(event.target.id);
    updateBoard();
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    updateMessage();
}
// adding eventListeners
squareEls.forEach(square =>{
    square.addEventListener("click",handleClick);
})

// reset and play again
resetEl.addEventListener("click",init);
resetEl.addEventListener("click",removeBackground);

// initialize the game
init();






