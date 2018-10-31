import {Button, TextInput, View} from 'react-native';
import React from 'react';

const SearchBar = ({ value, onChange, onSubmit }) => (
  <View style={{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    margin: 10,
    padding:4
  }}>
    <View style={{
      flex: 4,
    }}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Enter Github Username"
      />
    </View>
    <View style={{
      flex: 1,
      paddingLeft: 4,
      marginLeft: 10
    }}>
      <Button
        title="Search"
        onPress={onSubmit}
      />
    </View>
  </View>
);

export default SearchBar;
