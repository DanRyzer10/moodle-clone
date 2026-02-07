import React from 'react'
import { TextInput,View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'


interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}


export const SearchBar: React.FC<SearchBarProps> = ({value, onChangeText, placeholder}) => {
    return (
        <View className='px-4 py-3' >
            <View className='relative'>
                <View className="absolute left-3 top-0 bottom-0 justify-center z-10">
                <MaterialIcons name="search" size={20} color="#94a3b8" />
                </View>
                 <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#94a3b8"
                className="w-full rounded-xl border-none bg-white dark:bg-gray-800 py-3.5 pl-10 pr-3 text-sm text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-gray-700"
                />
            </View>

        </View>
    )
}