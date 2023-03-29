import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Prop } from '@nestjs/mongoose/dist';
import mongoose, { HydratedDocument } from 'mongoose';


export type AgencyDocument = HydratedDocument<Agency>;

@Schema()
export class Agency {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  legalTax: string;

  @Prop()
  isActive: boolean;

  @Prop()
  AgencyPayment: string[];

  @Prop()
  planType: string;

  @Prop()
  guide: string;

  @Prop()
  responsable: string;

  @Prop()
  banners: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AgencyUser' }] })

  @Prop()
  sellers: string[];

  @Prop()
  invitationSended: string[];

  @Prop()
  trip: string[];
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
