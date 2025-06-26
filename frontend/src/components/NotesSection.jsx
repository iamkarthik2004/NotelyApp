import { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import '../styles/NotesSection.css';
import config from '../config/config';

const NotesSection = ({ subject, year, semester }) => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'title'
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (isAddingNote && !editorRef.current) {
      editorRef.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean']
          ]
        },
        formats: [
          'header',
          'bold', 'italic', 'underline', 'strike', 'blockquote',
          'list', 'bullet', 'indent',
          'link'
        ],
        placeholder: 'Enter note content...'
      });

      editorRef.current.on('text-change', () => {
        setNewNote(prev => ({ ...prev, content: editorRef.current.root.innerHTML }));
      });
    }
  }, [isAddingNote]);

  // Fetch notes for this subject
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/notes?subject=${subject}&year=${year}&semester=${semester}`);
        if (!response.ok) throw new Error('Failed to fetch notes');
        const data = await response.json();
        setNotes(data);
        setFilteredNotes(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load notes. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [subject, year, semester]);

  // Filter and sort notes
  useEffect(() => {
    let result = [...notes];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    
    setFilteredNotes(result);
  }, [notes, searchTerm, sortBy]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiUrl}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content,
          subject,
          year,
          semester
        }),
      });

      if (!response.ok) throw new Error('Failed to add note');

      const addedNote = await response.json();
      setNotes(prev => [...prev, addedNote]);
      handleCloseModal();
    } catch (err) {
      setError('Failed to add note. Please try again.');
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const response = await fetch(`${config.apiUrl}/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete note');

      setNotes(prev => prev.filter(note => note._id !== noteId));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete note. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setIsAddingNote(false);
    setNewNote({ title: '', content: '' });
    editorRef.current = null;
  };

  if (isLoading) return <div className="notes-loading">Loading notes...</div>;
  if (error) return <div className="notes-error">{error}</div>;

  return (
    <div className="notes-section" id="notes-section">
      <div className="notes-header">
        <div className="notes-title">
          <h3>{subject} Notes</h3>
          <span className="notes-subtitle">Year {year} - Semester {semester}</span>
        </div>
        <button 
          className="add-note-btn"
          onClick={() => setIsAddingNote(true)}
        >
          <i className="fas fa-plus"></i> Add Note
        </button>
      </div>

      <div className="notes-controls">
        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              ×
            </button>
          )}
        </div>
        <div className="sort-controls">
          <label>Sort by:</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {isAddingNote && (
        <div className="add-note-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Add New Note</h4>
              <button 
                className="close-modal-btn"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddNote}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={newNote.title}
                  onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter note title"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <div ref={quillRef} style={{ height: '300px' }} />
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="notes-grid">
        {filteredNotes.map(note => (
          <div key={note._id} className="note-card">
            <div className="note-card-header">
              <h4>{note.title}</h4>
              <button
                className="delete-btn"
                onClick={() => setDeleteConfirm(note._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
            <div 
              className="note-card-content"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
            <div className="note-footer">
              <span className="note-date">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </div>
            {deleteConfirm === note._id && (
              <div className="delete-confirm">
                <p>Are you sure you want to delete this note?</p>
                <div className="delete-actions">
                  <button onClick={() => setDeleteConfirm(null)}>Cancel</button>
                  <button 
                    className="confirm-delete"
                    onClick={() => handleDeleteNote(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filteredNotes.length === 0 && !isLoading && (
          <div className="no-notes">
            <div className="no-notes-content">
              <div className="no-notes-icon">📝</div>
              <p>No notes found. Start by adding a new note!</p>
              <button onClick={() => setIsAddingNote(true)}>
                Add Your First Note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesSection; 