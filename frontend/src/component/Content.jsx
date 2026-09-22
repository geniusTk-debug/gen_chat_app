import React from 'react';
import { useState } from 'react'
import './style/content.css'
export default function Content({ 
    chatHistory, 
    view, 
    setView, 
    title, 
    setTitle, 
    extended, 
    isExtended, 
    setChatId,
    chatId,
    fetcherById,
    setMessages,
    editor,
    editId,
    setEditId,
    docsDel,
    
    }) {


    
    const [value, setValue] = useState('')
  const [editing, isEditing] = useState(null);
  
  
  
  const switchHandler = (e) => {
    
    if (extended) {
      e.preventDefault();
      setTitle(e.target.elements.title.value)
      localStorage.removeItem('currentChatId')
      setChatId(null);
      setMessages([])
      setView('');
      setValue('')
      isExtended(null);
    }
    
    if (editId && editing) {
      editor(editId)
    }
    if (!editId && !extended) {
      docsDel(chatId)
    }
    
  }
  
  const optionHandler = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      switchHandler(e)
    }
    if (editing) {
      isEditing(null);
    } else {
      isEditing(true);
    } 
    
  }
    console.log(chatHistory)

return (
  <div className="content-container">
    <ul>
      <li className={extended ? 'extended' : 'switch-section'}>
        {extended && !editId ? (
          <form onSubmit={switchHandler}>
            <input
              placeholder="Title"
              value={value}
              className='rename'
              type="text"
              name="title"
              onChange={(e) => setValue(e.target.value)}
            />

            <div className="flex-btn">
              <button className="ok-btn" type="submit">
                ok
              </button>
              <button
                className="cancel-btn"
                type="cancel"
                onClick={() => isExtended(null)}
              >
                back
              </button>
            </div>
          </form>
        ) : (
          <button
            className="plus-btn"
            onClick={() => {
              isExtended(true);
              setTitle("");
            }}
          >
            <svg
              width="24"
              height="24"
                viewBox="0 0 24 24"
                className='plus'
                fill='currentColor'
            >
              <path d="M13.3521 22.681C13.3521 23.4276 12.747 24.018 12.0005 23.9996C11.2541 23.9811 10.649 23.3609 10.649 22.6142V13.3513H1.319C0.572327 13.3513 -0.018029 12.7462 0.000404 11.9998C0.018837 11.2533 0.639079 10.6482 1.38575 10.6482H10.649V1.31901C10.649 0.572334 11.2541 -0.0180206 12.0005 0.000411987C12.747 0.0188446 13.3521 0.639088 13.3521 1.38576V10.6482H22.681C23.4276 10.6482 24.018 11.2533 23.9996 11.9998C23.9811 12.7462 23.3609 13.3513 22.6142 13.3513H13.3521V22.681Z"></path>
            </svg>
          </button>
        )}
      </li>

      {chatHistory &&
        chatHistory.map((t) => (
          <React.Fragment key={t._id}>
            <li
              className={`${view == t.title ? "active" : ""}
                ${editId === t._id ? "isEdit" : ""}
                ${editing ? "editing" : "" } `}
              onClick={() => fetcherById(t._id)}
            >
              {editId !== t._id ? (
                t.title
              ) : (
                <input
                    type="text"
                    className='rename'
                  name="rename"
                  id={t._id}
                    defaultValue={t.title}
                    onKeyDown={(e) => e.key === 'Enter' ? optionHandler(e) : 'console.log(e)'}
                  onChange={(e) => setTitle(e.target.value)}
                />
              )}
              <button
                onClick={optionHandler}
                className="more-btn"
                type="button"
              >
                <svg
                  xmlns="http://w3.org"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </button>
            </li>

            {editing && view == t.title && (
              <div className="editor">
                {!editId ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setEditId(t._id);
                        isEditing(true);
                      }}
                    >
                      Rename
                    </button>
                    <button type="button" onClick={switchHandler}>
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                      <button type="button"
                        onClick={switchHandler}>
                      ok
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditId(null);
                        isEditing(null);
                      }}
                    >
                      cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      {title && (
        <li>
          <button
            type="none"
            className="active">
            
            {title}</button>
        </li>
      )}
    </ul>
  </div>
);
}
