import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 88,
          borderTopWidth: 0,
          backgroundColor: "#FFFFFF",
          elevation: 20,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          paddingTop: 8,
          paddingBottom: 20,
          paddingHorizontal: 16,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="claims"
        options={{
          title: "Claims",
          tabBarIcon: ({ size, color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
              }}
            >
              <Ionicons
                name={focused ? "document" : "document-outline"}
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="newClaim"
        options={{
          title: "New Claim",
          tabBarLabel: () => null,
          tabBarIcon: ({ size, color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#007AFF" : "#F2F2F7",
                borderRadius: 28,
                width: 56,
                height: 56,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                elevation: focused ? 8 : 2,
                shadowColor: focused ? "#007AFF" : "#000000",
                shadowOffset: {
                  width: 0,
                  height: focused ? 4 : 2,
                },
                shadowOpacity: focused ? 0.3 : 0.1,
                shadowRadius: focused ? 8 : 4,
                borderWidth: focused ? 0 : 1,
                borderColor: "#E5E5EA",
              }}
            >
              <Ionicons
                name="mic"
                size={28}
                color={focused ? "#FFFFFF" : "#8E8E93"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="voiceInput"
        options={{
          href: null, // This hides it from the tab bar
        }}
      />
      <Tabs.Screen
        name="trackClaim"
        options={{
          href: null, // This hides it from the tab bar
        }}
      />
      <Tabs.Screen
        name="editProfile"
        options={{
          href: null, // This hides it from the tab bar
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
              }}
            >
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
