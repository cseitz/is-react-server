'use client';
// components/Profile/client.tsx

export default function Profile(props: { user: { name: string } }) {
  const { user } = props;
  return <div>{user.name}&apos;s profile</div>
}
