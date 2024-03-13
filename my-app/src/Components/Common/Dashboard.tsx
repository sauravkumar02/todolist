import React ,{useState}from "react";
import LeftSidebar from "./LeftSidebar";
import Header from "./Header";
import Board from "../NoteBoard/Board";
import "./Dashboard.css"; 

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="dashboard">
      <Header setSearchQuery={setSearchQuery} />
      <div className="content-wrapper">
        <LeftSidebar />
        <Board searchQuery={searchQuery}/>
      </div>
    </div>
  );
};

export default Dashboard;
