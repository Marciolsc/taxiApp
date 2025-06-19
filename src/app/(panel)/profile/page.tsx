import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Linking } from 'react-native';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '@/src/contexts/AuthContext';
import { supabase } from '@/src/lib/supabase';

export default function Profile() {
  const { setAuth } = useAuth();

  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
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
      Alert.alert('Erro ao deslogar.');
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
      } else {
        setEndLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      }
    } catch {
      setEndLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    }
  }

  function handleRequestRide() {
    if (!whatsappNumber.trim()) {
      Alert.alert('Atenção', 'Por favor, informe seu número de WhatsApp para contato.');
      return;
    }
    if (!startLocation.trim() || !endLocation.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o ponto de partida e o destino.');
      return;
    }

    const empresaWhatsApp = '+5521985910464';

    const mensagem =
      `🚖 *Solicitação de Corrida - Ilha Coop*\n\n` +
      `Olá, equipe Ilha Coop! Gostaria de solicitar uma corrida.\n\n` +
      `📍 *Ponto de Partida:* ${startLocation}\n` +
      `🏁 *Destino:* ${endLocation}\n` +
      `📲 *WhatsApp para contato:* ${whatsappNumber}\n\n` +
      `Por favor, entrem em contato para confirmar os detalhes da corrida.\n\n` +
      `Obrigado!`;

    const url = `https://wa.me/${empresaWhatsApp.replace(/\D/g, '')}?text=${encodeURIComponent(mensagem)}`;

    Alert.alert(
      'Taxi IlhaCoop',
      'Você será direcionado ao contato do nosso atendente no WhatsApp para confirmar sua corrida.',
      [
        {
          text: 'OK',
          onPress: () => {
            Linking.canOpenURL(url)
              .then((supported) => {
                if (!supported) {
                  Alert.alert('Erro', 'WhatsApp não está instalado no dispositivo.');
                } else {
                  return Linking.openURL(url);
                }
              })
              .catch(() => Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.'));
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
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
        <TextInput
          placeholder="Número WhatsApp (com DDD)"
          value={whatsappNumber}
          onChangeText={setWhatsappNumber}
          keyboardType="phone-pad"
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
