import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/global-services/database/database.service';
import { AddressViewModel } from './view-model/address.vm';
import { AddressInput } from './input-model/address.im';

@Injectable()
export class AddressesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async saveAddress(
    address: AddressInput,
    userId: number,
  ): Promise<AddressViewModel> {
    try {
      const result: AddressViewModel =
        await this.databaseService.addresses.create({
          data: {
            address: address.address,
            city: address.city,
            country: address.country,
            contactName: address.contactName,
            type: address.type,
          },
        });

      await this.databaseService.userAddress.create({
        data: {
          userId: Number(userId),
          addressId: result.id,
        },
      });

      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUserAddress(userId: number): Promise<AddressViewModel[]> {
    try {
      const address = await this.databaseService.addresses.findMany({
        where: {
          users: { some: { userId: Number(userId) } },
        },
        include: { users: true },
      });
      return address.map((address) => ({
        id: address.id,
        address: address.address,
        contactName: address.contactName,
        city: address.city,
        country: address.country,
        type: address.type,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
      }));
    } catch (err) {
      throw new Error(err);
    }
  }
}
