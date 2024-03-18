const { ChainId, Token } = require("@uniswap/sdk");
const { FeeAmount, Pool } = require("@uniswap/v3-sdk");
const { ethers } = require("ethers");
const { UniswapPoolV3 } = require("../connector");
const expect = require("chai").expect;

const providerUrl =
  "https://eth-mainnet.g.alchemy.com/v2/VnnvSzXBe-29A1U6yOqOLh6h66PtU7re";
const provider = new ethers.JsonRpcProvider(providerUrl);

const WETH_TOKEN = new Token(
  ChainId.MAINNET,
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  18,
  "WETH",
  "Wrapped Ether"
);

const USDC_TOKEN = new Token(
  ChainId.MAINNET,
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  6,
  "USDC",
  "USD//C"
);

describe("UniswapPoolV3", () => {
  const poolAddress = Pool.getAddress(WETH_TOKEN, USDC_TOKEN, FeeAmount.MEDIUM);
  let uniswapPool;

  beforeEach(() => {
    uniswapPool = new UniswapPoolV3(provider, poolAddress);
  });

  it("should connect successfully with a valid provider", async () => {
    const connectedPool = await uniswapPool.connect(poolAddress, provider);
    expect(connectedPool).to.not.be.null;
  });

  it("should throw an error when provider is not set", async () => {
    try {
      await uniswapPool.connect();
      expect.fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).to.equal(
        "Provider is not set. Please set a provider before connecting."
      );
    }
  });

  it("should get the pool contract instance (mocked behavior)", async () => {
    const poolContract = await uniswapPool.getPoolInfo();
    expect(poolContract).to.be.an("object");
  });
});
