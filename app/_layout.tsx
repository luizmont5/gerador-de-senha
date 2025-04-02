import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const gerarSenha = (tamanho) => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let senha = '';
  for (let i = 0; i < tamanho; i++) {
    senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return senha;
};

const App = () => {
  const [tamanho, setTamanho] = useState('8');
  const [senha, setSenha] = useState('');
  const [historico, setHistorico] = useState([]);

  const gerarNovaSenha = () => {
    const novaSenha = gerarSenha(parseInt(tamanho) || 8);
    setSenha(novaSenha);
    setHistorico([novaSenha, ...historico]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Gerador de Senhas</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Tamanho da senha"
        value={tamanho}
        onChangeText={setTamanho}
      />
      <TouchableOpacity style={styles.button} onPress={gerarNovaSenha}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>
      {senha ? <Text style={styles.senha}>{senha}</Text> : null}
      <Text style={styles.historicoTitle}>📜 Histórico de Senhas:</Text>
      <FlatList
        data={historico}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.historicoItem}>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  senha: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1DB954',
  },
  historicoTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  historicoItem: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default App;