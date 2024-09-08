import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from 'src/controllers/customer.controller';
import { Customer } from 'src/entities/Customer.entity';
import { CustomersService } from 'src/services/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService]
})

export class CustomersModule {}