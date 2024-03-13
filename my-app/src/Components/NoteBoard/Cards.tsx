import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faImage,
  faShare,
  faThumbtack,
  faTrashAlt,
  faSquare,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";
import "./Card.css";
import { Modal, Button, Form } from "react-bootstrap";
import ColorSelector from "./ColorSelector";
import "./Todolist.css";

interface TodoItem {
  id: string;
  title: string;
  description: string;
  background_color?: string;
  pinned: boolean;
  public: boolean;
}

interface CardProps {
  searchQuery: string;
}

const Card: React.FC<CardProps> = ({ searchQuery }) => {
  const userId = localStorage.getItem("userId");
  const saveFlag = localStorage.getItem("saveFlag");
  const [fetchTodo, setFetchTodo] = useState<TodoItem[]>([
    {
      id: "",
      title: "",
      description: "",
      pinned: false,
      public: false,
    },
  ]);
  const [hoveredCards, setHoveredCards] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedItemData, setSelectedItemData] = useState<TodoItem>({
    id: "",
    title: "",
    description: "",
    pinned: false,
    public: false,
  });

  const [backgroundColor, setBackgroundColor] = useState<string | null>(
    "#FFFFFF"
  );
  const [showColorSelector, setShowColorSelector] = useState(false);

  const textareaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTodoList();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        textareaRef.current &&
        !textareaRef.current.contains(e.target as Node)
      ) {
        setShowColorSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchTodoList = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };

    let response = await fetch(
      process.env.REACT_APP_API_URL +`${userId}/todos/`,
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

  const filteredTodos = fetchTodo.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMouseEnter = (id: string) => {
    setHoveredCards((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id: string) => {
    setHoveredCards((prev) => ({ ...prev, [id]: false }));
  };

  const deleteTodo = async (id: string) => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };

    let response = await fetch(
      process.env.REACT_APP_API_URL +`${userId}/todos/${id}`,
      {
        method: "DELETE",
        headers: headersList,
        mode: "cors",
      }
    );

    let data = await response.text();
    console.log(data);
  };

  const handleShareClick = (id: string) => {
    const selectedItem = fetchTodo.find((item) => item.id === id);
    if (selectedItem) {
      setSelectedItemId(selectedItem.id);
      localStorage.setItem("selectedId", selectedItem.id);
      setSelectedItemData(selectedItem);
      setShowModal(true);
      console.log("selected", selectedItem);
    }
    echoSendData();
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const echoSendData = async () => {
    if (!selectedItemData) {
      console.error("No selected item data");
      return;
    }

    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify(selectedItemData);

    let response = await fetch(process.env.REACT_APP_API_URL +"echo/", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.text();
    console.log(data);
    if (response.ok) {
      const newTab = window.open(`/sharedTodo/${selectedItemId}`, "_blank");
      if (newTab) {
        newTab.focus();
      } else {
        alert("Popup blocked. Please allow popups for this site.");
      }
      handleClose();
    }
  };

  const handleEditTodo = () => {
    setShowEditModal(true);
  };
  const handleEditClose = () => {
    setShowEditModal(false);
  };

  const handleColorChange = (color: string) => {
    setBackgroundColor(color);
  };

  const handleEditChange = (field: string, value: string) => {
    if (field === "pinned") {
      setSelectedItemData((prev) => ({
        ...prev,
        pinned: !prev.pinned,
      }));
    } else {
      setSelectedItemData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };
  const handlePaletteClick = () => {
    setShowColorSelector(!showColorSelector);
  };

  const handleEditTodolist = async (id: any) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };

    let bodyContent = JSON.stringify({
      user_id: userId,
      title: selectedItemData.title,
      description: selectedItemData.description,
      background_color: backgroundColor,
      pinned: selectedItemData.pinned,
      public: false,
    });

    let response = await fetch(
      process.env.REACT_APP_API_URL + `${userId}/todos/${id}/`,
      {
        method: "PUT",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.text();
    console.log(data);
    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <>
      {filteredTodos?.map((e) => (
        <Draggable key={e.id}>
          <div
            className={`card ${hoveredCards[e.id] ? "hovered" : ""}`}
            style={{ backgroundColor: e.background_color }}
            onMouseEnter={() => handleMouseEnter(e.id)}
            onMouseLeave={() => handleMouseLeave(e.id)}
            key={e.id}
          >
            <div className="card-body">
              <h5 className="card-title">{e.title}</h5>
              <p className="card-text">{e.description}</p>
              {hoveredCards[e.id] && (
                <>
                  <div className="icons">
                    <FontAwesomeIcon icon={faPalette} />
                    <FontAwesomeIcon icon={faImage} />
                    <FontAwesomeIcon
                      icon={faShare}
                      onClick={() => handleShareClick(e.id)}
                    />
                    <FontAwesomeIcon icon={faEdit} onClick={handleEditTodo} />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      onClick={() => deleteTodo(e.id)}
                    />
                  </div>
                  <div
                    className="pin-icon"
                    style={{ color: e.pinned ? "red" : "black" }}
                  >
                    <FontAwesomeIcon icon={faThumbtack} />
                  </div>
                  <Modal show={showEditModal} onHide={handleCloseEditModal}>
                    <div
                      className="todo-list"
                      style={{
                        backgroundColor: backgroundColor
                          ? backgroundColor
                          : undefined,
                      }}
                    >
                      <Form>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Form.Control
                            type="text"
                            placeholder="Title"
                            value={selectedItemData.title}
                            onChange={(e) =>
                              handleEditChange("title", e.target.value)
                            }
                            style={{
                              backgroundColor: backgroundColor
                                ? backgroundColor
                                : undefined,
                            }}
                          />

                          <div ref={textareaRef} className="textarea-container">
                            <Form.Control
                              as="textarea"
                              placeholder="Take a note..."
                              rows={3}
                              value={selectedItemData.description}
                              onChange={(e) =>
                                handleEditChange("description", e.target.value)
                              }
                              style={{
                                backgroundColor: backgroundColor
                                  ? backgroundColor
                                  : undefined,
                              }}
                            />
                            <div className="icon-container">
                              <div className="icons">
                                <FontAwesomeIcon
                                  icon={faPalette}
                                  onClick={handlePaletteClick}
                                />
                                <FontAwesomeIcon
                                  icon={faImage}
                                  // onClick={handleImageClick}
                                />
                                <FontAwesomeIcon icon={faShare} />
                                <div
                                  style={{
                                    color: selectedItemData.pinned
                                      ? "red"
                                      : "black",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faThumbtack} />
                                </div>
                              </div>
                              <div className="card-icon-button">
                                <span
                                  style={{
                                    cursor: "pointer",
                                    marginRight: "10px",
                                  }}
                                  onClick={() => handleEditTodolist(e.id)}
                                >
                                  Add
                                </span>
                                <span
                                  onClick={handleEditClose}
                                  style={{ cursor: "pointer" }}
                                >
                                  Close
                                </span>
                              </div>
                            </div>
                          </div>

                          {showColorSelector && (
                            <ColorSelector onChange={handleColorChange} />
                          )}
                        </div>
                      </Form>
                    </div>
                  </Modal>
                  <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header
                      closeButton
                      style={{ backgroundColor: "#202124", color: "white" }}
                    >
                      <Modal.Title>Edit Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>You want to share this todo?</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        No
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleShareClick(e.id)}
                      >
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </div>
          </div>
        </Draggable>
      ))}
    </>
  );
};

export default Card;
