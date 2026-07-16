import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "tertiary-container": "#00769d",
        "on-background": "#1b1c1c",
        "error-container": "#ffdad6",
        "inverse-primary": "#88d982",
        "secondary-fixed": "#98f994",
        "background": "#fcf9f8",
        "on-surface-variant": "#40493d",
        "secondary-fixed-dim": "#7ddc7a",
        "inverse-surface": "#303030",
        "tertiary": "#005c7b",
        "surface-dim": "#dcd9d9",
        "on-secondary-fixed-variant": "#005313",
        "surface-container-highest": "#e5e2e1",
        "primary-container": "#2e7d32",
        "surface-container-high": "#eae7e7",
        "on-primary-fixed-variant": "#005312",
        "surface-bright": "#fcf9f8",
        "on-tertiary-fixed-variant": "#004d67",
        "on-primary-fixed": "#002204",
        "outline": "#707a6c",
        "on-surface": "#1b1c1c",
        "on-primary": "#ffffff",
        "surface-container": "#f0eded",
        "error": "#ba1a1a",
        "surface-container-lowest": "#ffffff",
        "primary-fixed": "#a3f69c",
        "secondary-container": "#98f994",
        "surface-tint": "#1b6d24",
        "tertiary-fixed": "#c2e8ff",
        "outline-variant": "#bfcaba",
        "on-tertiary-fixed": "#001e2b",
        "primary": "#023C23",
        "on-error": "#ffffff",
        "secondary": "#006e1c",
        "surface-variant": "#e5e2e1",
        "on-primary-container": "#cbffc2",
        "tertiary-fixed-dim": "#75d1ff",
        "surface": "#fcf9f8",
        "on-error-container": "#93000a",
        "inverse-on-surface": "#f3f0ef",
        "primary-fixed-dim": "#88d982",
        "on-secondary": "#ffffff",
        "on-tertiary": "#ffffff",
        "surface-container-low": "#f6f3f2",
        "on-secondary-container": "#0c7521",
        "on-tertiary-container": "#e2f3ff",
        "on-secondary-fixed": "#002204"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "stack-md": "24px",
        "stack-lg": "48px",
        "margin-desktop": "48px",
        "gutter": "24px",
        "stack-sm": "12px",
        "margin-mobile": "20px",
        "container-max": "1280px",
        "base": "8px"
      },
      fontFamily: {
        "label-bold": ["Inter", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "display-hero": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
        "display-hero-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "headline-sm": ["Plus Jakarta Sans", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"]
      },
      fontSize: {
        "label-bold": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "700" }],
        "display-hero": ["56px", { "lineHeight": "64px", "letterSpacing": "-0.02em", "fontWeight": "800" }],
        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "display-hero-mobile": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "800" }],
        "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
        "label-md": ["12px", { "lineHeight": "16px", "fontWeight": "500" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }]
      }
    }
  }
}
