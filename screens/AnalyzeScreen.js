import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { analyzeText } from '../utils/analyzeText';

export default function AnalyzeScreen() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await analyzeText(input);
      setResult(res);
    } catch (error) {
      console.error('Analysis failed:', error);
      setResult({ dangerScore: null, redFlags: [], nextSteps: 'Something went wrong. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Paste a Message</Text>

      <TextInput
        style={styles.input}
        placeholder="Paste a suspicious message here..."
        multiline
        value={input}
        onChangeText={setInput}
      />

      <Button title="Analyze" onPress={handleAnalyze} disabled={!input || loading} />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      {result && (
        <View style={styles.result}>
          <Text style={styles.score}>⚠️ Risk Level: {result.dangerScore ?? 'N/A'}</Text>
          <Text style={styles.section}>🚩 Red Flags:</Text>
          {result.redFlags.length > 0 ? (
            result.redFlags.map((flag, i) => <Text key={i}>• {flag}</Text>)
          ) : (
            <Text>None found</Text>
          )}
          <Text style={styles.section}>🧭 Next Steps:</Text>
          <Text>{result.nextSteps}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    height: 140,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  result: {
    marginTop: 24,
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  section: {
    marginTop: 12,
    fontWeight: 'bold',
  },
});
