export interface UserObjProps {
  firstname: string
  lastname: string
  email: string
  phonenumber: number
}

export interface LoginProps {
  email: string
  password: string
}

export interface SignupProps {
  email: string
  password: string
  firstname: string
  lastname: string
  phonenumber: string
  passwordConfirm: string
}

export interface EditUserProps {
  email: string
  firstname: string
  lastname: string
  phonenumber: number | null
}

export interface EditUserPasswordProps {
  passwordCurrent: string
  passwordNew: string
  passwordNewConfirm: string
}
