import { useState, useEffect } from 'react';
import { EditOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import TextArea from './TextArea';
import InputFile from './InputFile';
import { Dropdown, Tooltip } from 'antd';

function ShowBlock({ 
    index, 
    type, 
    content, 
    dragStart, 
    dragOver, 
    drop, 
    isDragging, 
    handleBlockChanges, 
    handleInsertAboveText, 
    handleInsertBelowText, 
    haveToEdit,
    handleInsertAboveFile, 
    handleInsertBelowFile,
}){
    
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);


    useEffect(()=>{
        setEditContent(content)
    }, [haveToEdit])

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleEdit = () => {
        setEditContent(content)
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        handleBlockChanges(index, editContent)
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditContent(content); 
        
    };

    const handleFileInputChange = (e)=>{
        const file = e.target.files[0];
        if(file){
            handleBlockChanges(index, file)
        }
        setIsEditing(false)
    }

    const style = {
        padding: '20px',
        border: 'black 1px solid',
        margin: '0 50px',
        marginBottom: '10px',
        borderRadius: '5px',
        overflowWrap: 'break-word',
        cursor: 'grab',
        backgroundColor: isDragging ? 'black' : 'inherit',
        color: isDragging ? 'white' : 'inherit',
        position: 'relative'
    };
    const arrowStyle = {
        fontSize: '16px',
        color: 'black',
        marginRight: '10px'
    };

    const itemsUpword = [
        {
          key: '1',
          label: (
            <div 
                onClick={() => {
                    handleInsertAboveText(index)
                }}
            >
              Text
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div onClick={()=> handleInsertAboveFile(index)}>
              Picture
            </div>
          ),
        },
    ]
    const itemsDownword = [
        {
          key: '1',
          label: (
            <div 
                onClick={() => { 
                    handleInsertBelowText(index)
                }}
            >
              Text
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div onClick={()=>handleInsertBelowFile(index)}>
              Picture
            </div>
          ),
        },
    ]

    return (
        <div
            draggable
            style={style}
            onDragStart={() => dragStart(index)}
            onDragOver={(event) => dragOver(event, index)}
            onDrop={drop}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
        >
            {(isEditing || haveToEdit) && type === "text" && (
                <TextArea
                    editContent={editContent}
                    setEditContent={setEditContent}
                    handleCancelEdit={handleCancelEdit}
                    handleSaveEdit={handleSaveEdit}
                />
            )} 
            {(isEditing || haveToEdit) && type==="picture" && (

                <InputFile
                    handleFileInputChange={handleFileInputChange}
                    handleCancelEdit={handleCancelEdit}
                    handleSaveEdit={handleSaveEdit}
                />
            )}
            {!isEditing && !haveToEdit && type === 'text' && (
                <>
                    {content}
                </>
            )}
            {!isEditing && !haveToEdit && type === 'picture' && (
                <>
                    <img src={URL.createObjectURL(content)} style={{ width: '300px', height: 'auto' }} />
                </>
            )}
            
            {isHovered && !haveToEdit && (
                <div
                    style={{
                        position: 'absolute',
                        right: '0',
                        gap: '10px',
                        cursor: 'pointer'
                    }}
                >
                    {!isEditing && (
                        <div>
                            <Tooltip title="Edit">
                                <EditOutlined 
                                    style={arrowStyle} 
                                    onClick={handleEdit} 
                                />
                            </Tooltip>
                            
                            <Dropdown 
                                menu={{
                                        items: itemsDownword
                                }} 
                                placement='bottom'
                            >
                                <ArrowDownOutlined 
                                    style={arrowStyle} 
                                />
                            </Dropdown>

                            <Dropdown 
                                menu={{
                                    items: itemsUpword
                                }} 
                                placement="top"
                            >
                                <ArrowUpOutlined 
                                    style={arrowStyle} 
                                />
                            </Dropdown>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ShowBlock;
