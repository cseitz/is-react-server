# is-react-server

Allows you to quickly check if you are able to use React Server Components.

- Leverages package.json exports `react-server`

Note: This feature is intended for Next.js. This is not guarenteed to work in other frameworks.

## Usage

```tsx
import { IS_REACT_SERVER } from 'is-react-server';

export function DynamicComponent() {
  if (IS_REACT_SERVER) {
    return <div>react server component!</div>
  }
  return <div>react client component!</div>
}
```

```tsx
export async function SomeServerComponent() {
  // output: "react server component!"
  return <div>
    <DynamicComponent />
  </div>
}
```

```tsx
'use client';

export function SomeClientComponent() {
  // output: "react client component!"
  return <div>
    <DynamicComponent />
  </div>
}
```

## Dynamic Component Wrappers

If you have a component and want to use it in both server and client components, you can trick Next.js into treating it as such, while also being able to wrap it in an async data fetcher component.

1. Create the client file
```tsx
'use client';
// components/Profile/client.tsx

export default function Profile(props: { user: { name: string } }) {
  const { user } = props;
  return <div>{user.name}'s profile</div>
}

```

2. Create the server file
```tsx
'use server';
// IMPORTANT: make sure this starts with 'use server' or else 
// it'll be included in the client bundle and leak your backend code!!!

// components/Profile/server.tsx
import Profile from './client';

export default async function ServerProfile(props: { userId: number }) {
  const { userId } = props;
  const user = await fetch(`/api/users/${userId}`);
  return <Profile user={user} />;
}

```

1. Create the index so we can dynamically load client or server
```tsx
// components/Profile/index.ts
import { IS_REACT_SERVER } from 'is-react-server';

import ServerProfile from './server';
import ClientProfile from './client';

export const Profile = IS_REACT_SERVER
  ? ServerProfile
  : ClientProfile

```

4. Use the component

```tsx
// page.tsx
import { Profile } from './components/Profile';
import { EditProfile } from './EditProfile';

// server component; cannot use hooks but can fetch data
export async function ProfilePage({ userId }) {
  return <div>
    profile page
    <div>
      {/* server-rendered profile with data-fetching during render! */}
      <Profile userId={userId} />
    </div>
    <hr />
    <div>
      edit profile
      {/* client component that utilizes the profile without data fetching! */}
      <EditProfile />
    </div>
  </div>
}

```

```tsx
'use client';
// EditProfile.tsx
import { Profile } from './components/Profile';
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
```

and now you can have a single component export act as both a client component and a react server component!

