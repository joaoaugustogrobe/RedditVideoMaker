import { Transform } from 'class-transformer';
import { ObjectID, ObjectIdColumn } from 'typeorm';

export abstract class MongoId {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toHexString(), {
    toPlainOnly: true,
  })
  public id: ObjectID;
}
