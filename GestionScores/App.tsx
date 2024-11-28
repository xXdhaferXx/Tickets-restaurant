import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

interface Joueur {
  id: number;
  nom: string;
  prenom: string;
  score: number;
}

export default function App() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [score, setScore] = useState('');
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);

  const ajouterJoueur = () => {
    if (!nom || !prenom || !score || isNaN(Number(score))) {
      alert('Veuillez remplir correctement tous les champs.');
      return;
    }

    const nouveauJoueur: Joueur = {
      id: joueurs.length + 1,
      nom,
      prenom,
      score: parseInt(score, 10),
    };

    setJoueurs((prevJoueurs) =>
      [...prevJoueurs, nouveauJoueur].sort((a, b) => b.score - a.score)
    );

    setNom('');
    setPrenom('');
    setScore('');
  };

  const renderItem = ({ item, index }: { item: Joueur; index: number }) => {
    let ligneStyle = {};
    if (index === 0) ligneStyle = { backgroundColor: 'red' };
    else if (index === 1) ligneStyle = { backgroundColor: 'orange' };

    return (
      <View style={[styles.ligne, ligneStyle]}>
        <Text style={styles.texte}>
          {index + 1}. {item.nom} {item.prenom} - {item.score} pts
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Gestion des Scores des Joueurs</Text>
      
      {/* Formulaire pour ajouter un joueur */}
      <View style={styles.formulaire}>
        <TextInput
          placeholder="Nom"
          value={nom}
          onChangeText={setNom}
          style={styles.input}
        />
        <TextInput
          placeholder="Prénom"
          value={prenom}
          onChangeText={setPrenom}
          style={styles.input}
        />
        <TextInput
          placeholder="Score"
          value={score}
          onChangeText={setScore}
          style={styles.input}
          keyboardType="numeric"
        />
        <Button title="Ajouter" onPress={ajouterJoueur} />
      </View>

      {/* Liste des joueurs affichée immédiatement en dessous */}
      <Text style={styles.sousTitre}>Liste des Joueurs :</Text>
      <FlatList
        data={joueurs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formulaire: {
    marginBottom: 20,
  },
  sousTitre: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  ligne: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  texte: {
    fontSize: 16,
  },
});
