// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = () => {
//     axios
//       .get("http://localhost:8080/api/users")
//       .then((response) => {
//         setUsers(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the users!", error);
//       });
//   };

//   const addUser = () => {
//     axios
//       .post("http://localhost:8080/api/users", { name, email })
//       .then((response) => {
//         console.log("User added successfully:", response.data);
//         fetchUsers(); // Refresh the user list after adding
//         setName("");
//         setEmail("");
//       })
//       .catch((error) => {
//         console.error("Error adding user:", error);
//       });
//   };

//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.name} - {user.email}
//           </li>
//         ))}
//       </ul>
//       <div>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button onClick={addUser}>Add User</button>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    persistData(newTodoList);
    setTodos(newTodoList);
  }
  function handleEditTodo(index) {
    const TodoValueToBeEdited = todos[index];
    setTodoValue(TodoValueToBeEdited);
    handleDeleteTodo(index);
  }

  useEffect(() => {
    if (!localStorage) {
      return;
    }

    let localTodos = localStorage.getItem("todos");
    if (!localTodos) {
      return;
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, []);

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
      />
    </>
  );
}

export default App;
