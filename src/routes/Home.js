import React from 'react';
import { gql, graphql } from 'react-apollo';

const Home = ({ data, data: { loading, allUsers } }) => {
  return (
    <div>
      {loading && <h1> Loading </h1>}
      {!loading &&
        allUsers.map((user) => {
          return <h1 key={user.id}>{user.email}</h1>;
        })}
    </div>
  );
};

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

export default graphql(allUsersQuery)(Home);
