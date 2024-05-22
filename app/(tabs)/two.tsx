import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';




export default function TabTwoScreen() {

    const [textFile, setTextFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const pickTextFile = async () => {
        let result = await DocumentPicker.getDocumentAsync({
          type: 'text/plain',
        });
    
        if (result.type === 'success') {
          setTextFile(result);
        }
      };

      const handleSubmit = async () => {
        if (!textFile || !imageFile) {
          Alert.alert('Error', 'Please select both a text file and an image.');
          return;
        }
    
        setIsLoading(true);

        let formData = new FormData();
        const url = 'https://your-server.com/api/upload'; // Replace with your server URL

        const textFileContent = await FileSystem.readAsStringAsync(textFile.uri, {
            encoding: FileSystem.EncodingType.UTF8,
          });

          formData.append('textFile', {
            uri: textFile.uri,
            name: textFile.name,
            type: 'text/plain',
          });

          try {
            let response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              body: formData,
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            Alert.alert('Success', 'Files uploaded successfully');
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to upload files');
          } finally {
            setIsLoading(false);
          }
        };


  
    return (
    <View>
         <Button title="Pick a text file" onPress={pickTextFile} />
      {textFile && <Button title="Remove text file" onPress={() => setTextFile(null)} />}
      <Button title="Submit" onPress={handleSubmit} />
      {isLoading && <ActivityIndicator style={styles.loading} />}
    </View>
);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    loading: {
      marginTop: 16,
    },
  });