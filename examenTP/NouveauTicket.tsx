import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';

const NouveauTicket = ({ navigation }: { navigation: any }) => {
  const [plats, setPlats] = useState([]);
  const [commande, setCommande] = useState([]);
  const [quantite, setQuantite] = useState(1);
  const [selectedPlat, setSelectedPlat] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3000/plats') // URL de l'API simulée
      .then((response) => response.json())
      .then((data) => setPlats(data));
  }, []);

  const ajouterPlat = () => {
    if (selectedPlat) {
      const total = selectedPlat.prix * quantite;
      setCommande([
        ...commande,
        { ...selectedPlat, quantite, total },
      ]);
      setQuantite(1); // Réinitialiser la quantité après ajout
      setSelectedPlat(null); // Réinitialiser le plat sélectionné
    }
  };

  const montantTotal = commande.reduce((sum, plat) => sum + plat.total, 0);

  const enregistrerTicket = () => {
    const numeroTicket = Math.floor(Math.random() * 100000); // Exemple de génération de numéro de ticket aléatoire
    const date = new Date().toLocaleDateString();

    // Enregistrement du ticket via l'API
    fetch('http://localhost:3000/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numero: numeroTicket,
        date,
        total: montantTotal,
      }),
    }).then(() => {
      // Réinitialiser la commande après l'enregistrement
      setCommande([]);
      setQuantite(1); // Réinitialiser la quantité
      setSelectedPlat(null); // Réinitialiser le plat sélectionné
      navigation.navigate('CaisseRestaurant'); // Rediriger vers la page CaisseRestaurant
    });
  };

  const enregistrerEtNouveau = () => {
    const numeroTicket = Math.floor(Math.random() * 100000); // Exemple de génération de numéro de ticket aléatoire
    const date = new Date().toLocaleDateString();

    // Enregistrement du ticket via l'API
    fetch('http://localhost:3000/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numero: numeroTicket,
        date,
        total: montantTotal,
      }),
    }).then(() => {
      // Réinitialiser la commande pour commencer un nouveau ticket
      setCommande([]); // Réinitialiser les plats choisis
      setQuantite(1); // Réinitialiser la quantité
      setSelectedPlat(null); // Réinitialiser le plat sélectionné
    });
  };

  return (
    <View style={styles.container}>
      {/* Sélection des plats */}
      <Text style={styles.sectionTitle}>Sélectionner un plat</Text>
      <FlatList
        data={plats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.platItem,
              selectedPlat?.id === item.id && styles.selectedPlat,
            ]}
            onPress={() => setSelectedPlat(item)}
          >
            <Text style={styles.platText}>{item.nom} - {item.prix} €</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.platList} // Réduire l'espace entre les éléments
      />

      {/* Formulaire de saisie pour la quantité */}
      {selectedPlat && (
        <View style={styles.formContainer}>
          <Text style={styles.formText}>Quantité:</Text>
          <TextInput
            keyboardType="numeric"
            value={quantite.toString()}
            onChangeText={(value) => setQuantite(Number(value) || 1)}
            style={styles.input}
          />
          <Text style={styles.formText}>
            Prix total: {selectedPlat.prix * quantite} €
          </Text>

          {/* Bouton pour ajouter le plat à la commande */}
          <TouchableOpacity style={styles.addButton} onPress={ajouterPlat}>
            <Text style={styles.addButtonText}>Ajouter à la commande</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Liste des plats choisis */}
      <Text style={styles.sectionTitle}>Plats choisis</Text>
      <FlatList
        data={commande}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commandeItem}>
            <Text style={styles.commandeItemText}>{item.nom}</Text>
            <Text style={styles.commandeItemText}>Prix unitaire: {item.prix} €</Text>
            <Text style={styles.commandeItemText}>Quantité: {item.quantite}</Text>
            <Text style={styles.commandeItemText}>Prix total: {item.total} €</Text>
          </View>
        )}
      />

      {/* Montant total */}
      <Text style={styles.totalText}>Montant Total: {montantTotal} €</Text>

      {/* Boutons pour enregistrer ou commencer un nouveau ticket */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={enregistrerTicket}>
          <Text style={styles.saveButtonText}>Enregistrer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, styles.newButton]}
          onPress={enregistrerEtNouveau}
        >
          <Text style={styles.saveButtonText}>Enregistrer et Nouveau</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#333',
  },
  platItem: {
    paddingVertical: 12, // Réduit l'espace vertical
    paddingHorizontal: 15,
    marginVertical: 6, // Réduit la marge verticale
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedPlat: {
    backgroundColor: '#d3f8d3',
  },
  platText: {
    fontSize: 16,
    color: '#333',
  },
  platList: {
    paddingBottom: 10, // Réduit l'espace en bas de la liste
  },
  formContainer: {
    marginVertical: 16,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  formText: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  commandeItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  commandeItemText: {
    fontSize: 14,
    color: '#333',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%',
  },
  newButton: {
    backgroundColor: '#2196F3',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NouveauTicket;
