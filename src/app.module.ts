import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { ProviderModule } from './providers/provider.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.host,
      port: +process.env.port,
      username: "postgres",
      password: process.env.pass,
      database: process.env.name,
      entities: [],
      autoLoadEntities: true,
      synchronize: true
    }), 
    EmployeesModule, 
    ProductsModule, ProviderModule, ManagersModule, LocationsModule, RegionsModule, AuthModule, AwsModule
  ]
})
export class AppModule {}
