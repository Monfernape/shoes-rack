import { it, describe, expect, vi } from 'vitest'; // Add this import
import { render, screen } from '@testing-library/react';
import ActionsMenu from '@/app/layout/components/ActionsMenu';
import userEvent from "@testing-library/user-event";

describe('ActionsMenu Component', () => {
  const actionsMock = [
    { title: 'Action 1', onClick: vi.fn() },
    { title: 'Action 2', onClick: vi.fn() },
  ];

  it('calls the correct action when an item is clicked', async () => {
    render(<ActionsMenu actions={actionsMock} />);

    await userEvent.click(screen.getByLabelText('icon'));
    expect(screen.getByText('Action 2')).toBeDefined();

  });
});
