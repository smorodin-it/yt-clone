import { IUserModel } from '@youtube-clone/data-models';
import { getModelForClass, pre, prop } from '@typegoose/typegoose';
import argon2 from 'argon2';

@pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await argon2.hash(this.password);

    return next();
  }
})
export class User implements IUserModel {
  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true })
  public password: string;

  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}

const user = new User();

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
