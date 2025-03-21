export type IUserEntity = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class UserEntity implements IUserEntity {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;

  private constructor(props: IUserEntity) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.password = props.password;
  }

  public static create(props: IUserEntity): UserEntity {
    if (!props.id) {
      throw new Error('Id is required');
    }
    if (!props.firstName) {
      throw new Error('First name is required');
    }
    if (!props.lastName) {
      throw new Error('Last name is required');
    }
    if (!props.email) {
      throw new Error('Email is required');
    }
    if (!props.password) {
      throw new Error('Password is required');
    }

    return new UserEntity(props);
  }
}
