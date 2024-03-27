import BlackButton from "./BlackButton";

function TextArea({
    editContent, 
    setEditContent, 
    handleSaveEdit, 
    handleCancelEdit
}){
    return(
        <div>
            <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                autoFocus={true}
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    resize: 'none', 
                    border: 'none', 
                    outline: 'none' 
                }}
                maxLength={250}
            >
                {editContent}
            </textarea>
            <div 
                style={{
                    position: 'absolute',
                    right: '5px',
                    display:"flex",
                    gap: '5px',
                    cursor: 'pointer',
                    bottom:"4px"
                }}
            >
                <BlackButton label="Save" onClick={handleSaveEdit}/>
                <BlackButton label="Cancel"onClick={handleCancelEdit} />
            </div>
        </div>
    )
}

export default TextArea;