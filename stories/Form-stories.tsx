/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../src/components/checkbox';
import { IconCopy, IconSearch } from '../src/components/icons';
import { TextInput } from '../src/components/text-input';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<{}> = {
  component: TextInput,
  title: 'Echoes/Forms',
  argTypes: {},
  decorators: [basicWrapperDecorator],
};

// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<{}>;

// Option 1 using component composition
export const Default: Story = {
  args: {},
  render: (_args) => (
    <fieldset>
      <TextInput
        helpText="You password must contain at least 8 characters"
        isRequired
        label="Password"
        messageInvalid="This is an inline error message"
        messageValid="This is an inline success message"
        {..._args}
      />
      <TextInput
        helpText="Please re-enter your password"
        isRequired
        label="Confirm password"
        messageInvalid="This is an inline error message"
        messageValid="This is an inline success message"
        prefix={<IconSearch />}
        suffix={<IconCopy />}
      />
      <Checkbox
        checked={false}
        helpText="By checking this box, you hereby give MegaCorp exclusive rights to your person"
        label="I agree to the terms and conditions"
        onCheck={() => {}}
      />
    </fieldset>
  ),
};
