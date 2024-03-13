import React, { useState, useEffect, useRef } from "react";
import { Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faImage, faShare } from "@fortawesome/free-solid-svg-icons";
import ColorSelector from "./ColorSelector";
import "./Todolist.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todolist: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const [showTextarea, setShowTextarea] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string | null>(
    "#FFFFFF"
  );
  const [showColorSelector, setShowColorSelector] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const textareaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        textareaRef.current &&
        !textareaRef.current.contains(e.target as Node)
      ) {
        setShowTextarea(false);
        setShowColorSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setShowTextarea(true);
  };

  const handleColorChange = (color: string) => {
    setBackgroundColor(color);
  };

  const handlePaletteClick = () => {
    setShowColorSelector(!showColorSelector);
  };

  const handleSaveTodo = async () => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };

    let bodyContent = JSON.stringify({
      user_id: userId,
      title: title,
      description: description,
      background_color: backgroundColor,
      pinned: pinned,
    });

    let response = await fetch(
      process.env.REACT_APP_API_URL +`${userId}/todos/`,
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.text();
    console.log(data);
    if (response.ok) {
      toast.success("Note Created Successfully");
      window.location.reload();
    }
  };

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setDescription(`![Image](${reader.result})`);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="todo-list-container">
      <div
        className="todo-list"
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
        }}
      >
        <Form>
          <div className="todo-list-content">
            <Form.Control
              type="text"
              placeholder="Title"
              onClick={handleInputClick}
              style={{
                width: "100%",
                backgroundColor: backgroundColor ? backgroundColor : undefined,
              }}
              onChange={(e) => setTitle(e.target.value)}
            />
            {showTextarea && (
              <div ref={textareaRef} className="textarea-container">
                <Form.Control
                  as="textarea"
                  placeholder="Take a note..."
                  rows={3}
                  style={{
                    width: "100%",
                    backgroundColor: backgroundColor
                      ? backgroundColor
                      : undefined,
                  }}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="icon-container">
                  <div className="icons">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Color</Tooltip>}
                    >
                      <FontAwesomeIcon
                        icon={faPalette}
                        onClick={handlePaletteClick}
                      />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Image</Tooltip>}
                    >
                      <FontAwesomeIcon
                        icon={faImage}
                        onClick={handleImageClick}
                      />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Share</Tooltip>}
                    >
                      <FontAwesomeIcon icon={faShare} />
                    </OverlayTrigger>
                  </div>
                  <div className="icon-button">
                    <span
                      onClick={handleSaveTodo}
                      style={{ cursor: "pointer" }}
                    >
                      Add
                    </span>
                    <span style={{ cursor: "pointer" }}>Close</span>
                  </div>
                </div>
              </div>
            )}
            {showColorSelector && (
              <ColorSelector onChange={handleColorChange} />
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Todolist;
