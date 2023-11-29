import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

@Entity()
export class UserModel {
  //@PrimaryGeneratedColumn() vs @PrimaryColum() <-- input id manullay
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  email: string;
  //   @Column({
  //     type: 'varchar',
  //     name: 'title',
  //     length: 300,
  //     nullable: true,
  //     update: true,
  //     //select: true,
  //   })
  //   title: string;

  //   @CreateDateColumn()
  //   createdAt: Date;

  //   @UpdateDateColumn()
  //   updatedAt: Date;

  //   //how many save fucntion call
  //   @VersionColumn()
  //   version: number;

  //   @Column()
  //   @Generated('uuid')
  //   additionalId: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user)
  @JoinColumn()
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];
}
