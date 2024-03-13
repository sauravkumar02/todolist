import React,{useState} from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useSidebar } from "../SidebarContext";

interface TodoItem {
  id: string;
  title: string;
  description: string;
  background_color?: string;
  pinned: boolean;
  public: boolean;
}


interface HeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}


const Header:React.FC<HeaderProps> = ({setSearchQuery})=> {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("fullname");
  const [fetchTodo, setFetchTodo] = useState<TodoItem[]>([
    {
      id: "",
      title: "",
      description: "",
      pinned: false,
      public: false,
    },
  ]);
  
  const fetchTodoList = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };

    let response = await fetch(
      `http://127.0.0.1:8000/api/v1/${userId}/todos/`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    if (response.ok) {
      setFetchTodo(data);
    }
  };


  return (
    <Navbar >
      <div className="hermburger-icon">
        {/* <FontAwesomeIcon
          icon={faBars}
          color="white"
          style={{ fontSize: "24px" }}
        /> */}
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">SK Keep</Nav.Link>
        </Nav>
        <Form className="d-flex flex-grow-1">
          <FormControl
            type="search"
            placeholder="Search you Todo ..."
            className="search-input"
            aria-label="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>
        <Navbar.Text>
          Welcome: <a href="#login">{userName}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
