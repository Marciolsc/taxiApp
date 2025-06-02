import { View, Text, StyleSheet, TextInput, Pressable, Linking, ScrollView } from 'react-native';
import colors from '@/constants/colors';
import { FontAwesome } from '@expo/vector-icons';

export default function Login() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={[
                styles.logoText,
                {
                  textShadowColor: '#fff',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                },
              ]}
            >
              Taxi
              <Text
                style={[
                  styles.logoText,
                  {
                    color: colors.azul_Taxi,
                    textShadowColor: '#fff',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                  },
                ]}
              >
                {' '}IlhaCoop
              </Text>
            </Text>
          </View>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <View>
            <Text style={[styles.label, { fontWeight: 'bold', fontSize: 18, textAlign: 'center' }]}>Email</Text>
            <TextInput
              placeholder="Endereço de Email"
              placeholderTextColor="#A9A9A9"
              style={styles.input}
            />
          </View>

          <View>
            <Text style={[styles.label, { fontWeight: 'bold', fontSize: 18, textAlign: 'center' }]}>Senha</Text>
            <TextInput
              placeholder="Insira sua senha"
              placeholderTextColor="#A9A9A9"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>

          <Text style={{ textAlign: 'center', marginTop: 16 }}>
            Esqueci minha senha{' '}
            <Text style={{ color: colors.azul_Taxi }} onPress={() => Linking.openURL('')}>
              clique aqui
            </Text>
          </Text>

          <Text style={{ textAlign: 'center', marginTop: 16 }}>
            Ainda não possui uma conta?{' '}
            <Text style={{ color: colors.azul_Taxi }} onPress={() => Linking.openURL('/(auth)/signup/page')}>
              Cadastre-se
            </Text>
          </Text>
        </View>

        {/* Redes Sociais */}
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

        {/* Informações de Contato */}
        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>© 2025 IlhaCoop. Todos os direitos reservados.</Text>
          <Text style={styles.contactText}>Email: ilhacoop@yahoo.com.br</Text>
          <Text style={styles.contactText}>Telefone: (21) 2467-2200</Text>
          <Text style={styles.contactText}>Endereço: Av. Paranapuã, Ilha do Governado, Rio de Janeiro - RJ</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.zinc,
  },
  container: {
    flex: 1,
    paddingTop: 34,
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
  },
});
