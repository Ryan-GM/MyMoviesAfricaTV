import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import axios from 'axios';

const CollectionPage = () => {
  const [collection, setCollection] = useState([]);

  // Fetch user's collection from API
  useEffect(() => {
    // Assuming the API endpoint is `/api/cache`
    axios.get('https://app.mymovies.africa/api/cache')
      .then(response => setCollection(response.data))
      .catch(error => console.error("Error fetching collection: ", error));
  }, []);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity style={styles.movieItem}>
      <Image
        source={{ uri: item.poster }}
        style={styles.poster}
      />
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.rentDuration}>Rent for {item.rentDuration} Days</Text>
      </View>
    </TouchableOpacity>
  );

  const userName = 'Ryan Munge'; // Mock user details
  const walletBalance = '35.0'; // Mock wallet balance

  const onTopUp = () => {
    // Handle top-up action here
    console.log('Top Up Pressed');
  };

  return (
    <View style={styles.container}>
      {/* Add the Header Component */}
      <Header 
        userName={userName}
        walletBalance={walletBalance}
        onTopUp={onTopUp}
      />
      
      <Text style={styles.header}>My Collection</Text>
      
      {collection.length > 0 ? (
        <FlatList
          data={collection}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.movieList}
        />
      ) : (
        <Text style={styles.emptyMessage}>Your collection is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFCC00',
    marginTop: 20, // Adjust this as needed to space it from the header
    marginBottom: 20,
    textAlign: 'center',
  },
  movieList: {
    paddingBottom: 50,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieDetails: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  rentDuration: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  emptyMessage: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default CollectionPage;
