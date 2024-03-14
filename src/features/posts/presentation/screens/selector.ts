const isInternetAvailable = () => {
    return false;
  };

  export function handleInternetAvailability<T, U>(options: { forInternet: T, forNoInternet: U }): T | U {
    const internet = isInternetAvailable();
      if (internet) {
        return options.forInternet;
      } else {
        return options.forNoInternet;
      }
  }
  