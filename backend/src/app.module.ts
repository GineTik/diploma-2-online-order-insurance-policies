import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CompaniesModule } from '@modules/companies';
import { OrdersModule } from '@modules/orders';
import { PoliciesModule } from '@modules/policies';
import { UsersModule, AddUserIfNotExistsMiddleware } from '@modules/users';
import { JwtDecoratorMiddleware } from '@shared/auth';
import { UserCompanyModule } from '@modules/user-company/user-company.module';
import { UserOrderModule } from '@modules/user-order/user-order.module';

@Module({
	imports: [
		CompaniesModule,
		UsersModule,
		OrdersModule,
		PoliciesModule,
		UserCompanyModule,
		UserOrderModule,
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtDecoratorMiddleware).forRoutes('*');
		consumer.apply(AddUserIfNotExistsMiddleware).forRoutes('*');
	}
}
