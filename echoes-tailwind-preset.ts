import tokens from '~generated/design-tokens-base.json';

module.exports = {
  theme: {
    colors: {},
    fontFamily: tokens.fontFamilies,
  },
};

/*

  theme: {
    // Define cursors
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      'not-allowed': 'not-allowed',
    },
    // Define font sizes
    fontSize: {
      code: ['0.875rem', '1.125rem'], // 14px / 18px
      sm: ['0.875rem', '1.25rem'], // 14px / 20px
      base: ['1rem', '1.5rem'], // 16px / 24px
      md: ['1.313rem', '1.75rem'], // 21px / 28px
      lg: ['1.5rem', '1.75rem'], // 24px / 28px
      xl: ['2.25rem', '3rem'], // 36px / 48px
    },
    // Define font weights
    fontWeight: {
      regular: 400,
      semibold: 600,
      bold: 700,
    },
    // Define font families
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
      mono: ['Ubuntu Mono', ...fontFamily.mono],
    },
    // Define less order properties than default
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
    },
    // No responsive breakpoint for the webapp
    screens: {},
    // Defined spacing values based on our grid size
    spacing: {
      0: '0',
      '1/2': '0.125rem', // 2px
      1: '0.25rem', // 4px
      2: '0.5rem', // 8px
      3: '0.75rem', // 12px
      4: '1rem', // 16px
      6: '1.5rem', // 24px
      8: '2rem', // 32px
      10: '2.5rem', // 40px
      12: '3rem', // 48px
      16: '4rem', // 64px
      24: '6rem', // 96px
      40: '10rem', // 160px
      64: '16rem', // 256px

      page: '1.25rem', // 20px
    },
    maxHeight: (twTheme) => twTheme('height'),
    maxWidth: (twTheme) => twTheme('width'),
    minHeight: (twTheme) => twTheme('height'),
    minWidth: (twTheme) => twTheme('width'),
    borderRadius: {
      0: '0',
      '1/2': '0.125rem', // 2px
      1: '0.25rem', // 4px
      2: '0.5rem', // 8px
      pill: '625rem',
    },
    borderWidth: {
      0: '0',
      none: '0',
    },
    zIndex: {
      normal: '2',
      filterbar: '50',
      'filterbar-header': '55',
      'content-popup': '56',
      'top-navbar': '419',
      popup: '420',
      'global-navbar': '421',
      sidebar: '421',
      'core-concepts': '422',
      'work-space': '450',
      'global-popup': '5000',
      'modal-overlay': '6000',
      modal: '6001',
      'dropdown-menu': '7500',
      tooltip: '8000',
    },
    extend: {
      width: {
        'abs-150': '150px',
        'abs-250': '250px',
        'abs-300': '300px',
        'abs-400': '400px',
        'abs-500': '500px',
        'abs-600': '600px',
        'abs-800': '800px',
        'input-small': '150px',
        'input-medium': '250px',
        'input-large': '350px',
        icon: '1rem', // 16px
      },
      height: {
        'abs-200': '200px',
        icon: '1rem', // 16px
        control: '2.25rem', // 36px
      },
    },
  },

  */
