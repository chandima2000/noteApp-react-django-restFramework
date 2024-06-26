import { useState, useEffect } from "react";
import api from "../api";
import Note from '../components/Notes';
import '../styles/home.css';
import { useNavigate } from "react-router-dom";


function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) 
                  alert("Note deleted!");
                else 
                  alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) 
                  alert("Note created!");
                else 
                  alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    const logOutBtn = () => {
        navigate("/logout");
    }

    return (
        <div className="container">
            <div className="flex-content-1">
                <div className="your-notes">
                    <button className="logout" onClick={logOutBtn}>Logout</button>
                    <h2 className="home-title">Your Notes</h2>
                </div>
                
                {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id}/>)}
               
            </div>
            <div className="flex-content-2">
             <h2 className="home-title">Create a New Note</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <label htmlFor="content">Content:</label>
                    <br />
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <br />
                    <input type="submit" value="Submit"></input>
                </form>
                
            </div>
        </div>
    );
}

export default Home;