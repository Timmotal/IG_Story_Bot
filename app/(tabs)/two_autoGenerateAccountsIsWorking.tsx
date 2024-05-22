import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  const [accounts, setAccounts] = useState([]);

  const addAccount = () => {
    setAccounts(prevAccounts => [
      ...prevAccounts,
      { id: prevAccounts.length + 1, username: '', password: '' }
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedAccounts = [...accounts];
    updatedAccounts[index][field] = value;
    setAccounts(updatedAccounts);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {accounts.map((account, index) => (
            <View key={account.id} style={styles.accountContainer}>
              <Text>ID: {account.id}</Text>
              <TextInput
                placeholder="Username"
                value={account.username}
                onChangeText={text => handleInputChange(index, 'username', text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                value={account.password}
                onChangeText={text => handleInputChange(index, 'password', text)}
                secureTextEntry
                style={styles.input}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button title="Add Account" onPress={addAccount} />
          <Button title="Generate Text File" onPress={addAccount} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },

  // container: {
  //   padding: 20,
  // },
  // accountContainer: {
  //   marginBottom: 20,
  // },
  // input: {
  //   borderBottomWidth: 1,
  //   marginBottom: 10,
  //   padding: 5,
  // },

  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  accountContainer: {
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    gap: 17,
  },
});
