import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CompaniesModule } from '@modules/companies';
import { OrdersModule } from '@modules/orders';
import { PoliciesModule } from '@modules/policies';
import { UsersModule, AddUserIfNotExistsMiddleware } from '@modules/users';
import { JwtDecoratorMiddleware } from '@shared/auth';

@Module({
	imports: [CompaniesModule, UsersModule, OrdersModule, PoliciesModule],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtDecoratorMiddleware).forRoutes('*');
		consumer.apply(AddUserIfNotExistsMiddleware).forRoutes('*');
	}
}
