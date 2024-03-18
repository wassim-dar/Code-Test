const { ethers } = require("ethers");
const {
  abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");

class UniswapPoolV3 {
  // Initializes a new UniswapPoolV3 object with a provider and pool address.
  constructor(provider, poolAddress) {
    this.provider = provider;
    this.poolAddress = poolAddress;
  }

  //Attempts to connect to the specified pool using the provided provider. Primarily used for internal logic within the class. Throws an error if no provider is set.
  async connect(poolAddress, provider) {
    console.log("Connecting....");
    // Check for provider
    if (!this.provider) {
      throw new Error(
        "Provider is not set. Please set a provider before connecting."
      );
    }

    const poolContract = new ethers.Contract(
      poolAddress,
      IUniswapV3PoolABI,
      provider
    );

    const connectedPool = poolContract.connect();
    console.log(!!connectedPool ? "Connect successfully" : "Failed");
    return connectedPool;
  }

  //Establishes a connection to the pool (if not already connected) and retrieves the pool contract instance.
  async getPoolInfo() {
    await this.connect(this.poolAddress, this.provider); // Ensure connection

    try {
      const poolContract = await this.connect(this.poolAddress, this.provider);
      return poolContract;
    } catch (error) {
      console.error("Error fetching pool data:", error);
      throw error; // Re-throw for handling in calling code
    }
  }
}

module.exports = { UniswapPoolV3 };
