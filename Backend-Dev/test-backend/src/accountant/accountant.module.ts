import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Accountant } from "./entity/Accountant";
import { AccountantController } from './controllers/accountant/accountant.controller';
import { AccountantService } from './services/accountant/accountant.service';

@Module({
    imports: [TypeOrmModule.forFeature([Accountant])],
      providers: [AccountantService],
      controllers: [AccountantController],
      exports: [],
})
export class AccountantModule {}
