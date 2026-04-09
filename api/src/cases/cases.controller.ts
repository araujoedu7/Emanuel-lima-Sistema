import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  async create(
    @Body()
    body: {
      clientId: string;
      title: string;
      actionType: string;
      description?: string;
      status?: string;
    },
  ) {
    return this.casesService.create(body);
  }

  @Get()
  async findAll() {
    return this.casesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.casesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      clientId?: string;
      title?: string;
      actionType?: string;
      description?: string;
      status?: string;
    },
  ) {
    return this.casesService.update(id, body);
  }
}