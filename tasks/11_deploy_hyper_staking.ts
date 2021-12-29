import { task } from "hardhat/config";
import { createAddressFile, selectAddressFile } from "./address_file";
import { HYPER_STAKING_CONFIG } from "../config";

import { updateHreSigner } from "./signers";

task("deploy_hyper_staking", "Deploy Hyper Staking")
    .addOptionalParam("wsgiza", "Path to the wrapped staking address file", "")
    .addFlag("silent", "Run non-interactively and only deploy contracts specified by --deploy-*")
    .setAction(async function (args, hre) {
    await updateHreSigner(hre);
    const { ethers } = hre;
    await hre.run("compile");
    const [deployer] = await ethers.getSigners();
    const addressFile = createAddressFile(hre, "hyper_staking");

    const wsgizaAddresses = await selectAddressFile(hre, "wsgiza", args.wsgiza);

    const wsgiza = await ethers.getContractAt("WrappedStakingToken", wsgizaAddresses.WSGIZA, deployer);

    // Deploy diamond hand club
    const DiamondHandClub = await ethers.getContractFactory('DiamondHandClub');
    const dhc = await DiamondHandClub.deploy(
        wsgiza.address, { gasLimit: 5e6 } // Gas estimation may fail
    );
    await dhc.deployed()
    console.log("DiamondHandClub: " + dhc.address);
    addressFile.set("DiamondHandClub", dhc.address);

    // Deploy diamond hand club
    const DHCCampaign = await ethers.getContractFactory('DHCCampaignV1');
    const dhcCampaign = await DHCCampaign.deploy(
        dhc.address,
        HYPER_STAKING_CONFIG.MIN_LOKC_TIME,
        HYPER_STAKING_CONFIG.PENALTY_PERCENT,
        HYPER_STAKING_CONFIG.REWARD_PERIOD,
        HYPER_STAKING_CONFIG.REWARD_PERCENT,
        HYPER_STAKING_CONFIG.END_TIME, { gasLimit: 5e6 } // Gas estimation may fail
    );
    await dhcCampaign.deployed()
    console.log("DHCCampaignV1: " + dhcCampaign.address);
    addressFile.set("DHCCampaignV1", dhcCampaign.address);

    await dhc.addManager(deployer.address, { gasLimit: 5e6 });
    console.log("DiamondHandClub add manager success");
        
    await dhc.addCampaign(dhcCampaign.address, 0, { gasLimit: 5e6 } );
    console.log("DiamondHandClub add campaign success");

    await dhcCampaign.setActive(true);
    console.log("DHCCampaignV1 set active success");
    // deploy finished

    console.log("deploy success")

});
