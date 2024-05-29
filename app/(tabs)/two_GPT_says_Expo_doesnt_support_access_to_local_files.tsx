// // Import necessary libraries
// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';

// const App = () => {
//   // State to hold form inputs
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   // Function to handle form submission
//   const handleSaveAndShare = async () => {
//     // Define the path to the file
//     const path = `${RNFS.DocumentDirectoryPath}/igAccounts.txt`;

//     // Create the content to be saved
//     const content = `Username: ${username}\nPassword: ${password}\n`;

//     try {
//       // Write the content to the file
//       await RNFS.writeFile(path, content, 'utf8');
      
//       // Prepare options for sharing
//       const shareOptions = {
//         title: 'Share IG Account',
//         message: 'Here are my IG account credentials.',
//         url: `file://${path}`,
//         type: 'text/plain',
//       };

//       // Share the file
//       await Share.open(shareOptions);
      
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to save or share file');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Save and Share" onPress={handleSaveAndShare} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   input: {
//     height: 40, 
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
// });

// export default App;
