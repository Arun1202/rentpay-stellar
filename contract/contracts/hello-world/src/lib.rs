#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype,
    Address, Env, Symbol, Vec,
};

#[contract]
pub struct RentPayContract;

#[contracttype]
#[derive(Clone)]
pub struct Payment {
    pub id: u64,
    pub tenant: Address,
    pub landlord: Address,
    pub amount: i128,
    pub status: Symbol,
    pub timestamp: u64,
}

#[contractimpl]
impl RentPayContract {
    pub fn create_payment(
    env: Env,
    id: u64,
    tenant: Address,
    landlord: Address,
    amount: i128,
) {
    let payment = Payment {
        id,
        tenant,
        landlord,
        amount,
        status: Symbol::new(&env, "SUCCESS"),
        timestamp: env.ledger().timestamp(),
    };

    env.storage().persistent().set(&id, &payment);
}
pub fn get_payment(
    env: Env,
    id: u64,
) -> Option<Payment> {
    env.storage().persistent().get(&id)
}

}

mod test;