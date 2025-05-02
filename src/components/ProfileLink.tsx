import React from 'react';
import Link from 'next/link';

interface ProfileLinkProps {
  userId: string;
  userName: string;
  showIcon?: boolean;
  className?: string;
  hideOnMobile?: boolean;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({
  userId,
  userName,
  showIcon = true,
  className = '',
  hideOnMobile = false
}) => {
  return (
    <Link
      href={`/profile/${userId}`}
      className={`inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors ${hideOnMobile ? 'hidden sm:inline-flex' : ''} ${className}`}
      title={`Ver perfil de ${userName}`}
    >
      {showIcon && (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )}
      <span>{userName}</span>
    </Link>
  );
};

export default ProfileLink; 