/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource Sàrl
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
import { FormFooter } from './FormFooter';
import { FormHeader } from './FormHeader';
import { FormRoot } from './FormRoot';
import { FormSection } from './FormSection';

export { FormFieldValidation, FormFieldWidth } from './FormField';
export { FormFooterSide, type FormFooterProps } from './FormFooter';
export { type FormHeaderProps } from './FormHeader';
export { type FormRootProps } from './FormRoot';
export { type FormSectionProps } from './FormSection';

/**
 * {@link FormRoot | Form} is a form element that wrap {@link FormHeader | Form.Header},
 * {@link FormSection | Form.Section} and {@link FormFooter | Form.Footer}.
 * It provides a consistent layout for forms.
 *
 * **Permitted Content**
 *
 * Exactly one {@link FormHeader | Form.Header}, one {@link FormFooter | Form.Footer} and as many
 * {@link FormSection | Form.Section} as needed in between the header and footer.
 *
 * **Example**
 *
 * ```tsx
 *  <Form method="POST">
 *    <Form.Header title="Form title" />
 *    <Form.Section>
 *      ...
 *    </Form.Section>
 *    <Form.Section>
 *      ...
 *    </Form.Section>
 *    <Form.Footer>
 *      <Button type="reset">Cancel</Button>
 *      <Button type="submit" variety="primary">Confirm</Button>
 *    </Form.Footer>
 *  </Form>
 * ```
 */
export const Form = Object.assign(FormRoot, {
  /**
   * {@link FormHeader | Form.Header} is used to display a title and optional description at the top of a form.
   */
  Header: FormHeader,
  /**
   * {@link FormSection | Form.Section} is used to group related form controls together. It can have
   * a title and description and can contain multiple form controls.
   *
   * The available form control elements are `CheckboxGroup`, `RadioButtonGroup`, `Select`, `Textarea`,
   * and `TextInput`.
   */
  Section: FormSection,
  /**
   * {@link FormFooter | Form.Footer} is used to display a group of buttons at the bottom of the form.
   * The children should be `Button` components, they are automatically wrapped in a `ButtonGroup`.
   */
  Footer: FormFooter,
});
