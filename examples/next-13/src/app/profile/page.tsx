import { Profile } from '@/components/Profile';
import { EditProfile } from './edit';

// server component; cannot use hooks
export default async function ProfilePage() {
  const userId = 1;
  return <div>
    profile page
    <div>
      <Profile userId={userId} />
    </div>
    <hr />
    <div>
      edit
      <EditProfile />
    </div>
  </div>
}
