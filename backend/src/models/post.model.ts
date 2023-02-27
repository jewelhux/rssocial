import { getModelForClass, modelOptions, pre, prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

@pre<Post>('save', async function onSave(next) {
  this.id = this._id;
  next();
})
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Post {
  @prop()
  id: string;

  @prop({ default: '' })
  text: string;

  @prop({ default: '' })
  image: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @prop({ ref: () => User, required: true, default: [] })
  likes: Ref<User>[];
}

const postModel = getModelForClass(Post);

export default postModel;
