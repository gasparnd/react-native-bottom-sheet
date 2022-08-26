import React, { useCallback, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ApplePay from "./src/components/ApplePay";

export default function App() {
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const snapPoints: string[] = ["40%"];

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isOpen ? "#ccc" : "#fff" }]}
    >
      <GestureHandlerRootView style={{ height: "100%" }}>
        <Text style={styles.subtitle}>
          {new Date().toString().slice(0, 11)}
        </Text>
        <Text style={styles.title}>Neymar's NFT</Text>
        <View style={styles.shadow}>
          <Image
            style={[styles.image, { opacity: isOpen ? 0.2 : 1 }]}
            source={{
              uri:
                "https://lh3.googleusercontent.com/_SSNvxiLKSDxUAX3eOE1m40T2ai9p9kFh9tsCHxC2gefRe3zz-H4llMLrBhD1FFw3ohh6Nnq59iV1J3DXUdjut4PZW57BOcDcrP1Eg=w600",
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSnapPress(0)}
        >
          <Text style={{ color: "#0080FB", fontSize: 16, fontWeight: "600" }}>
            GET
          </Text>
        </TouchableOpacity>

        <BottomSheet
          enablePanDownToClose={true}
          ref={sheetRef}
          snapPoints={snapPoints}
          onClose={() => setIsOpen(false)}
        >
          <BottomSheetView>
            <ApplePay />
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 32,
    textAlign: "left",
    margin: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "left",
    marginLeft: 10,
    color: "#aaa",
    fontWeight: "500",
  },
  image: {
    width: "90%",
    height: 400,
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 20,
  },
  shadow: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 6.84,
    elevation: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#f4f4f4",
    width: 80,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 15,
  },
});
