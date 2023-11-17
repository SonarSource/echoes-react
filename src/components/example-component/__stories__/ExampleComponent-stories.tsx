import type { Meta, StoryObj } from '@storybook/react';
import { ExampleComponent } from '../ExampleComponent';

const meta: Meta<typeof ExampleComponent> = {
  component: ExampleComponent,
};

export default meta;

type Story = StoryObj<typeof ExampleComponent>;

export const Primary: Story = {
  render: () => <ExampleComponent a={1} b={true} c="test" />,
};
