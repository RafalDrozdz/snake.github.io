import React, { useEffect, useReducer } from 'react';

import { stateInterface, actionInterface } from './interfaces/interfaces'

import './App.css';



const App = () => {
  const renderFood = () => {
    let x = Math.floor(Math.random()*96)
    let y = Math.floor(Math.random()*96)
    while(x%4!==0){
      x = Math.floor(Math.random()*96)
    }
    while(y%4!==0){
      y = Math.floor(Math.random()*96)
    }
    return([x,y])
  }
  const reducer = (state: stateInterface, action: actionInterface): stateInterface => {
    switch(action.type){
      case "CHANGE_DIRECTION":
        return {...state, direction: (action.payload===undefined ? '' : action.payload)}
      case "MOVE_SNAKE":
        return {...state, snakeDotsPos: moveSnake(state.direction, state.snakeDotsPos, state.food)}
        case "RENDER_FOOD":
        return {...state, food: renderFood()}
      default:
        return {...state}
    }
  }
  
  const moveSnake = (direction: string, snakeDotsPos: number[][], food: number[]) => {
    const snakeDots = [...snakeDotsPos]
    let head = snakeDotsPos[snakeDots.length-1]
    
    switch  (direction) {
      case "RIGHT":
        head = [head[0] + 4, head[1]]
      break;
      
      case "LEFT":
        head = [head[0] - 4, head[1]]
      break;

      case "UP":
        head = [head[0], head[1] - 4]
      break;

      case "DOWN":
        head = [head[0], head[1] + 4]
      break;

      default:
        break;
    }
    snakeDots.push(head)
    snakeDots.shift()

    // checkFood(head, food)
    if(head[0]===food[0] && head[1]===food[1]){
      dispatch({type: "RENDER_FOOD"})
    }
    return snakeDots;
  }

  const keyDown = (event: any ) => {
    switch (event.keyCode) {
      case 37:
        if(state.direction!=='RIGHT'){
          dispatch({type: "CHANGE_DIRECTION", payload: 'LEFT'})
        }
      break;
      case 38:
        if(state.direction!=='DOWN'){
          dispatch({type: "CHANGE_DIRECTION", payload: 'UP'})
        }
      break;
      case 39:
        if(state.direction!=='LEFT'){
          dispatch({type: "CHANGE_DIRECTION", payload: 'RIGHT'})
        }
      break;
      case 40:
        if(state.direction!=='UP'){
          dispatch({type: "CHANGE_DIRECTION", payload: 'DOWN'})
        }
      break;
      default:
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, { 
    direction: "RIGHT",
    snakeDotsPos: [[0,0],[4,0],[8,0]],
    food: renderFood(),
  });

  // const checkFood = (head: number[], food: number[]) =>{
    
  // }  
  
  useEffect(() => {
    setTimeout(() => dispatch({type: "MOVE_SNAKE"}), 200)
  }, [state.snakeDotsPos])
  useEffect(()=>{
    document.onkeydown = keyDown;
  })  
  return (
    <div className="app">
      <div className="box">
        {state.snakeDotsPos.map((dot, index) => (
          <div key={`${dot[0]}${dot[1]}${index}`} className="dot" style={{
            left: `${dot[0]}%`,
            top: `${dot[1]}%`
          }}></div>
        ))}
        <div className="food" style={{
          left: `${state.food[0]}%`,
          top: `${state.food[1]}%` 
        }}></div>
      </div>
    </div>
  );
}



export default App;
