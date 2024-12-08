import { useMutateDeleteOvernight } from "@/hooks/queries/useMutateCreateOvernight";
import useOvernightRequestStore from "@/stores/useOverNight";
import queryClient from "@/utils/api/queryClient";
import { Pressable, StyleSheet, Text, View } from "react-native";

const FinalDeleteConfirmationModal = () => {
    const { setDeleteTargetId, deleteTargetId, overnightDuration } = useOvernightRequestStore();
    const deleteSchedule = useMutateDeleteOvernight();
    const handleDeleteSchedule = (id: number) => {
        deleteSchedule.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['userInfo'] });
                queryClient.invalidateQueries({ queryKey: ['sleepovers'] });
            },
        });
        setDeleteTargetId(-1);
    };
    if (deleteTargetId < 0) return null;
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={styles.message}>
                    {overnightDuration}
                </Text>
                <Text style={styles.message}>
                    일정을 취소하시겠습니까?
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => setDeleteTargetId(-1)} style={styles.noButton}>
                    <Text style={{color: 'black', fontSize: 18}}>아니오</Text>
                </Pressable>
                <Pressable onPress={() => handleDeleteSchedule(deleteTargetId)} style={styles.yesButton}>
                    <Text style={{color: 'white', fontSize: 18}}>네</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        position: 'absolute',
        width: '80%',
        top: '50%',
        left: '10%',
        zIndex: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingTop: 10
    },
    messageContainer: {
        flex: 0,
        alignItems: 'center',
        padding: 10
    },
    message: {
        fontSize: 17,
        color: 'black',
    },
    buttonContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: 'gray',
        width: '100%',
        height: 50,
    },
    noButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: 'gray',
        borderBottomLeftRadius: 20,
    },
    yesButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#19C23D',
        borderBottomRightRadius: 20,
    },
});

export default FinalDeleteConfirmationModal;
