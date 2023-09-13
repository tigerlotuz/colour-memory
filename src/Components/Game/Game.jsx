import "./Game.scss";
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import { cardData } from "../../Data/CardData";

const Game = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [points, setPoints] = useState(0);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [cardIsLocked, setCardIsLocked] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.3)
      .map((card) => ({ ...card, id: Math.random() }));

    setCardOne(null);
    setCardTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setPoints(0);
  };

  const handleTurn = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  useEffect(() => {
    if (cardOne && cardTwo) {
      setCardIsLocked(true);

      if (cardOne.name === cardTwo.name) {
        setPoints((previousPoints) => previousPoints + 5);
        setCards((previousCards) => {
          return previousCards.map((card) => {
            if (card.name === cardOne.name) {
              return { ...card, paired: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [cardOne, cardTwo]);

  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
    setTurns((previousTurns) => previousTurns + 1);
    setCardIsLocked(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="game-wrapper">
      <header>
        <h1>Colour Game</h1>
        <button type="button" onClick={shuffleCards}>
          Reset & Start
        </button>
        <div>
          <p>Turns: {turns}</p>
          <p>Points: {points}</p>
        </div>
      </header>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={card === cardOne || card === cardTwo || card.paired}
            isLocked={cardIsLocked}
            handleTurn={handleTurn}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
