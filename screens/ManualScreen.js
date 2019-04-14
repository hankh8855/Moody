import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import Layout from '../constants/Layout';

export default class ManualScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.overlay_dark}>
        <Text style={styles.title}>Manual</Text>
        <View style={styles.container}>
          <Text style={styles.content}>
            zoom in : go to setting screen {'\n'}{'\n'}{'\n'}
            zoom out : exit setting screen
          </Text>
        </View>
        <Button
          style={styles.out}
          title ='out'
          onPress={()=>{this.props.setManualOnOff(false)}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay_dark: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.8,
    backgroundColor: 'black',
    width: Layout.window.width,
    height: Layout.window.height,
  },
  title:{
    flex: 0.1,
    textAlign: 'center',
    justifyContent:'flex-start',
    color:'white',
    marginTop: 40,
    fontSize: 40,
  },
  container:{
    flex: 0.8,
    justifyContent:'center',
  },
  content:{
    textAlign:'center',
    color:'white',
    fontSize: 20,
    marginBottom: 30,
  },
  out:{
    flex: 0.1,
  }
})
