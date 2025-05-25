import { Module } from '@nestjs/common';
import { TransporterController } from './controllers/transporter.controller';
import { TransporterService } from './services/transporter.service';
import { TransportFeesModule } from 'src/transportFees/transport-fees.module';
import { Transporter } from './entity/Transporter';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Transporter]),TransportFeesModule],
      providers: [TransporterService],
      controllers: [TransporterController],
      exports: [],
})
export class TransporterModule {}
