import { getModelForClass, modelOptions, prop, Ref, index } from '@typegoose/typegoose';
import { User } from './user.model';
import { FriendStatus } from '../schemas/friends.schema';

@index({ requester: 1, requestee: 1 }, { unique: true })
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Friendship {
  @prop({ required: true, ref: () => User })
  requester: Ref<User>;

  @prop({ required: true, ref: () => User })
  requestee: Ref<User>;

  @prop({ required: true, enum: [FriendStatus.ACCEPTED, FriendStatus.PENDING] })
  status!: string;
}

const friendshipModel = getModelForClass(Friendship);

export default friendshipModel;
