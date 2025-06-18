import { useAuth } from '@/src/contexts/AuthContext';
import { supabase } from '@/src/lib/supabase';
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import colors from '@/constants/colors';

export default function Profile() {

  const { setAuth } = useAuth();

  async function handleSignout() {
    const { error } = await supabase.auth.signOut();
    setAuth(null)

    if (error) {
      Alert.alert("Erro ao deslogar.")
    }
  }

  return (
    <View style={styles.container}>
      {/* Texto do topo */}
      <View style={styles.topContainer}>
        <Text style={styles.logoText}>
          Taxi
          <Text style={styles.logoTextBlue}> IlhaCoop</Text>
        </Text>
      </View>

      {/* Conteúdo central */}
      <View style={styles.centerContainer}>
        <Text>Página Perfil</Text>
        <Button title='Deslogar' onPress={handleSignout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    paddingTop: 40, // Espaço para status bar
    alignItems: 'center',
    marginBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.amarelo_Taxi,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  logoTextBlue: {
    color: colors.azul_Taxi,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
