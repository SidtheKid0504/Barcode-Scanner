import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            scanData: '',
            buttonState: "normal"
        }
    }
    
    getCam = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === "granted",
            buttonState: "clicked",
            scanned: false
        });
    }

    handleBarCodeScanned = async ({ type, data }) => {
        if (this.state.buttonState === "clicked") {
            this.setState({
                scanned: true,
                scanData: data,
                buttonState: "normal"
            });
        }
    }

    render() {
        const hasCameraPermissions = this.state.hasCameraPermission;
        const scan = this.state.scanned;
        const buttonState = this.state.buttonState;

        if (buttonState === "clicked" && hasCameraPermissions) {
            return(
                <BarCodeScanner 
                    onBarCodeScanned = {scan ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            ) 
        } else {
            return(
                <View style={styles.container}>
                    <Image 
                        source=  {require("../assets/Barcode-scanner.jpg")}
                        style={{width: 200, height: 200, marginBottom: 50}}
                    />
                    <Text style={styles.displayText}>Barcode Scanner</Text>

                    <TouchableOpacity style={styles.submitButton} onPress = {
                        ()=> {
                            this.getCam();
                        }}>
                        <Text style={styles.buttonText}>Scan</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText: {
        textDecorationLine:'underline',
        fontSize: 30,
        textAlign: 'center'
    },
    buttonText: {
        marginTop: 15,
        textDecorationLine: 'underline',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    submitButton: {
        backgroundColor: 'red',
        width: 100,
        height: 50
    }
});