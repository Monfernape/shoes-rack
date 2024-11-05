import { render, screen } from '@testing-library/react';
import { it, describe, expect} from 'vitest';
import "@testing-library/jest-dom";
import { MemberDetails } from './MemberDetails';
import { UserDetails } from '@/types';

const mockUserDetails: UserDetails = {
  name: "Alice Johnson",
  phone: "123-456-7890",
  age: 30,
  cnic: "12345-6789012-3",
  ehadDuration: "2 years",
  shift: "day",
  role: "member",
  address: "123 Main St, Springfield, IL",
  status: "active",
};

describe('member details', () => {
  it('should render the member details', async () => {

    render(<MemberDetails userInfo={mockUserDetails} />);
    expect(screen.getByTestId('user-name')).toHaveTextContent('Alice Johnson');
  });
});