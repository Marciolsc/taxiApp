import { View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import colors from '@/constants/colors';
import {Link} from 'expo-router'

export default function Login() {
  
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.logoText}>
            TAXI<Text style={{ color: colors.azul_Taxi }}> IlhaCoop</Text>
          </Text>
        </View>
      </View>

      <View style={styles.form}>
        <View>
          <Text style= {styles.label}>Email</Text>
          <TextInput
            placeholder='Endereço de Email'
            placeholderTextColor="#A9A9A9"
            style={styles.input}/>
        </View>

        <View>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            placeholder="Ensira sua senha"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Pressable style = {styles.button}>
          <Text style ={ styles.buttonText}>Entrar</Text>
        </Pressable>

          <Text style={{ textAlign: 'center', marginTop: 16 }} >Ainda não possui uma conta? <a href="/(auth)/signup/page">Cadastre-se</a></Text>

      </View>   
        
    </View>
  );
}


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    paddingTop: 34,
    backgroundColor: colors.zinc,
  },
 
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
    flex:1,
    backgroundColor: colors.white,
    borderTopLeftRadius:16,
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
  },

  link: {
    marginTop: 16,
    textAlign: 'center',
    
  },

});