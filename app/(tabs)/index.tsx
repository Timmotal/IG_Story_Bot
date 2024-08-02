import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [image, setImage] = useState(null);
  const [ progress, setProgress ] = useState(0);
  const [textFile, setTextFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

                    

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let imageResult = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      // aspect: [4, 3],
      quality: 1, // if you want the quality reduced
    });

    console.log(imageResult);

    if (!imageResult.canceled) {
      setImage(imageResult.assets[0].uri); // set the image in state
    }
  };
                    
  
  const pickTextFile = async () => {
    let fileResult = await DocumentPicker.getDocumentAsync({
      type: 'text/plain',
    });
    console.log(fileResult, 'this is the file result');                    
  
      if (fileResult) {
      setTextFile(fileResult.assets[0]);
    }
  };
 const uploadImageAndFile = async () => {

    setIsLoading(true);
    console.log('story about to be uploaded')
                    
  
    const formData = new FormData();
    console.log(formData, 'form Data before append')
    console.log(textFile, 'from state this is textFile')
    
    formData.append('files', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    console.log('image appended')
 formData.append('files', //textFile                                          
  
  
    {
      uri: textFile.uri,
      name: 'accounts.txt',
      type: 'text/plain',
    }
  );
    console.log('file appended')

    try {
      // const god = 'god is a metaphor, can you believe it'

      console.log(' about to run the fetch')
      // const response = await fetch('https://5481-102-89-33-133.ngrok-free.app/echo', {
        const response = await fetch('https://77a9-102-89-40-130.ngrok-free.app/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      body: formData,
      });
      console.log(formData, ' this is form data plain')
      console.log(...formData, ' spread operator form data')

      // console.log('story upload completed')
      const data = await response.json();
      console.log(data, 'no data available')
      

      if (!response.ok) {
        console.log('server error')
        // Handle upload failure
        const feed = response.status
        throw new Error( feed,'Image upload failed');
      }
      

      // Handle successful upload (optional: display confirmation)
    } catch (error) {
      console.error(error, 'this is the error');
      Alert.alert('Error', 'Failed to upload files');
      // Handle errors gracefully (e.g., display error message)
    } finally {
          setIsLoading(false);
        }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <View style={styles.buttonContainer}>
        <Button title="Pick Image" onPress={pickImage} />
        {progress ? <Text>{progress}</Text> : null}

        <Button title="Pick a text file" onPress={pickTextFile} />
      {textFile && <Button title="Remove text file" onPress={() => setTextFile(null)} />}

        <Button title="Upload Image & File" onPress={uploadImageAndFile} />

        {isLoading && <ActivityIndicator style={styles.loading} />}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

