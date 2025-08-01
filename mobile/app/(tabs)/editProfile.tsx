import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: "Ola",
    lastName: "Tunde",
    email: "olatunde@gmail.com",
    phone: "+234 8012345678",
    address: "Ola Tunde Street",
    city: "Unilag",
    state: "Lagos",
    zipCode: "10001",
    dateOfBirth: "01/15/2000",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // API Integration here Koded
    Alert.alert("Success", "Profile updated successfully!", [
      {
        text: "OK",
        onPress: () => {
          setIsEditing(false);
          router.back();
        },
      },
    ]);
  };

  const handleCancel = () => {
    if (isEditing) {
      Alert.alert(
        "Discard Changes",
        "Are you sure you want to discard your changes?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => {
              setIsEditing(false);
              router.back();
            },
          },
        ]
      );
    } else {
      router.back();
    }
  };

  const handleChangeAvatar = () => {
    // Not handling image selection now
    Alert.alert("Change Avatar", "This would open the image picker");
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsEditing(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <Ionicons name="close" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity
          style={[styles.saveButton, !isEditing && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!isEditing}
        >
          <Text
            style={[
              styles.saveButtonText,
              !isEditing && styles.saveButtonTextDisabled,
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#8E8E93" />
            </View>
            <TouchableOpacity
              style={styles.changeAvatarButton}
              onPress={handleChangeAvatar}
            >
              <Ionicons name="camera" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarText}>Tap to change photo</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.textInput}
              value={formData.firstName}
              onChangeText={(value) => updateFormData("firstName", value)}
              placeholder="Enter first name"
              placeholderTextColor="#8E8E93"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              value={formData.lastName}
              onChangeText={(value) => updateFormData("lastName", value)}
              placeholder="Enter last name"
              placeholderTextColor="#8E8E93"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TextInput
              style={styles.textInput}
              value={formData.dateOfBirth}
              onChangeText={(value) => updateFormData("dateOfBirth", value)}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#8E8E93"
            />
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              placeholder="Enter email address"
              placeholderTextColor="#8E8E93"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={formData.phone}
              onChangeText={(value) => updateFormData("phone", value)}
              placeholder="Enter phone number"
              placeholderTextColor="#8E8E93"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Address Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Street Address</Text>
            <TextInput
              style={styles.textInput}
              value={formData.address}
              onChangeText={(value) => updateFormData("address", value)}
              placeholder="Enter street address"
              placeholderTextColor="#8E8E93"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.textInput}
                value={formData.city}
                onChangeText={(value) => updateFormData("city", value)}
                placeholder="Enter city"
                placeholderTextColor="#8E8E93"
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>State</Text>
              <TextInput
                style={styles.textInput}
                value={formData.state}
                onChangeText={(value) => updateFormData("state", value)}
                placeholder="Enter state"
                placeholderTextColor="#8E8E93"
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ZIP Code</Text>
            <TextInput
              style={styles.textInput}
              value={formData.zipCode}
              onChangeText={(value) => updateFormData("zipCode", value)}
              placeholder="Enter ZIP code"
              placeholderTextColor="#8E8E93"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Additional Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="lock-closed-outline" size={24} color="#8E8E93" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Change Password</Text>
              <Text style={styles.menuDescription}>
                Update your account password
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="shield-outline" size={24} color="#8E8E93" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Two-Factor Authentication</Text>
              <Text style={styles.menuDescription}>
                Add an extra layer of security
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>

          <TouchableOpacity style={styles.dangerItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="trash-outline" size={24} color="#FF3B30" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.dangerTitle}>Delete Account</Text>
              <Text style={styles.dangerDescription}>
                Permanently delete your account and all data
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonDisabled: {
    backgroundColor: "#E5E5EA",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonTextDisabled: {
    color: "#8E8E93",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  avatarSection: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 16,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#E5E5EA",
  },
  changeAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  avatarText: {
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "500",
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  inputGroup: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1C1C1E",
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  halfWidth: {
    flex: 1,
    marginBottom: 0,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  menuIcon: {
    width: 40,
    alignItems: "center",
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 14,
    color: "#8E8E93",
  },
  dangerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B30",
    marginBottom: 2,
  },
  dangerDescription: {
    fontSize: 14,
    color: "#8E8E93",
  },
});
