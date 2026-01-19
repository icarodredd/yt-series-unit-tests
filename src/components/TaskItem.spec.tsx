import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { TaskItem } from './TaskItem';

describe('TaskItem', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    completed: false,
    createdAt: new Date(),
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() =>
    render(
      <TaskItem
        task={mockTask}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
      />,
    ),
  );

  it('should render the task title', () => {
    const title = screen.getByText('Test Task');
    expect(title).toBeInTheDocument();
  });

  it('should call onToggle when checkbox is clicked', async () => {
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});
