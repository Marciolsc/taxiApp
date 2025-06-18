import { useAuth } from '@/src/contexts/AuthContext';
import { supabase } from '@/src/lib/supabase';
import { View, Text, StyleSheet, Button, Alert} from 'react-native'

export default function Profile() {
  
  const {setAuth} = useAuth();
  
  async function handleSignout(){
    const { error } = await supabase.auth.signOut();
    setAuth(null)
    
    if(error){
      Alert.alert("Error ao deslogar.")
    }
  }
  
  
  
  return (
    <View style ={styles.container}>
      <Text>pagina perfil</Text>

      <Button title= 'Deslogar'  onPress = {handleSignout}/>
     


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});