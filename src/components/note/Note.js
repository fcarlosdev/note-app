import { useState } from "react";
import { connect } from "react-redux";

import { BiPalette } from "react-icons/bi";
import { IoMdMore } from "react-icons/io";

import useDetectClickOut from "../../helpers/useDetectClickOut";

import FormField from "../form-field/FormField";

import "./note.css";
import { useRef } from "react";
import NoteMenu from "../note-menu/NoteMenu";

function Note(props) {
  const { note, listView } = props;
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);
  const noteMenuRef = useRef(null);
  const tagsMenuRef = useRef(null);

  const handleClickNote = (event) => {
    const name = event.target.getAttribute("name");
    if (name === null || name !== "bt-menu") {
      hideNoteMenu();
    }
  };

  const showMenu = (event) => {
    let scroll = window.pageYOffset;
    console.log(noteMenuRef);
    console.log(tagsMenuRef);
    noteMenuRef.current.style.left = event.clientX + "px";
    noteMenuRef.current.style.top = event.clientY + scroll + 10 + "px";
    noteMenuRef.current.style.display = "block";
  };

  const hideNoteMenu = () => {
    if (noteMenuRef.current !== null) {
      noteMenuRef.current.style.display = "none";
    }
  };

  const { nodeRef } = useDetectClickOut(handleClickNote);

  const setDefaultWidth = () => (listView === "row" ? "nt-rows" : "nt-grid");

  return (
    <div className={`nt ${setDefaultWidth()}`} ref={nodeRef}>
      <div className="nt-header">
        <FormField
          value={noteTitle}
          onChange={setNoteTitle}
          placeholder={"Title here"}
        />
      </div>
      <div className="nt-content">
        <FormField
          value={noteContent}
          onChange={setNoteContent}
          placeholder={"Content here..."}
        />
      </div>
      <div className="nt-label">label here</div>
      <div className="nt-footer">
        <div className="ft-buttons">
          <BiPalette className="ft-item" />
          <IoMdMore
            className="ft-item"
            name="bt-menu"
            onMouseDown={(event) => showMenu(event)}
          />
        </div>
        <div className="fbt-close">Close</div>
        <NoteMenu props={note} innerRef={noteMenuRef} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { listView: state.listView };
};

const mapDistachToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDistachToProps)(Note);
