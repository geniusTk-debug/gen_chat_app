export default function List_title (
    {
        viewId,
         chatId,
        editId,
        editing,
        fetcherById,
        setValue,
        t,
        optionHandler

    }
) {

  console.log('view id at list title', viewId)
  console.log('chat Id at list title', chatId)

    return(
        <ul key={t._id}>
         <li
              className={`${viewId === t._id ? "active" : ""}
                ${editId === t._id ? "isEdit" : ""}
                ${editing ? "editing" : "" } `}
              onClick={() => fetcherById(editId ? '' : t._id)}
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
                  onChange={(e) => setValue(e.target.value)}
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
        </ul>
    )
}