import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  ReturnModelType,
  Severity,
} from "@typegoose/typegoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectID } from "mongodb";

@pre<User>("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
})
// create a user model
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class User {
  @prop({ required: true, trim: true })
  public name!: string;

  @prop({
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (value: string) => {
        return validator.isEmail(value);
      },
      message: "Email is not valid",
    },
  })
  public email!: string;

  @prop({
    required: true,
    trim: true,
    minlength: 7,
    validate: {
      validator: (value: string) => {
        return !value.toLowerCase().includes("password");
      },
      message: "Password can not contain word password",
    },
  })
  private password!: string;

  @prop({
    default: 0,
    validate: {
      validator: (value: number) => {
        return value >= 0;
      },
      message: "Age must be positive number",
    },
  })
  public age?: number;

  @prop({ required: true })
  public tokens!: {}[];

  // Model method
  public static async findByCredentials(
    this: ReturnModelType<typeof User>,
    email: string,
    password: string
  ) {
    // find user from db using email
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("unable to login");
    }

    // match password with user password and db stored hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("unable to login");
    }
    return user;
  }

  // instance method
  public async generateAuthToken(this: DocumentType<User>) {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "myscreatkeyphrasse");
    const _id = new ObjectID();
    user.tokens = user.tokens.concat({ token, _id });
    await user.save();

    return token;
  }
}

export const UserModel = getModelForClass(User);
/*
CODE WITHOUT TYPEGOOSE
 */

// interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   age: number;
// }
// const UserSchema: Schema = new Schema({
//   name: { type: String, required: true, trim: true },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     validate(value: string) {
//       if (!validator.isEmail(value)) throw new Error("Email is not valid");
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 7,
//     validate(value: string) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error("Password can not contain word password");
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value: number) {
//       if (value < 0) {
//         throw new Error("Age must be a positive number");
//       }
//     },
//   },
// });

// export const User: Model<IUser> = model("User", UserSchema);
