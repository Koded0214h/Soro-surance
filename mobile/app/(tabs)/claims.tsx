import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Claims() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Claims</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.emptyState}>
          <Ionicons name="document-outline" size={64} color="#8E8E93" />
          <Text style={styles.emptyTitle}>No Claims Yet</Text>
          <Text style={styles.emptyDescription}>
            Track your existing claims or start a new one
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.trackButton}
            onPress={() => router.push("/(tabs)/trackClaim")}
          >
            <Ionicons name="search" size={24} color="#007AFF" />
            <Text style={styles.trackButtonText}>Track Existing Claim</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newClaimButton}
            onPress={() => router.push("/(tabs)/newClaim")}
          >
            <Ionicons name="add" size={24} color="#FFF" />
            <Text style={styles.newClaimButtonText}>Start New Claim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "space-between",
  },
  emptyState: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 22,
  },
  actionButtons: {
    paddingBottom: 100, // Account for tab bar
  },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  trackButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  newClaimButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 16,
  },
  newClaimButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
});
