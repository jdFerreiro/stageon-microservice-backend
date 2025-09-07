import { Global, Module } from '@nestjs/common';
import { UserContext } from './user-context';

@Global()
@Module({
  providers: [UserContext],
  exports: [UserContext],
})
export class UserContextModule {}
