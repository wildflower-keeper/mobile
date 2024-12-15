import {MessageType} from '@/types/NoticeMessage';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

type TagType = 'outStatus' | MessageType;
type TagProps = {
  text: string;
  type: TagType;
};

function Tag({text, type}: TagProps) {
  return <Text style={styles[type]}>{text}</Text>;
}

const styles = StyleSheet.create({
  notice: {
    color: '#730303',
    backgroundColor: '#FEECEC',

    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  survey: {
    color: '#002966',
    backgroundColor: '#EAF2FE',

    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  alerm: {
    color: '#663A00',
    backgroundColor: '#FEF4E6',

    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  outStatus: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#00BF40',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    lineHeight: 24,
  },
});

export default Tag;
