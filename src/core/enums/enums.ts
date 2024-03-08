export enum AppEnvironment {
  ngrok,
  dev,
  qa,
  uat,
  prod,
}

export enum CustomButtonType {
  elevated,
  outlined,
}

export enum AppThemeMode {
  light,
  dark,
}

export enum ConnectivityStatus {
  connected,
  disconnected,
}

// Example usage:
// const currentEnvironment: AppEnvironment = AppEnvironment.dev;
// const buttonType: CustomButtonType = CustomButtonType.elevated;
// const themeMode: AppThemeMode = AppThemeMode.light;
// const connectionStatus: ConnectivityStatus = ConnectivityStatus.connected;
