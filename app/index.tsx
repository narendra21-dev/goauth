import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { router } from 'expo-router';

export default function inedx() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignin, setisSignin] = useState(false);

    useEffect(() => {

        if (isSignin) {
            router.push('../home');
        }
    }, [isSignin]);



    const handleLogin = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                router.push('../home');
                setisSignin(true);
            } else {
                alert('Please verify your email before logging in.');
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
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
            <Text>Login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} disabled={loading} />
            <Button title="Go to Register" onPress={() => router.push('/registerScreen')} />
            <Button title="Go to Register1" onPress={() => router.push('../registerScreen')} />
            <Button title="Forget Password" onPress={handlePasswordReset} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    input: { borderBottomWidth: 1, marginBottom: 16, padding: 8 },
});
