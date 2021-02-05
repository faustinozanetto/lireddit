import { UsernamePasswordInput } from 'src/resolvers/UsernamePasswordInput';

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'Please enter a valid email!',
      },
    ];
  }
  if (options.username.length === 0) {
    return [
      {
        field: 'username',
        message: 'Please enter a valid username!',
      },
    ];
  }

  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'Username can not include @!',
      },
    ];
  }
  if (options.username.length <= 2) {
    return [
      {
        field: 'username',
        message: 'Length must be greater than 2',
      },
    ];
  }
  if (options.password.length <= 5) {
    return [
      {
        field: 'password',
        message: 'Length must be greater than 5',
      },
    ];
  }

  return null;
};
