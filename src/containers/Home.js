import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchBar from '../components/SearchBar';
import ListItem  from '../components/ListItem';
import { requestUser } from '../modules/Github';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(text) {
    this.setState({
      username: text,
    })
  }

  handleSubmit() {
    this.props.requestUser(this.state.username);
    this.setState({
      username: '',
    });
  }

  render(props) {
    return (
      <View>
        <SearchBar
          value={this.state.username}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <FlatList
          data={this.props.users}
          renderItem={({item}) => (
            <ListItem
              avatarUrl={item.avatar_url}
              username={item.login}
              blog={item.blog}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ github }) => ({
  users: github.users,
});

const mapDispatchToProps = (dispatch, props) => (
  bindActionCreators({
    requestUser,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
