import { Button} from 'antd';

function BlackButton({onClick, label}){
    return(
        <Button
            style={{
            backgroundColor: "black",
            color: "white",
            border: "none"
            }}
            onClick={onClick}
        >
            {label}
        </Button>
    )
}
export default BlackButton;