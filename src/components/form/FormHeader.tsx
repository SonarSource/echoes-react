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
import styled from '@emotion/styled';
import { forwardRef, ReactNode } from 'react';
import { TextNode, TextNodeOptional } from '~types/utils';
import { Heading, HeadingSize, Text } from '../typography';

export interface FormHeaderProps {
  className?: string;
  /**
   * Optional description to display below the title. It's automatically wrapped in a `<Text>` component.
   */
  description?: TextNodeOptional;
  /**
   * Optional content to display under the title/description, can be anything.
   */
  extraContent?: ReactNode;
  /**
   * Title to display at the top of the Form. It's automatically wrapped in a `<Heading as="h1">` component.
   */
  title: TextNode;
}

export const FormHeader = forwardRef<HTMLDivElement, FormHeaderProps>((props, ref) => {
  const { title, description, extraContent, ...rest } = props;
  return (
    <FormHeaderWrapper ref={ref} {...rest}>
      <FormHeaderContent>
        <Heading as="h1" size={HeadingSize.ExtraLarge}>
          {title}
        </Heading>
        {description && <Text>{description}</Text>}
      </FormHeaderContent>
      {extraContent}
    </FormHeaderWrapper>
  );
});
FormHeader.displayName = 'FormHeader';

const FormHeaderWrapper = styled.div`
  order: 1; // Ensure the header always appear first in the Form even if the dev scramble the order of components
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-200);
`;
FormHeaderWrapper.displayName = 'FormHeaderWrapper';

const FormHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-100);
`;
FormHeaderContent.displayName = 'FormHeaderContent';
