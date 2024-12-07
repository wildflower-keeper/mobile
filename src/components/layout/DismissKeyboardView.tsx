import { ReactNode } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, ViewStyle } from "react-native";

function DismissKeyboardView({ children, style }: { children: ReactNode; style?: ViewStyle }) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={style}
                behavior={Platform.OS === "ios" ? "height" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 30} // 키보드가 올라올 때 위치를 수동으로 조정
            >
                 <ScrollView 
                 contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} 
                 keyboardShouldPersistTaps="handled"
                 >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default DismissKeyboardView;
