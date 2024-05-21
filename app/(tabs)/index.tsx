// import { StyleSheet } from 'react-native';
 
// import { Text, View } from '@/components/Themed';
// import { useEffect } from 'react';
// import uploadStoryToAccount from '@/utils/uploadStory';

// export default function TabOneScreen() {

//   useEffect(() => {
//     console.log('before use Effect');
//     uploadStoryToAccount();
//     console.log('afetr useEffect, which is an async function');
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab One For  Instagram Bot</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// }); ------------------------------------------------

// import React, { useState } from 'react';
// import { Button, Image, View } from 'react-native';
// import axios from 'axios'; // Assuming you have axios installed (npm install axios)

// const UploadStory = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const pickImage = async () => {
//     // Use a library like react-native-image-picker for image selection
//     const result = await launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3], // Optional: Maintain aspect ratio for stories
//       quality: 1, // Optional: Preserve image quality
//     });

//     if (!result.cancelled) {
//       setSelectedImage(result.uri);
//     }
//   };

//   const uploadStory = async () => {
//     if (!selectedImage) {
//       // Handle error: No image selected
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', {
//       uri: selectedImage,
//       type: 'image/jpeg', // Assuming JPEG format, adjust if needed
//       name: 'story.jpg', // Optional: Provide a custom filename
//     });

//     try {
//       const response = await axios.post('/upload-story', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Story upload response:', response.data);
//     } catch (error) {
//       console.error('Story upload error:', error);
//       // Handle upload errors gracefully (e.g., display error message to user)
//     }
//   };

//   return (
//     <View>
//       {selectedImage && (
//         <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
//       )}
//       <Button title="Pick Image" onPress={pickImage} />
//       <Button title="Upload Story" onPress={uploadStory} disabled={!selectedImage} />
//     </View>
//   );
// };

// export default UploadStory;

// ---------------------------------------------------

// import React, { useState } from 'react';
// import { Button, Image, StyleSheet, View } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const App = () => {
//   const [ image, setImage ] = useState(String || null);

//   // const pickImage = async () => {
//   //   const result = await launchImageLibraryAsync({
//   //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//   //     allowsEditing: true,
//   //     aspect: [4, 3], // Optional aspect ratio recommendation
//   //     quality: 1, // Ensure high-quality image
//   //   });

//   //   if (!result.cancelled) {
//   //     setSelectedImage(result.uri);
//   //   }
//   // };

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       // mediaTypes: ImagePicker.MediaTypeOptions.All,
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1, // if you want the quality reduced
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri); // set the image in state
//     }
//   };

//   const uploadImage = async () => {
//     if (!Image) {
//       // Handle no image selected error
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', {
//       uri: image,
//       type: 'image/jpg', // Or appropriate image type based on selection
//       name: 'image.jpg', // Optional filename
//     });

//     try {
//       const response = await fetch('http://localhost:8080/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         // Handle upload failure
//         throw new Error('Image upload failed');
//       }

//       // Handle successful upload (optional: display confirmation)
//     } catch (error) {
//       console.error(error);
//       // Handle errors gracefully (e.g., display error message)
//     }
//   };

//   return (
//     <View>
//       <Button title="Pick Image" onPress={pickImage} />
//       <Button title="Upload to Instagram Story" onPress={uploadImage} />
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   textButton:{
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     marginVertical: 10,
//   },
// })
// ---------------------------------

import React, { useState } from 'react';
import { View, Button, Image, Alert, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [image, setImage] = useState(null);
  const [ progress, setProgress ] = useState(0)

  // const uploadStoryImage = () => {

  //   cont formData = new FormData();
  //   formData.append('profile', { // keyName
  //     name: new Date() + "_profile",
  //     uri: profileImage,
  //     type: 'image/jpg',
  //   })

  //   // try {
  //   //   const res = await client.post('/upload-profile', formData, {
  //   //     // configurationHeaders
  //   //     headers: {
  //   //       Accept: 'application/json',
  //   //       'Content-Type': 'multipart/form-data',
  //   //       authorization: 'KEY'
  //   //     },
  //   //     onUploadProgress: ({ loaded, total }) => console.log((loaded / total))
  //   //     // setProgress(loaded / total)
  //   //   });

  //   //   console.log(res.data)
  //   // } catch (error) {
  //   //   console.log(error.message)
  //   // }
  //   try {
  //     const res = await axios.post('/upload', formData, {
  //       // configurationHeaders
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'multipart/form-data',
  //         // authorization: 'KEY'
  //       },
  //       onUploadProgress: ({ loaded, total }) => console.log((loaded / total))
  //       // setProgress(loaded / total)
  //     });

  //     console.log(res.data)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1, // if you want the quality reduced
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri); // set the image in state
    }
  };
  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };

  const uploadImage = async () => {
    console.log('story about to be uploaded')
    // if (!image) {
    //   return;
    // }

    // console.log('let us check out the formdata')
    const formData = new FormData();
    console.log(formData, 'form Data before append')
    
    formData.append('image', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      // const god = 'god is a metaphor, can you believe it'

      
      // const response = await fetch('https://5481-102-89-33-133.ngrok-free.app/echo', {
        const response = await fetch('https://9b60-102-89-47-94.ngrok-free.app/upload', {
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
        // Handle upload failure
        const feed = response.status
        throw new Error( feed,'Image upload failed');
      }

      // Handle successful upload (optional: display confirmation)
    } catch (error) {
      console.error(error, 'this is the error');
      // Handle errors gracefully (e.g., display error message)
    }


    // try {
    //   console.log(image, ' this is the image')
    //   console.log(' about to upload image')
    //   const response = await axios.post('https://5481-102-89-33-133.ngrok-free.app/upload', formData, {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    //   console.log(formData, ' this is the formData')
    //   console.warn('post to server completed succesfully');
      
    //   Alert.alert('Upload successful');
    // } catch (error) {
    //   Alert.alert('Upload failed');
    // }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <View style={styles.buttonContainer}>
        <Button title="Pick Image" onPress={pickImage} />
        {progress ? <Text>{progress}</Text> : null}
        <Button title="Upload Image" onPress={uploadImage} />
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

