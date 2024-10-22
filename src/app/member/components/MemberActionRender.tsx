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
    { title: 'View Details', id: 1, onClick: handleViewDetails },
    { title: 'Edit Info' , id: 2, onClick: handleEditInfo },
    { title: 'Delete Member', id: 3, onClick: handleDeleteMember },
    { title: 'Resend Invite', id: 4, onClick: handleResendInvite },
  ];

  return (
    <ActionsMenu actions={actions} />
  )
}

export default MemberActionRender