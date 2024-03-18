# UniswapPoolV3 Class Documentation
This document describes the UniswapPoolV3 class,
which facilitates interacting with Uniswap v3 liquidity pools on the Ethereum blockchain.

# Requirements:

- Node.js and npm package manager
- ethers library for interacting with Ethereum (https://docs.ethers.org/v5/getting-started/)
- @uniswap/v3-core library for interacting with Uniswap v3 contracts (https://github.com/Uniswap/v3-core)

> The UniswapPoolV3 class provides methods to connect to a specific Uniswap v3 pool and retrieve basic pool information.

# Class Properties:

- provider:
  An Ethers.js provider object connected to an Ethereum node. (Set during initialization)
- poolAddress:
  The contract address of the Uniswap v3 pool you want to interact with.

# Class Methods:

- constructor(provider, poolAddress):
     Initializes a new UniswapPoolV3 object with a provider and pool address.
- connect(poolAddress, provider):
    (Not recommended for public use). Attempts to connect to the specified pool using the provided provider. Primarily used for internal logic within the class. Throws an error if no provider is set.
- getPoolInfo():
    Establishes a connection to the pool (if not already connected) and retrieves the pool contract instance.
