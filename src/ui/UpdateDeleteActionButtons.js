
const UpdateDeleteActionButtons = (props) => {

    return <div>
        <a onClick={props.onUpdate} className="button touch edit"></a>&nbsp;&nbsp;
        <a onClick={props.onDelete} className="button touch delete"></a>
    </div>
}

export default UpdateDeleteActionButtons;