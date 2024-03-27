import { useState, useRef, useEffect } from 'react'
import BlackButton from '../components/BlackButton';
import ShowBlock from '../components/ShowBlock';
import TextArea from '../components/TextArea';
import InputFile from '../components/InputFile';


function EditorPage(){
    const [option, setOption] = useState("")
    const [blocks, setBlocks] = useState([])
    const [textValue, setTextValue] = useState("")
    const [dragStartIndex, setDragStartIndex] = useState(null);
    const [dragEndIndex, setDragEndIndex] = useState(null);


    const handleInsertAboveFile = (index)=>{
        setBlocks(prevBlocks => [
            ...prevBlocks.slice(0, index),
            { type: "picture", content: "", haveToEdit: true },
            ...prevBlocks.slice(index)
        ]);
    }
    const handleInsertBelowFile = (index)=>{
        setBlocks(prevBlocks => [
            ...prevBlocks.slice(0, index + 1),
            { type: "picture", content: "", haveToEdit: true },
            ...prevBlocks.slice(index + 1)
        ]);
    }

    const handleInsertAboveText = (index) => {
        setBlocks(prevBlocks => [
            ...prevBlocks.slice(0, index),
            { type: "text", content: "", haveToEdit: true },
            ...prevBlocks.slice(index)
        ]);
    };

    const handleInsertBelowText = (index) => {
        setBlocks(prevBlocks => [
            ...prevBlocks.slice(0, index + 1),
            { type: "text", content: "", haveToEdit: true },
            ...prevBlocks.slice(index + 1)
        ]);
    };
    
    const handleBlockChanges=(index, newContent)=>{
        const updatedBlocks = [...blocks];
        updatedBlocks[index].content = newContent;
        updatedBlocks[index].haveToEdit = false;
        setBlocks(updatedBlocks); 
    }

    const dragStart = (index) => {
        setDragStartIndex(index);
    };

    const dragOver = (event, index) => {
        event.preventDefault();
        setDragEndIndex(index);
    };

    const drop = () => {
        const draggedItem = blocks[dragStartIndex];
        const updatedBlocks = [...blocks];
        // remove start index from blocks
        updatedBlocks.splice(dragStartIndex, 1);
        //add bolcks[start_index] at end index
        updatedBlocks.splice(dragEndIndex, 0, draggedItem);
        setBlocks(updatedBlocks);
        setDragStartIndex(null);
        setDragEndIndex(null);
    };

    const handleTextOption = () => {
        setOption("text")
    }
    const handlePictureOption = () => {
        setOption("picture")
    }


    const handleSaveEdit = () => {
        setBlocks([...blocks,{
            type: "text",
            content: textValue,
            haveToEdit: false,
        }])
        setTextValue("")
        setOption("")
    };

    const handleCancelEdit = () => {
        setTextValue("")
        setOption("")
    };


    const handleFileInputChange = (e) =>{
        const file = e.target.files[0];
        if(file){
            setBlocks([...blocks,{
                type: "picture",
                content: file,
                haveToEdit: false,
            }])
        }
        setOption("")
    }




    return(
        <>
            <div 
                style={{
                    display:"flex",
                    justifyContent:"center",
                    gap:"20px",
                    padding:"10px",
                    position:"sticky",
                    top:"0",
                    backgroundColor:"white",
                    zIndex:"1"
                }}
            >
                <BlackButton 
                    label="Text Block" 
                    onClick={handleTextOption}
                />
                <BlackButton 
                    label="Picture Block" 
                    onClick={handlePictureOption}
                />
            </div>  
            {blocks && blocks.map((block, index) =>
                <ShowBlock 
                    key={index} 
                    index={index} 
                    type={block.type} 
                    content={block.content}
                    dragStart={dragStart}
                    dragOver={dragOver}
                    drop={drop}
                    isDragging={index === dragEndIndex}
                    handleBlockChanges={handleBlockChanges}
                    handleInsertAboveText={handleInsertAboveText}
                    handleInsertBelowText={handleInsertBelowText}
                    haveToEdit={block.haveToEdit}
                    handleInsertAboveFile={handleInsertAboveFile}
                    handleInsertBelowFile={handleInsertBelowFile}
                />
            )}

            {
                option && (
                    <div
                        style={{
                            padding: '20px',
                            border: 'black 1px solid',
                            margin: '0 50px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            overflowWrap: 'break-word',
                            position: 'relative'
                        }}
                    >
                        {option==="text" ?
                            (<TextArea
                                editContent={textValue}
                                setEditContent={setTextValue}
                                handleSaveEdit={handleSaveEdit}
                                handleCancelEdit={handleCancelEdit}
                            />) : 
                            <InputFile
                                handleFileInputChange={handleFileInputChange}
                                handleCancelEdit={handleCancelEdit}
                                handleSaveEdit={handleSaveEdit}
                            />
                        }
                    </div>
                )
            }
            
        </>
    )
}

export default EditorPage;