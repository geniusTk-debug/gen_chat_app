import React from 'react';
import { useState } from 'react'
import './style/content.css'
import New_comversation from './newConversation';
import List_title from './listTitle';
import Editor from './editor';
import New_title from './newTitle';
export default function Content({ 
    chatHistory, 
    viewId, 
    setViewId, 
    title, 
    setTitle, 
    extended, 
    isExtended, 
    // setChatId,
    chatId,
    fetcherById,
    setMessages,
    editor,
    editId,
    setEditId,
    docsDel,
    model,
    setModel,
    
    }) {


    
    const [value, setValue] = useState('')
  const [editing, isEditing] = useState(null);

    
  
  const switchHandler = (e) => {
    e.preventDefault();
    if (extended === 'new') {
      setTitle(e.target.elements.title.value || e.target.value)
      localStorage.removeItem('currentChatId')
      // setChatId(null);
      setMessages([])
      isExtended('idle');
      setViewId(extended)
      setValue('')
    }
    
    if (editId && editing) {
      editor(value)
    }
    if (!editId && extended === 'idle') {
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

return (
  <div className="content-container">
    <React.Fragment>
      <New_comversation 
      extended={extended}
      editId={editId}
    switchHandler={switchHandler}
    value={value}
    setValue={setValue}
    model={model}
    setModel={setModel}
    isExtended={isExtended}
    setTitle={setTitle}
       />

      {chatHistory &&
        chatHistory.map((t) => (
          <React.Fragment key={t._id}>
            <List_title 
            viewId={viewId}
            chatId={chatId}
            editId={editId}
            editing={editing}
            fetcherById={fetcherById}
            setValue={setValue}
            t={t}
            optionHandler={optionHandler}
            />

            {editing && viewId == t._id && (
              <Editor
              t={t}
              editId={editId}
              setEditId={setEditId}
              isEditing={isEditing}
              switchHandler={switchHandler}
              />
            )}
          </React.Fragment>
        ))}
      <New_title
      extended={extended}
      viewId={viewId}
      title={title}
      />
    </React.Fragment>
  </div>
);
}
