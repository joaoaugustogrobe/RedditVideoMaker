import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
// import { ApiProperty } from '@nestjs/swagger';
import { MongoId } from 'src/objects/mongoId';
import { Role } from 'src/auth/role.enum';

@Entity({ name: 'users' })
export class User extends MongoId {
  @Column()
  // @ApiProperty()
  public displayName: string;

  @Column({ unique: true })
  // @ApiProperty()
  public email: string;

  // @Column()
  // @Exclude()
  // public password: string;

  @Column({
    type: 'enum',
    enum: Object.values(Role),
    default: Role.Regular,
  })
  // @ApiProperty()
  public role: string = Role.Regular;

  @Column({ default: true })
  // @ApiProperty()
  public isActive = true;

  // @OneToMany((type) => Video, (video) => video.owner)
  // videos: Video[];

  @CreateDateColumn({ name: 'createdAt' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  public updatedAt: Date;
}
