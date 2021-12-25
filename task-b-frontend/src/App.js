import React, { Component } from 'react';
import UserDetails from './components/UserDetails';
import UserForm from './components/UserForm';
import './App.css';
import { GET_USERS } from './routes';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      usersData: [],
      createUserPicture: null,
      error: null,
      selectedUser: null
    };
    this.getUsers = this.getUsers.bind(this);
    this.deleteUserOnCallback = this.deleteUserOnCallback.bind(this);
    this.editUserOnCallback = this.editUserOnCallback.bind(this);
    this.randomizeUserOnCallback = this.randomizeUserOnCallback.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
  }

  handleClick = (name) => {
    const selectedUser = this.state.usersData.find(user => user.name === name)
    this.setState(() => ({selectedUser}))
  }

  deleteUserOnCallback = () => {
    this.setState({selectedUser: null});
  }

  editUserOnCallback = () => {
    GET_USERS().then((res) => {
      this.setState({usersData: res.data.data});
      const name = this.state.selectedUser.name;
      const selectedUser = this.state.usersData.find(user => user.name === name)
      this.setState(() => ({selectedUser}));
    }); 
  }

  randomizeUserOnCallback = () => {
    const random = getRandomInt(this.state.usersData.length);
    const user = this.state.usersData[random];
    this.setState({selectedUser: user});
  }

  getUsers = () => {
    GET_USERS().then((res) => {
      this.setState({usersData: res.data.data})
    })
    .catch((err) => console.log(err));
  }

  render() {
    const usersList = this.state.usersData.map(user => {
      return<li key={user.name} onClick={()=>this.handleClick(user.name)}>{user.name}</li>
    })
    return (
      <div className="App"> 
        <div className="UserList">
          <h2>Random Asians</h2>
          <ul>{usersList}</ul>
        </div>
        <UserDetails user={this.state.selectedUser} deleteCallback={this.deleteUserOnCallback} editCallback={this.editUserOnCallback} randomizeCallback={this.randomizeUserOnCallback}/>
        <UserForm isCreate={true}/>
      </div>
    );
  }

  componentDidMount() {
    this.getUsers();
  }

  componentDidUpdate() {
    this.getUsers();
  }
}

export default App;