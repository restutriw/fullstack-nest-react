import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { Customer } from "src/entities/Customer.entity";
import { Repository } from "typeorm";

export interface CustomerInterface {
  id?: string,
  no?: string, 
  nama: string,
  alamat: string,
  kota: string
  createdAt?: Date;
  updatedAt?: Date;
};

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<CustomerInterface>
  ) {}

  create(customer: CustomerInterface): Promise<CustomerInterface> {
    const customerBody = this.customerRepository.create(customer);
    customerBody.no = randomUUID();
    customerBody.createdAt = new Date();
    customerBody.updatedAt = new Date();
    return this.customerRepository.save(customerBody);
  }

  findAll(): Promise<CustomerInterface[]> {
    return this.customerRepository.find();
  }

  findById(id: string): Promise<CustomerInterface> {
    return this.customerRepository
      .findOne({
        where: {
          id: id
        }
      });
  }

  update(id: string, data: CustomerInterface): Promise<any> {
    return this.customerRepository
      .createQueryBuilder()
      .update()
      .set({
        nama: data.nama,
        alamat: data.alamat,
        kota: data.kota
      })
      .where('id = :id', { id })
      .execute();
  }

  delete(id: string): Promise<any> {
    return this.customerRepository
      .createQueryBuilder()
      .delete()
      .from(Customer)
      .where('id = :id', { id })
      .execute();
  }
}