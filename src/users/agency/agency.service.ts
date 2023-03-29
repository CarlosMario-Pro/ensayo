import { hash } from 'bcrypt';
import { Model } from 'mongoose';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Agency, AgencyDocument } from './schema/agency.schema';
import { AgencyRegistrationDTO } from './dto/agency-registration.dto';

@Injectable()
export class AgencyService {
  constructor(
    @InjectModel(Agency.name)
    private readonly _agencyModel: Model<AgencyDocument>,
  ) {}

  async findOne(email: string): Promise<Agency> {
    return this._agencyModel.findOne({ email }).exec();
  }

  async create(registrationDTO: AgencyRegistrationDTO): Promise<Agency> {
    const { email, password } = registrationDTO;

    const existingAgency = await this._agencyModel.findOne({ email }).exec();
    if (existingAgency) {
      throw new ConflictException('Email is already exist');
    }

    const hashedPassword = await hash(password, 10);

    const createdAgency = new this._agencyModel({
      ...registrationDTO,
      password: hashedPassword,
    });

    return createdAgency.save();
  }
}
