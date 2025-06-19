import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, FlatList } from 'react-native';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '@/src/contexts/AuthContext';
import { supabase } from '@/src/lib/supabase';

export default function Profile() {
  const { setAuth } = useAuth();

  const [startLocation, setStartLocation] = useState('');
  const [startState, setStartState] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>([]);

  const destinosExemplo = [
    'Praia da Bica',
    'Aeroporto Galeão',
    'Shopping Ilha Plaza',
    'Hospital Ilha do Governador',
    'Estrada do Dendê',
    'Cacuia',
    'Praia do Barão',
    'Pitangueiras',
    'Jardim Guanabara',
  ];

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à localização.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    setUserLocation({ latitude, longitude });

    let addressList = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (addressList.length > 0) {
      const address = addressList[0];
      const fullAddress = `${address.street || ''}, ${address.name || ''} - ${address.district || ''}, ${address.city || ''}`;
      setStartLocation(fullAddress);
      setStartState(address.region || address.state || '');
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  async function handleSignout() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert('Error ao deslogar.');
    }
  }

  async function handleMapPress(event: MapEvent) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setDestinationCoords({ latitude, longitude });

    try {
      let addressList = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (addressList.length > 0) {
        const address = addressList[0];
        const fullAddress = `${address.street || ''}, ${address.name || ''} - ${address.district || ''}, ${address.city || ''}`;
        setEndLocation(fullAddress);
        setFilteredDestinations([]); // limpa sugestões
      }
    } catch {
      setEndLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    }
  }

  function handleRequestRide() {
    Alert.alert(
      'Taxi IlhaCoop',
      'Sua corrida foi solicitada.\n\nNosso time de colaboradores entrará em contato pelo seu número de telefone para confirmar sua corrida.\n\nAgradecemos a preferência!',
      [{ text: 'OK' }]
    );
  }

  // Função para filtrar destinos conforme o usuário digita
  function handleDestinationChange(text: string) {
    setEndLocation(text);

    if (text.length > 0) {
      const filtered = destinosExemplo.filter(destino =>
        destino.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations([]);
    }
  }

  // Quando o usuário clica numa sugestão
  function handleSelectDestination(destino: string) {
    setEndLocation(destino);
    setFilteredDestinations([]);
  }

  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={styles.topBar}>
        <Text style={styles.logoText}>
          Taxi <Text style={styles.logoTextBlue}>IlhaCoop</Text>
        </Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleSignout}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Estado */}
      {startState ? (
        <View style={styles.stateContainer}>
          <Text style={styles.stateText}>Estado: {startState}</Text>
        </View>
      ) : null}

      {/* Mapa */}
      {userLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          onPress={handleMapPress}
        >
          {destinationCoords && <Marker coordinate={destinationCoords} />}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Carregando localização...</Text>
        </View>
      )}

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ponto de partida"
          value={startLocation}
          onChangeText={setStartLocation}
          style={styles.input}
        />
        <TextInput
          placeholder="Destino"
          value={endLocation}
          onChangeText={handleDestinationChange}
          style={styles.input}
        />

        {/* FlatList de sugestões */}
        {filteredDestinations.length > 0 && (
          <FlatList
            data={filteredDestinations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectDestination(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity style={styles.requestButton} onPress={handleRequestRide}>
          <Text style={styles.requestButtonText}>Solicitar Corrida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: '#001F3F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  logoTextBlue: { color: '#0074D9' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4136',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logoutText: { color: '#fff', marginLeft: 5 },
  stateContainer: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  stateText: { fontSize: 16, fontWeight: '600' },
  map: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  requestButton: {
    backgroundColor: '#0074D9',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  requestButtonText: { color: '#fff', fontWeight: 'bold' },
});
