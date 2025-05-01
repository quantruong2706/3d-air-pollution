export default {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '*.{css,scss}': ['prettier --write'],
  '*.{json,md}': ['prettier --write'],
};
