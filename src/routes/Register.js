import React, { Component } from 'react';
import { Container, Header, Input, Button, Message } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      usernameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
    };
  }
  changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onSubmit = async () => {
    this.setState({ usernameError: '', passwordError: '', emailError: '' });
    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password },
    });
    const { ok, errors } = response.data.register;
    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  };
  render() {
    const {
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError,
    } = this.state;

    const errorList = [];
    if (usernameError) {
      errorList.push(usernameError);
    }
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }
    return (
      <Container>
        <Header as="h2">Register</Header>
        <Input
          name="username"
          value={username}
          error={!!usernameError}
          fluid
          placeholder="username"
          onChange={this.changeHandler}
        />
        <Input
          name="email"
          error={!!emailError}
          value={email}
          fluid
          placeholder="email"
          onChange={this.changeHandler}
        />
        <Input
          name="password"
          error={!!passwordError}
          value={password}
          fluid
          placeholder="password"
          type="password"
          onChange={this.changeHandler}
        />
        <Button onClick={this.onSubmit}>Submit</Button>
        {usernameError || emailError || passwordError ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
