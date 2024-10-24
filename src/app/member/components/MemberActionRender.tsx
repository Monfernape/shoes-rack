import ActionsMenu from '@/components/common/ActionsMenu';
import { Info, Trash2, Edit, Send } from "lucide-react";
import React from 'react';

// When we will implement in table we will update this type
type Props ={
  role: string;
  status: string;
}

const MemberTableActionRender = ({ role = 'shift_incharge', status = 'active' }:Props) => {
  const handleViewDetails = () => {
    console.log('Viewing details...');
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

  const baseActions = [
    { title: 'Edit Info', id: 2, onClick: handleEditInfo ,icon: <Edit size={16} />},
    { title: 'Delete Member', id: 3, onClick: handleDeleteMember,icon: <Trash2 size={16} /> },
  ];

  const viewInfo = [
    { title: 'View Details', id: 1, onClick: handleViewDetails , icon: <Info size={16} />  },
  ];

  const resendInvite = status === 'active' 
    ? [{ title: 'Resend Invite', id: 4, onClick: handleResendInvite ,  icon: <Send size={16} />  }] 
    : [];

    const actionMenu = React.useMemo(() => {
      switch (role) {
        case 'member':
          return status === 'inactive' 
            ? [...viewInfo, ...resendInvite] 
            : [...viewInfo];
    
        case 'shift_incharge':
        case 'incharge':
        case 'super_admin':
          return [...viewInfo, ...baseActions, ...resendInvite];
    
        default:
          return [];
      }
    }, [role, status]);

  return <ActionsMenu actions={actionMenu} />;
};

export default MemberTableActionRender