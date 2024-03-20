import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Colors from "../../../../core/styles/app_colors";
export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {

  return (
    <View style={[style.tabContainer]}>
      <View style={{ flexDirection: "row" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const tabBarIcon = options.tabBarIcon;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}>
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: isFocused ? Colors.lightGreenBorderColor : Colors.backgroundColor,
                  borderTopWidth: isFocused ? 3 : 1,
                }} >
                {tabBarIcon && tabBarIcon({ focused: isFocused, color: isFocused ? Colors.focusedColor : Colors.unfocusedColor, size: 24 })}
                <Text style={{ color: isFocused ? Colors.focusedColor : Colors.unfocusedColor, paddingTop: 10, fontSize: 14, fontWeight: '700' }}>
                  {label.toString()}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View >
  );
};

const style = StyleSheet.create({
  tabContainer: {
    height: 80,
    backgroundColor: Colors.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
