const UpdateDeleteActionButtons = (props) => {
  return (
    <div>
      <button
        disabled={props.isEditDisabled}
        onClick={props.onUpdate}
        className="button touch edit"
      />
      &nbsp;&nbsp;
      <button
        disabled={props.isDeleteDisabled}
        onClick={props.onDelete}
        className="button touch delete"
      />
    </div>
  );
};

export default UpdateDeleteActionButtons;
