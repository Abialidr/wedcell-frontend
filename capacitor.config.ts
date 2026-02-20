import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.wedding.wedfield",
  appName: "WedField : Wedding Marketplace",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  // ios: {
  //   contentInset: 'automatic',
  // },
};

export default config;
