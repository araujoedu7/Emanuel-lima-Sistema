import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CasesService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    clientId: string;
    title: string;
    actionType: string;
    description?: string;
    status?: string;
  }) {
    const client = await this.prisma.client.findUnique({
      where: {
        id: data.clientId,
      },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const createdCase = await this.prisma.legalCase.create({
      data: {
        clientId: data.clientId,
        title: data.title,
        actionType: data.actionType,
        description: data.description,
        status: data.status,
      },
      include: {
        client: true,
      },
    });

    await this.prisma.caseClientSnapshot.create({
      data: {
        caseId: createdCase.id,
        fullName: client.fullName,
        cpf: client.cpf,
        rg: client.rg,
        email: client.email,
        phone: client.phone,
        profession: client.profession,
        maritalStatus: client.maritalStatus,
        zipCode: client.zipCode,
        street: client.street,
        number: client.number,
        complement: client.complement,
        neighborhood: client.neighborhood,
        city: client.city,
        state: client.state,
      },
    });

    return this.prisma.legalCase.findUnique({
      where: {
        id: createdCase.id,
      },
      include: {
        client: true,
        snapshot: true,
      },
    });
  }

  async findAll() {
    return this.prisma.legalCase.findMany({
      include: {
        client: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.legalCase.findUnique({
      where: {
        id,
      },
      include: {
        client: true,
        snapshot: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      clientId?: string;
      title?: string;
      actionType?: string;
      description?: string;
      status?: string;
    },
  ) {
    return this.prisma.legalCase.update({
      where: {
        id,
      },
      data,
      include: {
        client: true,
      },
    });
  }
}