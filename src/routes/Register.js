import React, { Component } from 'react';
import { Container, Header, Input, Button } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }
  changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onSubmit = async (e) => {
    const response = await this.props.mutate({
      variables: this.state,
    });
  };
  render() {
    const { username, email, password } = this.state;
    return (
      <Container>
        <Header as="h2">Register</Header>
        <Input
          name="username"
          value={username}
          fluid
          placeholder="username"
          onChange={this.changeHandler}
        />
        <Input
          name="email"
          value={email}
          fluid
          placeholder="email"
          onChange={this.changeHandler}
        />
        <Input
          name="password"
          value={password}
          fluid
          placeholder="password"
          type="password"
          onChange={this.changeHandler}
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

export default graphql(registerMutation)(Register);
