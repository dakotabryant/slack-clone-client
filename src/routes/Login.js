import React, { Component } from 'react';
import { Container, Header, Input, Button, Message } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';

export default observer(
  class Login extends Component {
    constructor(props) {
      super(props);
      extendObservable(this, {
        email: '',
        password: '',
      });
    }
    onSubmit = () => {
      const { email, password } = this;
      console.log('====================================');
      console.log(email, password);
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
);
