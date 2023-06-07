import { Module } from '@nestjs/common';
import { RandomCodeService } from 'src/services/random-code/random-code.service';
import { UserService } from 'src/services/user/user.service';

@Module({
   // providers: [ RandomCodeService]
})
export class RandomCodeModule {}
