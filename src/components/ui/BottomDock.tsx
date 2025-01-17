import { BackgroundOverlay } from '../elements/BackgroundOverlay';
import { NavButton } from './NavButton';
import { OreResult } from './OreResult';

export const BottomDock = () => {
  return (
    <div className='flex fixed bottom-0 gap-2 justify-center px-2 mb-2 w-full'>
      <OreResult />
      <NavButton />
    </div>
  );
};
