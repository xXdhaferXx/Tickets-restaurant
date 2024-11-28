import React from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CaisseRestaurant = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Tickets</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NouveauTicket')}
      >
        <Text style={styles.buttonText}>Nouveau ticket</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ListeTickets')}
      >
        <Text style={styles.buttonText}>Liste des tickets</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Fond de page légèrement gris
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333', // Couleur du titre
  },
  button: {
    backgroundColor: '#4CAF50', // Couleur verte pour les boutons
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%', // Pour occuper toute la largeur possible
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Ombre légère pour un effet de profondeur
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff', // Texte du bouton en blanc
    fontSize: 18,
    fontWeight: '500',
  },
});

export default CaisseRestaurant;
