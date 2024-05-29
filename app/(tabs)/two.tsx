import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
// axios uses the XML Http request object unlike fetch sometimes refeered to as Ajax Object
// you can get the upload progress as a percentage
// advantages of using Axios, it has a more simpler and more modern promise based syntax

export default function TabTwoScreen() {

  const [image, setImage] = useState(null);
//   const [ progress, setProgress ] = useState(0);
const [ progress, setProgress ] = useState({ started: false, pc: 0 });
const [msg, setMsg] = useState(null)
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
    // will set the request headers automatically, also supports multiple files, so i sent it right
    console.log(formData, 'form Data before append')
    
    formData.append('image', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    console.log('image appended')



    try {

      console.log(' about to run the fetch')
      setMsg("Uploading...")
      
    //   ---------------- <<<FETCH METHOD>>>>>------------------------

    // fetch('https://4582-102-88-68-125.ngrok-free.app/upload', {
    //     method: "POST",
    //     body: formData,
    //     headers: {
    //         "Custom=Header": "value",
    //     }
    // })
    // .then(res => {
    //     if(!res.ok) {
    //         throw new Error("Bad Request");
    //     }
    //     setMsg("Upload successful");
    //     return res.json();
    // })
    // .then(data => console.log(data, 'the data'))
    // .catch(err => {
    //     setMsg("Upload failed");
    //     console.error(err);
    // })

    // ---------------------------FETCH MULTIPLE VIDEO

    //     const response = await fetch('https://c7bb-102-88-43-55.ngrok-free.app/upload', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data',
    //   },
    //   body: formData,
    //   });


    // ----------- <<<<<<AXIOS METHOD >>>>>>>> --------------------------
  
    setProgress(prevState => {
        return {...prevState, started: true}
    })
    const response = axios.post('https://af38-102-88-37-146.ngrok-free.app/upload', formData, {
        onUploadProgress: (progressEvent) => { setProgress(prevState => {
            return { ...prevState, pc: progressEvent.progress * 100 }
        }) },
        headers: {
            "Custom-Header": "value"
            //  you dont need to set content type header here, because multi part of the formData will set t for you
        }
    })
    .then(res => {
        setMsg("upload successful")
        console.log(res.data)
    })

    // ----------- <<<<<< END OF AXIOS METHOD >>>>>>>> --------------------------
    
    .catch(err => {
        setMsg('Upload has failed for some reasons')
        console.error(err)
    })

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

        {progress.started && <progress max="100" value={progress.pc}></progress>}
        {msg && <span>{msg}</span>}
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

