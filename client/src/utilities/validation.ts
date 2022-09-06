export const validateEmail = (email: string, name?: string) => {
  if (email.trim() === '') {
    return `${name ?? 'Email'} is required`
  }

  if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return `${name ?? 'Email'} is invalid`
  }
}

export const validateTextField = (value: string, name?: string) => {
  if (value.trim() === '') {
    return `${name ?? 'This field'} is required`
  }
}

export const validateUserType = (value: string, name?: string) => {
  if (!['Teacher', 'Student', 'Parent'].includes(value)) {
    return `${name ?? 'User Type'} is invalid`
  }
}

export const validateProfilePhoto = (filename: string) => {
  if (filename.indexOf('.jpg') < 0) {
    return 'Profile Photo is invalid'
  }
}
