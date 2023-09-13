import "./Card.scss";

const Card = ({ card, isFlipped, isLocked, handleTurn }) => {
  const handleOnClick = () => {
    if (!isLocked) {
      handleTurn(card);
    }
  };

  return (
    <div className="card-wrapper">
      <div className={isFlipped ? "is-flipped" : ""}>
        <img src={card.src} alt="frontside" />
        <img src="/img/smoke.jpg" alt="backside" onClick={handleOnClick} />
      </div>
    </div>
  );
};

export default Card;
