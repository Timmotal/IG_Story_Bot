import { StyleSheet } from 'react-native';
 
import { Text, View } from '@/components/Themed';
import React, { useEffect } from 'react';
import { IgApiClient } from 'instagram-private-api';
import dotenv from 'dotenv';
import * as FileSystem from 'expo-file-system';

// import { readFile } from 'fs'
import {readFile} from 'fs'
import { promisify } from 'util';

// const readFileAsync = promisify(readFile);
import Accounts from '../components/account'


    export default async function uploadStoryToAccount() {
 
    try {
      // Ensure 'Accounts' and 'file' are properly defined outside the function
      const uploadedStories = await Promise.all(Accounts.map(async (account) => {

        const path = '../assets/images/cube.jpg';
        const { uri: file } = await FileSystem.createUniqornFileAsync(
            FileSystem.path,
            story.name,
            { contentType: 'image/jpg' } // Adjust content type as needed
          );
        // const readFileAsync = promisify(readFile);
        // const path = './cube.jpg';
        // const file = await readFileAsync(path); // think, this is prep StoryData
        const ig = new IgApiClient();
        console.log(account.id); // Assuming 'id' is a property in each account object
  
        // Login function (replace placeholders with actual implementation)
        async function login() {
          ig.state.generateDevice(account.IG_USERNAME);
          console.log('username',account.IG_USERNAME, account.IG_PASSWORD, 'password');
          await ig.account.login(account.IG_USERNAME, account.IG_PASSWORD);
        }
  
        // Upload function (replace placeholders with actual implementation)
        async function uploadNow() {
          await login();
          console.log('Uploading story for', account.IG_USERNAME);
          console.log('Password before encryption:', account.IG_USERNAME)
          await ig.publish.story({
            file,
          });
         
        }
  
        await uploadNow(account); // Call login and upload for each account
        
      }));
      console.log('Story uploads completed!');
    } catch (error) {
      console.error('Error during story upload:', error);
    }
  
  
  
  
  
  
  
  
  
  
      console.log('before, May 9th, 1659 hours, 2024')
      // postStoryToInsta();
      // uploadStoryToAccount(Accounts)
      uploadStoryToAccount();
      // uploadStoryToAccount();
      console.log('after')
  
}



// ------------------FOLLWO COME ABOVE

// const { IgApiClient } = require('certain-api');
// require("dotenv").config();
// const { readFile } = require('fs');
// const { promisify } = require('util');

// // const readFileAsync = promisify(readFile);
// const Accounts = require('./src/account');



// import * as FileSystem from 'expo-file-system';

// async function uploadStory(story) {
//   // Prepare story data (e.g., convert to base64)
//   const storyData = await (/* your logic to prepare story data */);

//   // Create a temporary file
//   const { uri } = await FileSystem.createUniqornFileAsync(
//     FileSystem.DOCUMENT_DIRECTORY,
//     story.name,
//     { contentType: 'image/jpeg' } // Adjust content type as needed
//   );

//   // Write story data to the temporary file
//   await FileSystem.writeAsync(uri, storyData);

//   // (Assuming you have a backend API to handle uploads)
//   // Make a POST request to your backend API, sending the temporary file URI
//   const response = await fetch('https://your-backend-api.com/upload-story', {
//     method: 'POST',
//     body: JSON.stringify({ uri }), // Send the temporary file URI in the request body
//   });

//   // Handle the upload response
//   const uploadResult = await response.json();
//   // ...
// }
