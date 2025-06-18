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
      Alert.alert("Error ao deslogar.")
    }
  }



  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={[
            styles.logoText,
            { textShadowColor: '#fff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2, },]}>Taxi
          <Text
            style={[
              styles.logoText,
              { color: colors.azul_Taxi, textShadowColor: '#fff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2, },]}> IlhaCoop
          </Text>
        </Text>
      </View>


      <Text>pagina perfil</Text>
      <Button title='Deslogar' onPress={handleSignout} />



    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.amarelo_Taxi,
    marginBottom: 8,
  },
});