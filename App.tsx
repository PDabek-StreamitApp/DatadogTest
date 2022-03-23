/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {
  DdLogs,
  DdSdkReactNative,
  DdSdkReactNativeConfiguration,
  SdkVerbosity,
  TrackingConsent,
  DdRum,
} from '@datadog/mobile-react-native';

const CLIENT_TOKEN = '';
const APPLICATION_ID = '';
const ENVIRONMENT = '';

export function initializeDatadog() {
  const config = new DdSdkReactNativeConfiguration(
    CLIENT_TOKEN,
    ENVIRONMENT,
    APPLICATION_ID,
    true,
    true,
    true,
    TrackingConsent.GRANTED,
  );
  config.nativeCrashReportEnabled = true;
  config.sampleRate = 100;
  config.serviceName = 'com.datadoghq.reactnative.sample';
  config.verbosity = SdkVerbosity.DEBUG;

  DdSdkReactNative.initialize(config).then(() => {
    DdLogs.info('The RN Sdk was properly initialized');
    DdSdkReactNative.setUser({
      id: '1337',
      name: 'test app',
      email: 'xg@example.com',
      type: 'premium',
    });
    DdSdkReactNative.setAttributes({campaign: 'ad-network'});
  });
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    initializeDatadog();
  }, []);

  const fetchUser = useCallback(() => {
    return fetch('https://random-data-api.com/api/users/random_user').then(
      response => response.json(),
    );
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View style={{height: 200}} />
        <Button
          title="Click me debug"
          dd-action-name="click_me_button1"
          onPress={() => {
            DdLogs.debug('Lorem ipsum dolor sit amet…', {});
          }}
        />

        <Button
          title="Click me warn"
          dd-action-name="click_me_button2"
          onPress={() => {
            DdLogs.warn('Lorem ipsum dolor sit amet…', {});
          }}
        />

        <Button
          title="Click me info"
          dd-action-name="click_me_button3"
          onPress={() => {
            DdLogs.info('Lorem ipsum dolor sit amet…', {});
          }}
        />

        <TouchableOpacity
          style={{width: 100, height: 100, backgroundColor: 'red'}}
          onPress={() => {}}
        />

        <Button
          title="Click me error"
          dd-action-name="click_me_button4"
          onPress={() => {
            DdLogs.error('Lorem ipsum dolor sit amet…', {});
          }}
        />

        <Button
          title="Click me addAction"
          dd-action-name="click_me_button5"
          onPress={() => {
            DdRum.addAction('TAP', 'button name', {}, Date.now());
          }}
        />

        <Button
          title="Click me fetchUser"
          dd-action-name="click_me_button6"
          onPress={() => {
            fetchUser()
              .then(json => {
                DdLogs.debug('Fetched user:' + json.email);
              })
              .catch(error => {
                console.log(error);
              });
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
