import React, { useEffect, useState } from "react";

import { Box, useToken, VStack, Row, Text, Heading } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { navigationProps } from "../router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { Linking, FlatList } from "react-native";
import api from "../api";
import { Alert } from "react-native";

interface Location {
  country: string;
  lat: string;
  locality: string;
  long: string;
}

interface Circuit {
  Location: Location;
  circuitId: string;
  circuitName: string;
  url: string;
}

interface Race {
  item: {
    Circuit: Circuit;
    date: string;
    raceName: string;
    round: string;
    season: string;
    url: string;
  }
}

const DriverDetails = ({route: { params }}: navigationProps): JSX.Element => {
  const navigation = useNavigation();

  const [textColor] = useToken('colors', ['darkBlue.800'])

  const [raceData, setRaceData] = useState<Array<any> | undefined>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchRaceData().then(() => setLoading(false));
  }, [page]);

  const fetchRaceData = async () => {
    try {
      const response = await api.getDriverRaces(params.driverId, page);

      setRaceData(response.data.MRData.RaceTable.Races);
    } catch (e) {
      console.error(e)
      Alert.alert('Ошибка', 'Ошибка получения данных с сервера', [
        {
          text: 'ОК',
          onPress: () => navigation.canGoBack() && navigation.goBack()
        }
      ])
    }
  }

  const DriverDetailsBlock = (): JSX.Element => {
    return (
      <VStack backgroundColor='blue.100' 
              w='full' 
              p={4}
              borderRadius={'15px'}
              space={2}>
        <Row alignItems='center' 
             justifyContent='space-between'>
          <Box flex={1}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name='chevron-down' size={30} color={textColor} />
            </TouchableOpacity>
          </Box>

          <Text flex={10} 
                textAlign='center' 
                fontSize='lg'
                color={textColor}
                bold>
            {params.givenName} {params.familyName}
          </Text>

          <Box flex={1} />
        </Row>
        
        <Row space={2} alignItems='center' pt={5}>
          <IconMaterialIcons name='date-range' size={20} color={textColor} />
          <Text color={textColor}>
            Date of birth: {params.dateOfBirth}
          </Text>
        </Row>

        <Row space={2} alignItems='center'>
          <Icon name='globe' size={20} color={textColor} />
          <Text color={textColor}>
            nationality: {params.nationality}
          </Text>
        </Row>

        <TouchableOpacity onPress={() => Linking.openURL(params.url)}>
          <Row space={2} alignItems='center'>
            <IconFontAwesome name='wikipedia-w' size={15} color={textColor} />
            <Text color={'darkBlue.500'}>
              Wikipedia link
            </Text>
          </Row>
        </TouchableOpacity>

        <Box alignItems='center' 
             justifyContent='center'
             pt={4}
             borderTopColor={textColor}
             borderTopWidth={1}>
          <Text color={textColor} fontSize={'md'} bold>
            races
          </Text>
        </Box>
      </VStack>
    )
  }

  const ListItem = ({item}: Race): JSX.Element => {

    const CircuitRow = ({ name, value } : { name: string, value: string }) :JSX.Element => {
      return (
        <Row alignItems='center' 
             justifyContent='space-between' 
             py={3}>
          <Text fontSize='md' 
                color={textColor}>
            {name}
          </Text>

          <Text fontSize='md' 
                color={textColor}>
            {value}
          </Text>
        </Row>
      )
    }

    return (
      <VStack p={4} 
              backgroundColor={'blueGray.100'}
              borderRadius={10}>
        <Heading color={textColor}>
          {item.raceName}
        </Heading>
        <CircuitRow name={'Season'} value={item.season} />
        <CircuitRow name={'Round'} value={item.round} />
        <CircuitRow name={'Date'} value={item.date} />
        <CircuitRow name={'Circuit'} value={item.Circuit.circuitName} />

        <TouchableOpacity onPress={() => Linking.openURL(item.Circuit.url)}>
          <Text fontSize='md' color={'darkBlue.500'}>
            get circuit info (redirect to Wikipedia)
          </Text>
        </TouchableOpacity>
      </VStack>
    )
  }

  return (
    <VStack flex={1}>
      <DriverDetailsBlock />

      <FlatList data={raceData} 
                style={{paddingHorizontal: 10}} 
                contentContainerStyle={{paddingVertical: 10}}
                renderItem={ListItem}
                ItemSeparatorComponent={() => <Box h={2} />} />
    </VStack>
  )
}

export default DriverDetails;
