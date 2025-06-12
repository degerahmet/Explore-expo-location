import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform, FlatList, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [location, setLocation] = useState<string | null>(null);
  const [pools, setPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLocationSearch = async () => {
    setLoading(true);
    setLocation('Searching for location...');
    setPools([]);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation('Permission to access location was denied');
        setLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(`Lat: ${loc.coords.latitude}, Lon: ${loc.coords.longitude}`);
      // Fetch pools from OpenStreetMap Nominatim
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=swimming+pool&limit=20&viewbox=${loc.coords.longitude-0.05},${loc.coords.latitude+0.05},${loc.coords.longitude+0.05},${loc.coords.latitude-0.05}&bounded=1`;
      const response = await fetch(url, {
        headers: { 'User-Agent': 'expo-app' }
      });
      const data = await response.json();
      setPools(data);
    } catch (e) {
      setLocation('Error fetching location or pools');
      Alert.alert('Error', 'Could not fetch location or pools.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Button title="Find My Location" onPress={handleLocationSearch} />
      {location && <Text style={styles.locationText}>{location}</Text>}
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      <FlatList
        data={pools}
        keyExtractor={(item, idx) => item.place_id?.toString() || idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.poolItem}>
            <Text style={styles.poolName}>{item.display_name?.split(',')[0]}</Text>
            <Text style={styles.poolAddress}>{item.display_name}</Text>
          </View>
        )}
        style={{ marginTop: 20, width: '100%', flexGrow: 0 }}
        contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1, justifyContent: 'flex-start' }}
        ListEmptyComponent={loading ? null : <Text style={{textAlign: 'center', marginTop: 20}}>No pools found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  locationText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
  },
  poolItem: {
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  poolName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  poolAddress: {
    fontSize: 14,
    color: '#555',
  },
});
