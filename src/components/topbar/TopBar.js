import { useState } from "react";
import { connect } from "react-redux";

import { AiOutlineSearch } from "react-icons/ai";
import { IoRefresh, IoSettingsOutline } from "react-icons/io5";
import { BsGrid, BsViewStacked } from "react-icons/bs";

import "./topbar.css";
import { CHANGE_VIEW } from "../../store/constants/action-types";

function TopBar(props) {
  const [activeView, setActiveView] = useState(props.listView);

  const changeView = () => {
    let viewDirection = activeView === "row" ? "grid" : "row";
    props.dispatch({
      type: CHANGE_VIEW,
      payload: viewDirection,
    });
    setActiveView(viewDirection);
  };

  const changeListViewDirection = () => {
    return activeView === "row" ?  <BsGrid className="tai-img" />
                                : <BsViewStacked className="tai-img" />;
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="logo">Notes</span>
      </div>
      <div className="topbar-center">
        <div className="search-bar">
          <AiOutlineSearch className="search-icon" />
          <input placeholder="Search notes..." className="input-search" />
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-actions">
          <div className="topbar-action-item">
            <IoRefresh className="tai-img" />
          </div>
          <div className="topbar-action-item" onClick={changeView}>
            {changeListViewDirection()}
          </div>
          <div className="topbar-action-item">
            <IoSettingsOutline className="tai-img" />
          </div>
        </div>
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

export default connect(mapStateToProps, mapDistachToProps)(TopBar);
