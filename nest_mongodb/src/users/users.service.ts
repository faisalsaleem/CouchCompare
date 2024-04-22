import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "./dot/CreateUser.dto";
import { UpdateUserDto } from "./dot/UpdateUser.dto";

@Injectable()
export class UsersService{

constructor(@InjectModel(User.name) private userModel:Model<User>){}

createUser(createUserDto : CreateUserDto){
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
}

getAllUsers(){
    return this.userModel.find();
}
getUserById(id:string){
    return this.userModel.findById(id)
}

updateUser(id:string,updateUserDto:UpdateUserDto){
    return this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true})
}

deleteUpdate(id:string){
    return this.userModel.findByIdAndDelete(id)
}
}