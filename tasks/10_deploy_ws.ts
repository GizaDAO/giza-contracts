import { task } from "hardhat/config";
import { createAddressFile, selectAddressFile } from "./address_file";
import { DAO_ADDRESS, PRINCIPLE_ADDRESS, ZERO_ADDRESS, MOCK_DAI_MINT } from "../config";
import { updateHreSigner } from "./signers";

task("deploy_ws", "Deploy Wrapped Staking Token")
    .addOptionalParam("staking", "Path to the staking address file", "")
    .addFlag("silent", "Run non-interactively and only deploy contracts specified by --deploy-*")
    .setAction(async function (args, hre) {
    await updateHreSigner(hre);
    const { ethers } = hre;
    await hre.run("compile");
    const [deployer] = await ethers.getSigners();
    const addressFile = createAddressFile(hre, "wsgiza");

    const stakingAddresses = await selectAddressFile(hre, "staking", args.staking);

    const sgiza = await ethers.getContractAt("StakedToken", stakingAddresses.SGIZA, deployer);

    // Deploy WSGIZA
    const WSGIZA = await ethers.getContractFactory('WrappedStakingToken');
    const wsgiza = await WSGIZA.deploy(
        sgiza.address, { gasLimit: 5e6 } // Gas estimation may fail
    );
    await wsgiza.deployed()
    console.log("WSGIZA: " + wsgiza.address);
    addressFile.set("WSGIZA", wsgiza.address);

    // deploy finished

    console.log("deploy success")

});
