import { View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import colors from '@/constants/colors';
import {router} from 'expo-router'
import { Ionicons} from '@expo/vector-icons';

export default function Signup() {
  
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Pressable 
        onPress={() => router.back()}
        style={styles.voltar}>
          <Ionicons name= 'arrow-back' size={24} color={colors.white} />
        </Pressable>
        
        <Text style={styles.logoText}>
          Ta<Text style ={{color: colors.azul_Taxi}}>xi</Text>
        </Text>
        
        <Text style={styles.slogan}>
          Criar uma conta
        </Text>   
      </View>


      <View style={styles.form}>
        <View>
          <Text style= {styles.label}>Nome completo</Text>
          <TextInput
            placeholder='Nome completo...'
            style={styles.input}/>
        </View>
       
        <View>
          <Text style= {styles.label}>Email</Text>
          <TextInput
            placeholder='Digite seu Email...'
            style={styles.input}/>
        </View>

        <View>
          <Text style= {styles.label}>Senha</Text>
          <TextInput
            placeholder='Digite sua Senha...'
            secureTextEntry
            style={styles.input}/>
        </View>

        <Pressable style = {styles.button}>
          <Text style ={ styles.buttonText}>Cadastrar</Text>
        </Pressable>


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

  slogan: {
    fontSize: 34,
    color: colors.white,
    marginBottom: 34,

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

  voltar: {
    backgroundColor: '#757C7E',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  
  },

});