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
    newTitle, 
    setNewTitle, 
    extended, 
    isExtended, 
    chatId,
    fetcherById,
    setMessages,
    editor,
    editId,
    setEditId,
    docsDel,
    model,
    setModel,
    chatIdUpdater,
    newChatHandler,
    isNew,
    setIsNew,
    moreBtnHandler,
    moreBtn,
    isRename,
    setIsRename,
    setMoreBtn,
    canBtnHandler
        
    }) {

    const [value, setValue] = useState('')
  const [editing, isEditing] = useState(null);
  console.log(chatHistory, 'chatHistory in Content.jsx')

return (

  <div className="content-container">
    <React.Fragment>
      <New_comversation 
      isNew={isNew}
      setIsNew={setIsNew}
    newChatHandler={newChatHandler}
    value={value}
    setValue={setValue}
    model={model}
    setModel={setModel}
    isRename={isRename}
       />

      {chatHistory &&
        chatHistory.map((t) => (
          <React.Fragment key={t._id}>
            <List_title 
            viewId={viewId}
            chatId={chatId}
            editId={editId}
            isRename={isRename}
            fetcherById={fetcherById}
            setValue={setValue}
            moreBtnHandler={moreBtnHandler}
            t={t}
            editor={editor}
            isNew={isNew}
            />

              {t && t._id === editId && 
              <Editor
              t={t}
              editId={editId}
              setEditId={setEditId}
              isEditing={isEditing}
              setIsRename={setIsRename}
              isRename={isRename}
              editor={editor}
              docsDel={docsDel}
              model={model}
              setModel={setModel}
              moreBtn={moreBtn}
              setMoreBtn={setMoreBtn}
              chatId={chatId}
              canBtnHandler={canBtnHandler}
              value={value}
              />}
          </React.Fragment>
        ))}
      {newTitle && 
      <New_title
      newTitle={newTitle}
      chatId={chatId}
      />}
    </React.Fragment>

  </div>
)
}
