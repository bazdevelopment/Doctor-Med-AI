import { useColorScheme } from 'nativewind';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { colors } from '../ui';
import { CloseIcon } from '../ui/icons/close';
import { SearchIcon } from '../ui/icons/search';

interface ISearchBar {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}
const SearchBar: React.FC<ISearchBar> = ({
  value,
  onChangeText,
  placeholder = 'Search assistant...',
  onClear,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <View className="px-4 pb-2 pt-4">
      <View className="flex-row items-center rounded-full bg-white px-2 py-3 shadow-sm dark:bg-[#6B7F94]/20">
        <View className="ml-2">
          <SearchIcon
            color={isDark ? colors.white : colors.black}
            width={40}
            height={40}
          />
        </View>
        <TextInput
          className="ml-2 flex-1 font-primary-work-sans text-gray-800 dark:text-white"
          placeholder={placeholder}
          placeholderTextColor={
            isDark ? colors.charcoal[200] : colors.charcoal[800]
          }
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear} className="mr-2">
            <CloseIcon color={colors.primary[900]} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
