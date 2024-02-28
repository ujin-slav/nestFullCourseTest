
// import { User } from '../users/users.models';

// async function createUser(
//   id: number,
//   email: string,
//   password:string
// ): Promise<User> {
//   const user = await User.create({
//     id,
//     password,
//     email
//   });

//   // Take care, this line MUST be placed AFTER .create(),
//   // or the UPDATE will be performed before the insert.
//   // I wasted 2 HOURS on that point.
//   //await universe.$add('heroes', [hero]);
//   return hero;
// }

// export { createUser };