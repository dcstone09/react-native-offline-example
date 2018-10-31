import {Image, View, Text} from 'react-native';
import React from 'react';

const ListItem = ({ avatarUrl, username, blog }) => (
  <View style={{
    flexDirection: 'row',
    margin: 10,
    padding:4
  }}>
    <Image
      style={{
        width: 100,
        height: 100,
      }}
      source={{ uri: avatarUrl }}
    />
    <View style={{
      flexDirection: 'column',
      margin: 10,
      padding:4
    }}>
      <Text>{username}</Text>
      <Text>{blog}</Text>
    </View>
  </View>
);

export default ListItem;
