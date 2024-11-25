import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import kaboom from 'kaboom';
import KhalidProSpinner from '../../components/KhalidProSpinner';

const Game = () => {
  const [score, setScore] = React.useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(true);
  const gameCanvasRef = React.useRef(null);

  React.useEffect(() => {
    //  Kaboom
    if (gameCanvasRef.current) {
      const k = kaboom({
        canvas: gameCanvasRef.current,
        width: 640,
        height: 480,
        background: [0, 0, 0],
      });

      // Create a simple player as a rectangle
      const player = k.add([
        k.rect(32, 32),
        k.color(0, 0, 255),
        k.pos(300, 300),
        k.area(),
        k.body(),
        'player',
      ]);

      // Function to spawn a coin as a circle
      function spawnCoin() {
        k.add([
          k.circle(16),
          k.color(255, 223, 0),
          k.pos(k.rand(0, 640 - 32), k.rand(0, 480 - 32)),
          'coin',
        ]);
      }
      // Static coin respawn
      spawnCoin();
      spawnCoin();
      spawnCoin();
      spawnCoin();

      k.onKeyDown('left', () => player.move(-200, 0));
      k.onKeyDown('right', () => player.move(200, 0));
      k.onKeyDown('up', () => player.move(0, -200));
      k.onKeyDown('down', () => player.move(0, 200));

      // Not working need to fix the collision when the hero and coin be on the same corrdanets
      k.onCollide('player', 'coin', (player, coin) => {
        k.destroy(coin);
        spawnCoin();
        setScore((prevScore) => prevScore + 1);
      });

      const scoreLabel = k.add([
        k.text('Score: 0'),
        k.pos(10, 10),
        k.color(255, 255, 255),
      ]);

      k.onUpdate(() => {
        scoreLabel.text = `Score: ${score}`;
      });
    }

    // playing the music
    const audio = new Audio('music.mp3');
    audio.loop = true;
    if (isMusicPlaying) {
      audio.play();
    }

    return () => {
      audio.pause();
    };
  }, [score, isMusicPlaying]);

  const toggleMusic = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl my-2">
        Soon
        <KhalidProSpinner h="5" />
      </h1>
      <canvas ref={gameCanvasRef} className="border-2 border-blue-500"></canvas>
      <p className="mt-4 text-lg font-bold">
        Use arrow keys to move and collect coins!
      </p>

      <button
        onClick={toggleMusic}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        {isMusicPlaying ? 'Pause Music' : 'Play Music'}
      </button>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/coinGame')({
  component: Game,
});

export default Game;
