import React from "react";
import { Modal, Text, View, StyleSheet } from "react-native";
import Colors from "../../../core/styles/app_colors";

interface ICustomBottomAlert {
  visibility: boolean;
  title: string;
  description: string;
  date?: string;
  time?: string;
  icon: JSX.Element;
  showButton?: JSX.Element;
}

const CustomBottomSheetAlert = ({
  visibility,
  title,
  description,
  date,
  time,
  icon,
  showButton,
}: ICustomBottomAlert) => {
  return (
    <View>
      <Modal visible={visibility} animationType={"fade"} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <View style={styles.contentContainer}>
              <View style={styles.titleContainer}>
                <View style={styles.iconContainer}>{icon}</View>
                <View>
                  <Text style={styles.titleText}>{title}</Text>
                  {/* <Text style={styles.dateText}>
                    {date ? `Date as of ${date} - ${time}` : ""}
                  </Text> */}
                </View>
              </View>
              <Text style={styles.descriptionText}>{description}</Text>
              {showButton && showButton}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  alertContainer: {
    position: "absolute",
    backgroundColor: "white",
    height: 190,
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    borderTopRightRadius: 27,
    borderTopLeftRadius: 27,
    elevation: 10,
    bottom: 0,
    right: 0,
    left: 0,
  },
  contentContainer: {
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  iconContainer: {
    // Add your icon container styles here
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
  },
  dateText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.darkRed,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
});

export default CustomBottomSheetAlert;
