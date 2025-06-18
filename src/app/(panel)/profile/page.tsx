import { useAuth } from '@/src/contexts/AuthContext';
import { supabase } from '@/src/lib/supabase';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import colors from '@/constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Profile() {

  const { setAuth } = useAuth();

  async function handleSignout() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert("Erro ao deslogar.");
    }
  }

  return (
    <View style={styles.container}>
      {/* Topo com logo e botão de logout */}
      <View style={styles.topContainer}>
        {/* Logo */}
        <Text style={styles.logoText}>
          Taxi
          <Text style={styles.logoTextBlue}> IlhaCoop</Text>
        </Text>

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignout}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo central */}
      <View style={styles.centerContainer}>
        <Text>Página Perfil</Text>
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
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: '#001F3F',
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
    textAlign: 'center',
  },
  logoTextBlue: {
    color: colors.azul_Taxi,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end', // Alinha à direita
    marginTop: 8,
    backgroundColor: '#FF4136', // Cor de fundo do botão (exemplo: vermelho)
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
