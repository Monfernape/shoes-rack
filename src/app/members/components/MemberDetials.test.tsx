import { render, screen } from '@testing-library/react';
import { it, describe, expect} from 'vitest';
import "@testing-library/jest-dom";
import { MemberDetails } from './MemberDetails';
import { UserDetails } from '@/types';
import { MemberRole, UserStatus } from '@/constant/constant';

const mockUserDetails: UserDetails = {
  name: "Alice Johnson",
  phoneNumber: "123-456-7890",
  date_of_birth: '',
  cnic: "12345-6789012-3",
  ehad_duration: "2 years",
  shift: "day",
  role: MemberRole.Member,
  address: "123 Main St, Springfield, IL",
  status: UserStatus.Active,
  id: 23,
  created_at: '',
  invite_link: '',
  temporary_password: false
};

describe('member details', () => {
  it('should render the member details', async () => {

    render(<MemberDetails userInfo={mockUserDetails} />);
    expect(screen.getByTestId('user-name')).toHaveTextContent('Alice Johnson');
  });
});