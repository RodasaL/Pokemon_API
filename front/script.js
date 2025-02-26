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
const color1Square = document.getElementById('color1');
const color2Square = document.getElementById('color2');
const img_F = document.getElementById("pokemonImgF");
const img_B = document.getElementById("pokemonImgB");
let conversionw, conversionh;

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
    
    const response = await fetch(`http://localhost:3333/fetchpokemon/${pokemonName1}`,{
        method: "GET"

    });
        console.log(response);
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
    weight(data.weight);
    height(data.height);
    w.textContent  = `Weight: ${conversionw} Kg`;
    h.textContent  = `Height: ${conversionh} m`;
    hp.textContent = `${data.stats.hp}`;
    atk.textContent = `${data.stats.attack}`;
    def.textContent = `${data.stats.defense}`;
    s_atk.textContent = `${data.stats.specialAttack}`;
    s_def.textContent = `${data.stats.specialDefense}`;
    speed.textContent = `${data.stats.speed}`;
    type.textContent =`${data.types}`;
    const pokeSpriteF = data.sprites.front;
    const pokeSpriteB = data.sprites.back;
    img_F.src=pokeSpriteF;
    img_B.src=pokeSpriteB;
    img_F.style.display = "block";
    img_B.style.display = "block";

    color1Square.style.backgroundColor = data.color1;
    color2Square.style.backgroundColor = data.color2;

}catch(error){
    console.log(error);
}


}

function weight(weight_f){
    
    if(weight_f > 9){
        conversionw = weight_f / 10;
        conversionw.toFixed(1);
    }
    else if(weight_f > 99){
        conversionw = weight_f / 100;
        conversionw.toFixed(1);
    }
    else if(weight_f > 999){
        conversionw = weight_f / 1000;
        conversionw.toFixed(1);
    }
    else if(weight_f > 9999){
        conversionw = weight_f / 10000;
        conversionw.toFixed(1);
    }
    else{
        conversionw = weight_f;
    }
    
}

function height(height_f){

    if(height_f > 9){
        conversionh = height_f / 10;
        conversionh.toFixed(1);
    }
    else if(height_f > 99){
        conversionh = height_f / 100;
        conversionh.toFixed(1);
    }
    else if(height_f > 999){
        conversionh = height_f / 1000;
        conversionh.toFixed(1);
    }
    else if(height_f > 9999){
        conversionh = height_f / 10000;
        conversionh.toFixed(1);
    }
    else{
        conversionh = height_f / 10;
        
    }
}