import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import CustomButton from './src/CustomButton';
import CustomModal, {RefModalObject} from './src/CustomModal';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const refModal = useRef<RefModalObject>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <SafeAreaView style={[styles.flex1, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={styles.flex1}>
        <View
          style={[
            styles.flex1,
            {backgroundColor: isDarkMode ? 'black' : 'white'},
          ]}>
          <View style={styles.centered}>
            <CustomButton
              style={styles.btn}
              backgroundColor={'red'}
              onPress={() => {
                refModal.current?.open();
              }}>
              <Text style={styles.text}>Abrir Modal</Text>
            </CustomButton>
          </View>
        </View>
      </ScrollView>
      <CustomModal ref={refModal} slideDirection={'up'}>
        <View style={styles.centered}>
          <CustomButton
            style={styles.btn}
            backgroundColor={'red'}
            onPress={() => {
              refModal.current?.close();
            }}>
            <Text style={styles.text}>Cerrar Modal</Text>
          </CustomButton>
        </View>
      </CustomModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: 50,
    width: '70%',
    borderRadius: 20,
    marginVertical: '5%',
  },
  text: {color: 'white', fontWeight: 'bold'},
});

export default App;
