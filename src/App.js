import "./App.css";
import TopBar from "./components/topbar/TopBar";
import NoteForm from "./components/note-form/NoteForm";
import TagList from "./components/tag-list/TagList";
import NoteList from "./components/note-list/NoteList";

function App() {
  return (
    <div className="app">
      <TopBar />
      <div className="main-container">
        <TagList />
        <div className="main-content">
          <NoteForm />
          <NoteList />
        </div>
      </div>
    </div>
  );
}

export default App;
