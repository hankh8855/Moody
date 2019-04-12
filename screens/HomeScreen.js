import React from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Modal,
} from 'react-native';
import { Brightness } from 'expo';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { lightColor } from '../constants/Colors';
import SettingsScreen from './SettingsScreen';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setLightColor = this.setLightColor.bind(this);
  }
  state = {
    modalVisible: false,
    lightColor: lightColor.beige,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setLightColor(color){
    this.setState({lightColor: color});
  }

  _baseScale = new Animated.Value(1);
  _pinchScale = new Animated.Value(1);
  _scale = Animated.multiply(this._baseScale, this._pinchScale);
  _lastScale = 1;
  _onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: this._pinchScale } }],
    { useNativeDriver: true }
  );

  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      if (this._lastScale < this._baseScale._value) {
        this.setModalVisible(true);
      }
      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);
    }
  };

  componentDidMount(){
    const bright = Brightness.getBrightnessAsync()
    console.log('bright',bright);
    // Brightness.setBrightnessAsync(1);
  }
  

  render() {
    return (
      <PinchGestureHandler
        onGestureEvent={this._onPinchGestureEvent}
        onHandlerStateChange={this._onPinchHandlerStateChange}>
        <Animated.View style={{...styles.container, backgroundColor:this.state.lightColor}} collapsable={false}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            >
            <View>
              <SettingsScreen setModalVisible={this.setModalVisible} setLightColor={this.setLightColor}></SettingsScreen>
            </View>
          </Modal>
        </Animated.View>
      </PinchGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  showModal:{
    marginTop:200
  },
  hideModal:{
    marginTop:200,
    marginLeft:100
  }
});
