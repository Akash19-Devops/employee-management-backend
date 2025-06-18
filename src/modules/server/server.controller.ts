import { Controller, Get } from '@nestjs/common';

@Controller('server')
export class ServerController {

    @Get()
    getStatus() {
        return { status: 'Ok', message: "Server is up and running" };
    }
}
