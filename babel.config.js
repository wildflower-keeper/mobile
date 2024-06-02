module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'MY_ENV',
        moduleName: '@env',
        path: '.env.local',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {'@': './src'},
      },
    ],
  ],
};
