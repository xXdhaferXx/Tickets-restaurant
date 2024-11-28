import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListeTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://localhost:3000/tickets') // URL de l'API simulée
      .then((response) => response.json())
      .then((data) => setTickets(data));
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.ticket}>
      <Text style={styles.ticketId}>Numéro de ticket: {item.id}</Text>
      <Text style={styles.ticketDate}>Date: {item.date}</Text>
      <Text style={styles.ticketTotal}>Montant: {item.total} €</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Tickets</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatList}
      />
      <Button title="Retour" onPress={() => navigation.navigate('CaisseRestaurant')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  flatList: {
    paddingBottom: 20,
  },
  ticket: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // Pour Android
  },
  ticketId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ticketDate: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
  ticketTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default ListeTickets;
