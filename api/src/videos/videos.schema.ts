import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import { Owner } from '../owners/schemas/owner.schema';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop([String])
  body: string[];

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  // owner: Owner;

  @Prop([String])
  meta: string[];
}

export const VideoSchema = SchemaFactory.createForClass(Video);
