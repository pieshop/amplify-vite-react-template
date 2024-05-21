import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { ApiError, get } from 'aws-amplify/api';

const client = generateClient<Schema>();

const fetchData = async () => {
  try {
    const restOperation = get({
      apiName: 'myRestApi',
      path: 'items'
    });
    const response = await restOperation.response;
    console.log('GET call succeeded: ', response);
    // other logic here
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.response) {
        const {
          statusCode,
          // headers,
          body
        } = error.response;
        console.error(`Received ${statusCode} error response with payload: ${body}`);
      }
      // Handle API errors not caused by HTTP response.
    }
    console.log('GET call failed: ', error);
  }
};

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }


  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (

    <Authenticator>
      {({ signOut, user }) => (

        <main>

          <h1>{user?.signInDetails?.loginId}'s todos</h1>

          <h1>My todos</h1>
          <button onClick={fetchData}>API</button>
          <br/>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br/>
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>

      )}
    </Authenticator>
  );
}

export default App;
