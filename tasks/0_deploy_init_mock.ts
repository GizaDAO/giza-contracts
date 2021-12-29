import { task } from "hardhat/config";
import { createAddressFile, selectAddressFile } from "./address_file";
import { DAO_ADDRESS, MOCK_DAI_DEPOSIT, MOCK_DAI_PROFIT, ZERO_ADDRESS, MOCK_DAI_MINT } from "../config";
import { updateHreSigner } from "./signers";

task("deploy_init_mock", "Deploy Init Token and Treasury", async function (_args, hre) {
    await updateHreSigner(hre);
    const { ethers } = hre;
    await hre.run("compile");
    const [deployer] = await ethers.getSigners();
    const addressFile = createAddressFile(hre, "init_mock");

    // just for test
    // Deploy DAI
    const DAI = await ethers.getContractFactory('DAI');
    const dai = await DAI.deploy(0);
    await dai.deployed()
    console.log("Mock DAI: " + dai.address);
    addressFile.set("MockDAI", dai.address);

    // Deploy 10,000,000 mock DAI
    await dai.mint(deployer.address, MOCK_DAI_MINT);
    console.log("mint dai success");

    // Deploy giza
    const GIZA = await ethers.getContractFactory('Token');
    const giza = await GIZA.deploy();
    await giza.deployed()
    console.log("GIZA: " + giza.address);
    addressFile.set("GIZA", giza.address);

    // Deploy treasury
    const Treasury = await ethers.getContractFactory('Treasury');
    const treasury = await Treasury.deploy(
        giza.address,
        ZERO_ADDRESS, // dai address init is zero now
        ZERO_ADDRESS, // gizadai address init is zero now
        0, { gasLimit: 5e6 } // Gas estimation may fail
    );
    await treasury.deployed()
    console.log("Treasury: " + treasury.address);
    addressFile.set("Treasury", treasury.address);

    // 2 4 
    // enum MANAGING { RESERVEDEPOSITOR, RESERVESPENDER, RESERVETOKEN, RESERVEMANAGER, LIQUIDITYDEPOSITOR, LIQUIDITYTOKEN, LIQUIDITYMANAGER, DEBTOR, REWARDMANAGER, SGIZA }

    // queue and toggle dai RESERVE TOKEN
    await treasury.queue('2', dai.address, { gasLimit: 5e6 });
    console.log("treasury queue 2 success")
    

    // queue and toggle DAO as LIQUIDITY DEPOSITOR
    await treasury.queue('4', DAO_ADDRESS, { gasLimit: 5e6 });
    console.log("treasury queue 4 success")

    await treasury.toggle('2', dai.address, ZERO_ADDRESS, { gasLimit: 5e6 });
    console.log("treasury toggle 2 success")
    await treasury.toggle('4', DAO_ADDRESS, ZERO_ADDRESS, { gasLimit: 5e6 });
    console.log("treasury toggle 4 success")

    // Set treasury for giza token
    await giza.setVault(treasury.address, { gasLimit: 5e6 });
    console.log("giza setVault success")

    // jues for test
    await treasury.queue('0', deployer.address, { gasLimit: 5e6 });
    console.log("treasury queue 0 success")
    await treasury.toggle('0', deployer.address, ZERO_ADDRESS, { gasLimit: 5e6 });
    console.log("treasury toggle 0 success")

    await dai.approve(
        treasury.address,
        MOCK_DAI_MINT,
        { gasLimit: 5e6 }
    )
    await treasury.deposit(MOCK_DAI_DEPOSIT, dai.address, MOCK_DAI_PROFIT, { gasLimit: 5e6 })
});
