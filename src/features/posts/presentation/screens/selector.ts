const isInternetAvailable = () => {
    return false;
  };
  
  export const handleInternetAvailability = (internetFunction: any, noInternetFunction: any) => {
    const internet = isInternetAvailable();
    if (internet) {
      return internetFunction();
    } else {
      return noInternetFunction();
    }
  };
  