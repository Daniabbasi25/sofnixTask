import { StyleSheet, Text, View, FlatList, FlatListProps } from 'react-native'
import React, { FC } from 'react'

interface ListItem {
    productId: string;
    timeInSeconds: string;
    
  }
interface CustomFlatListProps {
    data: ListItem[];
    renderItem: (item: ListItem) => React.ReactNode;
    keyExtractor: (item: ListItem) => string;
    ListHeaderComponent?: React.ReactElement;
    ListFooterComponent?: React.ReactElement;
  }
  
const CustomFlatList: FC<CustomFlatListProps> = ({
    data,
    renderItem,
    keyExtractor,
    ListHeaderComponent,
    ListFooterComponent,
  }) => {
  return (
    <View style={styles.container}>
    {ListHeaderComponent}
    <FlatList
      data={data}
      renderItem={({ item }) => <>{renderItem(item)}</>}
      keyExtractor={(item) => keyExtractor(item)}
    />
    {ListFooterComponent}
  </View>
  )
}

export default CustomFlatList

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
  });
  