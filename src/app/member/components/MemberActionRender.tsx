import ActionsMenu from '@/app/layout/components/ActionsMenu';
import React from 'react'


const MemberActionRender = () => {
  const handleViewDetails = () => {

  };

  const handleEditInfo = () => {
    console.log('Editing info...');
  };

  const handleDeleteMember = () => {
    console.log('Deleting member...');
  };

  const handleResendInvite = () => {
    console.log('Resending invite...');
  };

  const actions = [
    { title: 'View Details', onClick: handleViewDetails },
    { title: 'Edit Info', onClick: handleEditInfo },
    { title: 'Delete Member', onClick: handleDeleteMember },
    { title: 'Resend Invite', onClick: handleResendInvite },
  ];

  return (
    <ActionsMenu actions={actions} />
  )
}

export default MemberActionRender