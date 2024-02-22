import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { v4 as uuid } from 'uuid';
import { Book,CreateUserInput,User } from './users.models';
import { IUser } from './IUser';

@Resolver('User')
export class UsersResolver {

    constructor(private readonly usersService: UsersService) {}

    @Query(() => [ User ])
	async getAllUsers(): Promise<User[]> {
		return await this.usersService.findAll()
	}

	@Mutation(() => User)
	async createUser(@Args('input') input: CreateUserInput): Promise<User> {
		return await this.usersService.createUser(input)
	}

	private _books: Book[] = [
		{
		  id: uuid(),
		  title: 'Book1',
		  author: 'John Doe',
		},
		{
		  id: uuid(),
		  title: 'Book2',
		  author: 'Jane Doe',
		},
	  ];
	
	  @Query(() => [Book])
	  books(): Book[] {
		return this._books;
	  }
    
}
