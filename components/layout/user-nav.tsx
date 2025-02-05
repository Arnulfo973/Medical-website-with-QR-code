'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

export function UserNav() {
  
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      localStorage.setItem('userinfo', JSON.stringify(session.userInfo));
    }
  }, []);

  const signOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };
  const ok = () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" handleClick={ok}>
          <Image src="/log-out.png" width={25} height={25} alt="log-out" onClick={() => signOut()}/>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
  // }
}
