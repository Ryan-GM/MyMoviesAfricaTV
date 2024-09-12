import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import placeholderImage from '../images/default.jpg';


const API_URL = 'https://app.mymovies.africa/api/cache';

const SearchScreen = () =>  {

    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        filterMovies();
    }, [searchQuery, movies]);

    const fetchMovies = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log('API Response:', data);

            if (data.content && Array.isArray(data.content)) {
                setMovies(data.content);
                setFilteredMovies(data.content);
            } else {
                setMovies([]);
                setFilteredMovies([]);
                setError('Unexpected data format.');
            }
        } catch (err) {
            console.error('Error fetching movies:', err);
            setError('Failed to fetch movies.');
        } finally {
            setLoading(false);
        }
    };


    const filterMovies = () => {
        if (searchQuery.trim() === '') {
            setFilteredMovies(movies);
        } else {
            const filtered = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredMovies(filtered);
        }
    };

    const truncateSynopsis = (synopsis) => {
        return synopsis.length > 100 ? synopsis.substring(0, 100) + '...' : synopsis;
    };

     const handlePress = () => {
         navigation.navigate();
     };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress()}>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Image source={placeholderImage} style={styles.image} />
                    <View style={styles.cardContent}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.synopsis}>{truncateSynopsis(item.synopsis)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="purple" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredMovies}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};



export default SearchScreen;
