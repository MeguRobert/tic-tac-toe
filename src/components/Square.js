import '../index.css';
import Button from '@material-ui/core/Button';
export default function Square(props) {

    const styles = {
        color: "#47d7df",
        fontSize: '8rem',
        backgroundColor: "#4793df",
        border: "1px solid"
    }
    
    return (
        <Button variant="contained" className="square" style={styles} onClick={props.onClick}>
                {props.value}
        </Button>
       
    )
}