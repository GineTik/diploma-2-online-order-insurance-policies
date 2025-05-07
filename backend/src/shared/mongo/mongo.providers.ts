import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { MONGO_CONNECTION } from './mongo.contants';
dotenv.config();

export const mongoProviders = [
	{
		provide: MONGO_CONNECTION,
		useFactory: (): Promise<typeof mongoose> => {
			if (!process.env.MONGO_CONNECTION) {
				throw new Error('MONGO_CONNECTION is not defined');
			}

			return mongoose.connect(process.env.MONGO_URI);
		},
	},
];
