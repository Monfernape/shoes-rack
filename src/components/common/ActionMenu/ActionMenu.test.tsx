import { render, screen } from '@testing-library/react';
import ActionsMenu from '@/components/common/ActionMenu/ActionsMenu';
import userEvent from "@testing-library/user-event";
import { it, describe, expect, vi } from 'vitest'; 
import { Info } from 'lucide-react';

describe('ActionsMenu Component', () => {
  const actionsMock = [
    { title: 'Action 1', id: 1, onClick: vi.fn(),icon: <Info size={16} /> },
    { title: 'Action 2', id: 2, onClick: vi.fn(),icon: <Info size={16} /> },
  ];

  it('calls the correct action when an item is clicked', async () => {
    render(<ActionsMenu actions={actionsMock} />);

    await userEvent.click(screen.getByLabelText('icon'));
    expect(screen.getByText('Action 2')).toBeDefined();

  });
});
