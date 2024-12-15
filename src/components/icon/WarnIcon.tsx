import {IconProps} from '@/types/Icon';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

function WarnIcon({color, size}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Path
        id="warning"
        fill={color}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.5 20C3.5 10.8873 10.8873 3.5 20 3.5C29.1126 3.5 36.4999 10.8873 36.4999 20C36.4999 29.1127 29.1126 36.5 20 36.5C10.8873 36.5 3.5 29.1127 3.5 20ZM21.6666 27.0834C21.6666 28.0038 20.9204 28.75 20 28.75C19.0795 28.75 18.3333 28.0038 18.3333 27.0834C18.3333 26.1629 19.0795 25.4167 20 25.4167C20.9204 25.4167 21.6666 26.1629 21.6666 27.0834ZM18.4999 11.25V22.9167H21.4999V11.25H18.4999Z"
      />
    </Svg>
  );
}

export default WarnIcon;
