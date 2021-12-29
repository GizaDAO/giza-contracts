import * as dotenv from "dotenv";
dotenv.config();

export const ETH_RPC = process.env.ETH_RPC;
export const ETH_CHAIN_ID = parseInt(process.env.ETH_CHAIN_ID ?? "");
export const DEPLOYER_PK = process.env.DEPLOYER_PK;
export const DEPLOYER_HD_PATH = process.env.DEPLOYER_HD_PATH;

export const TEAM_ADDRESS = process.env.TEAM_ADDRESS;
export const RELEASE_TIME = process.env.RELEASE_TIME;

export const DAO_ADDRESS = process.env.DAO_ADDRESS;
export const PRINCIPLE_ADDRESS = process.env.PRINCIPLE_ADDRESS;

export const ZERO_ADDRESS='0x0000000000000000000000000000000000000000';
export const MOCK_DAI_MINT='3524237370000000000000000';
export const MOCK_DAI_DEPOSIT='2122950240000000000000000';
export const MOCK_DAI_PROFIT='2041947340000000'; // 81002.9

export const STAKING_CONFIG = {
    FIRST_EPOCH_BLOCK: process.env.FIRST_EPOCH_BLOCK ?? "",
    FIRST_EPOCH_NUMBER: process.env.FIRST_EPOCH_NUMBER ?? "",
    EPOCH_LENGTH: process.env.EPOCH_LENGTH ?? "",
    INITIAL_INDEX: process.env.INITIAL_INDEX ?? "",
    INITIAL_REWARD_RATE: process.env.INITIAL_REWARD_RATE ?? "",
};

export const HYPER_STAKING_CONFIG = {
    MIN_LOKC_TIME: process.env.MIN_LOKC_TIME ?? "",
    PENALTY_PERCENT: process.env.PENALTY_PERCENT ?? "",
    REWARD_PERIOD: process.env.REWARD_PERIOD ?? "",
    REWARD_PERCENT: process.env.REWARD_PERCENT ?? "",
    END_TIME: process.env.END_TIME ?? "",
};

export const DAI_BOND_CONFIG = {
    NAME: "DAI Bond",
    PRICE_FEED_ADDRESS: "",
    ADDRESS: process.env.DAI_ADDRESS ?? "",
    BOND_BCV: process.env.DAI_BOND_BCV ?? "",
    BOND_VESTING_LENGTH: process.env.DAI_BOND_VESTING_LENGTH ?? "",
    BOND_LOCKING_LENGTH: "",
    MIN_BOND_PRICE: process.env.DAI_MIN_BOND_PRICE ?? "",
    MAX_BOND_PAYOUT: process.env.DAI_MAX_BOND_PAYOUT ?? "",
    BOND_FEE: process.env.DAI_BOND_FEE ?? "",
    MAX_BOND_DEBT: process.env.DAI_MAX_BOND_DEBT ?? "",
    INITIAL_BOND_DEBT: process.env.DAI_INITIAL_BOND_DEBT ?? "",
};

export const GIZA_DAI_BOND_CONFIG = {
    NAME: "GIZA-DAI Bond",
    PRICE_FEED_ADDRESS: "",
    ADDRESS: process.env.GIZA_DAI_ADDRESS ?? "",
    BOND_BCV: process.env.GIZA_DAI_BOND_BCV ?? "",
    BOND_VESTING_LENGTH: process.env.GIZA_DAI_BOND_VESTING_LENGTH ?? "",
    BOND_LOCKING_LENGTH: "",
    MIN_BOND_PRICE: process.env.GIZA_DAI_MIN_BOND_PRICE ?? "",
    MAX_BOND_PAYOUT: process.env.GIZA_DAI_MAX_BOND_PAYOUT ?? "",
    BOND_FEE: process.env.GIZA_DAI_BOND_FEE ?? "",
    MAX_BOND_DEBT: process.env.GIZA_DAI_MAX_BOND_DEBT ?? "",
    INITIAL_BOND_DEBT: process.env.GIZA_DAI_INITIAL_BOND_DEBT ?? "",
};

export const GIZA_MIM_HYPER_BOND_CONFIG = {
    NAME: "GIZA-MIM Hyper Bond V1",
    PRICE_FEED_ADDRESS: "",
    ADDRESS: process.env.GIZA_MIM_HYPER_ADDRESS ?? "",
    BOND_BCV: process.env.GIZA_MIM_HYPER_BOND_BCV ?? "",
    BOND_VESTING_LENGTH: "",
    BOND_LOCKING_LENGTH: process.env.GIZA_MIM_HYPER_BOND_LOCKING_LENGTH ?? "",
    MIN_BOND_PRICE: process.env.GIZA_MIM_HYPER_MIN_BOND_PRICE ?? "",
    MAX_BOND_PAYOUT: process.env.GIZA_MIM_HYPER_MAX_BOND_PAYOUT ?? "",
    BOND_FEE: process.env.GIZA_MIM_HYPER_BOND_FEE ?? "",
    MAX_BOND_DEBT: process.env.GIZA_MIM_HYPER_MAX_BOND_DEBT ?? "",
    INITIAL_BOND_DEBT: process.env.GIZA_MIM_HYPER_INITIAL_BOND_DEBT ?? "",
};


export function getBondConfig(bond: string): {
    NAME: string,
    PRICE_FEED_ADDRESS: string,
    ADDRESS: string,
    BOND_BCV: string,
    BOND_VESTING_LENGTH: string,
    BOND_LOCKING_LENGTH: string,
    MIN_BOND_PRICE: string,
    MAX_BOND_PAYOUT: string,
    BOND_FEE: string,
    MAX_BOND_DEBT: string,
    INITIAL_BOND_DEBT: string,
} {
    let res = {
        NAME: '',
        PRICE_FEED_ADDRESS: '',
        ADDRESS: '',
        BOND_BCV: '',
        BOND_VESTING_LENGTH: '',
        BOND_LOCKING_LENGTH: '',
        MIN_BOND_PRICE: '',
        MAX_BOND_PAYOUT: '',
        BOND_FEE: '',
        MAX_BOND_DEBT: '',
        INITIAL_BOND_DEBT: '',
    }
    switch(bond) {
        case 'DAI':
            res = DAI_BOND_CONFIG;
            break;
        case 'GIZADAI':
            res = GIZA_DAI_BOND_CONFIG;
            break;
        case 'GIZAMIM_HYPER':
            res = GIZA_MIM_HYPER_BOND_CONFIG;
            break;
    }
    return res;
}