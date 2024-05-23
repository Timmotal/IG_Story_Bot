import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function TabTwoScreen() {

  const [image, setImage] = useState(null);
  const [ progress, setProgress ] = useState(0);
  const [textFile, setTextFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


  const pickImage = async () => {

    let imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(imageResult);

    if (!imageResult.canceled) {
      setImage(imageResult.assets[0].uri); 
    }
  };


 

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select an image.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    console.log(formData, 'form Data before append')
    
    formData.append('image', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    console.log('image appended')



    try {

      console.log(' about to run the fetch')
        const response = await fetch('https://c7bb-102-88-43-55.ngrok-free.app/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      body: formData,
      });
      console.log(formData, ' this is form data')
      // console.log('story upload completed')
      const data = await response.json();
      console.log(data, 'no data available')
      

      if (!response.ok) {
        console.log('server error')
        // Handle upload failure
        const feed = response.status
        throw new Error( feed,'Image upload failed');
      }
      
    } catch (error) {
      console.error(error, 'this is the error');
      Alert.alert('Error', 'Failed to upload files');
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


        <Button title="Upload Image" onPress={uploadImage} />

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

