
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER } from "./mutations/user";


import './App.css';

function App() {


  const [users, setUsers] = useState([])
  const { data, loading, error } = useQuery(GET_ALL_USERS)
  const [newUser] = useMutation(CREATE_USER)
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)

  // newUser - is a function (we got it from useQuery) that will call our mutation


  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)

    }
  }, [data])


  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age: parseInt(age)
        }
      }
    }).then(({ data }) => {
      console.log(data);
      setUsername('')
      setAge(0)
    })
  }

  if (loading) {
    return <h1>loading...</h1>

  }


  return (
    <div>
      <form>
        <input value={username} type="text" onChange={e => setUsername(e.target.value)} />
        <input value={age} type="number" onChange={e => setAge(e.target.value)} />
        <div className="btns">
          <button onClick={(e) => addUser(e)}> Создать</button>
          <button >Получить</button>
        </div>
      </form>
      <div>
        {users.map(user =>
          <div key={user.id} className="user">{user.id} {user.username} {user.age}</div>
        )}
      </div>
    </div>
  );
}

export default App;
