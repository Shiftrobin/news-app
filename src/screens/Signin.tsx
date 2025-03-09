import { Dimensions, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { colors } from '../constants'
import Logo from '../components/Logo'
const {width} = Dimensions.get('window')

const Signin = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <Logo />
        <Text style={styles.noAccountText}>Sign In</Text>
        <View>
          <TextInput 
            placeholder='Enter your email or username...'
            placeholderTextColor={colors.grey} 
            style={styles.inputStyle}           
          />
          <TextInput 
            placeholder='Enter your password...'
            placeholderTextColor={colors.grey} 
            style={styles.inputStyle}   
            secureTextEntry                    
          />
          <TouchableOpacity style={styles.buttonView}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpView}>
            <Text style={styles.helpText}>Need help singing in?</Text>
          </TouchableOpacity>
          <View style={{paddingVertical: 20}}>
            <Text style={styles.noAccountText}>
              Don't have an BBC account?
            </Text>
            <TouchableOpacity>
              <Text style={[styles.helpText, {textAlign: 'center'}]}>Register Now</Text>
            </TouchableOpacity>
          </View>
        
        </View>
      </View>      
    </View>
  )
}

export default Signin

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: colors.white,
  },
  contentView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputView:{
    width: width - 30, 
    paddingVertical: 20
  },
  inputStyle:{
    borderBottomWidth: 0.5,
    borderBottomColor: colors.black,
    paddingHorizontal: 6,
    marginTop: 15,
    fontSize: 18,
    fontWeight: '500'
  },
  buttonView:{
    backgroundColor: colors.blue,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 7,
  },
  buttonText:{
    color: colors.white,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700'
  },
  helpView:{
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.black
  },
  helpText:{
    color: colors.blue,
    fontWeight: '700',
    fontSize: 17,
    textDecorationLine: 'underline'
  },
  noAccountText:{
    color: colors.black,
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
  } 

})