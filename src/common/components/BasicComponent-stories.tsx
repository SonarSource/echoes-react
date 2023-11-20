import type { Meta, StoryObj } from '@storybook/react';
import { BasicComponent } from './BasicComponent';

const meta: Meta<typeof BasicComponent> = {
  component: BasicComponent,
};

export default meta;

type Story = StoryObj<typeof BasicComponent>;

export const Basic: Story = {
  render: () => <BasicComponent />,
};
