import { ethers } from "ethers";
import { registerWebSocket } from "./background";

export const ethersConnect = async (
  jobData,
  checksum,
  checksumCreateTime,
  privateKey
) => {
  console.log("🚀 ~ checksumCreateTime:", checksumCreateTime);
  console.log("🚀 ~ ethersConnect ~ checksum:", checksum);

  // Ensure ethers is imported and available
  if (!ethers || !ethers.utils) {
    console.error(
      "ethers.utils is undefined. Make sure ethers is imported correctly."
    );
    return;
  }

  const wallet = new ethers.Wallet(privateKey);
  console.log("🚀 ~ ethersConnect ~ wallet:", wallet);

  let dataset =
    typeof jobData.Dataset === "string"
      ? JSON.parse(jobData.Dataset)
      : jobData.Dataset;

  let worker = wallet?.address;
  let dataNetAddress = dataset.contractAddress;
  let dataNetReference = dataset.name;
  let dataNetRequestAt = 1344537000;
  let JobReference = jobData.ID;
  let storageReference = `${wallet?.address}/${jobData.Type}`;
  let storageChecksum = checksum;
  let storagedAt = checksumCreateTime;

  // Check each parameter type to ensure everything is correct
  console.log("🚀 ~ ethersConnect ~ params before hashing:", {
    worker,
    dataNetAddress,
    dataNetReference,
    dataNetRequestAt,
    JobReference,
    storageReference,
    storageChecksum,
    storagedAt,
  });

  let params = [
    worker,
    dataNetAddress,
    dataNetReference,
    dataNetRequestAt,
    JobReference,
    storageReference,
    storageChecksum,
    storagedAt,
  ];

  // Validate the types and values of params
  params.forEach((param, index) => {
    console.log(`Type of param[${index}]:`, typeof param, "Value:", param);
  });

  try {
    // Check if `solidityKeccak256` is available before calling
    if (!ethers.utils.solidityKeccak256) {
      console.error("solidityKeccak256 method is unavailable.");
      return;
    }

    // Call `solidityKeccak256` with the correct types
    let hash = ethers.utils.solidityKeccak256(
      [
        "string", // worker
        "string", // dataNetAddress
        "string", // dataNetReference
        "uint256", // dataNetRequestAt (string format)
        "string", // JobReference
        "string", // storageReference
        "string", // storageChecksum
        "uint256", // storagedAt
      ],
      params
    );

    console.log("🚀 ~ ethersConnect ~ hash:", hash);

    // Handle null or invalid hash
    if (!hash) {
      console.error("Error: Hash calculation resulted in null.");
      return;
    }

    // Sign the message with the wallet's private key
    let signature = await wallet.signMessage(ethers.utils.arrayify(hash));
    console.log("🚀 ~ ethersConnect ~ signature:", signature);

    const jobWithSign = {
      ref: JobReference,
      status: true,
      message: "",
      completed_at: storagedAt,
      output: "",
      job_details: {
        worker,
        dataNetAddress,
        dataNetReference,
        dataNetRequestAt,
        JobReference,
        storageReference,
        storageChecksum,
        storagedAt,
      },
      signature,
    };

    console.log(jobWithSign);

    // registerWebSocket(
    //   JSON?.stringify({
    //     workerID: "Extension_ID",
    //     msgType: "JOB_COMPLETION",
    //     message: jobWithSign,
    //   })
    // );
    return jobWithSign;
  } catch (error) {
    console.error("Error in ethersConnect:", error);
    return null;
  }
};
