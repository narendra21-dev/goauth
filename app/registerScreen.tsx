import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { router } from 'expo-router';

export default function registerScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    useEffect(() => {
        if (emailVerified) {
            router.push('../home');
        }
    }, [emailVerified]);

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            alert('Verification email sent. Please check your inbox.');

            if (userCredential.user.emailVerified) {
                setEmailVerified(true);
                router.push('../home');
            }
            // navigation.navigate('Login');
        } catch (error) {
            alert(error);
        }
    };


    const handlePasswordReset = async () => {
        try {
            const userCredential = await sendPasswordResetEmail(auth, email);
            alert('Rest email password sent. Please check your inbox.')
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

            <Button title="Forget Password" onPress={handlePasswordReset} />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    input: { borderBottomWidth: 1, marginBottom: 16, padding: 8 },
});
