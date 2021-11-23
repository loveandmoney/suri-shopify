/* eslint-disable no-undef */

const defaultTheme = require(`tailwindcss/defaultTheme`);

module.exports = {
  mode: `jit`,
  future: {
    removeDeprecatedGapUtilities: true,
    defaultLineHeights: true,
    standardFontWeights: true
  },
  purge: {
    enabled: true,
    content: [
      `./snippets/*.liquid`,
      `./sections/*.liquid`,
      `./templates/*.liquid`,
      `./layout/*.liquid`
    ],
    safelist: [
      `rounded-full`,
      `order-1`,
      `md:order-1`,
      `order-2`,
      `md:order-2`,
      `pr-4`,
      `pr-20`,
      `pl-4`,
      `pl-20`,
      `mr-4`,
      `mx-auto`,
      `mx-1`,
      `sm:mx-auto`,
      `md:mx-auto`,
      `md:mr-0`,
      `md:w-auto`,
      `text-md-h1`,
      `md:text-md-h1`,
      `text-sm-h1`,
      `sm:text-sm-h1`,
      `text-h1`,
      `text-md-h1b`,
      `md:text-md-h1b`,
      `text-sm-h1b`,
      `sm:text-sm-h1b`,
      `text-h1b`,
      `text-md-h2`,
      `md:text-md-h2`,
      `text-sm-h2`,
      `sm:text-sm-h2`,
      `text-h2`,
      `text-md-h3`,
      `md:text-md-h3`,
      `text-sm-h3`,
      `sm:text-sm-h3`,
      `text-h3`,
      `text-md-h4`,
      `md:text-md-h4`,
      `text-sm-h4`,
      `sm:text-sm-h4`,
      `text-h4`,
      `text-md-h5`,
      `md:text-md-h5`,
      `text-sm-h5`,
      `sm:text-sm-h5`,
      `text-h5`,
      `text-md-h5`,
      `md:text-md-h5`,
      `text-sm-h5`,
      `sm:text-sm-h5`,
      `text-h5`,
      `text-md-b1`,
      `md:text-md-b1`,
      `text-sm-b1`,
      `sm:text-sm-b1`,
      `text-b1`,
      `text-md-b2`,
      `md:text-md-b2`,
      `text-sm-b2`,
      `sm:text-sm-b2`,
      `text-b2`,
      `text-md-b3`,
      `md:text-md-b3`,
      `text-sm-b3`,
      `sm:text-sm-b3`,
      `text-b3`,
      `text-md-button`,
      `md:text-md-button`,
      `text-sm-button`,
      `sm:text-sm-button`,
      `text-button`,
      `text-md-caption`,
      `md:text-md-caption`,
      `text-sm-caption`,
      `sm:text-sm-caption`,
      `text-caption`,
      `bg-white`,
      `border-white`,
      `text-white`,
      `bg-strawberry`,
      `border-strawberry`,
      `text-strawberry`,
      `bg-apricot`,
      `border-apricot`,
      `text-apricot`,
      `bg-flame`,
      `border-flame`,
      `text-flame`,
      `bg-red`,
      `border-red`,
      `text-red`,
      `bg-tickle`,
      `border-tickle`,
      `text-tickle`,
      `bg-sun`,
      `border-sun`,
      `text-sun`,
      `bg-aqua`,
      `border-aqua`,
      `text-aqua`,
      `bg-onyx`,
      `border-onyx`,
      `text-onyx`,
      `bg-black`,
      `border-black`,
      `text-black`
    ]
  },
  theme: {
    colors: {
      "ux-green": "#097c07",
      "midnight-black-50": "#9e9e9e",
      "midnight-black-75": "#494949",
      "midnight-black-100": "#302f2f",
      "sea-mist-50": "#d4d4d4",
      "sea-mist-75": "#a8a8a8",
      "sea-mist-100": "#494949",
      "winter-fern-50": "#b5bdb4",
      "winter-fern-75": "#7a9a72",
      "winter-fern-100": "#5e684f",
      "mono-white": "#ffffff",
      "mono-50": "#f2f2f2",
      "mono-75": "#a4a4a4",
      "mono-100": "#000000",
      "brand-50": "#6e848d",
      "brand-75": "#4f6068",
      "brand-100": "#455055"
    },
    screens: {
      xs: {
        min: `321px`
      },
      sm: {
        min: `768px`
      },
      md: {
        min: `1025px`
      },
      lg: {
        min: `1440px`
      },
      xl: {
        min: `1920px`
      }
    },
    fontFamily: {
      head: [`Druk Cond Web`, ...defaultTheme.fontFamily.sans],
      headb: [`Futura Now Headline`, ...defaultTheme.fontFamily.sans],
      body: [`Futura Now Text`, ...defaultTheme.fontFamily.sans],
      wide: [`Druk Wide Web`, ...defaultTheme.fontFamily.sans]
    },
    fontSize: {
      //
      // h1
      "md-h1": [
        `160px`,
        {
          lineHeight: `141px`,
          letterSpacing: `0`
        }
      ],
      "md-h1b": [
        `52px`,
        {
          lineHeight: `52px`,
          letterSpacing: `0`
        }
      ],
      "sm-h1": [
        `100px`,
        {
          lineHeight: `100px`,
          letterSpacing: `0`
        }
      ],
      h1: [
        `96px`,
        {
          lineHeight: `88px`,
          letterSpacing: `0`
        }
      ],
      //
      // h2
      "md-h2": [
        `125px`,
        {
          lineHeight: `110px`,
          letterSpacing: `0`
        }
      ],
      "sm-h2": [
        `82px`,
        {
          lineHeight: `96px`,
          letterSpacing: `0`
        }
      ],
      h2: [
        `70px`,
        {
          lineHeight: `64px`,
          letterSpacing: `0`
        }
      ],
      //
      // h3
      "md-h3": [
        `90px`,
        {
          lineHeight: `86px`,
          letterSpacing: `0`
        }
      ],
      "sm-h3": [
        `60px`,
        {
          lineHeight: `60px`,
          letterSpacing: `0`
        }
      ],
      h3: [
        `54px`,
        {
          lineHeight: `50px`,
          letterSpacing: `0`
        }
      ],
      //
      // h4
      "md-h4": [
        `24px`,
        {
          lineHeight: `28px`,
          letterSpacing: `0`
        }
      ],
      "sm-h4": [
        `24px`,
        {
          lineHeight: `24px`,
          letterSpacing: `0`
        }
      ],
      h4: [
        `22px`,
        {
          lineHeight: `26px`,
          letterSpacing: `0`
        }
      ],
      //
      // h5
      "md-h5": [
        `22px`,
        {
          lineHeight: `24px`,
          letterSpacing: `0`
        }
      ],
      "sm-h5": [
        `22px`,
        {
          lineHeight: `22px`,
          letterSpacing: `0`
        }
      ],
      h5: [
        `20px`,
        {
          lineHeight: `24px`,
          letterSpacing: `0`
        }
      ],
      //
      // b1
      "md-b1": [
        `20px`,
        {
          lineHeight: `23px`,
          letterSpacing: `0`
        }
      ],
      "sm-b1": [
        `18px`,
        {
          lineHeight: `22px`,
          letterSpacing: `0`
        }
      ],
      b1: [
        `18px`,
        {
          lineHeight: `24px`,
          letterSpacing: `0`
        }
      ],
      //
      // b2
      "md-b2": [
        `16px`,
        {
          lineHeight: `20px`,
          letterSpacing: `0.01em`
        }
      ],
      "sm-b2": [
        `16px`,
        {
          lineHeight: `22px`,
          letterSpacing: `0`
        }
      ],
      b2: [
        `14px`,
        {
          lineHeight: `20px`,
          letterSpacing: `0.02em`
        }
      ],
      //
      // b3
      "md-b3": [
        `16px`,
        {
          lineHeight: `20px`,
          letterSpacing: `0`
        }
      ],
      "sm-b3": [
        `16px`,
        {
          lineHeight: `20px`,
          letterSpacing: `0`
        }
      ],
      b3: [
        `12px`,
        {
          lineHeight: `18px`,
          letterSpacing: `0.02em`
        }
      ],
      //
      // caption
      caption: [
        `12px`,
        {
          lineHeight: `14px`,
          letterSpacing: `0.02em`
        }
      ],
      //
      // button
      "md-button": [
        `16px`,
        {
          lineHeight: `18px`,
          letterSpacing: `0.02em`
        }
      ],
      "sm-button": [
        `16px`,
        {
          lineHeight: `18px`,
          letterSpacing: `0.02em`
        }
      ],
      button: [
        `14px`,
        {
          lineHeight: `14px`,
          letterSpacing: `0`
        }
      ]
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
