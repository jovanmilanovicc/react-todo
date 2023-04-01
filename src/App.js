import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoForm from "./components/Form";
import TodoList from "./components/TodoList";
import { motion } from "framer-motion";

function App() {
  const isDone = false;
  const id = Math.random();
  const searchInput = useRef();
  const [search, setSearch] = useState([]);
  const [todos, setTodos] = useState([
    {
      id: Math.random(),
      text: "Default todo",
      isDone: false,
    },
    {
      id: Math.random(),
      text: "Default todo2",
      isDone: false,
    },
    {
      id: Math.random(),
      text: "Default todo3",
      isDone: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { id, text, isDone }];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.text = updatedTitle;
        }
        return todo;
      })
    );
  };

  function searchTodos(input) {
    setSearch(
      todos.filter((todo) =>
        todo.text.toLowerCase().includes(input.toLowerCase())
      )
    );
  }

  useEffect(() => {
    setSearch(todos);
  }, [todos]);

  let hasRendered = useRef(false);
  useEffect(() => {
    hasRendered.current = true;
  }, []);

  return (
    <div className="app">
      <div className="container">
        <motion.h1
          className="text-center mb-4"
          initial={{ y: "-100vw" }}
          transition={{
            type: "spring",
            delay: 0.2,
            stiffness: 80,
            damping: 13,
          }}
          animate={{ y: 0 }}
        >
          Todo List
        </motion.h1>
        <motion.div
          initial={{ x: "-100vw" }}
          transition={{
            type: "spring",
            delay: 0.2,
            stiffness: 80,
            damping: 13,
          }}
          exit={{opacity: 0}}
          animate={{ x: 0 }}
        >
          <TodoForm addTodo={addTodo} />
          <div>
            <input
              type="search"
              className=" mt-0 mb-3 searchInput"
              onChange={(event) => {
                searchTodos(event.target.value);
              }}
              ref={searchInput}
              placeholder="Search..."
            />

            {search.map((todo, index) => (
              <motion.div
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                exit={{opacity: 0}}
                transition={{
                  type: "spring",
                  delay: 0.2,
                  stiffness: 80,
                  damping: 13,
                }}
              >
                <Card>
                  <motion.div exit={{ opacity: 0 }}>
                    <Card.Body>
                      <TodoList
                        key={index}
                        index={index}
                        todo={todo}
                        markTodo={markTodo}
                        removeTodo={removeTodo}
                        setUpdate={setUpdate}
                      />
                    </Card.Body>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
