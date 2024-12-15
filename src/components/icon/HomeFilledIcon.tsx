import {IconProps} from '@/types/Icon';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

function HomeFilledIcon({color, size}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        id="HomeFilled"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.4529 2.28468C11.7756 2.03792 12.2236 2.03792 12.5463 2.28468L21.0463 8.78462C21.269 8.95491 21.3996 9.21922 21.3996 9.49955L21.3996 18.9294C21.3996 19.1837 21.3997 19.4258 21.383 19.6297C21.3648 19.8521 21.3224 20.1072 21.1925 20.3622C21.0104 20.7197 20.7197 21.0104 20.3622 21.1925C20.1072 21.3224 19.8521 21.3648 19.6297 21.383C19.4258 21.3997 19.1837 21.3996 18.9294 21.3996L12.8999 21.3996V14H11.0999V21.3996L5.06985 21.3996C4.81555 21.3996 4.57347 21.3997 4.36953 21.383C4.14712 21.3648 3.89201 21.3224 3.63703 21.1925C3.27952 21.0104 2.98886 20.7197 2.8067 20.3622C2.67678 20.1072 2.6344 19.8521 2.61623 19.6297C2.59956 19.4257 2.59959 19.1837 2.59961 18.9294L2.59961 9.49955C2.59961 9.21922 2.73023 8.95491 2.95291 8.78462L11.4529 2.28468Z"
        fill={color}
      />
    </Svg>
  );
}
export default HomeFilledIcon;
