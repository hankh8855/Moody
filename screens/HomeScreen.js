import React from 'react';
import { StyleSheet, Animated, View, Modal, AppState } from 'react-native';
import { Brightness } from 'expo';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { lightColor } from '../constants/Colors';
import SettingsScreen from './SettingsScreen';
import ManualScreen from './ManualScreen';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.systemBrightness = null;
    this.state = {
      manualOnOff: true,
      modalVisible: false,
      lightColor: lightColor.beige,
      brightness: 0.4,
    }
    this.setManualOnOff = this.setManualOnOff.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setLightColor = this.setLightColor.bind(this);
    this.setBrightness = this.setBrightness.bind(this);
  }

  setManualOnOff(onOff) {
    this.setState({manualOnOff: onOff});
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setLightColor(color){
    this.setState({lightColor: color});
  }

  setBrightness(brightness){
    this.setState({brightness: brightness});
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
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        Brightness.setBrightnessAsync(this.state.brightness);
      } else if(state === 'inactive') {
        Brightness.setBrightnessAsync(this.systemBrightness);
      }
    });

    Brightness.getBrightnessAsync()
      .then(brightness => {
        if (!this.systemBrightness) {
          this.systemBrightness = brightness;
        }
        this.setBrightness(brightness)
      });
  }

  render() {
    const {manualOnOff, modalVisible, lightColor, brightness} = this.state;
    return (
      <PinchGestureHandler
        onGestureEvent={this._onPinchGestureEvent}
        onHandlerStateChange={this._onPinchHandlerStateChange}>
        {manualOnOff ? 
          (<ManualScreen setManualOnOff={this.setManualOnOff} />) : 
          (<Animated.View style={{...styles.container, backgroundColor:lightColor}} collapsable={false}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                >
                <View>
                  <SettingsScreen
                    state={this.state}
                    setModalVisible={this.setModalVisible} 
                    setLightColor={this.setLightColor}
                    setBrightness={this.setBrightness}></SettingsScreen>
                </View>
              </Modal>
            </Animated.View>)
        }
      </PinchGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
