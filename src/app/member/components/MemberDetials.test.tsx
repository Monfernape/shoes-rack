import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { it, describe, expect} from 'vitest'; 
import { MemberDetials } from './MemberDetials';

describe('ActionsMenu Component', () => {
  it('calls the correct action when an item is clicked', async () => {
    render(<MemberDetials userInfo={{
        name: "Ahmed Khan",
        phone: "+92 300 1234567",
        age: 35,
        cnic: "35202-1234567-1",
        ehadDuration: "2 years",
        shift: "A",
        role: "incharge",
        address: "123 Main St, Lahore, Punjab, Pakistan",
        status: "active",
      }} />);
    expect(screen.getByText('Ahmed Khan')).toBeDefined();
    expect(screen.getByText('A')).toBeDefined();

  });
});