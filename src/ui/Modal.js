
const Modal = (props) => {


    const closeHandler = event => {

    }
    
    return <div id="myModal" className="modal">
    <div className="modal-content">
        <span className="close">&times;</span>
        {props.children}
    </div></div>;
}

export default Modal;