import { useAuth } from '@/src/contexts/AuthContext';
import { supabase } from '@/src/lib/supabase';
import { View, Text, StyleSheet, Button, Alert } from 'react-native'

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
      {/* Header */}
      <View style={styles.header}>
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
      </View>
      <Text>pa gina perfil</Text>

      <Button title='Deslogar' onPress={handleSignout} />



    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    header: {
      paddingLeft: 14,
      paddingRight: 14,
      paddingBottom: 70,
    },
    logoText: {
      fontSize: 35,
      fontWeight: 'bold',
      color: colors.amarelo_Taxi,
      marginBottom: 8,
    },
    form: {
      flex: 1,
      backgroundColor: colors.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingTop: 24,
      paddingLeft: 14,
      paddingRight: 14,
    },
    label: {
      color: colors.zinc,
      marginBottom: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.gray,
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 8,
      paddingTop: 14,
      paddingBottom: 14,
    },
    button: {
      backgroundColor: colors.gray,
      paddingTop: 14,
      paddingBottom: 14,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      borderRadius: 8,
    },
    buttonText: {
      fontWeight: 'bold',
      color: '#000',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: colors.white,
    },
    icon: {
      marginHorizontal: 12,
    },
    contactInfo: {
      backgroundColor: colors.white,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    contactText: {
      textAlign: 'center',
      fontSize: 14,
      color: '#555',
      marginBottom: 4,
    }
  });