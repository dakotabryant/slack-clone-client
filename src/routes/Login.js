import React, { Component } from 'react';
import { Container, Header, Input, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import { gql, graphql } from 'react-apollo';

class Login extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      email: '',
      password: '',
    });
  }
  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password },
    });
    const { ok, token, refreshToken } = response.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
    console.log('====================================');
    console.log(this.props);
    console.log('====================================');
  };
  changeHandler = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };
  render() {
    const { email, password } = this;
    return (
      <Container>
        <Header as="h2">Login</Header>
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

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
