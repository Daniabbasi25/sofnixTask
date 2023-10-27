import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomFlatList, ListItem } from '@components';


interface ListItemData {
    productId: string;
    timeInSeconds: string;
    
  }

 
  const keyExtractor = (item: ListItemData) =>item.productId;
  const ListItemWrapper: React.FC<ListItemData> = ({ productId, timeInSeconds }) => {
    return <ListItem productId={productId} timeInSeconds={timeInSeconds} />;
  };
  

const Home = () => {

  const [data,setData]=useState([])
  const [loading,setLoading]=useState([])
  const getData = async () => {
    try {
      const res = await fetch('http://3.223.25.80:8080/rentole-api/api/Product/GetProductIds');
      if (res.ok) {
        const apiData = await res.json();
        setData(apiData);
        console.log(apiData);
      } else {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getData();
  }, []);
  
  return (
    
  <CustomFlatList
      data={data}
      renderItem={ListItemWrapper}
      keyExtractor={keyExtractor}
      ListHeaderComponent={<Text style={headerStyles.header}>Sofnix Task</Text>}
      ListFooterComponent={<Text style={footerStyles.footer}>By Danyal Munir</Text>}
    />
  
  
  )
}

export default Home


const itemStyles = StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
      padding: 16,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"space-between"
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 16,
    },
  });
  
  const headerStyles = StyleSheet.create({
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      padding: 16,
    },
  });
  
  const footerStyles = StyleSheet.create({
    footer: {
      fontSize: 18,
      fontStyle: 'italic',
      padding: 16,
    },
  });
  