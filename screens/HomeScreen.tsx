import React, { useEffect, useState } from "react";

import { Box, Row, Text, VStack, useToken } from "native-base";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from "../hooks";

import { fetchDrivers } from "../redux/driverList/driverListSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { stackProps } from "../router";

const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation<stackProps>();

  const [textColor] = useToken('colors', ['darkBlue.800'])

  const dispatch = useAppDispatch();

  const { drivers, loading, currentPage } = useAppSelector(store => store.drivers);

  const insets = useSafeAreaInsets();

  const ListItem = ({ item } : 
    { item: 
      { 
        dateOfBirth: string, 
        driverId: string, 
        givenName: string | undefined,
        familyName: string | undefined, 
        nationality: string, 
        url: string 
      } 
    }): JSX.Element => {
    return (
      <Row w='full' 
           minH={100} 
           borderRadius={20}
           p={4}
           alignItems='center'
           justifyContent='space-between'
           backgroundColor='blue.100'>
        <VStack space={2}>
          <Text color={textColor} fontSize='lg'>
            {item.givenName} {item.familyName}
          </Text>

          <Text color={textColor}>
            {item.dateOfBirth}
          </Text>
        </VStack>

        <TouchableOpacity onPress={() => navigation.navigate('DriverDetails', {...item})}>
          <Icon name='chevron-right' size={30} color={textColor} />
        </TouchableOpacity>
      </Row>
    )
  }

  return (
    <Box flex={1} pt={insets.top} px={2}>
      <Box>
        <FlatList 
          refreshControl={<RefreshControl refreshing={loading} onRefresh={() => dispatch(fetchDrivers(0))} />} 
          data={drivers}
          contentContainerStyle={{paddingBottom: insets.bottom}}
          ItemSeparatorComponent={() => <Box h={2} />}
          onEndReached={() => !loading && dispatch(fetchDrivers(currentPage))} 
          onEndReachedThreshold={0.5}
          renderItem={ListItem} />
      </Box>
    </Box>
  )
}

export default HomeScreen;
