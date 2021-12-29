import { task } from "hardhat/config";
import { createAddressFile, selectAddressFile } from "./address_file";
import { DAO_ADDRESS, PRINCIPLE_ADDRESS, ZERO_ADDRESS, MOCK_DAI_MINT } from "../config";
import { updateHreSigner } from "./signers";

task("deploy_redis", "Deploy Redistribution")
    .addOptionalParam("init", "Path to the init address file", "")
    .addFlag("silent", "Run non-interactively and only deploy contracts specified by --deploy-*")
    .setAction(async function (args, hre) {
    await updateHreSigner(hre);
    const { ethers } = hre;
    await hre.run("compile");
    const [deployer] = await ethers.getSigners();
    const addressFile = createAddressFile(hre, "redis");

    const initAddresses = await selectAddressFile(hre, "init", args.init);

    const giza = await ethers.getContractAt("Token", initAddresses.GIZA, deployer);

    const Redistribution = await ethers.getContractFactory('Redistribution');
    const redistribution = await Redistribution.deploy(
        giza.address,
        PRINCIPLE_ADDRESS, { gasLimit: 5e6 } // Gas estimation may fail
    );
    await redistribution.deployed()
    console.log("Redistribution: " + redistribution.address);
    addressFile.set("Redistribution", redistribution.address);

    console.log("deploy redis success")
});
