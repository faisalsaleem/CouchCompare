import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dot/CreateUser.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dot/UpdateUser.dto";


@Controller("users")
export class UsersController{
    
    constructor( private usersService:UsersService){}

    @Post()
    @UsePipes( new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto){
     console.log(createUserDto)
     return this.usersService.createUser(createUserDto)
    }

    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers()
    }

    @Get(":id")
     async getUserById(@Param("id") id:string ){
       const isValid = mongoose.Types.ObjectId.isValid(id);
       if(!isValid) throw new  HttpException("user not found",HttpStatus.NOT_FOUND)
        const user = await this.usersService.getUserById(id);
        if(!user){
             throw new  HttpException("user not found",HttpStatus.NOT_FOUND)
        }
        return user
    }


    @Patch(":id")
    @UsePipes( new ValidationPipe())
    async updateUser(@Param("id") id:string , @Body() updateUserDto : UpdateUserDto  ){
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if(!isValid) throw new  HttpException("user not found",HttpStatus.NOT_FOUND)
       const user = await this.usersService.updateUser(id ,updateUserDto);
       if(!user){
            throw new  HttpException("user not update",HttpStatus.BAD_REQUEST)
       }
       console.log(user)
       return user
   }

   @Delete(":id")
   async deleteUpdate(@Param("id") id:string){
     const isValid = mongoose.Types.ObjectId.isValid(id);
     if(!isValid) throw new  HttpException("user not found",HttpStatus.NOT_FOUND)
      const user = await this.usersService.deleteUpdate(id );
      if(!user){
           throw new  HttpException("user not delete",HttpStatus.BAD_REQUEST)
      }
      console.log(user)
      return user
  }
}