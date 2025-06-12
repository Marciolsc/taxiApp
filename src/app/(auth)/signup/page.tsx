
import { useState } from 'react';
import colors from '@/constants/colors';
import { View, Text, StyleSheet, TextInput, Alert, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';





export default function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

async function handleSignUp() {
    setLoading(true);
    try {
    
      const {  data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
        options:{
          data:{
            name: name
          }
        }
      })
      
      router.replace('/')
    } catch (error) {
      console.log(error)
      
      Alert.alert('Erro inesperado.');
      setLoading(false);
    
    } finally {
      
      Alert.alert('Cadastro efetuado com sucesso.');
      setLoading(false);

    }
  }
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable 
            style = {styles.voltar}
            onPress ={()=> router.back()}
            >
              <Ionicons name = "arrow-back"  size = {24} color = {colors.white} />
            </Pressable>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={[
                  styles.logoText,
                  {textShadowColor: '#fff',textShadowOffset: { width: 1, height: 1 },textShadowRadius: 2,},]}>Taxi
                <Text
                  style={[
                    styles.logoText,
                    {color: colors.azul_Taxi,textShadowColor: '#fff',textShadowOffset: { width: 1, height: 1 },textShadowRadius: 2,},]}> IlhaCoop
                </Text>
              </Text>
            </View>
          </View>


          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Nome completo</Text>
              <TextInput
                placeholder='Nome completo...'
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder='Digite seu Email...'
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                placeholder='Digite sua Senha...'
                secureTextEntry
                style={styles.input}
                value={senha}
                onChangeText={setSenha}

              />
            </View>

            <Pressable style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Cadastrar
                  {loading? 'Carregando...' : 'Cadastrar'}
              </Text>
            </Pressable>

            {/* Informações de Contato */}
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>© 2025 IlhaCoop. Todos os direitos reservados.</Text>
              <Text style={styles.contactText}>Email: ilhacoop@yahoo.com.br</Text>
              <Text style={styles.contactText}>Telefone: (21) 2467-2200</Text>
              <Text style={styles.contactText}>Endereço: Av. Paranapuã, Ilha do Governado, Rio de Janeiro - RJ</Text>
            </View>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginBottom: 8,
   
  },
  
  slogan: {
    fontSize: 34,
    color: colors.white,
    marginBottom: 34,

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
  },

  voltar: {
    backgroundColor: '#757C7E',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,

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
  },
  footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: colors.white,
    },

});