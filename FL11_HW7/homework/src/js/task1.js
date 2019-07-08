const email = prompt('Please enter your email:');
const userEmail = 'user@gmail.com';
const userPass = 'UserPass';
const adminEmail = 'admin@gmail.com';
const adminPass = 'AdminPass';
const user = 'user';
const admin = 'admin';
const emailMinLength = 6;
const newPasswordMinLength = 5;

let currentPassword = '';
let emailValidationPass = false;
let passValidationPass = false;
let changePasswordRequest = false;
let currentPasswordCorrect = false;
let oldPassword = '';
let loggedAs;
let newPassword = '';
let confirmedPassword = '';

const messages = {
  canceled: 'Canceled',
  emailError: 'I don\'t know any emails having name length less than 6 symbols',
  password: 'Please enter your password',
  userValidationError: 'I don’t know you',
  wrongPassword: 'Wrong password',
  passwordChange: 'Do you want to change your password?',
  oldPassword: 'Enter your old password',
  failedToChange: 'You have failed the change',
  newPassword: 'Enter your new password',
  toShortPassword: 'It’s too short password. Sorry.',
  confirmPassword: 'Please repeat your new password.',
  successChangePassword: 'You have successfully changed your password.',
  incorrectPassword: 'You wrote the wrong password.'
};

// Check for entered email.
if (email === null || email === '') {
  alert(messages.canceled);
} else if (email !== null && email.length < emailMinLength) {
  alert(messages.emailError);
} else if (email === userEmail || email === adminEmail) {
  currentPassword = prompt(messages.password);
  // Check for user role.
  if (email === userEmail) {
    loggedAs = user;
  } else {
    loggedAs = admin;
  }
  emailValidationPass = true;
} else {
  alert(messages.userValidationError);
}

// Check for user pass.
if (emailValidationPass) {
  if (email === userEmail && currentPassword === userPass || email === adminEmail && currentPassword === adminPass) {
    passValidationPass = true; 
  } else if (currentPassword === null || currentPassword === '') {
    // Check for user cancel input or add empty string.
    alert(messages.canceled);
  } else {
    // Throw error message.
    alert(messages.wrongPassword);
  }
}

// Confirmation for change password
if (passValidationPass) {
  changePasswordRequest = confirm(messages.passwordChange);

  // Get old password
  if (changePasswordRequest) {
    oldPassword = prompt(messages.oldPassword);
  } else {
    // Canceled change password.
    alert(messages.failedToChange);
  }
}

// Check for current password.
if (passValidationPass && changePasswordRequest) {
  // Catch for press cancel button or empty string.
  if (oldPassword === null || oldPassword === '') {
    alert(messages.canceled);
  } else if (loggedAs === user && oldPassword === userPass || loggedAs === admin && oldPassword === adminPass) {
    // Case when user add correct password.
    currentPasswordCorrect = true;
  } else {
    // Case when user add incorrect password.
    alert(messages.wrongPassword);
  }
}

// Set new password.
if (currentPasswordCorrect && passValidationPass) {
  newPassword = prompt(messages.newPassword);
  // Case when user click Cancel button.
  if (newPassword === null) {
    alert(messages.canceled);
  } else if (newPassword.length >= newPasswordMinLength) {
    // If new password biggest then 5.
    confirmedPassword = prompt(messages.confirmPassword);

    if (confirmedPassword === null) {
      alert(messages.canceled);
    } else if (newPassword === confirmedPassword) {
      // If both password the same.
      alert(messages.successChangePassword);
    } else {
      // If confirmation password is invalid.
      alert(messages.incorrectPassword);
    }
  } else {
    // If new password less then 5.
    alert(messages.toShortPassword);
  }
}
