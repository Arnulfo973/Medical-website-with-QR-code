'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

export function UserAlarm() {
  
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    if (!dropdownOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative text-2xl"
          handleClick={handleToggleDropdown}
        >
          &#128365;
          {hasNewMessage && (
            <span className="absolute -right-[2.8px] -top-1 h-3 w-3 rounded-full bg-red-600" />
          )}
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
