import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';


export type SurveyPopupType = '참여' | '불참' | null;

interface Props {
    openConfirmType: SurveyPopupType
    setOpenConfirmType: Dispatch<SetStateAction<SurveyPopupType>>
    handleClickSurvey: (ok: boolean) => void
}

const SurveyConfirmationModal = ({ openConfirmType, setOpenConfirmType, handleClickSurvey }: Props) => {
    return (
        <Modal
            transparent={true}
            visible={openConfirmType !== null}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.container}>
                    <Text style={styles.Message}>{`${openConfirmType}하시겠습니까?`}</Text>
                    <View style={styles.ButtonContainer}>
                        <Pressable
                            onPress={() => handleClickSurvey(openConfirmType === '참여')}
                            style={styles.confirmButton}>
                            <Text style={styles.confirmText}>
                                {`${openConfirmType}하기`}
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setOpenConfirmType(null)}
                            style={styles.cancelButton}>
                            <Text style={styles.cancelText}>
                                취소
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        height: 200,
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    Message: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    confirmButton: {
        width: '70%',
        paddingVertical: 13,
        backgroundColor: '#00bf40',
        borderRadius: 10,
        alignItems: 'center'
    },
    confirmText: {
        color: 'white'
    },
    cancelButton: {
        width: '70%',
        paddingVertical: 13,
        borderWidth: 1,
        borderColor: 'rgb(201, 201, 201)',
        borderRadius: 10,
        alignItems: 'center'
    },
    cancelText: {
        color: '#00bf40'
    },
    ButtonContainer: {
        alignItems: 'center',
        gap: 20,
        width: '100%'
    }
});

export default SurveyConfirmationModal;