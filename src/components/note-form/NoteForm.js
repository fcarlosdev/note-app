import React, { useRef, useState } from "react";
import { connect } from "react-redux";

import { isAllFieldsEmpty } from "../../helpers/lib";

import useDetectClickOut from "../../helpers/useDetectClickOut";
import FormField from "../form-field/FormField";

import "./note-form.css";

function NoteForm(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const footRef = useRef(null);

  const handleClick = (event) => {

    if (footRef.current.children[0] === event.target) {
      formResize();
    } else if (nodeRef.current.contains(event.target)) {
      titleRef.current.style.display = "block";
      contentRef.current.classList.add("text-area-field");
      footRef.current.style.display = "flex";
    } else if (isAllFieldsEmpty([titleRef.current, contentRef.current])) {
      formResize()
    }

    addNote(event.target, titleRef.current, contentRef.current);
  };

  const { nodeRef } = useDetectClickOut(handleClick);

  const addNote = (event, titleR, contentR) => {
    if (!Array.from(event.classList).some((c) => c.startsWith("form"))) {
      if (title) {
        props.dispatch({
          type: "ADD_NOTE",
          payload: {
            id: props.notes.length + 1,
            title: title,
            content: content,
          },
        });

        setTitle("");
        setContent("");
        titleR.innerHTML = ""
        contentR.innerHTML ="" 
        formResize()
      }
    }
  };

  const formResize = () => {
      titleRef.current.style.display = "none";
      contentRef.current.classList.remove("text-area-field")
      footRef.current.style.display = "none";
  }

  return (
    <div className="note-form" ref={nodeRef}>
      <FormField
        value={title}
        className={"note-title"}
        onChange={setTitle}
        placeholder={"Title"}
        refer={titleRef}
      />
      <FormField
        value={content}
        className={"note-content"}
        onChange={setContent}
        placeholder={"Take a note..."}
        refer={contentRef}
      />
      <div className="note-footer" ref={footRef}>
        <div className="close-note" onClick={() => {
          formResize();
        }}>Close</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { notes: state.notes };
};

const mapDistachToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDistachToProps)(NoteForm);
