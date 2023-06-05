'use server';
// components/Profile/server.tsx
import Profile from './client';

export default async function ServerProfile(props: { userId: number }) {
  const { userId } = props;
  // const user = await fetch(`localhost:3000/api/users/${userId}`);
  const user = await new Promise<{ name: string }>(resolve => {
    resolve({ name: 'Jane Doe' })
  })
  return <Profile user={user} />;
}
