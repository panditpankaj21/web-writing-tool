import BlackButton from "./BlackButton";

function InputFile({
    handleFileInputChange, 
    handleSaveEdit, 
    handleCancelEdit
}){
    return(
        <div>
            <input 
                style={{
                    marginBottom: "10px",
                }}
                type='file'
                onChange={handleFileInputChange}
            />
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
export default InputFile;