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
import { forwardRef, ReactNode, useId } from 'react';
import { TextNodeOptional } from '~types/utils';
import { Heading, HeadingProps, Text, TextSize } from '../typography';

export interface FormSectionProps {
  className?: string;
  /**
   * Any number of form controls. The available form control elements are `CheckboxGroup`,
   * `RadioButtonGroup`, `Select`, `Textarea`, and `TextInput`.
   */
  children: ReactNode;
  /**
   * Optional description to display below the section title. It's automatically wrapped in a
   * `<Text>` component.
   */
  description?: TextNodeOptional;
  /**
   * The ID of the section. If not provided, a unique ID will be generated.
   */
  id?: string;
  /**
   * Optional title to be displayed at the top of the section. It's automatically wrapped in a
   * `<Heading as="h3">` component.
   */
  title?: TextNodeOptional;
  /**
   * The HTML element to use for the section title. Defaults to `h3`. (optional)
   */
  titleAs?: HeadingProps['as'];
  /**
   * The size of the title. Defaults to h3 default size. (optional)
   */
  titleSize?: HeadingProps['size'];
}

export const FormSection = forwardRef<HTMLDivElement, FormSectionProps>((props, ref) => {
  const { children, description, id, title, titleAs = 'h3', titleSize, ...rest } = props;
  const defaultId = `${useId()}form-section`;
  const sectionId = id ?? defaultId;
  const titleId = `${sectionId}-title`;
  const descriptionId = `${sectionId}-description`;
  const labelledBy = title ? titleId : undefined;
  const describedBy = description ? descriptionId : undefined;

  return (
    <FormSectionWrapper
      aria-describedby={describedBy}
      aria-labelledby={labelledBy}
      id={sectionId}
      ref={ref}
      role="group"
      {...rest}>
      {(title || description) && (
        <div>
          {title && (
            <Heading
              as={titleAs}
              hasMarginBottom={Boolean(description)}
              id={titleId}
              size={titleSize}>
              {title}
            </Heading>
          )}
          {description && (
            <Text id={descriptionId} size={TextSize.Small}>
              {description}
            </Text>
          )}
        </div>
      )}
      {children}
    </FormSectionWrapper>
  );
});
FormSection.displayName = 'FormSection';

// According to https://www.w3.org/WAI/tutorials/forms/grouping/ we should use <fieldset> and <legend> to group form elements but it's hard to style so we rely on role=group instead
const FormSectionWrapper = styled.div`
  order: 2; // Ensure the section always appear between the header and footer in the Form even if the dev scramble the order of components
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-300);
`;
FormSectionWrapper.displayName = 'FormSectionWrapper';
