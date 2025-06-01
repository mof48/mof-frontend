import React from 'react';
import ProfileSettings from '@/components/ProfileSettings';
import ShadowProfileEditor from '@/components/ShadowProfileEditor';

const ProfilePanel = ({ user }) => {
  return (
    <>
      <ProfileSettings user={user} />
      <ShadowProfileEditor user={user} />
    </>
  );
};

export default ProfilePanel;
