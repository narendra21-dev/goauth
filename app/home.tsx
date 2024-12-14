import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { router } from 'expo-router';

export default function home() {
    const handleLogout = async () => {
        await signOut(auth);
        router.push('../index');
    };

    return (
        <View style={styles.container}>
            <Text>Welcome to Home Screen!</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
