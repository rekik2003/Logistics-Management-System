import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entity/Users';
import { TransportFeesModule } from './transportFees/transport-fees.module';
import { TransporterModule } from './transporter/transporter.module';
import { Transporter } from './transporter/entity/Transporter';
import { TransportFees } from './transportFees/entities/TransportFees';
import { BudgetRequestsModule } from './budget/budgetRequests.module';
import { AccountantModule } from './accountant/accountant.module';
import { Accountant } from './accountant/entity/Accountant';
import { BudgetRequests } from './budget/BudgetRequests';
import { WareHouseModule } from './wharehouse/warehouse.module';
import { Warehouse } from './wharehouse/entity/Warehouse';
import { ProductInStockModule } from './products/product-in-stock/module/product-in-stock.module';
import { Product } from './products/entity/Product';
import { ProductInStock } from './products/product-in-stock/entity/ProductInStock';
import { ProductToTransfer } from './products/product-to-transfer/entity/ProductToTransfer';
import { ProductToTransferModule } from './products/product-to-transfer/module/product-to-transfer.module';
import { ProductToTransferSubscriber } from './products/product-to-transfer/subscribers/product-to-transfer.subscriber';
import { BudgetRequestSubscriber } from './budget/subscribers/budget-request.subscriber';
import { EmployeeController } from './employee/controllers/employee/employee.controller';
import { EmployeeService } from './employee/services/employee/employee.service';
import { EmployeeModule } from './employee/module/employee/employee.module';
import { Employee } from './employee/entity/Employee.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Youyou.2003',
    database: 'sakerDB',
    entities: [User,Transporter,TransportFees,Accountant,BudgetRequests,Warehouse,Product,ProductInStock,ProductToTransfer,Employee],
    subscribers: [ProductToTransferSubscriber,BudgetRequestSubscriber],
    synchronize: true,
  }),
  AuthModule,
  TransportFeesModule,
  TransporterModule,
  BudgetRequestsModule,
  AccountantModule,
  WareHouseModule,
  ProductInStockModule,
  ProductToTransferModule,
  EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
