import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Audio } from "expo-av";
import api from "../../src/services/api";

export default function VoiceInput() {
  const [targetLanguage, setTargetLanguage] = useState("Spanish");
  const [transcription, setTranscription] = useState("");
  const [translation, setTranslation] = useState("");
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedURI, setRecordedURI] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [claimResult, setClaimResult] = useState<any>(null);

  const languages = [
    { name: "Spanish", code: "es" },
    { name: "French", code: "fr" },
    { name: "Yoruba", code: "yo" },
    { name: "Igbo", code: "ig" },
    { name: "Hausa", code: "ha" },
  ];

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [sound, recording]);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Required", "Please grant microphone access.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
      setRecordedURI(null);
      setClaimResult(null);
    } catch (err) {
      console.error("Recording error:", err);
      Alert.alert("Error", "Failed to start recording. Please try again.");
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      
      const uri = recording.getURI();
      if (uri) {
        setRecordedURI(uri);
      }
    } catch (err) {
      console.error("Stop recording error:", err);
      Alert.alert("Error", "Failed to stop recording.");
    } finally {
      setRecording(null);
      setIsRecording(false);
    }
  };

  const playRecording = async () => {
    if (!recordedURI) return;

    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: recordedURI },
        { shouldPlay: true }
      );
      
      setSound(sound);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !status.isPlaying) {
          setIsPlaying(false);
        }
      });

      await sound.playAsync();
    } catch (err) {
      console.error("Playback error:", err);
      Alert.alert("Error", "Failed to play recording.");
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const handleTranscribe = async () => {
    if (!recordedURI) {
      Alert.alert("No Recording", "Please record audio first.");
      return;
    }

    setIsProcessing(true);
    setTranscription("Processing...");

    try {
      const formData = new FormData();
      formData.append('audio', {
        uri: recordedURI,
        name: 'recording.m4a',  // iOS prefers .m4a
        type: 'audio/m4a',      // Correct MIME type
      } as any);

      const response = await api.post('/claims/voice/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 second timeout
      });

      const data = response.data;
      setTranscription(data.transcription || "No transcription available");
      setTranslation(data.description || "No translation available");
      setClaimResult(data);

    } catch (error: any) {
      console.error("API Error:", error);
      
      let errorMsg = "Network request failed";
      if (error.response) {
        errorMsg = error.response.data?.error || error.response.statusText;
      } else if (error.request) {
        errorMsg = "No response from server";
      }

      Alert.alert("Error", errorMsg);
      setTranscription("Error: " + errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLanguageSelect = (language: string) => {
    setTargetLanguage(language);
    setShowLanguageModal(false);
  };

  const resetForm = () => {
    setTranscription("");
    setTranslation("");
    setRecordedURI(null);
    setClaimResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/newClaim")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Input</Text>
        <TouchableOpacity onPress={resetForm} style={styles.resetButton}>
          <Ionicons name="refresh" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Voice Recording Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VOICE RECORDING</Text>
          <View style={styles.recordingContainer}>
            <TouchableOpacity
              style={[
                styles.recordButton,
                isRecording && styles.recordingButton,
              ]}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <Ionicons
                name={isRecording ? "stop" : "mic"}
                size={32}
                color="#FFF"
              />
            </TouchableOpacity>
            <Text style={styles.recordingText}>
              {isRecording ? "Recording... Tap to stop" : "Tap to start recording"}
            </Text>
          </View>

          {recordedURI && (
            <View style={styles.playbackContainer}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={isPlaying ? stopPlayback : playRecording}
              >
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={24}
                  color="#007AFF"
                />
                <Text style={styles.playButtonText}>
                  {isPlaying ? "Pause" : "Play Recording"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Transcription Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRANSCRIPTION</Text>
          <View style={styles.textBox}>
            <TextInput
              style={styles.transcriptionInput}
              value={transcription}
              onChangeText={setTranscription}
              multiline
              placeholder="Your transcription will appear here..."
              placeholderTextColor="#8E8E93"
              editable={!isProcessing}
            />
          </View>
          {recordedURI && (
            <TouchableOpacity
              style={[styles.transcribeButton, isProcessing && styles.disabledButton]}
              onPress={handleTranscribe}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <Ionicons name="document-text" size={20} color="#FFF" />
                  <Text style={styles.transcribeButtonText}>Process Audio</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* Target Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TARGET LANGUAGE</Text>
          <TouchableOpacity
            style={styles.languageBox}
            onPress={() => setShowLanguageModal(true)}
          >
            <Text style={styles.languageText}>{targetLanguage}</Text>
            <Ionicons name="chevron-down" size={20} color="#1C1C1E" />
          </TouchableOpacity>
        </View>

        {/* Translation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRANSLATION</Text>
          <View style={styles.textBox}>
            <TextInput
              style={styles.transcriptionInput}
              value={translation}
              onChangeText={setTranslation}
              multiline
              placeholder="Translation will appear here..."
              placeholderTextColor="#8E8E93"
              editable={false}
            />
          </View>
        </View>

        {/* Claim Result */}
        {claimResult && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CLAIM CREATED</Text>
            <View style={styles.claimResultBox}>
              <Text style={styles.claimId}>Claim ID: {claimResult.claim_id}</Text>
              <Text style={styles.claimType}>Type: {claimResult.claim_type}</Text>
              <Text style={styles.claimLocation}>Location: {claimResult.location}</Text>
              <Text style={styles.claimDescription}>{claimResult.description}</Text>
            </View>
          </View>
        )}

        {isProcessing && (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.processingText}>Processing your voice recording...</Text>
          </View>
        )}
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity
                onPress={() => setShowLanguageModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#1C1C1E" />
              </TouchableOpacity>
            </View>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  targetLanguage === language.name && styles.selectedLanguage,
                ]}
                onPress={() => handleLanguageSelect(language.name)}
              >
                <Text
                  style={[
                    styles.languageOptionText,
                    targetLanguage === language.name &&
                      styles.selectedLanguageText,
                  ]}
                >
                  {language.name}
                </Text>
                {targetLanguage === language.name && (
                  <Ionicons name="checkmark" size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            ))}
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  backButton: {
    padding: 8,
  },
  resetButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  recordingContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recordingButton: {
    backgroundColor: "#FF3B30",
  },
  recordingText: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
  },
  playbackContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  playButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  textBox: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    minHeight: 120,
  },
  transcriptionInput: {
    fontSize: 16,
    color: "#1C1C1E",
    lineHeight: 24,
    textAlignVertical: "top",
    flex: 1,
  },
  transcribeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 12,
  },
  disabledButton: {
    backgroundColor: "#8E8E93",
  },
  transcribeButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#FFF",
    fontWeight: "500",
  },
  languageBox: {
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  languageText: {
    fontSize: 16,
    color: "#1C1C1E",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  closeButton: {
    padding: 4,
  },
  languageOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  selectedLanguage: {
    backgroundColor: "#F0F8FF",
  },
  languageOptionText: {
    fontSize: 16,
    color: "#1C1C1E",
  },
  selectedLanguageText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  processingContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  processingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007AFF",
  },
  claimResultBox: {
    backgroundColor: "#F0F8FF",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  claimId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 4,
  },
  claimType: {
    fontSize: 14,
    color: "#1C1C1E",
    marginBottom: 2,
  },
  claimLocation: {
    fontSize: 14,
    color: "#1C1C1E",
    marginBottom: 2,
  },
  claimDescription: {
    fontSize: 14,
    color: "#1C1C1E",
    marginTop: 8,
  },
});
