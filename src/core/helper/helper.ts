import {Dimensions} from 'react-native';

export const toCamelCase = (inputString: string): string => {
  return inputString
    .toLowerCase()
    .replace(/[^a-zA-Z]+(.)/g, (match, chr) => chr.toUpperCase());
};

export const toCapitalize = (inputString: string): string => {
  return inputString.toLowerCase().replace(/^\w/, match => match.toUpperCase());
};

//const  camelCaseString = toCamelCase("Akriti");

export const getHeight = () => {
  const {height} = Dimensions.get('window');
  return height;
};
export const getWidth = () => {
  const {width} = Dimensions.get('window');
  return width;
};

// const getScreenHeight = getHeight();
