import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  async create(
    @Body()
    body: {
      fullName: string;
      cpf: string;
      rg?: string;
      email?: string;
      phone?: string;
      profession?: string;
      maritalStatus?: string;
      zipCode?: string;
      street?: string;
      number?: string;
      complement?: string;
      neighborhood?: string;
      city?: string;
      state?: string;
    },
  ) {
    return this.clientsService.create(body);
  }

  @Get()
  async findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Get(':id/cases')
  async findCasesByClientId(@Param('id') id: string) {
    return this.clientsService.findCasesByClientId(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      fullName?: string;
      cpf?: string;
      rg?: string;
      email?: string;
      phone?: string;
      profession?: string;
      maritalStatus?: string;
      zipCode?: string;
      street?: string;
      number?: string;
      complement?: string;
      neighborhood?: string;
      city?: string;
      state?: string;
    },
  ) {
    return this.clientsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}