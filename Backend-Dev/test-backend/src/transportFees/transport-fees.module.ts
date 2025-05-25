import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportFees } from './entities/TransportFees';
import { TransportFeesService } from './services/transportFees.service';
import { Transporter } from 'src/transporter/entity/Transporter';
import { TransportFeesController } from './controllers/transportFees.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TransportFees,Transporter])],
    providers: [TransportFeesService],
    controllers: [TransportFeesController],
    exports: [TransportFeesService],
})

export class TransportFeesModule {}
