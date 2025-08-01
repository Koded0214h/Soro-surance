import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TrackClaim() {
  const [claimId, setClaimId] = useState("CLM-2024-A87B");

  const handleTrackClaim = () => {
    // Here you would typically make an API call to track the claim
    console.log("Tracking claim:", claimId);
  };

  const handleScanClaimId = () => {
    // Here you would typically open a barcode/QR scanner
    console.log("Opening scanner...");
  };

  const handleNeedHelp = () => {
    // Here you would typically navigate to help/support page
    console.log("Opening help...");
  };

  const handleStartNewClaim = () => {
    router.push("/(tabs)/newClaim");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Claim</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Claim ID Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.claimIdInput}
              value={claimId}
              onChangeText={setClaimId}
              placeholder="Enter Claim ID"
              placeholderTextColor="#8E8E93"
            />
            <TouchableOpacity
              style={styles.trackButton}
              onPress={handleTrackClaim}
            >
              <Ionicons name="search" size={20} color="#FFF" />
              <Text style={styles.trackButtonText}>Track</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleScanClaimId}
          >
            <Ionicons name="qr-code-outline" size={20} color="#007AFF" />
            <Text style={styles.scanButtonText}>Scan Claim ID</Text>
          </TouchableOpacity>
        </View>

        {/* Claim Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Claim Progress</Text>

          <View style={styles.timelineContainer}>
            {/* Submitted Stage */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon}>
                <View style={styles.completedCircle}>
                  <Ionicons name="checkmark" size={16} color="#FFF" />
                </View>
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Submitted</Text>
                <Text style={styles.timelineDate}>April 15, 2024</Text>
              </View>
              <View style={styles.timelineLine} />
            </View>

            {/* Under Review Stage */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon}>
                <View style={styles.activeCircle}>
                  <Ionicons name="search" size={16} color="#007AFF" />
                </View>
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Under Review</Text>
                <Text style={styles.timelineDescription}>
                  Your claim is currently being reviewed by our team.
                </Text>
              </View>
              <View style={styles.timelineLineGray} />
            </View>

            {/* Approved/Rejected Stage */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon}>
                <View style={styles.pendingCircle}>
                  <Ionicons name="document-outline" size={16} color="#8E8E93" />
                </View>
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Approved/Rejected</Text>
              </View>
              <View style={styles.timelineLineGray} />
            </View>

            {/* Completed Stage */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon}>
                <View style={styles.pendingCircle}>
                  <Ionicons
                    name="checkmark-outline"
                    size={16}
                    color="#8E8E93"
                  />
                </View>
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Completed</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.helpButton} onPress={handleNeedHelp}>
            <Text style={styles.helpButtonText}>
              Need help with your claim?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newClaimButton}
            onPress={handleStartNewClaim}
          >
            <Ionicons name="mic" size={24} color="#FFF" />
            <Text style={styles.newClaimButtonText}>Start a New Claim</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  inputSection: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  claimIdInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1C1C1E",
    marginRight: 12,
  },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  trackButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scanButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  progressSection: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 20,
  },
  timelineContainer: {
    paddingLeft: 10,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  timelineIcon: {
    width: 40,
    alignItems: "center",
    marginRight: 16,
  },
  completedCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  activeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#007AFF",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  pendingCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E5E5EA",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: 14,
    color: "#8E8E93",
  },
  timelineDescription: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
  },
  timelineLine: {
    position: "absolute",
    left: 15,
    top: 32,
    width: 2,
    height: 40,
    backgroundColor: "#007AFF",
  },
  timelineLineGray: {
    position: "absolute",
    left: 15,
    top: 32,
    width: 2,
    height: 40,
    backgroundColor: "#E5E5EA",
  },
  actionSection: {
    alignItems: "center",
  },
  helpButton: {
    marginBottom: 20,
  },
  helpButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
  newClaimButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: "100%",
    justifyContent: "center",
  },
  newClaimButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
  },
});
