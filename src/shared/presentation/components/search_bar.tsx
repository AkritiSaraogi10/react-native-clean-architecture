// import React, { SetStateAction } from "react";
// import { TextInput, View } from "react-native";
// import Colors from "../../../core/styles/app_colors";
// import Icon from 'react-native-vector-icons/Ionicons'

// interface ISearchbar {
//   searchText: string;
//   setSearchText: React.Dispatch<SetStateAction<string>>;
// }

// const Searchbar = ({searchText, setSearchText}: ISearchbar) => {
//   return (
//     <View 
//       style={{
//         flexDirection: 'row', 
//         borderRadius: 8,
//         borderWidth: 0,
//         borderColor: 'transparent',
//         elevation: 4, 
//         alignItems: 'center', 
//         justifyContent: 'space-evenly',         
//         backgroundColor: Colors.midGray,
//         marginTop: 20
//       }}> 
//       <Icon name="search" size={20} color={Colors.unfocusedColor} />
//       <TextInput 
//         placeholder='Search'
//         style={{
//             width: '80%',
//             height: 40,
//             backgroundColor: Colors.midGray,
//             fontSize: 16,
//             color: Colors.unfocusedColor,
//         }}
//         placeholderTextColor={Colors.unfocusedColor}
//         value={searchText}
//         onChangeText={setSearchText}
//       />
//       <Icon name="mic" size={20} color={Colors.unfocusedColor} />
//     </View>   
//   );
// }

// export default Searchbar;

import React, { SetStateAction, useEffect, useState } from "react";
import { Dimensions, Keyboard, TextInput, View } from "react-native";
import Colors from "../../../core/styles/app_colors";
import Icon from 'react-native-vector-icons/Ionicons';

interface ISearchbar {
  searchText: string;
  setSearchText: React.Dispatch<SetStateAction<string>>;
}

const Searchbar = ({ searchText, setSearchText }: ISearchbar) => {
  const [containerHeight, setContainerHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateContainerHeight = () => {
      setContainerHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateContainerHeight);

    return () => {
      //Dimensions.removeEventListener("change", updateContainerHeight);
    };
  }, []);

  const textInputHeight = containerHeight * 0.05; // Height set to 5% of container height

  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 8,
        borderWidth: 0,
        borderColor: "transparent",
        elevation: 4,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: Colors.midGray,
        marginTop: 20,
        height: textInputHeight,
        paddingHorizontal: 10
      }}
    >
      <Icon name="search" size={20} color={Colors.unfocusedColor} />
      <TextInput
        placeholder="Search"
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: Colors.midGray,
          fontSize: 16,
          color: Colors.unfocusedColor,
          paddingHorizontal: 5,
        }}
        placeholderTextColor={Colors.unfocusedColor}
        value={searchText}
        onChangeText={setSearchText}
      />
      <Icon name="mic" size={20} color={Colors.unfocusedColor} />
    </View>
  );
};

export default Searchbar;
