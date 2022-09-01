import React, { useEffect, useState } from "react";
import "./App.scss";

type PlayerProps = {
  player: number;
  life: number;
  img: string;
  dieValue: number;
  isMyTurn: boolean;
};
const Player = ({ life, img, dieValue, isMyTurn }: PlayerProps) => {
  return (
    <div className={isMyTurn ? "Player isYourTurn" : "Player"}>
      <Die value={dieValue} />
      {life}
      <progress value={life} max="100" />
      <img src={img} alt="" />
    </div>
  );
};

const Board = ({ children }: { children: JSX.Element }) => {
  return <div className="Board">{children}</div>;
};

// def
const Die = ({ value }: { value: number }) => {
  return <div className="Die">{value}</div>;
};

export const App = () => {
  const [player1, setPlayer1] = useState<PlayerProps>({
    player: 1,
    life: 100,
    dieValue: 0,
    img: "bart.png",
    isMyTurn: true,
  });

  const [player2, setPlayer2] = useState<PlayerProps>({
    player: 2,
    life: 100,
    dieValue: 0,
    img: "maggie.png",
    isMyTurn: false,
  });

  useEffect(() => {
    const damage = calcDamage(player1, player2);
    hit(damage, player1.player);
  }, [player1.dieValue, player2.dieValue]);

  const handleTurn = () => {
    const getRandomNumber = () => Math.floor(Math.random() * 6);

    setPlayer1({ ...player1, dieValue: getRandomNumber() });
    setPlayer2({ ...player2, dieValue: getRandomNumber() });
  };

  const calcDamage = (
    { dieValue: attackPower }: PlayerProps,
    { dieValue: defensePower }: PlayerProps
  ) => {
    if (attackPower < defensePower) return 0;
    return attackPower - defensePower;
  };

  const hit = (damage: number, player: number) => {
    if (player === 1) {
      setPlayer2({ ...player2, life: player2.life - damage });
      return;
    }
    setPlayer1({ ...player1, life: player1.life - damage });
  };

  return (
    <div className="App">
      <button onClick={handleTurn}>Start Turn</button>
      <Board>
        <div className="battle-field">
          <Player {...player1} />
          <Player {...player2} />
        </div>
      </Board>
    </div>
  );
};

export default App;
