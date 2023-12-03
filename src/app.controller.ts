import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}
  @Get('users')
  getAllUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
      },
    });
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      //if select option is not defined, get all property.
      //if select option is defiend, gett selected property.
      select: {
        id: true,
        version: true,
        profile: {
          id: true,
        },
      },
      where: {
        profile: {
          id: 3,
        },
      },
      // how to get relations
      relations: {
        profile: true,
      },
      //ASC
      //DESC
      order: {
        id: 'ASC',
      },
      // how much should we exclude first?
      skip: 1,
      take: 1, //if 0, get all data,
    });
  }

  // @Post('users')
  // createPost() {
  //   return this.userRepository.save({
  //     title: 'Typeorm Study',
  //   });
  // }
  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'postuser@gmail.com',
    });
    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });
    return user;
  }
  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });
    return this.userRepository.save({ ...user, email: user.email + '0' });
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@sadf.ai',
    });

    await this.profileRepository.save({
      profileImg: 'asdf.jpg',
      user,
    });
    return user;
  }

  @Post('post/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'Nestjs study',
    });

    const post2 = await this.postRepository.save({
      title: 'Programing study',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });
    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
