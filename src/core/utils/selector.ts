const isInternetAvailable = () => {
  return false; // Function to check internet availability (currently always returns false for demonstration purposes)
};

// Function to handle internet availability and return the appropriate service instance
export function handleInternetAvailability<T, U>(options: { apiServiceInstance: T, realmServiceInstance: U }): T | U {
  const internet = isInternetAvailable(); // Checking internet availability
  if (internet) {
    return options.apiServiceInstance; // Returning API service instance if internet is available
  } else {
    return options.realmServiceInstance; // Returning Realm service instance if internet is not available
  }
}
