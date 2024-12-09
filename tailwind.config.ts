import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        status: {
          active: {
            DEFAULT: "hsl(var(--status-active))",
            background: "hsla(var(--status-active-background))",
          },
          pending: {
            DEFAULT: "hsl(var(--status-pending))",
            background: "hsla(var(--status-pending-background))",
          },
          inactive: {
            DEFAULT: "hsl(var(--status-inactive))",
            background: "hsla(var(--status-inactive-background))",
          },
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          background: "hsl(var(--sidebar-background))",
          active:"hsl(var(--sidebar-active))",
          inactive: {
            DEFAULT: "hsl(var(--status-inactive))",
            background: "hsla(var(--status-inactive-background))",
          },
          accept: {
            DEFAULT: "hsl(var(--status-accept))",
            background: "hsla(var(--status-accept-background))",
          },
          rejected: {
            DEFAULT: "hsl(var(--status-rejected))",
            background: "hsla(var(--status-rejected-background))",
          },
        },        

        button: {
          DEFAULT: "hsl(var(--disable))",
          background: "hsl(var(--disable))",
        },
        table: {
          thead: {
            DEFAULT: "hsl(var(--head-color))",
          },
          trow: {
            DEFAULT: "hsl(var(--row-color))",
          },
        },
        loader:{
          DEFAULT: "hsla(var(--loader-color))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
