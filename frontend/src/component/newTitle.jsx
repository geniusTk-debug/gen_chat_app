export default function New_title(
    {
        extended,
        viewId,
        title
    }
) {

    return (
        <>
         {extended === viewId && (
        <li className={viewId === extended ? "active" : ""}>
          <button
            type="none"
            className="active">
            
            {title}</button>
        </li>
      )}
        </>
    )
    
}