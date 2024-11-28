import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CaisseRestaurant from './CaisseRestaurant';
import ListeTickets from './ListeTickets';
import NouveauTicket from './NouveauTicket';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CaisseRestaurant">
        <Stack.Screen name="CaisseRestaurant" component={CaisseRestaurant} />
        <Stack.Screen name="ListeTickets" component={ListeTickets} />
        <Stack.Screen name="NouveauTicket" component={NouveauTicket} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
