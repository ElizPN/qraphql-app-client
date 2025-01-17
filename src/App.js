
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER } from "./mutations/user";


import './App.css';

function App() {


  const [users, setUsers] = useState([])
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  })
  // newUser - is a function (we got it from useQuery) that will call our mutation
  const [newUser] = useMutation(CREATE_USER)
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)


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

  // refetch - is a function that, when invoked, 
  // initiates a request to retrieve all users and updates the field data accordingly.
  const getAll = e => {
    e.preventDefault()
    refetch()
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
          <button onClick={(e) => addUser(e)}>Create user</button>
          <button onClick={(e) => getAll(e)}>Get Users</button>
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
