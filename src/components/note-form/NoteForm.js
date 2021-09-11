import React, { useState } from "react";
import { connect } from "react-redux";

import { isAllFieldsEmpty } from "../../helpers/lib";

import useDetectClickOut from "../../helpers/useDetectClickOut";
import FormField from "../form-field/FormField";

import "./note-form.css";

function NoteForm(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClick = (event) => {
    let titleR = document.querySelector(".note-title");
    let contentR = document.querySelector(".note-content");

    if (nodeRef.current.contains(event.target)) {
      titleR.style.display = "block";
      contentR.classList.add("text-area-field");
    } else if (isAllFieldsEmpty([titleR, contentR])) {
      formResize(titleR, contentR)
    }

    addNote(event.target, titleR, contentR);
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
        formResize(titleR, contentR)
      }
    }
  };

  const formResize = (titleR, contentR) => {
      titleR.style.display = "none";
      contentR.classList.remove("text-area-field");
  }

  return (
    <div className="note-form" ref={nodeRef}>
      <FormField
        value={title}
        className={"note-title"}
        onChange={setTitle}
        placeholder={"Title"}
      />
      <FormField
        value={content}
        className={"note-content"}
        onChange={setContent}
        placeholder={"Take a note..."}
      />
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
