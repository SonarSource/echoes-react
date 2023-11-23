import { render, screen } from '@testing-library/react';
import { RadioButtonGroup } from '../RadioButtonGroup';
import userEvent from '@testing-library/user-event';

describe('RadioButtonGroup', () => {
  it('should render a radio button for each option', async () => {
    const user = userEvent.setup();

    const options = [
      { label: 'a', value: '1' },
      { label: 'b', value: '2' },
      { label: 'c', value: '3' },
    ];

    render(<RadioButtonGroup options={options} />);

    expect(screen.getAllByRole('radio')).toHaveLength(options.length);

    await user.click(screen.getByRole('radio', { name: 'b' }));

    expect(screen.getByRole('radio', { name: 'b' }).getAttribute('aria-checked')).toBe('true');
  });
});
