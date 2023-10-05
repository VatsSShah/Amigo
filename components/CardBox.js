import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import { getLocalStoreData, setLocalStoreData } from '../helper/localStorage';
import { CARDS } from '../constants/string';
import { calcHeight, calcWidth } from '../helper/res';
import copyToClipBoard from '../helper/copyToClipBoard';
import Card from './card';
import DeleteCardModal from './DeleteCardModal';
import Modal from 'react-native-modal';
import AddCardModal from './AddCardModal';

function CardBox({ item }) {
    const { setCards } = useAuth();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [showEditCard, setShowEditCard] = useState(false);

    async function deleteCard() {
        const encryptedCards = await getLocalStoreData(CARDS);
        encryptedCards.splice(item.index, 1);
        await setLocalStoreData(CARDS, encryptedCards);
        setCards((prev) => prev.filter((card) => card.index !== item.index));
        setShowConfirmDelete(false); // Close the modal after deletion
        hideMenu();
    }

    const copyCardNumberToClipboard = () => {
        copyToClipBoard(item.card_number, 'Card Number Copied to Clipboard');
        hideMenu();
    };

    const hideMenu = () => {
        setShowMenu(false);
    };

    return (
        <View style={styles.container}>
            <Card item={item} showCard={showCard} />
            <View style={styles.menuBar}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center' }}
                    onPress={() => setShowMenu(true)}
                >
                    <Ionicons
                        name="ellipsis-vertical-outline"
                        size={calcHeight(4)}
                        color="blue"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center' }}
                    onPress={() => setShowCard((prev) => !prev)}
                >
                    <Ionicons
                        name={showCard ? 'eye' : 'eye-off'}
                        size={calcHeight(4)}
                        color="blue"
                    />
                </TouchableOpacity>
            </View>
            <DeleteCardModal
                onDelete={deleteCard}
                onCancel={() => {
                    setShowConfirmDelete(false);
                    hideMenu();
                }}
                visible={showConfirmDelete}
            />
            <Modal
                isVisible={showMenu}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                onBackdropPress={hideMenu}
                onBackButtonPress={hideMenu}
                propagateSwipe={true}
                swipeDirection={['down']}
                onSwipeComplete={hideMenu}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={copyCardNumberToClipboard}
                    >
                        <Ionicons
                            name="copy-outline"
                            size={calcWidth(8)}
                            color="blue"
                        />
                        <Text style={styles.menuText}>Copy Card Number</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => setShowEditCard(true)}
                    >
                        <Ionicons
                            name="create-outline"
                            size={calcWidth(8)}
                            color="blue"
                        />
                        <Text style={styles.menuText}>Edit Card</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => setShowConfirmDelete(true)}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={calcWidth(8)}
                            color="red"
                        />
                        <Text style={styles.menuText}>Delete Card</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <AddCardModal
                onAddCard={(a) => console.log('Clicked',a)}
                visible={showEditCard}
                hideModal={() => setShowEditCard(false)}
                cardData={item}
            />
        </View>
    );
}

export default ({ item }) => <CardBox item={item} />;

const styles = StyleSheet.create({
    container: {
        marginTop: calcHeight(7),
        backgroundColor: '#A9A9A9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: calcWidth(2),
    },
    menuBar: {
        paddingHorizontal: calcHeight(1),
        alignItems: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: calcHeight(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuText: {
        fontSize: calcHeight(2),
        paddingHorizontal: calcHeight(1),
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});