import { Button, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
// Import the `convertSecondsToTime` function from '@helpers'
// Make sure that the import path and function name are correct.
import { convertSecondsToTime } from '../../helper/utils';

interface ListItemData {
  productId: string;
  timeInSeconds: string; // Change this to number for timeInSeconds
}

interface Product{
  price:number,
  productId:number,
  productName:string
}

const ListItem: FC<ListItemData> = ({ productId, timeInSeconds }) => {
   const [seconds, setSeconds] = useState<number>(parseInt(timeInSeconds));
  const [isPaused, setIsPaused] = useState<boolean>(false);
const [Data,setData]=useState<undefined|Product>(undefined)

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleRestart = () => {
    setIsPaused(false);
    setSeconds(parseInt(timeInSeconds)); // Reset the timer to the initial time
  };



  const makeApiCall = async () => {
    // Make your API call here when the timer reaches 0
    try {
      const response = await fetch(`http://3.223.25.80:8080/TestAPI/api/Product/GetProductDetailById?ProductId=${productId}`);

      if (response.ok) {
        // Handle a successful API call
        // You can add your code to handle the response here
        const data=await response.json()
        setData(data)
        console.log('API call successful');
        console.log(data);
      } else {
        // Handle API call error
        console.error('API call error');
      }
    } catch (error) {
      console.error('API call error', error);
    }
  };




  
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        else {
         
          makeApiCall();
          clearInterval(timer); 
        }
      }, 1000);

      return () => {
        
        clearInterval(timer);
      };
    }
  }, [seconds, isPaused]);

  const { hours, minutes, seconds: remainingSeconds } = convertSecondsToTime(seconds);

  return (

  
    <View style={styles.container}>
      <Text style={styles.description}>{productId}</Text>

      {
        !Data?(
          <View>
          {/* Display the time using `hours`, `minutes`, and `remainingSeconds` */}
          <Text style={styles.title}>{`${hours}:${minutes}:${remainingSeconds}`}</Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Button title={isPaused?'Continue':'Pause'} onPress={handlePause}/>
            <Button title="Restart" onPress={handleRestart}/>
          </View>
        </View>
        ):(
          <View>
          <Text style={styles.description}>Product Name:{Data?.productName}</Text>
          <Text style={styles.description}>Product Price:{Data?.price}</Text>
          </View>
        )
      }
     
    </View>
   
  );
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
  },
});
