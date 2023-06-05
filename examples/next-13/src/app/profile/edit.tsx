'use client';
import { Profile } from '@/components/Profile';
import { useState } from 'react';

// client component; can use hooks but cannot use await
export function EditProfile() {
  const [user, setUser] = useState({
    name: 'John Doe'
  });

  function updateUserName(event) {
    setUser({ ...user, name: event.target.value })
  }

  return <div>
    <input value={user.name} onChange={updateUserName} />
    <div>
      <Profile user={user} />
    </div>
  </div>
}
