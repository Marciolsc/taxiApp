import { View, Text, StyleSheet, TextInput, Pressable, Linking } from 'react-native';
import colors from '@/constants/colors';
import { FontAwesome } from '@expo/vector-icons';

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={[
              styles.logoText,
              { textShadowColor: '#fff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2, },]}>Taxi
            <Text
              style={[
                styles.logoText,
                { color: colors.azul_Taxi, textShadowColor: '#fff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },]}> IlhaCoop
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Endereço de Email"
            placeholderTextColor="#A9A9A9"
            style={styles.input}
          />
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

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>

        <Text style={{ textAlign: 'center', marginTop: 16 }}>
          Ainda não possui uma conta?{' '}
          <Text
            style={{ color: colors.azul_Taxi }}
            onPress={() => Linking.openURL('/(auth)/signup/page')}
          >
            Cadastre-se
          </Text>
        </Text>
      </View>

      {/* Rodapé com redes sociais */}
      <View style={styles.footer}>
        <Pressable onPress={() => Linking.openURL('https://www.instagram.com/taxiilha/')}>
          <FontAwesome name="instagram" size={24} color={colors.zinc} style={styles.icon} />
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://www.facebook.com/ilhacoop/?locale=pt_BR')}>
          <FontAwesome name="facebook" size={24} color={colors.zinc} style={styles.icon} />
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://classificadosilha.com.br/listing/taxi-ilhacoop/')}>
          <FontAwesome name="globe" size={24} color={colors.zinc} style={styles.icon} />
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

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: colors.white,
  },

  icon: {
    marginHorizontal: 12,
  },
});
