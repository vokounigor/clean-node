export type IUserCredentialsEntity = {
  id: string;
  password: string;
};

export class UserCredentialsEntity implements IUserCredentialsEntity {
  readonly id: string;
  readonly password: string;

  private constructor(props: IUserCredentialsEntity) {
    this.id = props.id;
    this.password = props.password;
  }

  public static create(props: IUserCredentialsEntity): UserCredentialsEntity {
    if (!props.id) {
      throw new Error('Id is required');
    }
    if (!props.password) {
      throw new Error('Password is required');
    }

    return new UserCredentialsEntity(props);
  }
}
