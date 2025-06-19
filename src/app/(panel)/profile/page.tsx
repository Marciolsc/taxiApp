import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '@/src/contexts/AuthContext';
import { supabase } from '@/src/lib/supabase';

export default function Profile() {
  const { setAuth } = useAuth();

  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ latitude: number; longitude: number } | null>(null);

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

  // Função para quando o usuário toca no mapa
  async function handleMapPress(event: MapEvent) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setDestinationCoords({ latitude, longitude });

    // Opcional: faz reverse geocode para pegar endereço e mostrar no campo
    try {
      let addressList = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (addressList.length > 0) {
        const address = addressList[0];
        const fullAddress = `${address.street || ''}, ${address.name || ''} - ${address.district || ''}, ${address.city || ''}`;
        setEndLocation(fullAddress);
      } else {
        setEndLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
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
          {/* Mostra o marcador do destino escolhido */}
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
          onChangeText={setEndLocation}
          style={styles.input}
        />
        <TouchableOpacity style={styles.requestButton} onPress={handleRequestRide}>
          <Text style={styles.requestButtonText}>Solicitar Corrida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  logoTextBlue: {
    color: '#0074D9',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4136',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 5,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    position: 'absolute',
    top: 100,
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
  requestButton: {
    backgroundColor: '#0074D9',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
