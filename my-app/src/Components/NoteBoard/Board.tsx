import React from "react";
import "./Board.css";
import Todolist from "./Todlist";
import Card from "./Cards";

interface BoardProps {
  searchQuery: string;
}
const Board:React.FC<BoardProps> = ({searchQuery}) => {
  return (
    <div className="board">
      <Todolist />
      <div className="card-container" >
      <Card searchQuery={searchQuery}/>
      </div>
    </div>
  );
};

export default Board;
