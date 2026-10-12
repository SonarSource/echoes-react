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

import { screen } from '@testing-library/react';
import { render } from '~common/helpers/test-utils';
import { Theme } from '~generated/themes';
import {
  THEME_DATA_ATTRIBUTE,
  ThemeContext,
  getCurrentTheme,
  observeThemeChanges,
} from '~utils/theme';
import { ThemeProvider, setTheme } from '..';

describe('setTheme', () => {
  it('should set the theme on the document element', () => {
    const setAttribute = jest.spyOn(document.documentElement, 'setAttribute');

    setTheme(Theme.dark);
    expect(setAttribute).toHaveBeenCalledWith(THEME_DATA_ATTRIBUTE, Theme.dark);
  });
});

describe('getCurrentTheme', () => {
  it('should return the current theme from the document element', () => {
    document.documentElement.setAttribute(THEME_DATA_ATTRIBUTE, Theme.dark);

    expect(getCurrentTheme()).toBe(Theme.dark);
  });

  it('should return `light` when no theme is set', () => {
    document.documentElement.removeAttribute(THEME_DATA_ATTRIBUTE);

    expect(getCurrentTheme()).toBe(Theme.light);
  });
});

describe('observeThemeChanges', () => {
  it('should call the callback when the theme changes', async () => {
    const callback = jest.fn();
    document.documentElement.setAttribute(THEME_DATA_ATTRIBUTE, Theme.light);

    const observer = observeThemeChanges(callback);

    document.documentElement.setAttribute(THEME_DATA_ATTRIBUTE, Theme.dark);

    // MutationObserver callbacks are async microtasks
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    expect(callback).toHaveBeenCalledWith(Theme.dark);

    observer.disconnect();
  });

  it('should not call the callback for unrelated attribute changes', async () => {
    const callback = jest.fn();

    const observer = observeThemeChanges(callback);

    document.documentElement.setAttribute('data-unrelated', 'value');

    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    expect(callback).not.toHaveBeenCalled();

    observer.disconnect();
  });
});

describe('ThemeProvider', () => {
  it('should set the theme a the div wrapper', () => {
    render(<ThemeProvider theme={Theme.dark}>Content</ThemeProvider>);

    expect(screen.getByText('Content')).toHaveAttribute(THEME_DATA_ATTRIBUTE, Theme.dark);
  });

  it('should set the theme on the children', () => {
    render(
      <ThemeProvider asChild theme={Theme.dark}>
        <div data-custom="custom" role="note">
          Content
        </div>
      </ThemeProvider>,
    );

    expect(screen.getByRole('note')).toHaveAttribute(THEME_DATA_ATTRIBUTE, Theme.dark);
    expect(screen.getByText('Content')).toHaveAttribute('data-echoes-theme', Theme.dark);
    expect(screen.getByRole('note')).toHaveAttribute('data-custom', 'custom');
  });

  it('should also set the theme as a context', () => {
    render(
      <ThemeProvider theme={Theme.dark}>
        <ThemeContext.Consumer>{(theme) => <div>Theme: {theme}</div>}</ThemeContext.Consumer>
      </ThemeProvider>,
    );

    expect(screen.getByText('Theme: dark')).toBeInTheDocument();
  });
});
