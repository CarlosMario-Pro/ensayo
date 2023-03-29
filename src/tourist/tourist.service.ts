import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isEmail, isNumber, isPassword } from './utils/tourist.utils';
import { Tourist, TouristDocument } from './schema/tourist.schema';
import { TouristRegistrationDto } from './dto/tourist-registration.dto';
import { TouristUpdateDto } from './dto/tourist-update.dto';


@Injectable()
export class TouristService {
    constructor(@InjectModel(Tourist.name) private readonly touristModel: Model<TouristDocument>) {}

    //Busca un turista por su id pasado por params
    async findById(id: string): Promise<Tourist> {
        return await this.touristModel.findById(id);
    }

    
    //Busca todos los turistas
    async findAll(): Promise<Tourist[]> {
        return await this.touristModel.find().exec();
    }

    
    //Creo un turista pasando el DTO y las funciones validadoras de cada propiedad requerida
    async create(touristRegistrationDto: TouristRegistrationDto): Promise<Tourist> {
        const { firstName, lastName, email, phoneNumber, password } = touristRegistrationDto;
        if (!firstName || !lastName || !email || !phoneNumber || !password) {
            throw new BadRequestException('Missing data');
        }
        if (!isEmail(email)) {
            throw new BadRequestException('email is not valid');
        }
        if (!isNumber(phoneNumber)) {
            throw new BadRequestException('debe de ser número');
        }
        if (!isPassword(password)) {
            throw new BadRequestException('password most to be 8 characters');
        }

        const createdTourist = new this.touristModel(touristRegistrationDto);
        return createdTourist.save();
    }
    //POST a http://localhost:3000/tourist con: { "firstName": "Carlos", "lastName": "Reyes", "email": "carlos@gmail.com", "phoneNumber": 3002003344, "password": "Carlos..14" }


    //Modifico un turista
    async update(id: string, updateDto: TouristUpdateDto): Promise<Tourist> {
        const { firstName, lastName, email, phoneNumber } = updateDto;
      
        if (!firstName || !lastName || !email || !phoneNumber) {
            throw new BadRequestException('Missing data');
        }
        if (!isEmail(email)) {
            throw new BadRequestException('Email is not valid');
        }
        if (!isNumber(phoneNumber)) {
            throw new BadRequestException('Phone number must be a number');
        }

        const existingTourist = await this.touristModel.findById(id);
        if (!existingTourist) {
            throw new NotFoundException('Tourist not found');
        }

        existingTourist.firstName = firstName;
        existingTourist.lastName = lastName;
        existingTourist.email = email;
        existingTourist.phoneNumber = phoneNumber;
      
        return existingTourist.save();
    }


    //Elimino un turista
    async delete(id: string): Promise<Tourist> {
        const tourist = await this.touristModel.findById(id);
        if (!tourist) {
            throw new NotFoundException('Tourist not found');
        }
        return await tourist.deleteOne();
    }
}