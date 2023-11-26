
**Project Description:**

This React single-page application is designed to showcase a table of users fetched from JSONPlaceholder, displaying essential user details like name, email, and company name. Users can filter the table by name and email to easily locate specific entries.

Additionally, the application allows users to select a particular user and view a list of posts authored by that user, fetching data from JSONPlaceholder. Users can create a new post through a "Create post" button, which triggers a dialog to input post details (mimicking the creation process, although not executed on the server).

**Recommendations:**

For a polished and professional interface, this project utilizes a component library such as Material-UI, Ant Design, or any other preferred library.

The codebase is structured to prioritize readability and comprehension. Understanding the codebase will be essential, as the interview will focus on discussing and analyzing the React code implementation.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
