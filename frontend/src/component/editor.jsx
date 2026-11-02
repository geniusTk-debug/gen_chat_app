import React from "react";

export default function Editor(
    {
      editId,
      setEditId,
      isEditing,
      setIsRename,
      isRename,
      editor,
      value,
      switchHandler,
      t,
      docsDel,
      chatId,
      moreBtn,
      canBtnHandler
    }
) {
    return (
        <div className="editor">
          {!isRename ? <>
            <button
              type="button"
              onClick={() => {
              setIsRename(true);

              }}>
              Rename
              </button>
               <button type="button" onClick={() => docsDel(t._id)}>
                  Delete
              </button>
            </>
          :       
       <>
  <button type="button"
        onClick={() => editor(value)}>
      ok
    </button>
    <button
      type="button"
      onClick={() => setIsRename(false)}
    >
      cancel
    </button>
  </>}
    </div>
    )
}