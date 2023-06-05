// components/Profile/index.ts
import { IS_REACT_SERVER } from 'is-react-server';

import ServerProfile from './server';
import ClientProfile from './client';

type Profile = typeof ServerProfile | typeof ClientProfile;
export const Profile: Profile = IS_REACT_SERVER
  ? ServerProfile
  : ClientProfile
