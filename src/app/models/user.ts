import { omit } from 'lodash'
import { model, Schema } from 'mongoose'

import { IUserModel } from '@interfaces/user'

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  },
)

userSchema.methods.toJSON = function () {
  return omit(this.toObject(), ['_id', '__v', 'password'])
}

const UserModel = model<IUserModel>('User', userSchema)

export default UserModel
