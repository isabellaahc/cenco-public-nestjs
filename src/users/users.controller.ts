import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UpdateBalanceStore } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { User } from "./interfaces/user.interface";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post('createUser')
    async createUser(@Body() createUser: User){
        const result = await this.userService.create(createUser);
        return result;
    }

    @Get('showAll')
    async findAll(){
        const result = this.userService.findAll();
        return result;
    }

    @Get('getClientBalanceByStore')
    async getCreditsByEmail(@Query() query){
        const result = await this.userService.getCreditsByEmail(query.email, query.store);
        return result;
    }
    
    @Post('updateClientBalance')
    async updateClientBalance(@Body() updateBalance: UpdateBalanceStore){
        const result = await this.userService.updateClientBalance(updateBalance);
        return result;
    }

    @Get(':store')
    async balanceByStore(@Param() param){
        const result = await this.userService.balanceByStore(param.store)
        return result;
    }


}
