import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/global-services/database/database.service';
import { AddressViewModel } from './view-model/address.vm';
import { AddressInput } from './input-model/address.im';

@Injectable()
export class AddressesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async saveAddress(address: AddressInput): Promise<AddressViewModel> {
    try {
      const result: AddressViewModel =
        await this.databaseService.billingAddress.create({
          data: {
            address: address.address,
            city: address.city,
            country: address.country,
            contactName: address.contactName,
            userId: Number(address.userId),
          },
        });

      await this.databaseService.shippingAddress.create({
        data: {
          address: address.address,
          city: address.city,
          country: address.country,
          contactName: address.contactName,
          userId: Number(address.userId),
        },
      });

      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUserAddress(
    userId: number,
  ): Promise<{ billing: AddressViewModel[]; shipping: AddressViewModel[] }> {
    try {
      const billingAddress = await this.databaseService.billingAddress.findMany(
        {
          where: {
            userId: Number(userId),
          },
        },
      );
      const shippingAddress =
        await this.databaseService.shippingAddress.findMany({
          where: {
            userId: Number(userId),
          },
        });
      return {
        billing: billingAddress,
        shipping: shippingAddress,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
