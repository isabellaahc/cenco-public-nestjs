import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./interfaces/user.interface";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async create(user: User): Promise<User> {
        const createdUser = new this.userModel(user)
        try {
            const result = await createdUser.save();
            return result;
        } catch (error) {
            return error 
        }

    }

    async findAll(){
        try{
            const showUsers = await this.userModel.find({})
            return showUsers;
        }catch(error){
            return {
                message: "Ha ocurrido un error",
                error: error
            };
        }
        
    }

    async getCreditsByEmail(email, store){
        let user;
        try {
            user = await this.userModel.findOne({ "email": email })
            if (!user) {
                console.log(`Usuario no encontrado${user}`)
                throw new NotFoundException("El usuario no fue encontrado")
            } else {
                const balanceStore = user.credits.find(credit => credit.store === store)
                if(balanceStore === undefined){
                    throw new NotFoundException(`El cliente ${email} no tiene registro en la tienda ${store}`)
                }
                return {
                    message: `El cliente ${email} tiene un saldo de $${balanceStore.balance} en la tienda ${store}`,
                    status: 200
                }
                
            }
        } catch (error) {
            throw new NotFoundException(error)
        }
        
    }

    async updateClientBalance(data){
        let user;
        let updatingData;
        try {
            user = await this.userModel.findOne({ "email": data.email })
            if(user){
                updatingData = user.credits.find(credit => credit.store === data.store)
                if(updatingData){
                    const operator = this.balanceCalculator(data.operator, updatingData.balance, data.amount)
                    if(operator.message.length > 0){
                        return {
                            message: operator.message,
                            status: 500
                        }
                    }else{
                        let io = user.credits.indexOf(updatingData);
                        const update = await this.userModel.findOneAndUpdate({"_id": user._id, "credits.store": updatingData.store[io]}, {"$set": { "credits.$.balance": operator.total}})
                        return {
                            message: `El nuevo saldo del cliente ${data.email} en la tienda ${data.store} es: $${operator.total}`,
                            status: 201
                        } 
                    }
                }else{
                    return {
                        message: `El cliente ${data.email} no tiene registro en la tienda ${data.store}`,
                        status: 404
                    }
                }

            }else{
                return {
                    message: `No se encontraron datos para el Cliente ${data.email}`,
                    status: 404
                }
            }
            
            
        } catch (error) {
            return {
                message: "Ha ocurrido un error",
                error: error
            };
        }

    }

    async balanceByStore(store){
        try {
            const searchStore = await this.userModel.find({ "credits.store" : store}, {"_id": 0, "email": 0, "__v": 0})
            return "ESTA FUNCION ESTÁ EN CONSTRUCCION"
        } catch (error) {
            return{
                message: "A ocurrido un error",
                error: error
            }
        } 
    }

    balanceCalculator(operatorType, balance, amount){
        let message: string;
        let total: number;
        switch(operatorType){
            case "SUM":
                total = balance + amount
                message = ""
                break;
            case "SUBS":
                total = balance - amount;
                message = ""
                break;
            default:
                message = "La operación que intenta hacer no está permitida. Para agregar crédito utilice el valor SUM, para reducir crédito utilice el valor SUBS"
                break;
        }
        
        return {
            message, total
        }
    }
}
