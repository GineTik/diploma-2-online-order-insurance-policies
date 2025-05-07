import { Module } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { CategoriesModule } from './categories/categories.module';

@Module({
  controllers: [PoliciesController],
  providers: [PoliciesService],
  imports: [CategoriesModule],
})
export class PoliciesModule {}
