import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Loader from '../components/Loader'; // Assuming you have a Loader component
import PAGES from '../constants/pages'; // Ensure you have the relevant pages constant
import apiHelper from '../helper/apiHelper'; // And the apiHelper for your API calls

const InvitationLandingScreen = ({ navigation, route:{
    params:{groupId}
} }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log(groupId);
    }, [groupId]);

    const handleJoin = async () => {
        setLoading(true);
        try {
            await apiHelper.post(`group/${groupId}/join`);
            navigation.navigate(PAGES.GROUP_LIST);
        } catch (e) {
            // Handle the error (e.g., show an alert)
        } finally {
            setLoading(false);
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <SafeAreaView style={styles.container}>
            {/* <TextInput
                style={styles.input}
                placeholder="Group Id"
                onChangeText={setGroupId}
                value={groupId}
            />
            <TouchableOpacity style={styles.button} onPress={handleJoin}>
                <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity> */}
            <Text>jknjknk</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default InvitationLandingScreen;
