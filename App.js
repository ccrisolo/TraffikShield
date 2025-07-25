import React from 'react';
import { SafeAreaView } from 'react-native';
import AnalyzeScreen from './screens/AnalyzeScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AnalyzeScreen />
    </SafeAreaView>
  );
}