import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);

  const onboardingData = [
    {
      title: "Welcome to ClaimWhisper",
      subtitle: "Your AI-powered insurance claims assistant",
      description:
        "File claims faster and easier with voice input and real-time translation support.",
      icon: "mic",
      color: "#007AFF",
    },
    {
      title: "Voice Input",
      subtitle: "Speak your claims naturally",
      description:
        "Simply describe your incident in your own words. Our AI will transcribe and translate for you.",
      icon: "chatbubbles",
      color: "#34C759",
    },
    {
      title: "Track Progress",
      subtitle: "Stay updated on your claims",
      description:
        "Monitor your claim status in real-time with our intuitive tracking system.",
      icon: "analytics",
      color: "#FF9500",
    },
    {
      title: "Multi-language Support",
      subtitle: "Available in multiple languages",
      description:
        "Get support in Spanish, French, Yoruba, Igbo, Hausa, and more.",
      icon: "globe",
      color: "#AF52DE",
    },
  ];

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      router.push("/login");
    }
  };

  const handleSkip = () => {
    router.push("/login");
  };

  const handleGetStarted = () => {
    router.push("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: onboardingData[currentPage].color },
            ]}
          >
            <Ionicons
              name={onboardingData[currentPage].icon as any}
              size={60}
              color="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{onboardingData[currentPage].title}</Text>
          <Text style={styles.subtitle}>
            {onboardingData[currentPage].subtitle}
          </Text>
          <Text style={styles.description}>
            {onboardingData[currentPage].description}
          </Text>
        </View>
      </View>

      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentPage && styles.activeDot]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {currentPage < onboardingData.length - 1 ? (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={handleGetStarted}
            >
              <Text style={styles.getStartedButtonText}>Get Started</Text>
              <Ionicons name="rocket" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    color: "#8E8E93",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 60,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1C1C1E",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#007AFF",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  progressContainer: {
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E5EA",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#007AFF",
    width: 24,
  },
  buttonContainer: {
    alignItems: "center",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  getStartedButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#34C759",
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    shadowColor: "#34C759",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
});
