import { cleanup, render, screen } from '@testing-library/react';
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

  it('should call onDelete when the delete button is clicked', async () => {
    const deleteButton = screen.getByRole('button');
    await user.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('should render a green checkbox if the task is completed', async () => {
    cleanup();
    render(
      <TaskItem
        task={{ ...mockTask, completed: true }}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
      />,
    );

    const checkbox = screen.getByRole('checkbox').nextElementSibling;
    expect(checkbox?.className).toContain(
      'bg-green-500 border-green-500 text-white',
    );
  });
});
