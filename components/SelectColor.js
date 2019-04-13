import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import {lightColor} from '../constants/Colors';

export default class SelectColor extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        flexWrap: 'wrap',
        }}>
        {
          Object.values(lightColor).map((color,i) => 
          <TouchableHighlight  
            style={{...styles.colorShape, backgroundColor:color}} 
            key={i} color={color}
            onPress={()=>{
              this.props.setLightColor(color);
            }}
            underlayColor="transparent"
          ><View /></TouchableHighlight>)
        }
      </View>
      );
  }
}

const styles = StyleSheet.create({
  colorShape : {
    borderRadius: 50,
    borderColor:'black',
    borderWidth: 0.2,
    height: 50,
    width: 50,
  }
})
