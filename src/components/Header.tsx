import { SafeAreaView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Logo from './Logo'
import { colors } from '../constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigationProp } from '../../type'

interface Props {
    icon?: boolean;
}

const Header = ({ icon }: Props) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    return (
        <SafeAreaView>
            <StatusBar />
            <View style={styles.container}>
                {/* Navigation */}
                <View style={styles.backButton}>
                    {
                        icon ?
                            (
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Ionicons name='arrow-back' />
                                </TouchableOpacity>
                            ) :
                            <Text style={styles.backButtonText}>News</Text>
                    }

                </View>
                {/* Logo */}
                <Logo />
                {/* Signin */}
                <TouchableOpacity style={styles.signInView} onPress={() => navigation.navigate('Signin')}>
                    <Text style={styles.signInText}>Signin</Text>
                    <Ionicons name='person' size={24} color={colors.black} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.black
    },
    backButton: {},
    backButtonText: {
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    signInView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signInText: {
        fontWeight: '500',
        marginRight: 5,
    }

})