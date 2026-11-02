import New_title from "./newTitle"
export default function List_title (
    {
         chatId,
        editId,
        fetcherById,
        setValue,
        t,
        newTitle,
        isNew,
        moreBtnHandler,
        moreBtn,
        isRename,
        editor

    }
) {

  console.log('chat Id at list title', chatId)

    return(
        <ul key={t._id}>
         <li
              className={`${chatId === t._id ? "active" : ""}
                ${isRename ? "isEdit" : ""}`}
              onClick={(e) => fetcherById(editId ? '' : t._id, e)}
            >
              {!isRename ? (
                t.title
              ) : (t._id === editId && <input
                    type="text"
                    className='rename'
                  name="rename"
                  id={t._id}
                    defaultValue={t.title}
                    onKeyDown={(e) => e.key === 'Enter' ? editor(e.target.value) : console.log(e)}
                  onChange={(e) => setValue(e.target.value)}
                />
              )}
              <button
                onClick={(e)=>moreBtnHandler(t._id,e)}
                className="more-btn"
                style={{display: isRename ? 'none' : 'flex'}}
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

            {newTitle && <New_title
            newTitle={newTitle}
            isNew={isNew}
            t={t}
            chatId={chatId}

            />}
        </ul>
    )
}