export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Token = {
  __typename?: 'Token';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  name: Scalars['String'];
  address: Scalars['String'];
  network: Network;
  abi: Scalars['String'];
  decimal: Scalars['Float'];
  isAbleToBeSwapped: Token;
  swapables: Array<Token>;
};


export enum Network {
  Ethereum = 'ETHEREUM',
  Bsc = 'BSC'
}

export type SwapHistory = {
  __typename?: 'SwapHistory';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  transaction: Scalars['String'];
  user: UserWallet;
  amount: Scalars['Float'];
  from: Token;
  to: Token;
  result: SwapResult;
};

export enum SwapResult {
  Pending = 'PENDING',
  Fail = 'FAIL',
  Success = 'SUCCESS'
}

export type UserWallet = {
  __typename?: 'UserWallet';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  address: Scalars['String'];
  swapHistories: Array<SwapHistory>;
};

export type UserToken = {
  __typename?: 'UserToken';
  userWallet: UserWallet;
  token: Token;
  balance: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  userWallet: UserWallet;
  tokenBalance: UserToken;
  swapableTokens: Array<Token>;
  isAbleToBeSwapedTokens: Array<Token>;
  swapHistories: Array<SwapHistory>;
};


export type QueryUserWalletArgs = {
  address: Scalars['String'];
};


export type QueryTokenBalanceArgs = {
  tokenId: Scalars['Float'];
  address: Scalars['String'];
};


export type QuerySwapHistoriesArgs = {
  userWalletId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  connectWallet: UserWallet;
  swapToken: SwapHistory;
};


export type MutationConnectWalletArgs = {
  address: Scalars['String'];
};


export type MutationSwapTokenArgs = {
  address: Scalars['String'];
  amount: Scalars['Float'];
  toTokenId: Scalars['Float'];
  fromTokenId: Scalars['Float'];
};
