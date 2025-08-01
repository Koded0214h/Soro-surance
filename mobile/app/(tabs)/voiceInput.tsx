import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function VoiceInput() {
  const [targetLanguage, setTargetLanguage] = useState("Spanish");
  const [transcription, setTranscription] = useState(
    "I was driving down the highway when suddenly a car swerved into my lane and hit me. The impact was quite strong, and my car sustained significant damage. I managed to pull over to the side of the road, and the other driver stopped as well. We exchanged information, and I took photos of the accident scene and the damage to both vehicles. I'm feeling a bit shaken up but thankfully not seriously injured."
  );
  const [translation, setTranslation] = useState(
    "Estaba conduciendo por la carretera cuando de repente un coche se desvió hacia mi carril y me golpeó. El impacto fue bastante fuerte y mi coche sufrió daños importantes. Logré detenerme a un lado de la carretera y el otro conductor también se detuvo. Intercambiamos información y tomé fotos del lugar del accidente y de los daños de ambos vehículos. Me siento un poco conmocionado pero afortunadamente no estoy gravemente herido."
  );
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const languages = [
    { name: "Spanish", code: "es" },
    { name: "French", code: "fr" },
    { name: "Yoruba", code: "yo" },
    { name: "Igbo", code: "ig" },
    { name: "Hausa", code: "ha" },
  ];

  const handleLanguageSelect = (language: string) => {
    setTargetLanguage(language);
    setShowLanguageModal(false);
    // Here you would typically call your translation API
    // For now, we'll just update the translation based on the selected language
    updateTranslation(language);
  };

  const updateTranslation = (language: string) => {
    // Mock translations - in a real app, you'd call your translation API
    const translations: { [key: string]: string } = {
      Spanish:
        "Estaba conduciendo por la carretera cuando de repente un coche se desvió hacia mi carril y me golpeó. El impacto fue bastante fuerte y mi coche sufrió daños importantes. Logré detenerme a un lado de la carretera y el otro conductor también se detuvo. Intercambiamos información y tomé fotos del lugar del accidente y de los daños de ambos vehículos. Me siento un poco conmocionado pero afortunadamente no estoy gravemente herido.",
      French:
        "Je conduisais sur l'autoroute quand soudainement une voiture a dévié dans ma voie et m'a heurté. L'impact était assez fort et ma voiture a subi des dommages importants. J'ai réussi à me ranger sur le côté de la route et l'autre conducteur s'est également arrêté. Nous avons échangé des informations et j'ai pris des photos de la scène de l'accident et des dommages aux deux véhicules. Je me sens un peu secoué mais heureusement pas gravement blessé.",
      Yoruba:
        "Mo n rin lori ọna nla nigbati ni aṣọtẹlẹ ọkọ ayọkẹlẹ kan ṣubu sinu ọna mi ati lu mi. Ipa naa jẹ ti o lagbara pupọ, ọkọ ayọkẹlẹ mi si jẹ ti o ṣe awọn ibajẹ pataki. Mo ṣe agbara lati fa ọkọ ayọkẹlẹ mi sọtun ọna, ati pe ọkọ ayọkẹlẹ miiran tun duro. A ṣe iṣọpọ alaye, mo si ṣe awọn fọto ti ibi iṣẹlẹ naa ati awọn ibajẹ ti awọn ọkọ ayọkẹlẹ mejeeji. Mo n rọ̀ ọkàn mi ṣugbọn o ṣeun ti ko ṣe ibajẹ nla.",
      Igbo: "M na-akwọ ụgbọala n'okporo ụzọ awara awara mgbe na mberede otu ụgbọala gbapụrụ n'ụzọ m wee kụọ m. Mmetụta ahụ dị ike nke ukwuu, ụgbọala m mebiri emebi nke ukwuu. M jisiri ike kwụsị n'akụkụ okporo ụzọ, onye ọkwọ ụgbọala nke ọzọ kwụsịkwara. Anyị gbanwere ozi, m wee sere foto nke ebe ihe mberede ahụ na mmebi nke ụgbọala abụọ ahụ. M na-enwe mmetụta dị ntakịrị mana ọ dị mma na anaghị m emerụ ahụ nke ukwuu.",
      Hausa:
        "Ina tuka mota a kan babbar hanya lokacin da kwatsam wata mota ta karkata zuwa hanyata ta buge ni. Tasirin ya kasance mai karfi sosai, kuma motata ta sami lalacewa mai muhimmanci. Na sami damar tsayawa a gefen hanya, kuma direban sa kuma ya tsaya. Mun musanya bayanai, kuma na dauki hotuna na wurin hadarin da lalacewar motocin biyu. Ina jin dan girgiza amma alhamdulillah ban sami rauni mai tsanani ba.",
    };

    setTranslation(translations[language] || translations.Spanish);
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
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Transcription Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRANSCRIPTION</Text>
          <View style={styles.textBox}>
            <TextInput
              style={styles.transcriptionInput}
              value={transcription}
              onChangeText={setTranscription}
              multiline
              placeholder="Enter or edit your transcription here..."
              placeholderTextColor="#8E8E93"
            />
          </View>
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
            <Text style={styles.translationText}>{translation}</Text>
          </View>
        </View>
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
    paddingBottom: 100, // Add padding to account for tab bar height (60px) + extra space
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
  translationText: {
    fontSize: 16,
    color: "#1C1C1E",
    lineHeight: 24,
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
});
