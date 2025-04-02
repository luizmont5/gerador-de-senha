import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';

const gerarSenha = (tamanho) => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let senha = '';
  for (let i = 0; i < tamanho; i++) {
    senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return senha;
};

const App = () => {
  const [tamanho, setTamanho] = useState(8);
  const [senha, setSenha] = useState('');
  const [historico, setHistorico] = useState([]);
  const [visibilidade, setVisibilidade] = useState({});

  const gerarNovaSenha = () => {
    const novaSenha = gerarSenha(tamanho);
    setSenha(novaSenha);
    setHistorico([{ senha: novaSenha, id: Date.now() }, ...historico]);
  };

  const alternarVisibilidade = (id) => {
    setVisibilidade((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Gerador de Senhas</Text>
      <Text style={styles.label}>Tamanho da senha: {tamanho}</Text>
      <Slider
        style={styles.slider}
        minimumValue={4}
        maximumValue={20}
        step={1}
        value={tamanho}
        onValueChange={setTamanho}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#fff"
        thumbTintColor="#1DB954"
      />
      <TouchableOpacity style={styles.button} onPress={gerarNovaSenha}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>
      {senha ? <Text style={styles.senha}>Senha gerada! Toque para ver no histórico.</Text> : null}
      <Text style={styles.historicoTitle}>📜 Histórico de Senhas:</Text>
      <FlatList
        data={historico}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => alternarVisibilidade(item.id)}>
            <Text style={styles.historicoItem}>
              {visibilidade[item.id] ? item.senha : '••••••••'}
            </Text>
          </TouchableOpacity>
        )}
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
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  slider: {
    width: '80%',
    marginBottom: 10,
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
    marginTop: 5,
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default App;