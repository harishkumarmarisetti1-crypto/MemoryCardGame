import React, { useEffect, useState } from 'react'
import GameHeader from './components/GameHeader.jsx'
import Card from './components/Card.jsx'
const  cardValues=[
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
]
const App = () => {
  const[cards,setCards]=useState([])
  const[flippedcards,setFlippedcards]=useState([]);
  const[matchedcards,setMatchedCards]=useState([]);
  const[score,setScore]=useState(0)
  const[moves,setMoves]=useState(0)
  const[isLocked,setIsLocked]=useState(false);
  const shuffleArray=(array)=>
  {
    const shuffled=[...array];
    for(let i=shuffled.length-1;i>=0;i--)
    {
      const j=Math.floor(Math.random()*(i+1));
      [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]
    }
    return shuffled;
  }
  const initializeGame=()=>
  {
    // SHUFFLE THE CARDS
    const shuffled=shuffleArray(cardValues);
    const finalCards= shuffled.map((value,index)=>(
    {
      id:index,
      value,
      isFlipped:false,
      isMatched:false,
    }
   ))
   setCards(finalCards);
   setIsLocked(false)
   setMoves(0);
   setScore(0);
   setMatchedCards([])
   setFlippedcards([]);
  };
  useEffect(()=>
  {
    initializeGame();
  },[])
  const handleCardClick=(card)=>
  {
    // Don't allow clicking if card is already flipped,matched
   if(card.isFlipped || 
    card.isMatched ||
     isLocked ||
    flippedcards.length ===2
    ) 
   {
      return;
   }
  //  Update card Flipped state
  const newCards=cards.map((c)=>
  {
    if(c.id===card.id)
    {
      return{...c,isFlipped:true};
    }
    else{
      return c;
    }
  })
  setCards(newCards)
  const newFlippedCards=[...flippedcards,card.id]
  setFlippedcards(newFlippedCards)
  // check for match if two cards are flipped
  if(flippedcards.length===1)
  {
    setIsLocked(true);
    const firstCard=cards[flippedcards[0]];
    if(firstCard.value===card.value)
    {
    setTimeout(()=>
    {
      setMatchedCards((prev)=>[...prev,firstCard.id,card.id])
      setScore((prev)=>prev+1)
      setCards((prev)=>
      prev.map((c)=>{
        if(c.id===card.id || c.id===firstCard.id)
        {
          return{...c,isMatched:true};
        }
        else{
          return c;
        }
      }));
      setFlippedcards([]);
      setIsLocked(false)
    },500);
    }
    else
    {
      // flip back card 1,card 2

      setTimeout(()=>
      {

        const flippedBackCard=newCards.map((c)=>
        {
          if(newFlippedCards.includes(c.id) || c.id===card.id) {
            return {...c,isFlipped:false};
          }
          else
          {
              return c;
          }
        })
        setCards(flippedBackCard)
        setIsLocked(false);
        setFlippedcards([]);
      },1000)
    }
    setMoves((prev)=>prev+1)
  }
  };
  return (
    <div className='app'>
    <GameHeader score={score} moves={moves} onReset={initializeGame}/>
    <div className="cards-grid">
      {cards.map((card)=>
      (
        <Card 
          card={card} 
          key={card.id}
          onClick={handleCardClick}/>
      ))}
    </div>
    </div>
  )
}
export default App