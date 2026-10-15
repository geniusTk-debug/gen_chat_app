export default function Editor(
    {
      editId,
      setEditId,
      isEditing,
      switchHandler,
      t,
    }
) {
    return (
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
    )
}