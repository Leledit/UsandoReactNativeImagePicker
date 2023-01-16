import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
export default function Home() {
  const navigation = useNavigation();
  const [statusPermission, setStatusPermission] = useState(false);
  const [statusBotao, setStatusBotao] = useState(false);

  useEffect(() => {
    verificarPermissoes();
  });

  async function verificarPermissoes() {
    let permissaoCamera = PermissionsAndroid.check('android.permission.CAMERA');
    if (permissaoCamera !== null) {
      const solicitacaoPermissao = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      console.log(solicitacaoPermissao);
      if (solicitacaoPermissao === 'granted') {
        setStatusPermission(true);
      } else {
        setStatusPermission(false);
      }
    } else {
      setStatusPermission(true);
    }
  }

  function escolherArquivo() {
    if (statusPermission === true) {
      Alert.alert('Selecionar', 'Como voce quer escolher o arquivo?', [
        {
          text: 'Galeria',
          onPress: () => abrirGaleria(),
          style: 'default',
        },
        {
          text: 'Camera',
          onPress: () => abrirCamera(),
          style: 'default',
        },
        {
          text: 'Cancelar',
          onDismiss: () => console.log('Cancelou.....'),
          style: 'default',
        },
      ]);
    } else {
      console.log('Verificar permissoes');
      verificarPermissoes();
    }
  }

  async function abrirGaleria() {
    const imagem = await launchImageLibrary(['photo']);
  }

  async function abrirCamera() {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
    };
    const result = await launchCamera(options);
    console.log(result);
  }

  return (
    <View>
      <Text>Pagina Home</Text>
      {!statusPermission && <ActivityIndicator size="large" />}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          escolherArquivo();
        }}>
        <Text style={styles.textoBotao}>Escolher arquivo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '60%',
    marginLeft: '20%',
    height: 40,
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  textoBotao: {
    textAlign: 'center',
    lineHeight: 40,
  },
});
