import type { Meta, StoryObj } from '@storybook/react';
import { RadioButtonGroup } from '@sonarsource/echoes-react';

const meta = {
  component: RadioButtonGroup,
  title: 'RadioButtonGroup',
  args: {
    id: 'radio',
    required: false,
  },
} satisfies Meta<typeof RadioButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    defaultValue: 'c',
    options: [
      { label: 'Hello', value: 'a' },
      { label: 'Hello again', value: 'b' },
      { label: 'How do you do?', value: 'c', disabled: true },
      {
        ariaLabel: 'Blabla',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ marginRight: '4px' }}>✅</span>
            <p>This is a complicated Radio Option, that has a pragraph and some stuff</p> <br />
            <ul style={{ display: 'block', listStyle: 'inside' }}>
              <li style={{ display: 'list-item', marginLeft: '4px' }}>To verify</li>
              <li style={{ display: 'list-item', marginLeft: '4px' }}>How it behaves</li>
            </ul>
          </div>
        ),
        value: 'd',
      },
    ],
  },
};

export const InAForm: Story = {
  args: {
    required: true,
    options: [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
    ],
  },
  render: (args) => (
    <form>
      <RadioButtonGroup {...args} />
    </form>
  ),
};
