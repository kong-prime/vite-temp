# OCM-Front Project Documentation

## Overview

**OCM-Front** is a private React project structured with modern web development tools and practices. It leverages Vite for fast development, TypeScript for static typing, and several other tools for code quality, styling, and component management.

## Project Structure

### Dependencies

#### Core Dependencies

- **React & React DOM**: Used for building user interfaces.
- **MUI (Material-UI)**: Provides pre-styled components for rapid UI development.
- **Emotion**: Library for writing CSS styles with JavaScript.
- **React Hook Form**: For managing form state and validation.

#### Development Dependencies

- **Storybook**: A tool for developing UI components in isolation.
  - Addons like `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/addon-links`, `@storybook/addon-onboarding`, and `@storybook/blocks` enhance Storybook functionality.
  - `@storybook/react-vite` for integrating Storybook with Vite.
- **TypeScript**: Provides static typing to JavaScript.
- **ESLint**: Linter for identifying and fixing code quality issues.
  - Various plugins and configurations like `eslint-config-airbnb`, `eslint-config-airbnb-typescript`, `eslint-config-prettier`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, and `eslint-plugin-storybook` are used to enforce coding standards.
- **Prettier**: Code formatter to ensure consistent code style.
- **Husky**: For running scripts on git hooks.
- **Lint-staged**: Runs linters on staged git files.
- **Vite**: Fast build tool for development and production.
- **PostCSS & Autoprefixer**: For processing CSS with vendor prefixes.
- **TailwindCSS**: Utility-first CSS framework.

### Scripts

- **`dev`**: Runs the development server using Vite.
- **`build`**: Compiles TypeScript and builds the project with Vite.
- **`lint`**: Lints the codebase and fixes issues automatically.
- **`preview`**: Previews the production build.
- **`format`**: Formats the codebase using Prettier.
- **`prepare`**: Sets up Husky for managing git hooks.
- **`restage`**: Adds staged files to git after linting and formatting.
- **`storybook`**: Starts the Storybook development server.
- **`build-storybook`**: Builds the Storybook for static hosting.

### Configuration

#### `lint-staged`

Ensures that TypeScript files (`.ts` and `.tsx`) are linted, formatted, and re-staged before committing:

```json
"lint-staged": {
	"*.{ts,tsx}": [
		"npm run lint",
		"npm run format",
		"npm run restage"
	]
}
```

#### `eslintConfig`

Extends the recommended Storybook ESLint configurations:

```json
"eslintConfig": {
	"extends": [
		"plugin:storybook/recommended"
	]
}
```

## Development Workflow

### Setting Up

1. **Install Dependencies**: Run `npm install` to install all dependencies.
2. **Prepare Husky**: Run `npm run prepare` to set up Husky for git hooks.

### Running the Project

- **Development Server**: Run `npm run dev` to start the Vite development server.
- **Storybook**: Run `npm run storybook` to start the Storybook server for component development.

### Building the Project

- **Production Build**: Run `npm run build` to create a production build.
- **Preview Build**: Run `npm run preview` to preview the production build locally.
- **Build Storybook**: Run `npm run build-storybook` to build the Storybook for static file hosting.

### Code Quality

- **Linting**: Run `npm run lint` to lint the codebase.
- **Formatting**: Run `npm run format` to format the codebase.

## Conclusion

This documentation provides a comprehensive overview of the OCM-Front project configuration, dependencies, scripts, and workflow. For further details, refer to the individual package documentation and scripts provided in the `package.json`.
