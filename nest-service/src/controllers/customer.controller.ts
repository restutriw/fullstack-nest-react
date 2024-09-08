import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CustomerInterface, CustomersService } from "src/services/customer.service";

interface CreateCustomerDto {
  nama: string,
  alamat: string,
  kota: string
};

@Controller('api/customers')
export class CustomersController {

  constructor(private customerService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.create(createCustomerDto);

    if(!customer) {
      return 'Error creating customer';
    }

    return 'Customer created successfully';
  }

  @Get()
  async findAll() {
    const customers: Array<CustomerInterface> = await this.customerService.findAll();

    return customers;
  }

  @Get(':id')
  async findByNama(@Param('id') id: string ) {
    const customer: CustomerInterface = await this.customerService.findById(id);

    return customer;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: CustomerInterface) {
    const newCustomer: CustomerInterface = await this.customerService.update(id, body);

    if(!newCustomer) {
      return 'Error updating customer';
    }

    return 'Customer updated successfully';
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.customerService.delete(id);

    return 'Successfully deleted customer with id' + id;
  }
}