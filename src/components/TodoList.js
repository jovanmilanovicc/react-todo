import { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";

export default function TodoList(props) {
  const [editing, setEditing] = useState(false);
  const editRef = useRef();
  

  const editHandler = (event) => {
    event.preventDefault();
    setEditing(true);
  };

  const confirmEdit = () => {
    
    props.setUpdate(editRef.current.value, props.todo.id);
    
  };

  const idk = () => {
    setEditing(false)
  }
  return (
    <div  className="todo">
      {editing ? (
        <>
          <Form.Control type="text" className="input mr-3" onKeyUp={confirmEdit}  ref={editRef} />
          &nbsp;&nbsp;&nbsp;
          <Button variant="outline-primary" onClick={idk}>
            Edit
          </Button>
        </>
      ) : (
        <>
          <span
            style={{ textDecoration: props.todo.isDone ? "line-through" : "" }}
          >
            {props.todo.text}
          </span>

          <div>
            <Button
              variant="outline-success"
              onClick={() => props.markTodo(props.index)}
            >
              ✓
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="outline-danger"
              onClick={() => props.removeTodo(props.index)}
            >
              ✕
            </Button>
            &nbsp;&nbsp;
            <Button variant="outline-primary" onClick={editHandler}>
              Edit
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
