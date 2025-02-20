"use strict";
const input = document.getElementById('search-input');
const buttsearch = document.getElementById('search-button');
const pk = document.getElementById('pokemon-name');
const pkid = document.getElementById('pokemon-id');
const w = document.getElementById('weight');
const h = document.getElementById('height');
const hp = document.getElementById('hp');
const atk = document.getElementById('attack');
const def = document.getElementById('defense');
const s_atk = document.getElementById('special-attack');
const s_def = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const type = document.getElementById('types');
const imageplace = document.getElementById('img-container');

buttsearch.addEventListener('click',() =>{
    event.preventDefault()
    console.log('Event');
if(input.value != ''){
    console.log(input.value);
    Poke_Search();

}else{
    alert('Please search a Pokemon Name');
}


})


async function Poke_Search(){
   const pokemonName1 = input.value.toLowerCase().trim();
   console.log(pokemonName1);
   try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName1}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('PASSOU')
    console.log(data.name);
    pk.textContent  = `${data.name}`;
    console.log(data.id);
    console.log('api call');
    pkid.textContent  = `#${data.id}`;
    w.textContent  = `Weight: ${data.weight} Kg`;
    h.textContent  = `Height: ${data.height} Ft`;
    hp.textContent = `${data.stats[0].base_stat}`;
    atk.textContent = `${data.stats[1].base_stat}`;
    def.textContent = `${data.stats[2].base_stat}`;
    s_atk.textContent = `${data.stats[3].base_stat}`;
    s_def.textContent = `${data.stats[4].base_stat}`;
    speed.textContent = `${data.stats[5].base_stat}`;
    type.textContent =`${data.types[0].type.name}`;
    const pokeSpriteF = data.sprites.front_default;
    const pokeSpriteB = data.sprites.back_default;
    const img_F = document.getElementById("pokemonImgF");
    const img_B = document.getElementById("pokemonImgB");
    img_F.src=pokeSpriteF;
    img_B.src=pokeSpriteB;
    img_F.style.display = "block";
    img_B.style.display = "block";

}catch(error){
    console.log(error);
}


}



