import React, { useState, useEffect } from 'react';
import '../style/Game.scss';
import imgBlankCell from '../image/blankcell.png';
import imgTwoPoints from '../image/twopoints.png';
import imgFourPoints from '../image/fourpoints.png';
import imgEightPoints from '../image/eightpoints.png';
import imgSixteenPoints from '../image/sixteenpoints.png';
import imgThirtytwoPoints from '../image/thirtytwopoints.png';
import imgSixtyfourPoints from '../image/sixtyfourpoints.png';
import img128Points from '../image/128points.png';
import img256Points from '../image/256points.png';
import img512Points from '../image/512points.png';
import img1024Points from '../image/1024points.png';
import img2048Points from '../image/2048points.png';
import img4096Points from '../image/4096points.png';
import img8192Points from '../image/8192points.png';
import img16384Points from '../image/16384points.png';

const twoIndtoOneInd = (row, col) => {
    return (row - 1) * 4 + col - 1;
}

const randomTwoNumber = (min, max) => {
    return Math.round(min + Math.random() * (max - min));
}

const randomNewBox = (oldArray) => {
    var indOfBlankBox = [];
    for(let i = 0; i < oldArray.length; i++) {
        if (oldArray[i] == 0) {
            indOfBlankBox.push(i);
        }
    }
    if (indOfBlankBox.length == 0) return [];
    else {
        var indNewBox = randomTwoNumber(1, indOfBlankBox.length) - 1;
        var valueNewBox = randomTwoNumber(1, 5);
        oldArray[indOfBlankBox[indNewBox]] = (valueNewBox==1?4:2);
        return oldArray;
    }
    
}

const Box = (box) => { 
    if (box.value == 0) return <img src={imgBlankCell}/>;
    else if (box.value == 2) return <img src={imgTwoPoints}/>;
    else if (box.value == 4) return <img src={imgFourPoints}/>;
    else if (box.value == 8) return <img src={imgEightPoints}/>;
    else if (box.value == 16) return <img src={imgSixteenPoints}/>;
    else if (box.value == 32) return <img src={imgThirtytwoPoints}/>;
    else if (box.value == 64) return <img src={imgSixtyfourPoints}/>;
    else if (box.value == 128) return <img src={img128Points}/>;
    else if (box.value == 256) return <img src={img256Points}/>;
    else if (box.value == 512) return <img src={img512Points}/>;
    else if (box.value == 1024) return <img src={img1024Points}/>;
    else if (box.value == 2048) return <img src={img2048Points}/>;
    else if (box.value == 4096) return <img src={img4096Points}/>;
    else if (box.value == 8192) return <img src={img8192Points}/>;
    else if (box.value == 16384) return <img src={img16384Points}/>;
}

const Game = () => {
    const listArray = [0, 0, 0, 0,
                       0, 0, 0, 0,
                       0, 0, 0, 0,
                       0, 0, 0, 0];                   
    const [listBoxValue, setListBoxValue] = useState(listArray);
    const [score, setScore] = useState(0);
    const [notify, setNotify] = useState("2048");

    useEffect(() => {
        setListBoxValue([...randomNewBox(listArray)]);
        setScore(0);
        setNotify("2048");
      }, []);    

    const ListofBox = () => {
        return listBoxValue.map((number) => <Box value={number}/>);
    }

    const checkLoseGame = () => {
        for(let i = 0; i < listBoxValue.length; i++) {
            if (listBoxValue[i] == 0) return false;
        }
        for(let col = 1; col <= 4; col++) {
            for(let row = 1; row < 4; row++) {
                if (listBoxValue[twoIndtoOneInd(row, col)] == listBoxValue[twoIndtoOneInd(row + 1, col)]) {
                    return false;
                }
            }
        }
        for(let row = 1; row <= 4; row++) {
            for(let col = 1; col < 4; col++) {
                if (listBoxValue[twoIndtoOneInd(row, col)] == listBoxValue[twoIndtoOneInd(row, col + 1)]) {
                    return false;
                }
            }
        }
        return true;
    }

    const turnUpBoxState = () => {
        var doSomething = false;
        var currentListBoxValue = listBoxValue;
        for(let col = 1; col <= 4; col++) {
            for (let row = 1; row < 4; row++) {
                if (currentListBoxValue[twoIndtoOneInd(row, col)] != 0) {
                    var nearestInd = row + 1;
                    while(nearestInd <= 4) {
                        if (currentListBoxValue[twoIndtoOneInd(nearestInd, col)] == 0) nearestInd++;
                        else break; 
                    }
                    if (nearestInd != 5) {
                        if (currentListBoxValue[twoIndtoOneInd(row, col)] == currentListBoxValue[twoIndtoOneInd(nearestInd, col)]) {
                            setScore(score + currentListBoxValue[twoIndtoOneInd(row, col)]);
                            currentListBoxValue[twoIndtoOneInd(row, col)] *= 2;
                            currentListBoxValue[twoIndtoOneInd(nearestInd, col)] = 0;
                            doSomething = true;
                        }
                    } 
                    else {
                            break;
                    }
                }
            }
            for (let row = 1; row < 4; row++) {
                if (currentListBoxValue[twoIndtoOneInd(row, col)] == 0) {
                    var nearestInd = row + 1;
                    while(nearestInd <= 4) {
                        if (currentListBoxValue[twoIndtoOneInd(nearestInd, col)] == 0) nearestInd++;
                        else break;
                    }
                    if (nearestInd != 5) {
                        currentListBoxValue[twoIndtoOneInd(row, col)] = currentListBoxValue[twoIndtoOneInd(nearestInd, col)];
                        currentListBoxValue[twoIndtoOneInd(nearestInd, col)] = 0;
                        doSomething = true;
                    } 
                    else {
                        break;
                    }
                }
            }
        }
        if (doSomething == true) setListBoxValue([...randomNewBox(currentListBoxValue)]);
        return doSomething;
    }
    
    const turnDownBoxState = () => {
        var doSomething = false;
        var currentListBoxValue = listBoxValue;
        for(let col = 1; col <= 4; col++) {
            for (let row = 4; row > 1; row--) {
                if (currentListBoxValue[twoIndtoOneInd(row, col)] != 0) {
                    var nearestInd = row - 1;
                    while(nearestInd >= 1) {
                        if (currentListBoxValue[twoIndtoOneInd(nearestInd, col)] == 0) nearestInd--;
                        else break; 
                    }
                    if (nearestInd != 0) {
                        if (currentListBoxValue[twoIndtoOneInd(row, col)] == currentListBoxValue[twoIndtoOneInd(nearestInd, col)]) {
                            setScore(score + currentListBoxValue[twoIndtoOneInd(row, col)]);
                            currentListBoxValue[twoIndtoOneInd(row, col)] *= 2;
                            currentListBoxValue[twoIndtoOneInd(nearestInd, col)] = 0;
                            doSomething = true;
                        }
                    } 
                    else {
                            break;
                    }
                }
            }
            for (let row = 4; row > 1; row--) {
                if (currentListBoxValue[twoIndtoOneInd(row, col)] == 0) {
                    var nearestInd = row - 1;
                    while(nearestInd >= 1) {
                        if (currentListBoxValue[twoIndtoOneInd(nearestInd, col)] == 0) nearestInd--;
                        else break;
                    }
                    if (nearestInd != 0) {
                        currentListBoxValue[twoIndtoOneInd(row, col)] = currentListBoxValue[twoIndtoOneInd(nearestInd, col)];
                        currentListBoxValue[twoIndtoOneInd(nearestInd, col)] = 0;
                        doSomething = true;
                    } 
                    else {
                        break;
                    }
                }
            }
        }
        if (doSomething == true) setListBoxValue([...randomNewBox(currentListBoxValue)]);
        return doSomething;
    }

    const turnLeftBoxState = () => {
        var doSomething = false;
        var currentListBoxValue = listBoxValue;
        for(let row = 1; row <= 4; row++) {
            for (let col = 1; col < 4; col++) {
                if (currentListBoxValue[twoIndtoOneInd(row, col)] != 0) {
                    var nearestInd = col + 1;
                    while(nearestInd <= 4) {
                        if (currentListBoxValue[twoIndtoOneInd(row, nearestInd)] == 0) nearestInd++;
                        else break; 
                    }
                    if (nearestInd != 5) {
                        if (currentListBoxValue[twoIndtoOneInd(row, col)] == currentListBoxValue[twoIndtoOneInd(row, nearestInd)]) {
                            setScore(score + currentListBoxValue[twoIndtoOneInd(row, col)]);
                            currentListBoxValue[twoIndtoOneInd(row, col)] *= 2;
                            currentListBoxValue[twoIndtoOneInd(row, nearestInd)] = 0;
                            doSomething = true;
                        }
                    } 
                    else {
                            break;
                    }
                }
            }
            for (let col = 1; col < 4; col++) {
                if (currentListBoxValue[twoIndtoOneInd(row, col)] == 0) {
                    var nearestInd = col + 1;
                    while(nearestInd <= 4) {
                        if (currentListBoxValue[twoIndtoOneInd(row, nearestInd)] == 0) nearestInd++;
                        else break;
                    }
                    if (nearestInd != 5) {
                        currentListBoxValue[twoIndtoOneInd(row, col)] = currentListBoxValue[twoIndtoOneInd(row, nearestInd)];
                        currentListBoxValue[twoIndtoOneInd(row, nearestInd)] = 0;
                        doSomething = true;
                    } 
                    else {
                        break;
                    }
                }
            }
        }
        if (doSomething == true) setListBoxValue([...randomNewBox(currentListBoxValue)]);
        return doSomething;
    }

    const turnRightBoxState = () => {
        var doSomething = false;
        var currentListBoxValue = listBoxValue;
        for(let row = 1; row <= 4; row++) {
            for (let col = 4; col > 1; col--) {
                if (currentListBoxValue[twoIndtoOneInd(row, col)] != 0) {
                    var nearestInd = col - 1;
                    while(nearestInd >= 1) {
                        if (currentListBoxValue[twoIndtoOneInd(row, nearestInd)] == 0) nearestInd--;
                        else break; 
                    }
                    if (nearestInd != 0) {
                        if (currentListBoxValue[twoIndtoOneInd(row, col)] == currentListBoxValue[twoIndtoOneInd(row, nearestInd)]) {
                            setScore(score + currentListBoxValue[twoIndtoOneInd(row, col)]);
                            currentListBoxValue[twoIndtoOneInd(row, col)] *= 2;
                            currentListBoxValue[twoIndtoOneInd(row, nearestInd)] = 0;
                            doSomething = true;
                        }
                    } 
                    else {
                            break;
                    }
                }
            }
            for (let col = 4; col > 1; col--) {
                if (currentListBoxValue[twoIndtoOneInd(row, col)] == 0) {
                    var nearestInd = col - 1;
                    while(nearestInd >= 1) {
                        if (currentListBoxValue[twoIndtoOneInd(row, nearestInd)] == 0) nearestInd--;
                        else break;
                    }
                    if (nearestInd != 0) {
                        currentListBoxValue[twoIndtoOneInd(row, col)] = currentListBoxValue[twoIndtoOneInd(row, nearestInd)];
                        currentListBoxValue[twoIndtoOneInd(row, nearestInd)] = 0;
                        doSomething = true;
                    } 
                    else {
                        break;
                    }
                }
            }
        }
        if (doSomething == true) setListBoxValue([...randomNewBox(currentListBoxValue)]);
        return doSomething;
    }

    const handler = (event) => {
        if (event.key == "ArrowDown"
         || event.key == "ArrowUp" 
         || event.key == "ArrowLeft"
         || event.key == "ArrowRight") {
            event.preventDefault();
        }
        if (event.key == "ArrowDown") {
            turnDownBoxState();
            if (checkLoseGame()) {
                setNotify("LOSE");
            }
        }
        else if (event.key == "ArrowUp") {
            turnUpBoxState();
            if (checkLoseGame()) {
                setNotify("LOSE");
            }
        }
        else if (event.key == "ArrowLeft") {
            turnLeftBoxState();
            if (checkLoseGame()) {
                setNotify("LOSE");
            }
        }
        else if (event.key == "ArrowRight") {
            turnRightBoxState();
            if (checkLoseGame()) {
                setNotify("LOSE");
            }
        }
    }
    return (
        <div>
        <div class="container" onKeyDown={(e) => handler(e)} tabIndex={0}>
            <div class="game-container" >
                <div class="game-title">
                    <h1>{notify}</h1>
                    <h1>Score: {score}</h1>
                </div>
                <div class="game-content">
                    <div class="box-container">
                        <ListofBox></ListofBox>
                    </div>
                </div>
            </div>
        </div>
        </div>
        );
}

export default Game;


