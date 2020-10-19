export class CreateUserDto {
    email: string;
    credits: object;
}

export class UpdateBalanceStore {
    email: string;
    store: string;
    amount: number;
    operator: string;
}