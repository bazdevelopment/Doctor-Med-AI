/* eslint-disable max-lines-per-function */
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';

import { medicalSpecializationsData } from '@/components/medical-specialization-preview';
import SearchBar from '@/components/search-bar';
import SpecializationCard, {
  type MedicalSpecialization,
} from '@/components/specialization-card';
import { Text } from '@/components/ui';

// Full Screen All Specializations
const DoctorsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(
    medicalSpecializationsData
  );

  const handleBack = () => {};

  const handleSpecializationPress = (item: MedicalSpecialization) => {};

  // Search functionality
  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (text.trim() === '') {
      setFilteredData(medicalSpecializationsData);
    } else {
      const filtered = medicalSpecializationsData.filter(
        (item) =>
          item.title.toLowerCase().includes(text.trim().toLowerCase()) ||
          item.subtitle?.toLowerCase().includes(text.trim().toLowerCase()) ||
          item.description.toLowerCase().includes(text.trim().toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  return (
    <View className="flex-1">
      {/* Header */}
      <View className="border-b border-primary-900 bg-white p-4 dark:bg-transparent">
        <View className="flex-row items-center justify-center">
          {/* <TouchableOpacity onPress={handleBack} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity> */}
          <Text className="font-bold-work-sans text-xl text-gray-800">
            Medical Assistants
          </Text>
        </View>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search assistant..."
      />

      {/* All Specializations List */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <SpecializationCard
              item={item}
              onPress={() => handleSpecializationPress(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center px-8">
            <Text className="mt-4 font-semibold-work-sans text-lg text-gray-800">
              No Results Found
            </Text>
            <Text className="mt-2 text-center text-sm text-gray-500">
              Try searching with different keywords
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default DoctorsScreen;
