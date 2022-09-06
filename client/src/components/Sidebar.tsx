import React from 'react';

import { getFullName } from '../utilities/helper';
import { User } from '../utilities/types';

export interface SidebarProps {
  currentUser: User | null;
  users: User[],
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}


export const Sidebar: React.FC<SidebarProps> = ({ users, currentUser, selectedUser, onSelectUser }) => {

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
  }

  return (
    <div className="flex-none min-w-300 bg-blue overflow-y-auto">
      <div>
        <h2 className="m-6 text-white font-bold text-lg">Users</h2>
        {users.map((user, i: number) => (
          <div
            key={`${user.userId}-${i}`}
            className={`p-3 mx-6 my-2 text-white text-opacity-70 cursor-pointer ${
              selectedUser?.userId === user.userId ? 'bg-blue-dark' : 'bg-blue-light'
            } rounded-md`}
            onClick={() => handleSelectUser(user)}
          >
            <div className="flex items-center">
              <span>{getFullName(user)}</span>
              {user.userId === currentUser!.userId && (
                <span className="ml-1 text-white text-opacity-30">(you)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
