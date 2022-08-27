import React from 'react';

function gotoLink(url) {
    window.location.href = url;
}

function Home() {
  return (
    <div>
        <h1>HOME</h1>
        <button onClick={() => gotoLink("game")}>PLAY GAME</button>
    </div>
  );
}

export default Home;


