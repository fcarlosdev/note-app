import Note from "../note/Note";
import "./noteslist.css";
import { connect } from "react-redux";

function NoteList(props) {
  const { notes, listView } = props;

  return (
    <div className={`notes ${listView}`}>
      {notes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { notes: state.notes, listView: state.listView };
};

export default connect(mapStateToProps)(NoteList);
