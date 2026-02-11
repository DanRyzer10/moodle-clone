import React from 'react';
import { View, TouchableOpacity,Text } from 'react-native';


interface SegmentedControlProps {
    segments : string[];
    selectedIndex : number;
    onSegmentChange : (index: number) => void;
}

export const SegmentedControl : React.FC<SegmentedControlProps> = ({segments, selectedIndex, onSegmentChange}) => {
    return (
        <View className='px-4 py-3' >
            <View className='relative flex-row h-10 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 p-1'>
                {segments.map((segment,index) => (
                    <TouchableOpacity
                     key={segment}
                     onPress={() => onSegmentChange(index)}
                     className={`flex-1 h-full items-center justify-center rounded-md ${
                        selectedIndex === index
                            ? 'bg-white dark:bg-slate-700 shadow-sm'
                            : ''
                        }`}
                    >
                        <Text
                          className={`font-medium text-sm ${
                            selectedIndex === index
                            ? 'text-primary dark:text-blue-400'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                        >{segment}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}