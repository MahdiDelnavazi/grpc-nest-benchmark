import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import { GrpcMethod, ClientGrpc } from '@nestjs/microservices';
import { SummatorServiceClient } from './interfaces/summator.interface';

interface AddRequest {
  a: number;
  b: number;
}

@Controller()
export class AppController implements OnModuleInit {
  private summatorService: SummatorServiceClient;

  constructor(@Inject('SUMMATOR_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.summatorService = this.client.getService<SummatorServiceClient>(
      'SummatorService',
    );
  }
  @Get('/geta')
  async changeActiveStatus(
  ) {
    var a = 100
    var b = 100
    return this.summatorService.sum({ numbers: [a, b] }).toPromise();
  }

  @GrpcMethod('GatewayService', 'Add')
  add(body: AddRequest) {
    return this.summatorService.sum({ numbers: [body.a, body.b] }).toPromise();
  }
}
