import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Message {
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @prop({ default: '' })
  text: string;

  @prop({ default: '' })
  image: string;
}

export class Participant {
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @prop({ default: 0 })
  index: number;
}

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Conversation {
  @prop({ type: () => [Participant], required: true })
  participants: Participant[];

  @prop({ type: () => [Message], default: [] })
  messages: Message[];
}

const conversationModel = getModelForClass(Conversation);

export default conversationModel;
