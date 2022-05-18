import { UserObjProps } from "../context/AuthTypes";

class User {
    id: UserObjProps;
    firstname: UserObjProps;
    lastname: UserObjProps;
    email: UserObjProps;
    phone: UserObjProps;
    constructor(id: UserObjProps, firstname: UserObjProps, lastname: UserObjProps, email: UserObjProps, phone: UserObjProps) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
    }
}
export default User;