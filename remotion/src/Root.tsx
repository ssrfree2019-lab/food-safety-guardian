import {Composition} from 'remotion';
import {FoodSafetyGuardian} from './FoodSafetyGuardian';

export const RemotionRoot = () => (
  <Composition
    id="FoodSafetyGuardian"
    component={FoodSafetyGuardian}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={900}
    defaultProps={{title: '食品安全，质量人用行动守护'}}
  />
);
