import { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';


export default function App() {
  
  // State Variables
  const [images, setImages] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [HighScore, setHighScore] = useState(currentScore)
  const [isGameOver, setIsGameOver] = useState(false);

  // Derived Variables



  const names = [
  "bulbasaur",      // plant-dinosaur
  "pikachu",        // electric mouse
  "psyduck",        // confused duck
  "snorlax",        // giant sleeper
  "mew",            // psychic cat
  "lucario",        // aura jackal
  "gengar",         // ghost
  "lapras",         // plesiosaur
  "scyther",        // mantis
  "ditto",          // blob
  "machamp",        // four-armed fighter
  "gyarados",       // sea serpent
  "tyranitar",      // kaiju/monster
  "torkoal",        // fire turtle
  "metagross",      // psychic mech
  "milotic",        // elegant serpent
  "rotom",          // electric ghost
  "serperior",      // snake with a regal look
  "dragapult",       // stealth bomber dragon
  "arceus"
];

  function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i - 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function addCardToSelectedCards(card){
    if (selectedCards.includes(card)){
      console.log("---------- GAME OVER ----------------");
      setCurrentScore(0);
      setIsGameOver(true);
      setSelectedCards([]);
      alert(`GameOver your Score ${currentScore}`);
      if (currentScore > HighScore){
        setHighScore(currentScore);
      }
    }
    else{
    setSelectedCards(prev => [...prev, card]);
    setCurrentScore(prev => prev+1);
    }
  }

  const pokemonObjects = names.map((name, index) => {
    return {
      key: index,
      name: name,
      image: images[index]
    }
  })

  shuffleArray(pokemonObjects);

  const pokemonElements = pokemonObjects.map((pokemonObject) => {
    return <Card addCardToSelectedCards={() => addCardToSelectedCards(pokemonObject.name)} key={pokemonObject.key} name={pokemonObject.name} image={pokemonObject.image} />
  })

  console.log(selectedCards);

  useEffect(() => {

    async function fetchPokemonImages(){
      try{
        const results = await Promise.all(
          names.map(async(name) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await res.json();
            return data.sprites.front_default;
          })
        );
        setImages(results);
      }catch(error){
        console.log("Error fetching Pokemon data : ", error);
      }
    }
    
    fetchPokemonImages();
  }, []);

  return (
    <div className='h-[100%] bg-gradient-to-r from-green-500 via-yellow-200 w-full flex flex-col justify-center items-center '>
      <header>

        <div>
          <h1 className='text-5xl '>Memory Card Game</h1>
        </div>

        <div className='flex justify-around '>
          <p>Score: {currentScore}</p>
          <p>Record: {HighScore}</p>
        </div>

      </header>


      <div className='grid grid-flow-col grid-rows-4 gap-2 '>

      {pokemonElements}

      </div>

      

      <footer>
        <p>
          by <a href="https://github.com/9ggaurav">Gaurav</a> all rights reserved
        </p>
      </footer>

    </div>
  );
}

