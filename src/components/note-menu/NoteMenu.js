import React, { useState } from "react";
import { connect } from "react-redux";
import useDetectClickOut from "../../helpers/useDetectClickOut";

import { DELETE_NOTE } from "../../store/constants/action-types";

import "./note-menu.css";

function NoteMenu(props) {
  const [showMenuOptions, setShowMenuOptions] = useState("block");

  const {
    props: { id },
    innerRef,
    dispatch,
    tags,
    setLabels,
  } = props;

  const deleteNote = (id) => {
    dispatch({
      type: DELETE_NOTE,
      payload: { id },
    });
  };

  const addLabel = () => {
    setShowMenuOptions("none");
  };

  const selLabel = (e) => {
    setLabels(e.target.value)
  };

  const showSelectTagList = () => {
    return (
      <div className="tag-menu" ref={nodeRef}>
        <div className="tg-top">
          <h5 className="tg-head">Label</h5>
          <input type="text" className="tg-input" placeholder="New label" />
        </div>
        <div className="tg-available">
          {tags.map((t) => (
            <label key={t} className="tg-item">
              <input
                type="checkbox"
                value={t}
                className="checkmark tg-check"
                onClick={(e) => selLabel(e)}
              />
              {t}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const showMenu = () => {
    return (
      <div className="nt-menu" ref={innerRef}>
        <div className="nt-menu__item" onClick={() => deleteNote(id)}>
          Delete note
        </div>
        <div className="nt-menu__item" onClick={addLabel}>
          Add label
        </div>
      </div>
    );
  };

  const handleClickMenu = (event) => {
    if (
      !Array.from(event.target.classList).some((c) => c.startsWith("tg")) &&
      nodeRef.current
    ) {
      nodeRef.current.style.display = "none";
      setShowMenuOptions("block");
    }
  };

  const { nodeRef } = useDetectClickOut(handleClickMenu);

  return (
    <div className="menu-wrapper">
      {showMenuOptions === "block" ? showMenu() : showSelectTagList()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { tags: state.tags };
};

const mapDistachToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDistachToProps)(NoteMenu);
