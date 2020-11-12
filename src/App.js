import React from 'react';
import axios from "axios";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: 0,
      firstName: '',
      lastName: '',
      address: '',
      nic: '',
      email: '',
      illness: ''
    }

  }
  componentDidMount() {
    axios.get(`http://localhost:9192/patients/`)
      .then((res) => {
        this.setState({
          users: res.data,
          id: 0,
          firstName: '',
          lastName: '',
          address: '',
          nic: '',
          email: '',
          illness: ''
        })
      })
  }
  submit(event, id) {
    event.preventDefault();
    if (id === 0) {
      axios.post("http://localhost:9192/patients/", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        nic: this.state.nic,
        email: this.state.email,
        illness: this.state.illness

      })
        .then((res) => {
          this.componentDidMount();
        })
    } else {
      axios.put("http://localhost:9192/patients/", {
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        nic: this.state.nic,
        email: this.state.email,
        illness: this.state.illness
      }).then(() => {
        this.componentDidMount();
      })

    }

  }
  delete(id) {
    axios.delete(`http://localhost:9192/patients/${id}`)
      .then(() => {
        this.componentDidMount();
      })
  }
  edit(id) {
    axios.get(`http://localhost:9192/patients/${id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          id: res.data.id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          address: res.data.address,
          nic: res.data.nic,
          email: res.data.email,
          illness: res.data.illness
        })
      })
  }
  render() {
    return (
      <div className="container" >

        <div className="row">
          <div className="col s6">
            <form onSubmit={(e) => this.submit(e, this.state.id)}>
              <div class="input-field col s12">
                <input onChange={(e) => this.setState({ firstName: e.target.value })} value={this.state.firstName} type="text" id="autocomplete-input" class="autocomplete" />
              </div>

              <div class="input-field col s12">
                <input onChange={(e) => this.setState({ lastName: e.target.value })} value={this.state.lastName} type="text" id="autocomplete-input" class="autocomplete" />

              </div>

              <div class="input-field col s12">
                <input onChange={(e) => this.setState({ address: e.target.value })} value={this.state.address} type="text" id="autocomplete-input" class="autocomplete" />
              </div>

              <div class="input-field col s12">
                <input onChange={(e) => this.setState({ nic: e.target.value })} value={this.state.nic} type="text" id="autocomplete-input" class="autocomplete" />

              </div>
              <div class="input-field col s12">
                <input onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} type="text" id="autocomplete-input" class="autocomplete" />
              </div>

              <div class="input-field col s12">
                <input onChange={(e) => this.setState({ illness: e.target.value })} value={this.state.illness} type="text" id="autocomplete-input" class="autocomplete" />
              </div>
              <button class="btn waves-effect waves-light right" type="submit" name="action">Submit
          <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
          <div className="col s6">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>NIC</th>
                  <th>Email</th>
                  <th>Illness</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.state.users.map(user =>
                    <tr key={user.id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.address}</td>
                      <td>{user.nic}</td>
                      <td>{user.email}</td>
                      <td>{user.illness}</td>
                      <td>
                        <button onClick={(e) => this.edit(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                          <i class="material-icons">edit</i>
                        </button>
                      </td>
                      <td>
                        <button onClick={(e) => this.delete(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                          <i class="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  )
                }

              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
