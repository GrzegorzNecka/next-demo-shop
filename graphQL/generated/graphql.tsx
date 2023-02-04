import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
  Hex: any;
  Json: any;
  Long: any;
  RGBAHue: any;
  RGBATransparency: any;
  RichTextAST: any;
};

export type Account = Node & {
  readonly __typename?: 'Account';
  readonly cart?: Maybe<Cart>;
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<Account>;
  readonly email: Scalars['String'];
  /** List of Account versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  readonly orders: ReadonlyArray<Order>;
  readonly password: Scalars['String'];
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


export type AccountCartArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type AccountCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type AccountDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


export type AccountHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type AccountOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  orderBy?: InputMaybe<OrderOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrderWhereInput>;
};


export type AccountPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type AccountScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type AccountUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type AccountConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: AccountWhereUniqueInput;
};

/** A connection to a list of items. */
export type AccountConnection = {
  readonly __typename?: 'AccountConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<AccountEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type AccountCreateInput = {
  readonly cart?: InputMaybe<CartCreateOneInlineInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly email: Scalars['String'];
  readonly orders?: InputMaybe<OrderCreateManyInlineInput>;
  readonly password: Scalars['String'];
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AccountCreateManyInlineInput = {
  /** Connect multiple existing Account documents */
  readonly connect?: InputMaybe<ReadonlyArray<AccountWhereUniqueInput>>;
  /** Create and connect multiple existing Account documents */
  readonly create?: InputMaybe<ReadonlyArray<AccountCreateInput>>;
};

export type AccountCreateOneInlineInput = {
  /** Connect one existing Account document */
  readonly connect?: InputMaybe<AccountWhereUniqueInput>;
  /** Create and connect one Account document */
  readonly create?: InputMaybe<AccountCreateInput>;
};

/** An edge in a connection. */
export type AccountEdge = {
  readonly __typename?: 'AccountEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Account;
};

/** Identifies documents */
export type AccountManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<AccountWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<AccountWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<AccountWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly cart?: InputMaybe<CartWhereInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<AccountWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<AccountWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<AccountWhereStageInput>;
  readonly email?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly email_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly email_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly email_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly email_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly email_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly email_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly email_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly email_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly email_starts_with?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly orders_every?: InputMaybe<OrderWhereInput>;
  readonly orders_none?: InputMaybe<OrderWhereInput>;
  readonly orders_some?: InputMaybe<OrderWhereInput>;
  readonly password?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly password_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly password_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly password_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly password_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly password_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly password_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly password_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly password_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly password_starts_with?: InputMaybe<Scalars['String']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum AccountOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PasswordAsc = 'password_ASC',
  PasswordDesc = 'password_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type AccountUpdateInput = {
  readonly cart?: InputMaybe<CartUpdateOneInlineInput>;
  readonly email?: InputMaybe<Scalars['String']>;
  readonly orders?: InputMaybe<OrderUpdateManyInlineInput>;
  readonly password?: InputMaybe<Scalars['String']>;
};

export type AccountUpdateManyInlineInput = {
  /** Connect multiple existing Account documents */
  readonly connect?: InputMaybe<ReadonlyArray<AccountConnectInput>>;
  /** Create and connect multiple Account documents */
  readonly create?: InputMaybe<ReadonlyArray<AccountCreateInput>>;
  /** Delete multiple Account documents */
  readonly delete?: InputMaybe<ReadonlyArray<AccountWhereUniqueInput>>;
  /** Disconnect multiple Account documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<AccountWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Account documents */
  readonly set?: InputMaybe<ReadonlyArray<AccountWhereUniqueInput>>;
  /** Update multiple Account documents */
  readonly update?: InputMaybe<ReadonlyArray<AccountUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Account documents */
  readonly upsert?: InputMaybe<ReadonlyArray<AccountUpsertWithNestedWhereUniqueInput>>;
};

export type AccountUpdateManyInput = {
  readonly password?: InputMaybe<Scalars['String']>;
};

export type AccountUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: AccountUpdateManyInput;
  /** Document search */
  readonly where: AccountWhereInput;
};

export type AccountUpdateOneInlineInput = {
  /** Connect existing Account document */
  readonly connect?: InputMaybe<AccountWhereUniqueInput>;
  /** Create and connect one Account document */
  readonly create?: InputMaybe<AccountCreateInput>;
  /** Delete currently connected Account document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Account document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Account document */
  readonly update?: InputMaybe<AccountUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Account document */
  readonly upsert?: InputMaybe<AccountUpsertWithNestedWhereUniqueInput>;
};

export type AccountUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: AccountUpdateInput;
  /** Unique document search */
  readonly where: AccountWhereUniqueInput;
};

export type AccountUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: AccountCreateInput;
  /** Update document if it exists */
  readonly update: AccountUpdateInput;
};

export type AccountUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: AccountUpsertInput;
  /** Unique document search */
  readonly where: AccountWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type AccountWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type AccountWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<AccountWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<AccountWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<AccountWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly cart?: InputMaybe<CartWhereInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<AccountWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<AccountWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<AccountWhereStageInput>;
  readonly email?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly email_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly email_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly email_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly email_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly email_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly email_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly email_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly email_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly email_starts_with?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly orders_every?: InputMaybe<OrderWhereInput>;
  readonly orders_none?: InputMaybe<OrderWhereInput>;
  readonly orders_some?: InputMaybe<OrderWhereInput>;
  readonly password?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly password_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly password_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly password_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly password_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly password_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly password_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly password_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly password_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly password_starts_with?: InputMaybe<Scalars['String']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AccountWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<AccountWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<AccountWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<AccountWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<AccountWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References Account record uniquely */
export type AccountWhereUniqueInput = {
  readonly email?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
};

export type Aggregate = {
  readonly __typename?: 'Aggregate';
  readonly count: Scalars['Int'];
};

/** Asset system model */
export type Asset = Node & {
  readonly __typename?: 'Asset';
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<Asset>;
  /** The file name */
  readonly fileName: Scalars['String'];
  /** The file handle */
  readonly handle: Scalars['String'];
  /** The height of the file */
  readonly height?: Maybe<Scalars['Float']>;
  /** List of Asset versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  /** System Locale field */
  readonly locale: Locale;
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<Asset>;
  /** The mime type of the file */
  readonly mimeType?: Maybe<Scalars['String']>;
  readonly productImages: ReadonlyArray<Product>;
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  /** The file size */
  readonly size?: Maybe<Scalars['Float']>;
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
  /** Get the url for the asset with provided transformations applied. */
  readonly url: Scalars['String'];
  /** The file width */
  readonly width?: Maybe<Scalars['Float']>;
};


/** Asset system model */
export type AssetCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


/** Asset system model */
export type AssetDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


/** Asset system model */
export type AssetHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


/** Asset system model */
export type AssetLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean'];
  locales?: ReadonlyArray<Locale>;
};


/** Asset system model */
export type AssetProductImagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  orderBy?: InputMaybe<ProductOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProductWhereInput>;
};


/** Asset system model */
export type AssetPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


/** Asset system model */
export type AssetScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Asset system model */
export type AssetUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


/** Asset system model */
export type AssetUrlArgs = {
  transformation?: InputMaybe<AssetTransformationInput>;
};

export type AssetConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: AssetWhereUniqueInput;
};

/** A connection to a list of items. */
export type AssetConnection = {
  readonly __typename?: 'AssetConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<AssetEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type AssetCreateInput = {
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly fileName: Scalars['String'];
  readonly handle: Scalars['String'];
  readonly height?: InputMaybe<Scalars['Float']>;
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: InputMaybe<AssetCreateLocalizationsInput>;
  readonly mimeType?: InputMaybe<Scalars['String']>;
  readonly productImages?: InputMaybe<ProductCreateManyInlineInput>;
  readonly size?: InputMaybe<Scalars['Float']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  readonly width?: InputMaybe<Scalars['Float']>;
};

export type AssetCreateLocalizationDataInput = {
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly fileName: Scalars['String'];
  readonly handle: Scalars['String'];
  readonly height?: InputMaybe<Scalars['Float']>;
  readonly mimeType?: InputMaybe<Scalars['String']>;
  readonly size?: InputMaybe<Scalars['Float']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  readonly width?: InputMaybe<Scalars['Float']>;
};

export type AssetCreateLocalizationInput = {
  /** Localization input */
  readonly data: AssetCreateLocalizationDataInput;
  readonly locale: Locale;
};

export type AssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: InputMaybe<ReadonlyArray<AssetCreateLocalizationInput>>;
};

export type AssetCreateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  readonly connect?: InputMaybe<ReadonlyArray<AssetWhereUniqueInput>>;
  /** Create and connect multiple existing Asset documents */
  readonly create?: InputMaybe<ReadonlyArray<AssetCreateInput>>;
};

export type AssetCreateOneInlineInput = {
  /** Connect one existing Asset document */
  readonly connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  readonly create?: InputMaybe<AssetCreateInput>;
};

/** An edge in a connection. */
export type AssetEdge = {
  readonly __typename?: 'AssetEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Asset;
};

/** Identifies documents */
export type AssetManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly productImages_every?: InputMaybe<ProductWhereInput>;
  readonly productImages_none?: InputMaybe<ProductWhereInput>;
  readonly productImages_some?: InputMaybe<ProductWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum AssetOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MimeTypeAsc = 'mimeType_ASC',
  MimeTypeDesc = 'mimeType_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** Transformations for Assets */
export type AssetTransformationInput = {
  readonly document?: InputMaybe<DocumentTransformationInput>;
  readonly image?: InputMaybe<ImageTransformationInput>;
  /** Pass true if you want to validate the passed transformation parameters */
  readonly validateOptions?: InputMaybe<Scalars['Boolean']>;
};

export type AssetUpdateInput = {
  readonly fileName?: InputMaybe<Scalars['String']>;
  readonly handle?: InputMaybe<Scalars['String']>;
  readonly height?: InputMaybe<Scalars['Float']>;
  /** Manage document localizations */
  readonly localizations?: InputMaybe<AssetUpdateLocalizationsInput>;
  readonly mimeType?: InputMaybe<Scalars['String']>;
  readonly productImages?: InputMaybe<ProductUpdateManyInlineInput>;
  readonly size?: InputMaybe<Scalars['Float']>;
  readonly width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateLocalizationDataInput = {
  readonly fileName?: InputMaybe<Scalars['String']>;
  readonly handle?: InputMaybe<Scalars['String']>;
  readonly height?: InputMaybe<Scalars['Float']>;
  readonly mimeType?: InputMaybe<Scalars['String']>;
  readonly size?: InputMaybe<Scalars['Float']>;
  readonly width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateLocalizationInput = {
  readonly data: AssetUpdateLocalizationDataInput;
  readonly locale: Locale;
};

export type AssetUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: InputMaybe<ReadonlyArray<AssetCreateLocalizationInput>>;
  /** Localizations to delete */
  readonly delete?: InputMaybe<ReadonlyArray<Locale>>;
  /** Localizations to update */
  readonly update?: InputMaybe<ReadonlyArray<AssetUpdateLocalizationInput>>;
  readonly upsert?: InputMaybe<ReadonlyArray<AssetUpsertLocalizationInput>>;
};

export type AssetUpdateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  readonly connect?: InputMaybe<ReadonlyArray<AssetConnectInput>>;
  /** Create and connect multiple Asset documents */
  readonly create?: InputMaybe<ReadonlyArray<AssetCreateInput>>;
  /** Delete multiple Asset documents */
  readonly delete?: InputMaybe<ReadonlyArray<AssetWhereUniqueInput>>;
  /** Disconnect multiple Asset documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<AssetWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Asset documents */
  readonly set?: InputMaybe<ReadonlyArray<AssetWhereUniqueInput>>;
  /** Update multiple Asset documents */
  readonly update?: InputMaybe<ReadonlyArray<AssetUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Asset documents */
  readonly upsert?: InputMaybe<ReadonlyArray<AssetUpsertWithNestedWhereUniqueInput>>;
};

export type AssetUpdateManyInput = {
  readonly fileName?: InputMaybe<Scalars['String']>;
  readonly height?: InputMaybe<Scalars['Float']>;
  /** Optional updates to localizations */
  readonly localizations?: InputMaybe<AssetUpdateManyLocalizationsInput>;
  readonly mimeType?: InputMaybe<Scalars['String']>;
  readonly size?: InputMaybe<Scalars['Float']>;
  readonly width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateManyLocalizationDataInput = {
  readonly fileName?: InputMaybe<Scalars['String']>;
  readonly height?: InputMaybe<Scalars['Float']>;
  readonly mimeType?: InputMaybe<Scalars['String']>;
  readonly size?: InputMaybe<Scalars['Float']>;
  readonly width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateManyLocalizationInput = {
  readonly data: AssetUpdateManyLocalizationDataInput;
  readonly locale: Locale;
};

export type AssetUpdateManyLocalizationsInput = {
  /** Localizations to update */
  readonly update?: InputMaybe<ReadonlyArray<AssetUpdateManyLocalizationInput>>;
};

export type AssetUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: AssetUpdateManyInput;
  /** Document search */
  readonly where: AssetWhereInput;
};

export type AssetUpdateOneInlineInput = {
  /** Connect existing Asset document */
  readonly connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  readonly create?: InputMaybe<AssetCreateInput>;
  /** Delete currently connected Asset document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Asset document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Asset document */
  readonly update?: InputMaybe<AssetUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Asset document */
  readonly upsert?: InputMaybe<AssetUpsertWithNestedWhereUniqueInput>;
};

export type AssetUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: AssetUpdateInput;
  /** Unique document search */
  readonly where: AssetWhereUniqueInput;
};

export type AssetUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: AssetCreateInput;
  /** Update document if it exists */
  readonly update: AssetUpdateInput;
};

export type AssetUpsertLocalizationInput = {
  readonly create: AssetCreateLocalizationDataInput;
  readonly locale: Locale;
  readonly update: AssetUpdateLocalizationDataInput;
};

export type AssetUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: AssetUpsertInput;
  /** Unique document search */
  readonly where: AssetWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type AssetWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type AssetWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  readonly fileName?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly fileName_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly fileName_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly fileName_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly fileName_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly fileName_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly fileName_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly fileName_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly fileName_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly fileName_starts_with?: InputMaybe<Scalars['String']>;
  readonly handle?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly handle_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly handle_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly handle_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly handle_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly handle_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly handle_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly handle_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly handle_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly handle_starts_with?: InputMaybe<Scalars['String']>;
  readonly height?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  readonly height_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  readonly height_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  readonly height_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  readonly height_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  readonly height_lte?: InputMaybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  readonly height_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  readonly height_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']>>>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly mimeType?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly mimeType_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly mimeType_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly mimeType_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly mimeType_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly mimeType_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly mimeType_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly mimeType_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly mimeType_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly mimeType_starts_with?: InputMaybe<Scalars['String']>;
  readonly productImages_every?: InputMaybe<ProductWhereInput>;
  readonly productImages_none?: InputMaybe<ProductWhereInput>;
  readonly productImages_some?: InputMaybe<ProductWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly size?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  readonly size_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  readonly size_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  readonly size_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  readonly size_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  readonly size_lte?: InputMaybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  readonly size_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  readonly size_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']>>>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
  readonly width?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  readonly width_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  readonly width_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  readonly width_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  readonly width_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  readonly width_lte?: InputMaybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  readonly width_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  readonly width_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AssetWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<AssetWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<AssetWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<AssetWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<AssetWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References Asset record uniquely */
export type AssetWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

export type BatchPayload = {
  readonly __typename?: 'BatchPayload';
  /** The number of nodes that have been affected by the Batch operation. */
  readonly count: Scalars['Long'];
};

export type Cart = Node & {
  readonly __typename?: 'Cart';
  readonly account?: Maybe<Account>;
  readonly cartItems: ReadonlyArray<CartItem>;
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<Cart>;
  /** List of Cart versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


export type CartAccountArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type CartCartItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  orderBy?: InputMaybe<CartItemOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CartItemWhereInput>;
};


export type CartCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type CartDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


export type CartHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type CartPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type CartScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type CartUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type CartConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: CartWhereUniqueInput;
};

/** A connection to a list of items. */
export type CartConnection = {
  readonly __typename?: 'CartConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<CartEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type CartCreateInput = {
  readonly account?: InputMaybe<AccountCreateOneInlineInput>;
  readonly cartItems?: InputMaybe<CartItemCreateManyInlineInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CartCreateManyInlineInput = {
  /** Connect multiple existing Cart documents */
  readonly connect?: InputMaybe<ReadonlyArray<CartWhereUniqueInput>>;
  /** Create and connect multiple existing Cart documents */
  readonly create?: InputMaybe<ReadonlyArray<CartCreateInput>>;
};

export type CartCreateOneInlineInput = {
  /** Connect one existing Cart document */
  readonly connect?: InputMaybe<CartWhereUniqueInput>;
  /** Create and connect one Cart document */
  readonly create?: InputMaybe<CartCreateInput>;
};

/** An edge in a connection. */
export type CartEdge = {
  readonly __typename?: 'CartEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Cart;
};

export type CartItem = Node & {
  readonly __typename?: 'CartItem';
  readonly cart?: Maybe<Cart>;
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<CartItem>;
  /** List of CartItem versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  readonly option?: Maybe<Option>;
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly quantity: Scalars['Int'];
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


export type CartItemCartArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type CartItemCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type CartItemDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


export type CartItemHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type CartItemOptionArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type CartItemPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type CartItemScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type CartItemUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type CartItemConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: CartItemWhereUniqueInput;
};

/** A connection to a list of items. */
export type CartItemConnection = {
  readonly __typename?: 'CartItemConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<CartItemEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type CartItemCreateInput = {
  readonly cart?: InputMaybe<CartCreateOneInlineInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly option?: InputMaybe<OptionCreateOneInlineInput>;
  readonly quantity: Scalars['Int'];
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CartItemCreateManyInlineInput = {
  /** Connect multiple existing CartItem documents */
  readonly connect?: InputMaybe<ReadonlyArray<CartItemWhereUniqueInput>>;
  /** Create and connect multiple existing CartItem documents */
  readonly create?: InputMaybe<ReadonlyArray<CartItemCreateInput>>;
};

export type CartItemCreateOneInlineInput = {
  /** Connect one existing CartItem document */
  readonly connect?: InputMaybe<CartItemWhereUniqueInput>;
  /** Create and connect one CartItem document */
  readonly create?: InputMaybe<CartItemCreateInput>;
};

/** An edge in a connection. */
export type CartItemEdge = {
  readonly __typename?: 'CartItemEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: CartItem;
};

/** Identifies documents */
export type CartItemManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CartItemWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CartItemWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CartItemWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly cart?: InputMaybe<CartWhereInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<CartItemWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<CartItemWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<CartItemWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly option?: InputMaybe<OptionWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly quantity?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  readonly quantity_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  readonly quantity_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  readonly quantity_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  readonly quantity_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  readonly quantity_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  readonly quantity_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  readonly quantity_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum CartItemOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  QuantityAsc = 'quantity_ASC',
  QuantityDesc = 'quantity_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CartItemUpdateInput = {
  readonly cart?: InputMaybe<CartUpdateOneInlineInput>;
  readonly option?: InputMaybe<OptionUpdateOneInlineInput>;
  readonly quantity?: InputMaybe<Scalars['Int']>;
};

export type CartItemUpdateManyInlineInput = {
  /** Connect multiple existing CartItem documents */
  readonly connect?: InputMaybe<ReadonlyArray<CartItemConnectInput>>;
  /** Create and connect multiple CartItem documents */
  readonly create?: InputMaybe<ReadonlyArray<CartItemCreateInput>>;
  /** Delete multiple CartItem documents */
  readonly delete?: InputMaybe<ReadonlyArray<CartItemWhereUniqueInput>>;
  /** Disconnect multiple CartItem documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<CartItemWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing CartItem documents */
  readonly set?: InputMaybe<ReadonlyArray<CartItemWhereUniqueInput>>;
  /** Update multiple CartItem documents */
  readonly update?: InputMaybe<ReadonlyArray<CartItemUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple CartItem documents */
  readonly upsert?: InputMaybe<ReadonlyArray<CartItemUpsertWithNestedWhereUniqueInput>>;
};

export type CartItemUpdateManyInput = {
  readonly quantity?: InputMaybe<Scalars['Int']>;
};

export type CartItemUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: CartItemUpdateManyInput;
  /** Document search */
  readonly where: CartItemWhereInput;
};

export type CartItemUpdateOneInlineInput = {
  /** Connect existing CartItem document */
  readonly connect?: InputMaybe<CartItemWhereUniqueInput>;
  /** Create and connect one CartItem document */
  readonly create?: InputMaybe<CartItemCreateInput>;
  /** Delete currently connected CartItem document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected CartItem document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single CartItem document */
  readonly update?: InputMaybe<CartItemUpdateWithNestedWhereUniqueInput>;
  /** Upsert single CartItem document */
  readonly upsert?: InputMaybe<CartItemUpsertWithNestedWhereUniqueInput>;
};

export type CartItemUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: CartItemUpdateInput;
  /** Unique document search */
  readonly where: CartItemWhereUniqueInput;
};

export type CartItemUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: CartItemCreateInput;
  /** Update document if it exists */
  readonly update: CartItemUpdateInput;
};

export type CartItemUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: CartItemUpsertInput;
  /** Unique document search */
  readonly where: CartItemWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type CartItemWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type CartItemWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CartItemWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CartItemWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CartItemWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly cart?: InputMaybe<CartWhereInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<CartItemWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<CartItemWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<CartItemWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly option?: InputMaybe<OptionWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly quantity?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  readonly quantity_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  readonly quantity_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  readonly quantity_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  readonly quantity_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  readonly quantity_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  readonly quantity_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  readonly quantity_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type CartItemWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CartItemWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CartItemWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CartItemWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<CartItemWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References CartItem record uniquely */
export type CartItemWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

/** Identifies documents */
export type CartManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CartWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CartWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CartWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly account?: InputMaybe<AccountWhereInput>;
  readonly cartItems_every?: InputMaybe<CartItemWhereInput>;
  readonly cartItems_none?: InputMaybe<CartItemWhereInput>;
  readonly cartItems_some?: InputMaybe<CartItemWhereInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<CartWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<CartWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<CartWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum CartOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CartUpdateInput = {
  readonly account?: InputMaybe<AccountUpdateOneInlineInput>;
  readonly cartItems?: InputMaybe<CartItemUpdateManyInlineInput>;
};

export type CartUpdateManyInlineInput = {
  /** Connect multiple existing Cart documents */
  readonly connect?: InputMaybe<ReadonlyArray<CartConnectInput>>;
  /** Create and connect multiple Cart documents */
  readonly create?: InputMaybe<ReadonlyArray<CartCreateInput>>;
  /** Delete multiple Cart documents */
  readonly delete?: InputMaybe<ReadonlyArray<CartWhereUniqueInput>>;
  /** Disconnect multiple Cart documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<CartWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Cart documents */
  readonly set?: InputMaybe<ReadonlyArray<CartWhereUniqueInput>>;
  /** Update multiple Cart documents */
  readonly update?: InputMaybe<ReadonlyArray<CartUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Cart documents */
  readonly upsert?: InputMaybe<ReadonlyArray<CartUpsertWithNestedWhereUniqueInput>>;
};

export type CartUpdateManyInput = {
  /** No fields in updateMany data input */
  readonly _?: InputMaybe<Scalars['String']>;
};

export type CartUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: CartUpdateManyInput;
  /** Document search */
  readonly where: CartWhereInput;
};

export type CartUpdateOneInlineInput = {
  /** Connect existing Cart document */
  readonly connect?: InputMaybe<CartWhereUniqueInput>;
  /** Create and connect one Cart document */
  readonly create?: InputMaybe<CartCreateInput>;
  /** Delete currently connected Cart document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Cart document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Cart document */
  readonly update?: InputMaybe<CartUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Cart document */
  readonly upsert?: InputMaybe<CartUpsertWithNestedWhereUniqueInput>;
};

export type CartUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: CartUpdateInput;
  /** Unique document search */
  readonly where: CartWhereUniqueInput;
};

export type CartUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: CartCreateInput;
  /** Update document if it exists */
  readonly update: CartUpdateInput;
};

export type CartUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: CartUpsertInput;
  /** Unique document search */
  readonly where: CartWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type CartWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type CartWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CartWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CartWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CartWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly account?: InputMaybe<AccountWhereInput>;
  readonly cartItems_every?: InputMaybe<CartItemWhereInput>;
  readonly cartItems_none?: InputMaybe<CartItemWhereInput>;
  readonly cartItems_some?: InputMaybe<CartItemWhereInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<CartWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<CartWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<CartWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type CartWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CartWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CartWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CartWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<CartWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References Cart record uniquely */
export type CartWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

/** Category of products, e.g. Menswear. */
export type Category = Node & {
  readonly __typename?: 'Category';
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  readonly description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<Category>;
  /** List of Category versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  /** System Locale field */
  readonly locale: Locale;
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<Category>;
  readonly name: Scalars['String'];
  readonly products: ReadonlyArray<Product>;
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  readonly slug: Scalars['String'];
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


/** Category of products, e.g. Menswear. */
export type CategoryCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Category of products, e.g. Menswear. */
export type CategoryCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


/** Category of products, e.g. Menswear. */
export type CategoryDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


/** Category of products, e.g. Menswear. */
export type CategoryHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


/** Category of products, e.g. Menswear. */
export type CategoryLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean'];
  locales?: ReadonlyArray<Locale>;
};


/** Category of products, e.g. Menswear. */
export type CategoryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  orderBy?: InputMaybe<ProductOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProductWhereInput>;
};


/** Category of products, e.g. Menswear. */
export type CategoryPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Category of products, e.g. Menswear. */
export type CategoryPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


/** Category of products, e.g. Menswear. */
export type CategoryScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Category of products, e.g. Menswear. */
export type CategoryUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Category of products, e.g. Menswear. */
export type CategoryUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type CategoryConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: CategoryWhereUniqueInput;
};

/** A connection to a list of items. */
export type CategoryConnection = {
  readonly __typename?: 'CategoryConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<CategoryEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type CategoryCreateInput = {
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** description input for default locale (en) */
  readonly description?: InputMaybe<Scalars['String']>;
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: InputMaybe<CategoryCreateLocalizationsInput>;
  /** name input for default locale (en) */
  readonly name: Scalars['String'];
  readonly products?: InputMaybe<ProductCreateManyInlineInput>;
  /** slug input for default locale (en) */
  readonly slug: Scalars['String'];
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CategoryCreateLocalizationDataInput = {
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly name: Scalars['String'];
  readonly slug: Scalars['String'];
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CategoryCreateLocalizationInput = {
  /** Localization input */
  readonly data: CategoryCreateLocalizationDataInput;
  readonly locale: Locale;
};

export type CategoryCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: InputMaybe<ReadonlyArray<CategoryCreateLocalizationInput>>;
};

export type CategoryCreateManyInlineInput = {
  /** Connect multiple existing Category documents */
  readonly connect?: InputMaybe<ReadonlyArray<CategoryWhereUniqueInput>>;
  /** Create and connect multiple existing Category documents */
  readonly create?: InputMaybe<ReadonlyArray<CategoryCreateInput>>;
};

export type CategoryCreateOneInlineInput = {
  /** Connect one existing Category document */
  readonly connect?: InputMaybe<CategoryWhereUniqueInput>;
  /** Create and connect one Category document */
  readonly create?: InputMaybe<CategoryCreateInput>;
};

/** An edge in a connection. */
export type CategoryEdge = {
  readonly __typename?: 'CategoryEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Category;
};

/** Identifies documents */
export type CategoryManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CategoryWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CategoryWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CategoryWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<CategoryWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<CategoryWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<CategoryWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly products_every?: InputMaybe<ProductWhereInput>;
  readonly products_none?: InputMaybe<ProductWhereInput>;
  readonly products_some?: InputMaybe<ProductWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum CategoryOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CategoryUpdateInput = {
  /** description input for default locale (en) */
  readonly description?: InputMaybe<Scalars['String']>;
  /** Manage document localizations */
  readonly localizations?: InputMaybe<CategoryUpdateLocalizationsInput>;
  /** name input for default locale (en) */
  readonly name?: InputMaybe<Scalars['String']>;
  readonly products?: InputMaybe<ProductUpdateManyInlineInput>;
  /** slug input for default locale (en) */
  readonly slug?: InputMaybe<Scalars['String']>;
};

export type CategoryUpdateLocalizationDataInput = {
  readonly description?: InputMaybe<Scalars['String']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly slug?: InputMaybe<Scalars['String']>;
};

export type CategoryUpdateLocalizationInput = {
  readonly data: CategoryUpdateLocalizationDataInput;
  readonly locale: Locale;
};

export type CategoryUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: InputMaybe<ReadonlyArray<CategoryCreateLocalizationInput>>;
  /** Localizations to delete */
  readonly delete?: InputMaybe<ReadonlyArray<Locale>>;
  /** Localizations to update */
  readonly update?: InputMaybe<ReadonlyArray<CategoryUpdateLocalizationInput>>;
  readonly upsert?: InputMaybe<ReadonlyArray<CategoryUpsertLocalizationInput>>;
};

export type CategoryUpdateManyInlineInput = {
  /** Connect multiple existing Category documents */
  readonly connect?: InputMaybe<ReadonlyArray<CategoryConnectInput>>;
  /** Create and connect multiple Category documents */
  readonly create?: InputMaybe<ReadonlyArray<CategoryCreateInput>>;
  /** Delete multiple Category documents */
  readonly delete?: InputMaybe<ReadonlyArray<CategoryWhereUniqueInput>>;
  /** Disconnect multiple Category documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<CategoryWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Category documents */
  readonly set?: InputMaybe<ReadonlyArray<CategoryWhereUniqueInput>>;
  /** Update multiple Category documents */
  readonly update?: InputMaybe<ReadonlyArray<CategoryUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Category documents */
  readonly upsert?: InputMaybe<ReadonlyArray<CategoryUpsertWithNestedWhereUniqueInput>>;
};

export type CategoryUpdateManyInput = {
  /** description input for default locale (en) */
  readonly description?: InputMaybe<Scalars['String']>;
  /** Optional updates to localizations */
  readonly localizations?: InputMaybe<CategoryUpdateManyLocalizationsInput>;
};

export type CategoryUpdateManyLocalizationDataInput = {
  readonly description?: InputMaybe<Scalars['String']>;
};

export type CategoryUpdateManyLocalizationInput = {
  readonly data: CategoryUpdateManyLocalizationDataInput;
  readonly locale: Locale;
};

export type CategoryUpdateManyLocalizationsInput = {
  /** Localizations to update */
  readonly update?: InputMaybe<ReadonlyArray<CategoryUpdateManyLocalizationInput>>;
};

export type CategoryUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: CategoryUpdateManyInput;
  /** Document search */
  readonly where: CategoryWhereInput;
};

export type CategoryUpdateOneInlineInput = {
  /** Connect existing Category document */
  readonly connect?: InputMaybe<CategoryWhereUniqueInput>;
  /** Create and connect one Category document */
  readonly create?: InputMaybe<CategoryCreateInput>;
  /** Delete currently connected Category document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Category document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Category document */
  readonly update?: InputMaybe<CategoryUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Category document */
  readonly upsert?: InputMaybe<CategoryUpsertWithNestedWhereUniqueInput>;
};

export type CategoryUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: CategoryUpdateInput;
  /** Unique document search */
  readonly where: CategoryWhereUniqueInput;
};

export type CategoryUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: CategoryCreateInput;
  /** Update document if it exists */
  readonly update: CategoryUpdateInput;
};

export type CategoryUpsertLocalizationInput = {
  readonly create: CategoryCreateLocalizationDataInput;
  readonly locale: Locale;
  readonly update: CategoryUpdateLocalizationDataInput;
};

export type CategoryUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: CategoryUpsertInput;
  /** Unique document search */
  readonly where: CategoryWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type CategoryWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type CategoryWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CategoryWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CategoryWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CategoryWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly description_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly description_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly description_starts_with?: InputMaybe<Scalars['String']>;
  readonly documentInStages_every?: InputMaybe<CategoryWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<CategoryWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<CategoryWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly name_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly name_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly name_starts_with?: InputMaybe<Scalars['String']>;
  readonly products_every?: InputMaybe<ProductWhereInput>;
  readonly products_none?: InputMaybe<ProductWhereInput>;
  readonly products_some?: InputMaybe<ProductWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly slug?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly slug_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly slug_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly slug_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly slug_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly slug_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly slug_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly slug_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly slug_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly slug_starts_with?: InputMaybe<Scalars['String']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type CategoryWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CategoryWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CategoryWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CategoryWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<CategoryWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References Category record uniquely */
export type CategoryWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

/** Collection of products, e.g. Winter Sale. */
export type Collection = Node & {
  readonly __typename?: 'Collection';
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  readonly description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<Collection>;
  /** List of Collection versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  /** System Locale field */
  readonly locale: Locale;
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<Collection>;
  readonly name: Scalars['String'];
  readonly products: ReadonlyArray<Product>;
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  readonly slug: Scalars['String'];
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


/** Collection of products, e.g. Winter Sale. */
export type CollectionCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Collection of products, e.g. Winter Sale. */
export type CollectionCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


/** Collection of products, e.g. Winter Sale. */
export type CollectionDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


/** Collection of products, e.g. Winter Sale. */
export type CollectionHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


/** Collection of products, e.g. Winter Sale. */
export type CollectionLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean'];
  locales?: ReadonlyArray<Locale>;
};


/** Collection of products, e.g. Winter Sale. */
export type CollectionProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  orderBy?: InputMaybe<ProductOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProductWhereInput>;
};


/** Collection of products, e.g. Winter Sale. */
export type CollectionPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Collection of products, e.g. Winter Sale. */
export type CollectionPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


/** Collection of products, e.g. Winter Sale. */
export type CollectionScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Collection of products, e.g. Winter Sale. */
export type CollectionUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Collection of products, e.g. Winter Sale. */
export type CollectionUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type CollectionConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: CollectionWhereUniqueInput;
};

/** A connection to a list of items. */
export type CollectionConnection = {
  readonly __typename?: 'CollectionConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<CollectionEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type CollectionCreateInput = {
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** description input for default locale (en) */
  readonly description?: InputMaybe<Scalars['String']>;
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: InputMaybe<CollectionCreateLocalizationsInput>;
  /** name input for default locale (en) */
  readonly name: Scalars['String'];
  readonly products?: InputMaybe<ProductCreateManyInlineInput>;
  /** slug input for default locale (en) */
  readonly slug: Scalars['String'];
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CollectionCreateLocalizationDataInput = {
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly name: Scalars['String'];
  readonly slug: Scalars['String'];
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CollectionCreateLocalizationInput = {
  /** Localization input */
  readonly data: CollectionCreateLocalizationDataInput;
  readonly locale: Locale;
};

export type CollectionCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: InputMaybe<ReadonlyArray<CollectionCreateLocalizationInput>>;
};

export type CollectionCreateManyInlineInput = {
  /** Connect multiple existing Collection documents */
  readonly connect?: InputMaybe<ReadonlyArray<CollectionWhereUniqueInput>>;
  /** Create and connect multiple existing Collection documents */
  readonly create?: InputMaybe<ReadonlyArray<CollectionCreateInput>>;
};

export type CollectionCreateOneInlineInput = {
  /** Connect one existing Collection document */
  readonly connect?: InputMaybe<CollectionWhereUniqueInput>;
  /** Create and connect one Collection document */
  readonly create?: InputMaybe<CollectionCreateInput>;
};

/** An edge in a connection. */
export type CollectionEdge = {
  readonly __typename?: 'CollectionEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Collection;
};

/** Identifies documents */
export type CollectionManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CollectionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CollectionWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CollectionWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<CollectionWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<CollectionWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<CollectionWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly products_every?: InputMaybe<ProductWhereInput>;
  readonly products_none?: InputMaybe<ProductWhereInput>;
  readonly products_some?: InputMaybe<ProductWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum CollectionOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CollectionUpdateInput = {
  /** description input for default locale (en) */
  readonly description?: InputMaybe<Scalars['String']>;
  /** Manage document localizations */
  readonly localizations?: InputMaybe<CollectionUpdateLocalizationsInput>;
  /** name input for default locale (en) */
  readonly name?: InputMaybe<Scalars['String']>;
  readonly products?: InputMaybe<ProductUpdateManyInlineInput>;
  /** slug input for default locale (en) */
  readonly slug?: InputMaybe<Scalars['String']>;
};

export type CollectionUpdateLocalizationDataInput = {
  readonly description?: InputMaybe<Scalars['String']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly slug?: InputMaybe<Scalars['String']>;
};

export type CollectionUpdateLocalizationInput = {
  readonly data: CollectionUpdateLocalizationDataInput;
  readonly locale: Locale;
};

export type CollectionUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: InputMaybe<ReadonlyArray<CollectionCreateLocalizationInput>>;
  /** Localizations to delete */
  readonly delete?: InputMaybe<ReadonlyArray<Locale>>;
  /** Localizations to update */
  readonly update?: InputMaybe<ReadonlyArray<CollectionUpdateLocalizationInput>>;
  readonly upsert?: InputMaybe<ReadonlyArray<CollectionUpsertLocalizationInput>>;
};

export type CollectionUpdateManyInlineInput = {
  /** Connect multiple existing Collection documents */
  readonly connect?: InputMaybe<ReadonlyArray<CollectionConnectInput>>;
  /** Create and connect multiple Collection documents */
  readonly create?: InputMaybe<ReadonlyArray<CollectionCreateInput>>;
  /** Delete multiple Collection documents */
  readonly delete?: InputMaybe<ReadonlyArray<CollectionWhereUniqueInput>>;
  /** Disconnect multiple Collection documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<CollectionWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Collection documents */
  readonly set?: InputMaybe<ReadonlyArray<CollectionWhereUniqueInput>>;
  /** Update multiple Collection documents */
  readonly update?: InputMaybe<ReadonlyArray<CollectionUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Collection documents */
  readonly upsert?: InputMaybe<ReadonlyArray<CollectionUpsertWithNestedWhereUniqueInput>>;
};

export type CollectionUpdateManyInput = {
  /** description input for default locale (en) */
  readonly description?: InputMaybe<Scalars['String']>;
  /** Optional updates to localizations */
  readonly localizations?: InputMaybe<CollectionUpdateManyLocalizationsInput>;
};

export type CollectionUpdateManyLocalizationDataInput = {
  readonly description?: InputMaybe<Scalars['String']>;
};

export type CollectionUpdateManyLocalizationInput = {
  readonly data: CollectionUpdateManyLocalizationDataInput;
  readonly locale: Locale;
};

export type CollectionUpdateManyLocalizationsInput = {
  /** Localizations to update */
  readonly update?: InputMaybe<ReadonlyArray<CollectionUpdateManyLocalizationInput>>;
};

export type CollectionUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: CollectionUpdateManyInput;
  /** Document search */
  readonly where: CollectionWhereInput;
};

export type CollectionUpdateOneInlineInput = {
  /** Connect existing Collection document */
  readonly connect?: InputMaybe<CollectionWhereUniqueInput>;
  /** Create and connect one Collection document */
  readonly create?: InputMaybe<CollectionCreateInput>;
  /** Delete currently connected Collection document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Collection document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Collection document */
  readonly update?: InputMaybe<CollectionUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Collection document */
  readonly upsert?: InputMaybe<CollectionUpsertWithNestedWhereUniqueInput>;
};

export type CollectionUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: CollectionUpdateInput;
  /** Unique document search */
  readonly where: CollectionWhereUniqueInput;
};

export type CollectionUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: CollectionCreateInput;
  /** Update document if it exists */
  readonly update: CollectionUpdateInput;
};

export type CollectionUpsertLocalizationInput = {
  readonly create: CollectionCreateLocalizationDataInput;
  readonly locale: Locale;
  readonly update: CollectionUpdateLocalizationDataInput;
};

export type CollectionUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: CollectionUpsertInput;
  /** Unique document search */
  readonly where: CollectionWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type CollectionWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type CollectionWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CollectionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CollectionWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CollectionWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly description_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly description_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly description_starts_with?: InputMaybe<Scalars['String']>;
  readonly documentInStages_every?: InputMaybe<CollectionWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<CollectionWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<CollectionWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly name_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly name_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly name_starts_with?: InputMaybe<Scalars['String']>;
  readonly products_every?: InputMaybe<ProductWhereInput>;
  readonly products_none?: InputMaybe<ProductWhereInput>;
  readonly products_some?: InputMaybe<ProductWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly slug?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly slug_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly slug_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly slug_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly slug_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly slug_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly slug_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly slug_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly slug_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly slug_starts_with?: InputMaybe<Scalars['String']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type CollectionWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CollectionWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CollectionWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CollectionWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<CollectionWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References Collection record uniquely */
export type CollectionWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

/** Representing a color value comprising of HEX, RGBA and css color values */
export type Color = {
  readonly __typename?: 'Color';
  readonly css: Scalars['String'];
  readonly hex: Scalars['Hex'];
  readonly rgba: Rgba;
};

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
export type ColorInput = {
  readonly hex?: InputMaybe<Scalars['Hex']>;
  readonly rgba?: InputMaybe<RgbaInput>;
};

export type ConnectPositionInput = {
  /** Connect document after specified document */
  readonly after?: InputMaybe<Scalars['ID']>;
  /** Connect document before specified document */
  readonly before?: InputMaybe<Scalars['ID']>;
  /** Connect document at last position */
  readonly end?: InputMaybe<Scalars['Boolean']>;
  /** Connect document at first position */
  readonly start?: InputMaybe<Scalars['Boolean']>;
};

export type Currency = Node & {
  readonly __typename?: 'Currency';
  readonly code: Scalars['String'];
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  readonly default: Scalars['Boolean'];
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<Currency>;
  /** List of Currency versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly rate: Scalars['Float'];
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


export type CurrencyCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type CurrencyDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


export type CurrencyHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type CurrencyPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type CurrencyScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type CurrencyUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type CurrencyConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: CurrencyWhereUniqueInput;
};

/** A connection to a list of items. */
export type CurrencyConnection = {
  readonly __typename?: 'CurrencyConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<CurrencyEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type CurrencyCreateInput = {
  readonly code: Scalars['String'];
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly default: Scalars['Boolean'];
  readonly rate: Scalars['Float'];
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CurrencyCreateManyInlineInput = {
  /** Connect multiple existing Currency documents */
  readonly connect?: InputMaybe<ReadonlyArray<CurrencyWhereUniqueInput>>;
  /** Create and connect multiple existing Currency documents */
  readonly create?: InputMaybe<ReadonlyArray<CurrencyCreateInput>>;
};

export type CurrencyCreateOneInlineInput = {
  /** Connect one existing Currency document */
  readonly connect?: InputMaybe<CurrencyWhereUniqueInput>;
  /** Create and connect one Currency document */
  readonly create?: InputMaybe<CurrencyCreateInput>;
};

/** An edge in a connection. */
export type CurrencyEdge = {
  readonly __typename?: 'CurrencyEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Currency;
};

/** Identifies documents */
export type CurrencyManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CurrencyWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CurrencyWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CurrencyWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly code?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly code_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly code_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly code_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly code_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly code_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly code_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly code_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly code_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly code_starts_with?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly default?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  readonly default_not?: InputMaybe<Scalars['Boolean']>;
  readonly documentInStages_every?: InputMaybe<CurrencyWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<CurrencyWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<CurrencyWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly rate?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  readonly rate_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  readonly rate_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  readonly rate_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  readonly rate_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  readonly rate_lte?: InputMaybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  readonly rate_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  readonly rate_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']>>>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum CurrencyOrderByInput {
  CodeAsc = 'code_ASC',
  CodeDesc = 'code_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DefaultAsc = 'default_ASC',
  DefaultDesc = 'default_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  RateAsc = 'rate_ASC',
  RateDesc = 'rate_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CurrencyUpdateInput = {
  readonly code?: InputMaybe<Scalars['String']>;
  readonly default?: InputMaybe<Scalars['Boolean']>;
  readonly rate?: InputMaybe<Scalars['Float']>;
};

export type CurrencyUpdateManyInlineInput = {
  /** Connect multiple existing Currency documents */
  readonly connect?: InputMaybe<ReadonlyArray<CurrencyConnectInput>>;
  /** Create and connect multiple Currency documents */
  readonly create?: InputMaybe<ReadonlyArray<CurrencyCreateInput>>;
  /** Delete multiple Currency documents */
  readonly delete?: InputMaybe<ReadonlyArray<CurrencyWhereUniqueInput>>;
  /** Disconnect multiple Currency documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<CurrencyWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Currency documents */
  readonly set?: InputMaybe<ReadonlyArray<CurrencyWhereUniqueInput>>;
  /** Update multiple Currency documents */
  readonly update?: InputMaybe<ReadonlyArray<CurrencyUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Currency documents */
  readonly upsert?: InputMaybe<ReadonlyArray<CurrencyUpsertWithNestedWhereUniqueInput>>;
};

export type CurrencyUpdateManyInput = {
  readonly rate?: InputMaybe<Scalars['Float']>;
};

export type CurrencyUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: CurrencyUpdateManyInput;
  /** Document search */
  readonly where: CurrencyWhereInput;
};

export type CurrencyUpdateOneInlineInput = {
  /** Connect existing Currency document */
  readonly connect?: InputMaybe<CurrencyWhereUniqueInput>;
  /** Create and connect one Currency document */
  readonly create?: InputMaybe<CurrencyCreateInput>;
  /** Delete currently connected Currency document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Currency document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Currency document */
  readonly update?: InputMaybe<CurrencyUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Currency document */
  readonly upsert?: InputMaybe<CurrencyUpsertWithNestedWhereUniqueInput>;
};

export type CurrencyUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: CurrencyUpdateInput;
  /** Unique document search */
  readonly where: CurrencyWhereUniqueInput;
};

export type CurrencyUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: CurrencyCreateInput;
  /** Update document if it exists */
  readonly update: CurrencyUpdateInput;
};

export type CurrencyUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: CurrencyUpsertInput;
  /** Unique document search */
  readonly where: CurrencyWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type CurrencyWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type CurrencyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CurrencyWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CurrencyWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CurrencyWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly code?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly code_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly code_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly code_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly code_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly code_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly code_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly code_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly code_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly code_starts_with?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly default?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  readonly default_not?: InputMaybe<Scalars['Boolean']>;
  readonly documentInStages_every?: InputMaybe<CurrencyWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<CurrencyWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<CurrencyWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly rate?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  readonly rate_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  readonly rate_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  readonly rate_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  readonly rate_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  readonly rate_lte?: InputMaybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  readonly rate_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  readonly rate_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']>>>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type CurrencyWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<CurrencyWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<CurrencyWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<CurrencyWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<CurrencyWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References Currency record uniquely */
export type CurrencyWhereUniqueInput = {
  readonly code?: InputMaybe<Scalars['String']>;
  readonly default?: InputMaybe<Scalars['Boolean']>;
  readonly id?: InputMaybe<Scalars['ID']>;
};

export enum DocumentFileTypes {
  Doc = 'doc',
  Docx = 'docx',
  Html = 'html',
  Jpg = 'jpg',
  Odp = 'odp',
  Ods = 'ods',
  Odt = 'odt',
  Pdf = 'pdf',
  Png = 'png',
  Ppt = 'ppt',
  Pptx = 'pptx',
  Svg = 'svg',
  Txt = 'txt',
  Webp = 'webp',
  Xls = 'xls',
  Xlsx = 'xlsx'
}

export type DocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * PDF:	jpg, odp, ods, odt, png, svg, txt, and webp
   * DOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webp
   * DOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webp
   * ODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webp
   * XLS:	jpg, pdf, ods, png, svg, xlsx, and webp
   * XLSX:	jpg, pdf, ods, png, svg, xls, and webp
   * ODS:	jpg, pdf, png, xls, svg, xlsx, and webp
   * PPT:	jpg, odp, pdf, png, svg, pptx, and webp
   * PPTX:	jpg, odp, pdf, png, svg, ppt, and webp
   * ODP:	jpg, pdf, png, ppt, svg, pptx, and webp
   * BMP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * GIF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * JPG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * PNG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * WEBP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * TIFF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * AI:	    jpg, odp, ods, odt, pdf, png, svg, and webp
   * PSD:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * SVG:	jpg, odp, ods, odt, pdf, png, and webp
   * HTML:	jpg, odt, pdf, svg, txt, and webp
   * TXT:	jpg, html, odt, pdf, svg, and webp
   */
  readonly format?: InputMaybe<DocumentFileTypes>;
};

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  readonly output?: InputMaybe<DocumentOutputInput>;
};

export type DocumentVersion = {
  readonly __typename?: 'DocumentVersion';
  readonly createdAt: Scalars['DateTime'];
  readonly data?: Maybe<Scalars['Json']>;
  readonly id: Scalars['ID'];
  readonly revision: Scalars['Int'];
  readonly stage: Stage;
};

export enum ImageFit {
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  Clip = 'clip',
  /** Resizes the image to fit the specified parameters exactly by removing any parts of the image that don't fit within the boundaries. */
  Crop = 'crop',
  /** Resizes the image to fit within the parameters, but as opposed to 'fit:clip' will not scale the image if the image is smaller than the output size. */
  Max = 'max',
  /** Resizes the image to fit the specified parameters exactly by scaling the image to the desired size. The aspect ratio of the image is not respected and the image can be distorted using this method. */
  Scale = 'scale'
}

export type ImageResizeInput = {
  /** The default value for the fit parameter is fit:clip. */
  readonly fit?: InputMaybe<ImageFit>;
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  readonly height?: InputMaybe<Scalars['Int']>;
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  readonly width?: InputMaybe<Scalars['Int']>;
};

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Resizes the image */
  readonly resize?: InputMaybe<ImageResizeInput>;
};

/** Locale system enumeration */
export enum Locale {
  /** System locale */
  En = 'en'
}

/** Representing a geolocation point with latitude and longitude */
export type Location = {
  readonly __typename?: 'Location';
  readonly distance: Scalars['Float'];
  readonly latitude: Scalars['Float'];
  readonly longitude: Scalars['Float'];
};


/** Representing a geolocation point with latitude and longitude */
export type LocationDistanceArgs = {
  from: LocationInput;
};

/** Input for a geolocation point with latitude and longitude */
export type LocationInput = {
  readonly latitude: Scalars['Float'];
  readonly longitude: Scalars['Float'];
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  /** Create one account */
  readonly createAccount?: Maybe<Account>;
  /**
   * Create one asset
   * @deprecated Asset mutations will be overhauled soon
   */
  readonly createAsset?: Maybe<Asset>;
  /** Create one cart */
  readonly createCart?: Maybe<Cart>;
  /** Create one cartItem */
  readonly createCartItem?: Maybe<CartItem>;
  /** Create one category */
  readonly createCategory?: Maybe<Category>;
  /** Create one collection */
  readonly createCollection?: Maybe<Collection>;
  /** Create one currency */
  readonly createCurrency?: Maybe<Currency>;
  /** Create one option */
  readonly createOption?: Maybe<Option>;
  /** Create one order */
  readonly createOrder?: Maybe<Order>;
  /** Create one orderItem */
  readonly createOrderItem?: Maybe<OrderItem>;
  /** Create one person */
  readonly createPerson?: Maybe<Person>;
  /** Create one product */
  readonly createProduct?: Maybe<Product>;
  /** Create one review */
  readonly createReview?: Maybe<Review>;
  /** Create one scheduledRelease */
  readonly createScheduledRelease?: Maybe<ScheduledRelease>;
  /** Create one unauthCart */
  readonly createUnauthCart?: Maybe<UnauthCart>;
  /** Delete one account from _all_ existing stages. Returns deleted document. */
  readonly deleteAccount?: Maybe<Account>;
  /** Delete one asset from _all_ existing stages. Returns deleted document. */
  readonly deleteAsset?: Maybe<Asset>;
  /** Delete one cart from _all_ existing stages. Returns deleted document. */
  readonly deleteCart?: Maybe<Cart>;
  /** Delete one cartItem from _all_ existing stages. Returns deleted document. */
  readonly deleteCartItem?: Maybe<CartItem>;
  /** Delete one category from _all_ existing stages. Returns deleted document. */
  readonly deleteCategory?: Maybe<Category>;
  /** Delete one collection from _all_ existing stages. Returns deleted document. */
  readonly deleteCollection?: Maybe<Collection>;
  /** Delete one currency from _all_ existing stages. Returns deleted document. */
  readonly deleteCurrency?: Maybe<Currency>;
  /**
   * Delete many Account documents
   * @deprecated Please use the new paginated many mutation (deleteManyAccountsConnection)
   */
  readonly deleteManyAccounts: BatchPayload;
  /** Delete many Account documents, return deleted documents */
  readonly deleteManyAccountsConnection: AccountConnection;
  /**
   * Delete many Asset documents
   * @deprecated Please use the new paginated many mutation (deleteManyAssetsConnection)
   */
  readonly deleteManyAssets: BatchPayload;
  /** Delete many Asset documents, return deleted documents */
  readonly deleteManyAssetsConnection: AssetConnection;
  /**
   * Delete many CartItem documents
   * @deprecated Please use the new paginated many mutation (deleteManyCartItemsConnection)
   */
  readonly deleteManyCartItems: BatchPayload;
  /** Delete many CartItem documents, return deleted documents */
  readonly deleteManyCartItemsConnection: CartItemConnection;
  /**
   * Delete many Cart documents
   * @deprecated Please use the new paginated many mutation (deleteManyCartsConnection)
   */
  readonly deleteManyCarts: BatchPayload;
  /** Delete many Cart documents, return deleted documents */
  readonly deleteManyCartsConnection: CartConnection;
  /**
   * Delete many Category documents
   * @deprecated Please use the new paginated many mutation (deleteManyCategoriesConnection)
   */
  readonly deleteManyCategories: BatchPayload;
  /** Delete many Category documents, return deleted documents */
  readonly deleteManyCategoriesConnection: CategoryConnection;
  /**
   * Delete many Collection documents
   * @deprecated Please use the new paginated many mutation (deleteManyCollectionsConnection)
   */
  readonly deleteManyCollections: BatchPayload;
  /** Delete many Collection documents, return deleted documents */
  readonly deleteManyCollectionsConnection: CollectionConnection;
  /**
   * Delete many Currency documents
   * @deprecated Please use the new paginated many mutation (deleteManyCurrenciesConnection)
   */
  readonly deleteManyCurrencies: BatchPayload;
  /** Delete many Currency documents, return deleted documents */
  readonly deleteManyCurrenciesConnection: CurrencyConnection;
  /**
   * Delete many Option documents
   * @deprecated Please use the new paginated many mutation (deleteManyOptionsConnection)
   */
  readonly deleteManyOptions: BatchPayload;
  /** Delete many Option documents, return deleted documents */
  readonly deleteManyOptionsConnection: OptionConnection;
  /**
   * Delete many OrderItem documents
   * @deprecated Please use the new paginated many mutation (deleteManyOrderItemsConnection)
   */
  readonly deleteManyOrderItems: BatchPayload;
  /** Delete many OrderItem documents, return deleted documents */
  readonly deleteManyOrderItemsConnection: OrderItemConnection;
  /**
   * Delete many Order documents
   * @deprecated Please use the new paginated many mutation (deleteManyOrdersConnection)
   */
  readonly deleteManyOrders: BatchPayload;
  /** Delete many Order documents, return deleted documents */
  readonly deleteManyOrdersConnection: OrderConnection;
  /**
   * Delete many Person documents
   * @deprecated Please use the new paginated many mutation (deleteManyPeopleConnection)
   */
  readonly deleteManyPeople: BatchPayload;
  /** Delete many Person documents, return deleted documents */
  readonly deleteManyPeopleConnection: PersonConnection;
  /**
   * Delete many Product documents
   * @deprecated Please use the new paginated many mutation (deleteManyProductsConnection)
   */
  readonly deleteManyProducts: BatchPayload;
  /** Delete many Product documents, return deleted documents */
  readonly deleteManyProductsConnection: ProductConnection;
  /**
   * Delete many Review documents
   * @deprecated Please use the new paginated many mutation (deleteManyReviewsConnection)
   */
  readonly deleteManyReviews: BatchPayload;
  /** Delete many Review documents, return deleted documents */
  readonly deleteManyReviewsConnection: ReviewConnection;
  /**
   * Delete many UnauthCart documents
   * @deprecated Please use the new paginated many mutation (deleteManyUnauthCartsConnection)
   */
  readonly deleteManyUnauthCarts: BatchPayload;
  /** Delete many UnauthCart documents, return deleted documents */
  readonly deleteManyUnauthCartsConnection: UnauthCartConnection;
  /** Delete one option from _all_ existing stages. Returns deleted document. */
  readonly deleteOption?: Maybe<Option>;
  /** Delete one order from _all_ existing stages. Returns deleted document. */
  readonly deleteOrder?: Maybe<Order>;
  /** Delete one orderItem from _all_ existing stages. Returns deleted document. */
  readonly deleteOrderItem?: Maybe<OrderItem>;
  /** Delete one person from _all_ existing stages. Returns deleted document. */
  readonly deletePerson?: Maybe<Person>;
  /** Delete one product from _all_ existing stages. Returns deleted document. */
  readonly deleteProduct?: Maybe<Product>;
  /** Delete one review from _all_ existing stages. Returns deleted document. */
  readonly deleteReview?: Maybe<Review>;
  /** Delete and return scheduled operation */
  readonly deleteScheduledOperation?: Maybe<ScheduledOperation>;
  /** Delete one scheduledRelease from _all_ existing stages. Returns deleted document. */
  readonly deleteScheduledRelease?: Maybe<ScheduledRelease>;
  /** Delete one unauthCart from _all_ existing stages. Returns deleted document. */
  readonly deleteUnauthCart?: Maybe<UnauthCart>;
  /** Publish one account */
  readonly publishAccount?: Maybe<Account>;
  /** Publish one asset */
  readonly publishAsset?: Maybe<Asset>;
  /** Publish one cart */
  readonly publishCart?: Maybe<Cart>;
  /** Publish one cartItem */
  readonly publishCartItem?: Maybe<CartItem>;
  /** Publish one category */
  readonly publishCategory?: Maybe<Category>;
  /** Publish one collection */
  readonly publishCollection?: Maybe<Collection>;
  /** Publish one currency */
  readonly publishCurrency?: Maybe<Currency>;
  /**
   * Publish many Account documents
   * @deprecated Please use the new paginated many mutation (publishManyAccountsConnection)
   */
  readonly publishManyAccounts: BatchPayload;
  /** Publish many Account documents */
  readonly publishManyAccountsConnection: AccountConnection;
  /**
   * Publish many Asset documents
   * @deprecated Please use the new paginated many mutation (publishManyAssetsConnection)
   */
  readonly publishManyAssets: BatchPayload;
  /** Publish many Asset documents */
  readonly publishManyAssetsConnection: AssetConnection;
  /**
   * Publish many CartItem documents
   * @deprecated Please use the new paginated many mutation (publishManyCartItemsConnection)
   */
  readonly publishManyCartItems: BatchPayload;
  /** Publish many CartItem documents */
  readonly publishManyCartItemsConnection: CartItemConnection;
  /**
   * Publish many Cart documents
   * @deprecated Please use the new paginated many mutation (publishManyCartsConnection)
   */
  readonly publishManyCarts: BatchPayload;
  /** Publish many Cart documents */
  readonly publishManyCartsConnection: CartConnection;
  /**
   * Publish many Category documents
   * @deprecated Please use the new paginated many mutation (publishManyCategoriesConnection)
   */
  readonly publishManyCategories: BatchPayload;
  /** Publish many Category documents */
  readonly publishManyCategoriesConnection: CategoryConnection;
  /**
   * Publish many Collection documents
   * @deprecated Please use the new paginated many mutation (publishManyCollectionsConnection)
   */
  readonly publishManyCollections: BatchPayload;
  /** Publish many Collection documents */
  readonly publishManyCollectionsConnection: CollectionConnection;
  /**
   * Publish many Currency documents
   * @deprecated Please use the new paginated many mutation (publishManyCurrenciesConnection)
   */
  readonly publishManyCurrencies: BatchPayload;
  /** Publish many Currency documents */
  readonly publishManyCurrenciesConnection: CurrencyConnection;
  /**
   * Publish many Option documents
   * @deprecated Please use the new paginated many mutation (publishManyOptionsConnection)
   */
  readonly publishManyOptions: BatchPayload;
  /** Publish many Option documents */
  readonly publishManyOptionsConnection: OptionConnection;
  /**
   * Publish many OrderItem documents
   * @deprecated Please use the new paginated many mutation (publishManyOrderItemsConnection)
   */
  readonly publishManyOrderItems: BatchPayload;
  /** Publish many OrderItem documents */
  readonly publishManyOrderItemsConnection: OrderItemConnection;
  /**
   * Publish many Order documents
   * @deprecated Please use the new paginated many mutation (publishManyOrdersConnection)
   */
  readonly publishManyOrders: BatchPayload;
  /** Publish many Order documents */
  readonly publishManyOrdersConnection: OrderConnection;
  /**
   * Publish many Person documents
   * @deprecated Please use the new paginated many mutation (publishManyPeopleConnection)
   */
  readonly publishManyPeople: BatchPayload;
  /** Publish many Person documents */
  readonly publishManyPeopleConnection: PersonConnection;
  /**
   * Publish many Product documents
   * @deprecated Please use the new paginated many mutation (publishManyProductsConnection)
   */
  readonly publishManyProducts: BatchPayload;
  /** Publish many Product documents */
  readonly publishManyProductsConnection: ProductConnection;
  /**
   * Publish many Review documents
   * @deprecated Please use the new paginated many mutation (publishManyReviewsConnection)
   */
  readonly publishManyReviews: BatchPayload;
  /** Publish many Review documents */
  readonly publishManyReviewsConnection: ReviewConnection;
  /**
   * Publish many UnauthCart documents
   * @deprecated Please use the new paginated many mutation (publishManyUnauthCartsConnection)
   */
  readonly publishManyUnauthCarts: BatchPayload;
  /** Publish many UnauthCart documents */
  readonly publishManyUnauthCartsConnection: UnauthCartConnection;
  /** Publish one option */
  readonly publishOption?: Maybe<Option>;
  /** Publish one order */
  readonly publishOrder?: Maybe<Order>;
  /** Publish one orderItem */
  readonly publishOrderItem?: Maybe<OrderItem>;
  /** Publish one person */
  readonly publishPerson?: Maybe<Person>;
  /** Publish one product */
  readonly publishProduct?: Maybe<Product>;
  /** Publish one review */
  readonly publishReview?: Maybe<Review>;
  /** Publish one unauthCart */
  readonly publishUnauthCart?: Maybe<UnauthCart>;
  /** Schedule to publish one account */
  readonly schedulePublishAccount?: Maybe<Account>;
  /** Schedule to publish one asset */
  readonly schedulePublishAsset?: Maybe<Asset>;
  /** Schedule to publish one cart */
  readonly schedulePublishCart?: Maybe<Cart>;
  /** Schedule to publish one cartItem */
  readonly schedulePublishCartItem?: Maybe<CartItem>;
  /** Schedule to publish one category */
  readonly schedulePublishCategory?: Maybe<Category>;
  /** Schedule to publish one collection */
  readonly schedulePublishCollection?: Maybe<Collection>;
  /** Schedule to publish one currency */
  readonly schedulePublishCurrency?: Maybe<Currency>;
  /** Schedule to publish one option */
  readonly schedulePublishOption?: Maybe<Option>;
  /** Schedule to publish one order */
  readonly schedulePublishOrder?: Maybe<Order>;
  /** Schedule to publish one orderItem */
  readonly schedulePublishOrderItem?: Maybe<OrderItem>;
  /** Schedule to publish one person */
  readonly schedulePublishPerson?: Maybe<Person>;
  /** Schedule to publish one product */
  readonly schedulePublishProduct?: Maybe<Product>;
  /** Schedule to publish one review */
  readonly schedulePublishReview?: Maybe<Review>;
  /** Schedule to publish one unauthCart */
  readonly schedulePublishUnauthCart?: Maybe<UnauthCart>;
  /** Unpublish one account from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishAccount?: Maybe<Account>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishAsset?: Maybe<Asset>;
  /** Unpublish one cart from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishCart?: Maybe<Cart>;
  /** Unpublish one cartItem from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishCartItem?: Maybe<CartItem>;
  /** Unpublish one category from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishCategory?: Maybe<Category>;
  /** Unpublish one collection from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishCollection?: Maybe<Collection>;
  /** Unpublish one currency from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishCurrency?: Maybe<Currency>;
  /** Unpublish one option from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishOption?: Maybe<Option>;
  /** Unpublish one order from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishOrder?: Maybe<Order>;
  /** Unpublish one orderItem from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishOrderItem?: Maybe<OrderItem>;
  /** Unpublish one person from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishPerson?: Maybe<Person>;
  /** Unpublish one product from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishProduct?: Maybe<Product>;
  /** Unpublish one review from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishReview?: Maybe<Review>;
  /** Unpublish one unauthCart from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly scheduleUnpublishUnauthCart?: Maybe<UnauthCart>;
  /** Unpublish one account from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishAccount?: Maybe<Account>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishAsset?: Maybe<Asset>;
  /** Unpublish one cart from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishCart?: Maybe<Cart>;
  /** Unpublish one cartItem from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishCartItem?: Maybe<CartItem>;
  /** Unpublish one category from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishCategory?: Maybe<Category>;
  /** Unpublish one collection from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishCollection?: Maybe<Collection>;
  /** Unpublish one currency from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishCurrency?: Maybe<Currency>;
  /**
   * Unpublish many Account documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAccountsConnection)
   */
  readonly unpublishManyAccounts: BatchPayload;
  /** Find many Account documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyAccountsConnection: AccountConnection;
  /**
   * Unpublish many Asset documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAssetsConnection)
   */
  readonly unpublishManyAssets: BatchPayload;
  /** Find many Asset documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyAssetsConnection: AssetConnection;
  /**
   * Unpublish many CartItem documents
   * @deprecated Please use the new paginated many mutation (unpublishManyCartItemsConnection)
   */
  readonly unpublishManyCartItems: BatchPayload;
  /** Find many CartItem documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyCartItemsConnection: CartItemConnection;
  /**
   * Unpublish many Cart documents
   * @deprecated Please use the new paginated many mutation (unpublishManyCartsConnection)
   */
  readonly unpublishManyCarts: BatchPayload;
  /** Find many Cart documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyCartsConnection: CartConnection;
  /**
   * Unpublish many Category documents
   * @deprecated Please use the new paginated many mutation (unpublishManyCategoriesConnection)
   */
  readonly unpublishManyCategories: BatchPayload;
  /** Find many Category documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyCategoriesConnection: CategoryConnection;
  /**
   * Unpublish many Collection documents
   * @deprecated Please use the new paginated many mutation (unpublishManyCollectionsConnection)
   */
  readonly unpublishManyCollections: BatchPayload;
  /** Find many Collection documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyCollectionsConnection: CollectionConnection;
  /**
   * Unpublish many Currency documents
   * @deprecated Please use the new paginated many mutation (unpublishManyCurrenciesConnection)
   */
  readonly unpublishManyCurrencies: BatchPayload;
  /** Find many Currency documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyCurrenciesConnection: CurrencyConnection;
  /**
   * Unpublish many Option documents
   * @deprecated Please use the new paginated many mutation (unpublishManyOptionsConnection)
   */
  readonly unpublishManyOptions: BatchPayload;
  /** Find many Option documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyOptionsConnection: OptionConnection;
  /**
   * Unpublish many OrderItem documents
   * @deprecated Please use the new paginated many mutation (unpublishManyOrderItemsConnection)
   */
  readonly unpublishManyOrderItems: BatchPayload;
  /** Find many OrderItem documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyOrderItemsConnection: OrderItemConnection;
  /**
   * Unpublish many Order documents
   * @deprecated Please use the new paginated many mutation (unpublishManyOrdersConnection)
   */
  readonly unpublishManyOrders: BatchPayload;
  /** Find many Order documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyOrdersConnection: OrderConnection;
  /**
   * Unpublish many Person documents
   * @deprecated Please use the new paginated many mutation (unpublishManyPeopleConnection)
   */
  readonly unpublishManyPeople: BatchPayload;
  /** Find many Person documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyPeopleConnection: PersonConnection;
  /**
   * Unpublish many Product documents
   * @deprecated Please use the new paginated many mutation (unpublishManyProductsConnection)
   */
  readonly unpublishManyProducts: BatchPayload;
  /** Find many Product documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyProductsConnection: ProductConnection;
  /**
   * Unpublish many Review documents
   * @deprecated Please use the new paginated many mutation (unpublishManyReviewsConnection)
   */
  readonly unpublishManyReviews: BatchPayload;
  /** Find many Review documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyReviewsConnection: ReviewConnection;
  /**
   * Unpublish many UnauthCart documents
   * @deprecated Please use the new paginated many mutation (unpublishManyUnauthCartsConnection)
   */
  readonly unpublishManyUnauthCarts: BatchPayload;
  /** Find many UnauthCart documents that match criteria in specified stage and unpublish from target stages */
  readonly unpublishManyUnauthCartsConnection: UnauthCartConnection;
  /** Unpublish one option from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishOption?: Maybe<Option>;
  /** Unpublish one order from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishOrder?: Maybe<Order>;
  /** Unpublish one orderItem from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishOrderItem?: Maybe<OrderItem>;
  /** Unpublish one person from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishPerson?: Maybe<Person>;
  /** Unpublish one product from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishProduct?: Maybe<Product>;
  /** Unpublish one review from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishReview?: Maybe<Review>;
  /** Unpublish one unauthCart from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  readonly unpublishUnauthCart?: Maybe<UnauthCart>;
  /** Update one account */
  readonly updateAccount?: Maybe<Account>;
  /** Update one asset */
  readonly updateAsset?: Maybe<Asset>;
  /** Update one cart */
  readonly updateCart?: Maybe<Cart>;
  /** Update one cartItem */
  readonly updateCartItem?: Maybe<CartItem>;
  /** Update one category */
  readonly updateCategory?: Maybe<Category>;
  /** Update one collection */
  readonly updateCollection?: Maybe<Collection>;
  /** Update one currency */
  readonly updateCurrency?: Maybe<Currency>;
  /**
   * Update many accounts
   * @deprecated Please use the new paginated many mutation (updateManyAccountsConnection)
   */
  readonly updateManyAccounts: BatchPayload;
  /** Update many Account documents */
  readonly updateManyAccountsConnection: AccountConnection;
  /**
   * Update many assets
   * @deprecated Please use the new paginated many mutation (updateManyAssetsConnection)
   */
  readonly updateManyAssets: BatchPayload;
  /** Update many Asset documents */
  readonly updateManyAssetsConnection: AssetConnection;
  /**
   * Update many cartItems
   * @deprecated Please use the new paginated many mutation (updateManyCartItemsConnection)
   */
  readonly updateManyCartItems: BatchPayload;
  /** Update many CartItem documents */
  readonly updateManyCartItemsConnection: CartItemConnection;
  /**
   * Update many carts
   * @deprecated Please use the new paginated many mutation (updateManyCartsConnection)
   */
  readonly updateManyCarts: BatchPayload;
  /** Update many Cart documents */
  readonly updateManyCartsConnection: CartConnection;
  /**
   * Update many categories
   * @deprecated Please use the new paginated many mutation (updateManyCategoriesConnection)
   */
  readonly updateManyCategories: BatchPayload;
  /** Update many Category documents */
  readonly updateManyCategoriesConnection: CategoryConnection;
  /**
   * Update many collections
   * @deprecated Please use the new paginated many mutation (updateManyCollectionsConnection)
   */
  readonly updateManyCollections: BatchPayload;
  /** Update many Collection documents */
  readonly updateManyCollectionsConnection: CollectionConnection;
  /**
   * Update many currencies
   * @deprecated Please use the new paginated many mutation (updateManyCurrenciesConnection)
   */
  readonly updateManyCurrencies: BatchPayload;
  /** Update many Currency documents */
  readonly updateManyCurrenciesConnection: CurrencyConnection;
  /**
   * Update many options
   * @deprecated Please use the new paginated many mutation (updateManyOptionsConnection)
   */
  readonly updateManyOptions: BatchPayload;
  /** Update many Option documents */
  readonly updateManyOptionsConnection: OptionConnection;
  /**
   * Update many orderItems
   * @deprecated Please use the new paginated many mutation (updateManyOrderItemsConnection)
   */
  readonly updateManyOrderItems: BatchPayload;
  /** Update many OrderItem documents */
  readonly updateManyOrderItemsConnection: OrderItemConnection;
  /**
   * Update many orders
   * @deprecated Please use the new paginated many mutation (updateManyOrdersConnection)
   */
  readonly updateManyOrders: BatchPayload;
  /** Update many Order documents */
  readonly updateManyOrdersConnection: OrderConnection;
  /**
   * Update many people
   * @deprecated Please use the new paginated many mutation (updateManyPeopleConnection)
   */
  readonly updateManyPeople: BatchPayload;
  /** Update many Person documents */
  readonly updateManyPeopleConnection: PersonConnection;
  /**
   * Update many products
   * @deprecated Please use the new paginated many mutation (updateManyProductsConnection)
   */
  readonly updateManyProducts: BatchPayload;
  /** Update many Product documents */
  readonly updateManyProductsConnection: ProductConnection;
  /**
   * Update many reviews
   * @deprecated Please use the new paginated many mutation (updateManyReviewsConnection)
   */
  readonly updateManyReviews: BatchPayload;
  /** Update many Review documents */
  readonly updateManyReviewsConnection: ReviewConnection;
  /**
   * Update many unauthCarts
   * @deprecated Please use the new paginated many mutation (updateManyUnauthCartsConnection)
   */
  readonly updateManyUnauthCarts: BatchPayload;
  /** Update many UnauthCart documents */
  readonly updateManyUnauthCartsConnection: UnauthCartConnection;
  /** Update one option */
  readonly updateOption?: Maybe<Option>;
  /** Update one order */
  readonly updateOrder?: Maybe<Order>;
  /** Update one orderItem */
  readonly updateOrderItem?: Maybe<OrderItem>;
  /** Update one person */
  readonly updatePerson?: Maybe<Person>;
  /** Update one product */
  readonly updateProduct?: Maybe<Product>;
  /** Update one review */
  readonly updateReview?: Maybe<Review>;
  /** Update one scheduledRelease */
  readonly updateScheduledRelease?: Maybe<ScheduledRelease>;
  /** Update one unauthCart */
  readonly updateUnauthCart?: Maybe<UnauthCart>;
  /** Upsert one account */
  readonly upsertAccount?: Maybe<Account>;
  /** Upsert one asset */
  readonly upsertAsset?: Maybe<Asset>;
  /** Upsert one cart */
  readonly upsertCart?: Maybe<Cart>;
  /** Upsert one cartItem */
  readonly upsertCartItem?: Maybe<CartItem>;
  /** Upsert one category */
  readonly upsertCategory?: Maybe<Category>;
  /** Upsert one collection */
  readonly upsertCollection?: Maybe<Collection>;
  /** Upsert one currency */
  readonly upsertCurrency?: Maybe<Currency>;
  /** Upsert one option */
  readonly upsertOption?: Maybe<Option>;
  /** Upsert one order */
  readonly upsertOrder?: Maybe<Order>;
  /** Upsert one orderItem */
  readonly upsertOrderItem?: Maybe<OrderItem>;
  /** Upsert one person */
  readonly upsertPerson?: Maybe<Person>;
  /** Upsert one product */
  readonly upsertProduct?: Maybe<Product>;
  /** Upsert one review */
  readonly upsertReview?: Maybe<Review>;
  /** Upsert one unauthCart */
  readonly upsertUnauthCart?: Maybe<UnauthCart>;
};


export type MutationCreateAccountArgs = {
  data: AccountCreateInput;
};


export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};


export type MutationCreateCartArgs = {
  data: CartCreateInput;
};


export type MutationCreateCartItemArgs = {
  data: CartItemCreateInput;
};


export type MutationCreateCategoryArgs = {
  data: CategoryCreateInput;
};


export type MutationCreateCollectionArgs = {
  data: CollectionCreateInput;
};


export type MutationCreateCurrencyArgs = {
  data: CurrencyCreateInput;
};


export type MutationCreateOptionArgs = {
  data: OptionCreateInput;
};


export type MutationCreateOrderArgs = {
  data: OrderCreateInput;
};


export type MutationCreateOrderItemArgs = {
  data: OrderItemCreateInput;
};


export type MutationCreatePersonArgs = {
  data: PersonCreateInput;
};


export type MutationCreateProductArgs = {
  data: ProductCreateInput;
};


export type MutationCreateReviewArgs = {
  data: ReviewCreateInput;
};


export type MutationCreateScheduledReleaseArgs = {
  data: ScheduledReleaseCreateInput;
};


export type MutationCreateUnauthCartArgs = {
  data: UnauthCartCreateInput;
};


export type MutationDeleteAccountArgs = {
  where: AccountWhereUniqueInput;
};


export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput;
};


export type MutationDeleteCartArgs = {
  where: CartWhereUniqueInput;
};


export type MutationDeleteCartItemArgs = {
  where: CartItemWhereUniqueInput;
};


export type MutationDeleteCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type MutationDeleteCollectionArgs = {
  where: CollectionWhereUniqueInput;
};


export type MutationDeleteCurrencyArgs = {
  where: CurrencyWhereUniqueInput;
};


export type MutationDeleteManyAccountsArgs = {
  where?: InputMaybe<AccountManyWhereInput>;
};


export type MutationDeleteManyAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AccountManyWhereInput>;
};


export type MutationDeleteManyAssetsArgs = {
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationDeleteManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationDeleteManyCartItemsArgs = {
  where?: InputMaybe<CartItemManyWhereInput>;
};


export type MutationDeleteManyCartItemsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CartItemManyWhereInput>;
};


export type MutationDeleteManyCartsArgs = {
  where?: InputMaybe<CartManyWhereInput>;
};


export type MutationDeleteManyCartsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CartManyWhereInput>;
};


export type MutationDeleteManyCategoriesArgs = {
  where?: InputMaybe<CategoryManyWhereInput>;
};


export type MutationDeleteManyCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CategoryManyWhereInput>;
};


export type MutationDeleteManyCollectionsArgs = {
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationDeleteManyCollectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationDeleteManyCurrenciesArgs = {
  where?: InputMaybe<CurrencyManyWhereInput>;
};


export type MutationDeleteManyCurrenciesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CurrencyManyWhereInput>;
};


export type MutationDeleteManyOptionsArgs = {
  where?: InputMaybe<OptionManyWhereInput>;
};


export type MutationDeleteManyOptionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OptionManyWhereInput>;
};


export type MutationDeleteManyOrderItemsArgs = {
  where?: InputMaybe<OrderItemManyWhereInput>;
};


export type MutationDeleteManyOrderItemsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrderItemManyWhereInput>;
};


export type MutationDeleteManyOrdersArgs = {
  where?: InputMaybe<OrderManyWhereInput>;
};


export type MutationDeleteManyOrdersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrderManyWhereInput>;
};


export type MutationDeleteManyPeopleArgs = {
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationDeleteManyPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationDeleteManyProductsArgs = {
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationDeleteManyProductsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationDeleteManyReviewsArgs = {
  where?: InputMaybe<ReviewManyWhereInput>;
};


export type MutationDeleteManyReviewsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ReviewManyWhereInput>;
};


export type MutationDeleteManyUnauthCartsArgs = {
  where?: InputMaybe<UnauthCartManyWhereInput>;
};


export type MutationDeleteManyUnauthCartsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UnauthCartManyWhereInput>;
};


export type MutationDeleteOptionArgs = {
  where: OptionWhereUniqueInput;
};


export type MutationDeleteOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type MutationDeleteOrderItemArgs = {
  where: OrderItemWhereUniqueInput;
};


export type MutationDeletePersonArgs = {
  where: PersonWhereUniqueInput;
};


export type MutationDeleteProductArgs = {
  where: ProductWhereUniqueInput;
};


export type MutationDeleteReviewArgs = {
  where: ReviewWhereUniqueInput;
};


export type MutationDeleteScheduledOperationArgs = {
  where: ScheduledOperationWhereUniqueInput;
};


export type MutationDeleteScheduledReleaseArgs = {
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationDeleteUnauthCartArgs = {
  where: UnauthCartWhereUniqueInput;
};


export type MutationPublishAccountArgs = {
  to?: ReadonlyArray<Stage>;
  where: AccountWhereUniqueInput;
};


export type MutationPublishAssetArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: ReadonlyArray<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishCartArgs = {
  to?: ReadonlyArray<Stage>;
  where: CartWhereUniqueInput;
};


export type MutationPublishCartItemArgs = {
  to?: ReadonlyArray<Stage>;
  where: CartItemWhereUniqueInput;
};


export type MutationPublishCategoryArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: ReadonlyArray<Stage>;
  where: CategoryWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishCollectionArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: ReadonlyArray<Stage>;
  where: CollectionWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishCurrencyArgs = {
  to?: ReadonlyArray<Stage>;
  where: CurrencyWhereUniqueInput;
};


export type MutationPublishManyAccountsArgs = {
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<AccountManyWhereInput>;
};


export type MutationPublishManyAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<AccountManyWhereInput>;
};


export type MutationPublishManyAssetsArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyCartItemsArgs = {
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<CartItemManyWhereInput>;
};


export type MutationPublishManyCartItemsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<CartItemManyWhereInput>;
};


export type MutationPublishManyCartsArgs = {
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<CartManyWhereInput>;
};


export type MutationPublishManyCartsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<CartManyWhereInput>;
};


export type MutationPublishManyCategoriesArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<CategoryManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<CategoryManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyCollectionsArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<CollectionManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyCollectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<CollectionManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyCurrenciesArgs = {
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<CurrencyManyWhereInput>;
};


export type MutationPublishManyCurrenciesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<CurrencyManyWhereInput>;
};


export type MutationPublishManyOptionsArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<OptionManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyOptionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<OptionManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyOrderItemsArgs = {
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<OrderItemManyWhereInput>;
};


export type MutationPublishManyOrderItemsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<OrderItemManyWhereInput>;
};


export type MutationPublishManyOrdersArgs = {
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<OrderManyWhereInput>;
};


export type MutationPublishManyOrdersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<OrderManyWhereInput>;
};


export type MutationPublishManyPeopleArgs = {
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationPublishManyPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationPublishManyProductsArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<ProductManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyProductsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<ProductManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyReviewsArgs = {
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<ReviewManyWhereInput>;
};


export type MutationPublishManyReviewsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<ReviewManyWhereInput>;
};


export type MutationPublishManyUnauthCartsArgs = {
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<UnauthCartManyWhereInput>;
};


export type MutationPublishManyUnauthCartsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: ReadonlyArray<Stage>;
  where?: InputMaybe<UnauthCartManyWhereInput>;
};


export type MutationPublishOptionArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: ReadonlyArray<Stage>;
  where: OptionWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishOrderArgs = {
  to?: ReadonlyArray<Stage>;
  where: OrderWhereUniqueInput;
};


export type MutationPublishOrderItemArgs = {
  to?: ReadonlyArray<Stage>;
  where: OrderItemWhereUniqueInput;
};


export type MutationPublishPersonArgs = {
  to?: ReadonlyArray<Stage>;
  where: PersonWhereUniqueInput;
};


export type MutationPublishProductArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: ReadonlyArray<Stage>;
  where: ProductWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishReviewArgs = {
  to?: ReadonlyArray<Stage>;
  where: ReviewWhereUniqueInput;
};


export type MutationPublishUnauthCartArgs = {
  to?: ReadonlyArray<Stage>;
  where: UnauthCartWhereUniqueInput;
};


export type MutationSchedulePublishAccountArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: AccountWhereUniqueInput;
};


export type MutationSchedulePublishAssetArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSchedulePublishCartArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: CartWhereUniqueInput;
};


export type MutationSchedulePublishCartItemArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: CartItemWhereUniqueInput;
};


export type MutationSchedulePublishCategoryArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: CategoryWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSchedulePublishCollectionArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: CollectionWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSchedulePublishCurrencyArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: CurrencyWhereUniqueInput;
};


export type MutationSchedulePublishOptionArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: OptionWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSchedulePublishOrderArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: OrderWhereUniqueInput;
};


export type MutationSchedulePublishOrderItemArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: OrderItemWhereUniqueInput;
};


export type MutationSchedulePublishPersonArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: PersonWhereUniqueInput;
};


export type MutationSchedulePublishProductArgs = {
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: ProductWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSchedulePublishReviewArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: ReviewWhereUniqueInput;
};


export type MutationSchedulePublishUnauthCartArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: ReadonlyArray<Stage>;
  where: UnauthCartWhereUniqueInput;
};


export type MutationScheduleUnpublishAccountArgs = {
  from?: ReadonlyArray<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: AccountWhereUniqueInput;
};


export type MutationScheduleUnpublishAssetArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};


export type MutationScheduleUnpublishCartArgs = {
  from?: ReadonlyArray<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: CartWhereUniqueInput;
};


export type MutationScheduleUnpublishCartItemArgs = {
  from?: ReadonlyArray<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: CartItemWhereUniqueInput;
};


export type MutationScheduleUnpublishCategoryArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: CategoryWhereUniqueInput;
};


export type MutationScheduleUnpublishCollectionArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: CollectionWhereUniqueInput;
};


export type MutationScheduleUnpublishCurrencyArgs = {
  from?: ReadonlyArray<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: CurrencyWhereUniqueInput;
};


export type MutationScheduleUnpublishOptionArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: OptionWhereUniqueInput;
};


export type MutationScheduleUnpublishOrderArgs = {
  from?: ReadonlyArray<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: OrderWhereUniqueInput;
};


export type MutationScheduleUnpublishOrderItemArgs = {
  from?: ReadonlyArray<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: OrderItemWhereUniqueInput;
};


export type MutationScheduleUnpublishPersonArgs = {
  from?: ReadonlyArray<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: PersonWhereUniqueInput;
};


export type MutationScheduleUnpublishProductArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: ProductWhereUniqueInput;
};


export type MutationScheduleUnpublishReviewArgs = {
  from?: ReadonlyArray<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: ReviewWhereUniqueInput;
};


export type MutationScheduleUnpublishUnauthCartArgs = {
  from?: ReadonlyArray<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: UnauthCartWhereUniqueInput;
};


export type MutationUnpublishAccountArgs = {
  from?: ReadonlyArray<Stage>;
  where: AccountWhereUniqueInput;
};


export type MutationUnpublishAssetArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};


export type MutationUnpublishCartArgs = {
  from?: ReadonlyArray<Stage>;
  where: CartWhereUniqueInput;
};


export type MutationUnpublishCartItemArgs = {
  from?: ReadonlyArray<Stage>;
  where: CartItemWhereUniqueInput;
};


export type MutationUnpublishCategoryArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: CategoryWhereUniqueInput;
};


export type MutationUnpublishCollectionArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: CollectionWhereUniqueInput;
};


export type MutationUnpublishCurrencyArgs = {
  from?: ReadonlyArray<Stage>;
  where: CurrencyWhereUniqueInput;
};


export type MutationUnpublishManyAccountsArgs = {
  from?: ReadonlyArray<Stage>;
  where?: InputMaybe<AccountManyWhereInput>;
};


export type MutationUnpublishManyAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<AccountManyWhereInput>;
};


export type MutationUnpublishManyAssetsArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUnpublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUnpublishManyCartItemsArgs = {
  from?: ReadonlyArray<Stage>;
  where?: InputMaybe<CartItemManyWhereInput>;
};


export type MutationUnpublishManyCartItemsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<CartItemManyWhereInput>;
};


export type MutationUnpublishManyCartsArgs = {
  from?: ReadonlyArray<Stage>;
  where?: InputMaybe<CartManyWhereInput>;
};


export type MutationUnpublishManyCartsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<CartManyWhereInput>;
};


export type MutationUnpublishManyCategoriesArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<CategoryManyWhereInput>;
};


export type MutationUnpublishManyCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<CategoryManyWhereInput>;
};


export type MutationUnpublishManyCollectionsArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationUnpublishManyCollectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationUnpublishManyCurrenciesArgs = {
  from?: ReadonlyArray<Stage>;
  where?: InputMaybe<CurrencyManyWhereInput>;
};


export type MutationUnpublishManyCurrenciesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<CurrencyManyWhereInput>;
};


export type MutationUnpublishManyOptionsArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<OptionManyWhereInput>;
};


export type MutationUnpublishManyOptionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<OptionManyWhereInput>;
};


export type MutationUnpublishManyOrderItemsArgs = {
  from?: ReadonlyArray<Stage>;
  where?: InputMaybe<OrderItemManyWhereInput>;
};


export type MutationUnpublishManyOrderItemsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<OrderItemManyWhereInput>;
};


export type MutationUnpublishManyOrdersArgs = {
  from?: ReadonlyArray<Stage>;
  where?: InputMaybe<OrderManyWhereInput>;
};


export type MutationUnpublishManyOrdersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<OrderManyWhereInput>;
};


export type MutationUnpublishManyPeopleArgs = {
  from?: ReadonlyArray<Stage>;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationUnpublishManyPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationUnpublishManyProductsArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationUnpublishManyProductsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationUnpublishManyReviewsArgs = {
  from?: ReadonlyArray<Stage>;
  where?: InputMaybe<ReviewManyWhereInput>;
};


export type MutationUnpublishManyReviewsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<ReviewManyWhereInput>;
};


export type MutationUnpublishManyUnauthCartsArgs = {
  from?: ReadonlyArray<Stage>;
  where?: InputMaybe<UnauthCartManyWhereInput>;
};


export type MutationUnpublishManyUnauthCartsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: ReadonlyArray<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<UnauthCartManyWhereInput>;
};


export type MutationUnpublishOptionArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: OptionWhereUniqueInput;
};


export type MutationUnpublishOrderArgs = {
  from?: ReadonlyArray<Stage>;
  where: OrderWhereUniqueInput;
};


export type MutationUnpublishOrderItemArgs = {
  from?: ReadonlyArray<Stage>;
  where: OrderItemWhereUniqueInput;
};


export type MutationUnpublishPersonArgs = {
  from?: ReadonlyArray<Stage>;
  where: PersonWhereUniqueInput;
};


export type MutationUnpublishProductArgs = {
  from?: ReadonlyArray<Stage>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: ProductWhereUniqueInput;
};


export type MutationUnpublishReviewArgs = {
  from?: ReadonlyArray<Stage>;
  where: ReviewWhereUniqueInput;
};


export type MutationUnpublishUnauthCartArgs = {
  from?: ReadonlyArray<Stage>;
  where: UnauthCartWhereUniqueInput;
};


export type MutationUpdateAccountArgs = {
  data: AccountUpdateInput;
  where: AccountWhereUniqueInput;
};


export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpdateCartArgs = {
  data: CartUpdateInput;
  where: CartWhereUniqueInput;
};


export type MutationUpdateCartItemArgs = {
  data: CartItemUpdateInput;
  where: CartItemWhereUniqueInput;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpdateCollectionArgs = {
  data: CollectionUpdateInput;
  where: CollectionWhereUniqueInput;
};


export type MutationUpdateCurrencyArgs = {
  data: CurrencyUpdateInput;
  where: CurrencyWhereUniqueInput;
};


export type MutationUpdateManyAccountsArgs = {
  data: AccountUpdateManyInput;
  where?: InputMaybe<AccountManyWhereInput>;
};


export type MutationUpdateManyAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: AccountUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AccountManyWhereInput>;
};


export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyInput;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUpdateManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: AssetUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUpdateManyCartItemsArgs = {
  data: CartItemUpdateManyInput;
  where?: InputMaybe<CartItemManyWhereInput>;
};


export type MutationUpdateManyCartItemsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: CartItemUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CartItemManyWhereInput>;
};


export type MutationUpdateManyCartsArgs = {
  data: CartUpdateManyInput;
  where?: InputMaybe<CartManyWhereInput>;
};


export type MutationUpdateManyCartsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: CartUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CartManyWhereInput>;
};


export type MutationUpdateManyCategoriesArgs = {
  data: CategoryUpdateManyInput;
  where?: InputMaybe<CategoryManyWhereInput>;
};


export type MutationUpdateManyCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: CategoryUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CategoryManyWhereInput>;
};


export type MutationUpdateManyCollectionsArgs = {
  data: CollectionUpdateManyInput;
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationUpdateManyCollectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: CollectionUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationUpdateManyCurrenciesArgs = {
  data: CurrencyUpdateManyInput;
  where?: InputMaybe<CurrencyManyWhereInput>;
};


export type MutationUpdateManyCurrenciesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: CurrencyUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CurrencyManyWhereInput>;
};


export type MutationUpdateManyOptionsArgs = {
  data: OptionUpdateManyInput;
  where?: InputMaybe<OptionManyWhereInput>;
};


export type MutationUpdateManyOptionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: OptionUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OptionManyWhereInput>;
};


export type MutationUpdateManyOrderItemsArgs = {
  data: OrderItemUpdateManyInput;
  where?: InputMaybe<OrderItemManyWhereInput>;
};


export type MutationUpdateManyOrderItemsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: OrderItemUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrderItemManyWhereInput>;
};


export type MutationUpdateManyOrdersArgs = {
  data: OrderUpdateManyInput;
  where?: InputMaybe<OrderManyWhereInput>;
};


export type MutationUpdateManyOrdersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: OrderUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrderManyWhereInput>;
};


export type MutationUpdateManyPeopleArgs = {
  data: PersonUpdateManyInput;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationUpdateManyPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: PersonUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationUpdateManyProductsArgs = {
  data: ProductUpdateManyInput;
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationUpdateManyProductsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: ProductUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationUpdateManyReviewsArgs = {
  data: ReviewUpdateManyInput;
  where?: InputMaybe<ReviewManyWhereInput>;
};


export type MutationUpdateManyReviewsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: ReviewUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ReviewManyWhereInput>;
};


export type MutationUpdateManyUnauthCartsArgs = {
  data: UnauthCartUpdateManyInput;
  where?: InputMaybe<UnauthCartManyWhereInput>;
};


export type MutationUpdateManyUnauthCartsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: UnauthCartUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UnauthCartManyWhereInput>;
};


export type MutationUpdateOptionArgs = {
  data: OptionUpdateInput;
  where: OptionWhereUniqueInput;
};


export type MutationUpdateOrderArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};


export type MutationUpdateOrderItemArgs = {
  data: OrderItemUpdateInput;
  where: OrderItemWhereUniqueInput;
};


export type MutationUpdatePersonArgs = {
  data: PersonUpdateInput;
  where: PersonWhereUniqueInput;
};


export type MutationUpdateProductArgs = {
  data: ProductUpdateInput;
  where: ProductWhereUniqueInput;
};


export type MutationUpdateReviewArgs = {
  data: ReviewUpdateInput;
  where: ReviewWhereUniqueInput;
};


export type MutationUpdateScheduledReleaseArgs = {
  data: ScheduledReleaseUpdateInput;
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationUpdateUnauthCartArgs = {
  data: UnauthCartUpdateInput;
  where: UnauthCartWhereUniqueInput;
};


export type MutationUpsertAccountArgs = {
  upsert: AccountUpsertInput;
  where: AccountWhereUniqueInput;
};


export type MutationUpsertAssetArgs = {
  upsert: AssetUpsertInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpsertCartArgs = {
  upsert: CartUpsertInput;
  where: CartWhereUniqueInput;
};


export type MutationUpsertCartItemArgs = {
  upsert: CartItemUpsertInput;
  where: CartItemWhereUniqueInput;
};


export type MutationUpsertCategoryArgs = {
  upsert: CategoryUpsertInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpsertCollectionArgs = {
  upsert: CollectionUpsertInput;
  where: CollectionWhereUniqueInput;
};


export type MutationUpsertCurrencyArgs = {
  upsert: CurrencyUpsertInput;
  where: CurrencyWhereUniqueInput;
};


export type MutationUpsertOptionArgs = {
  upsert: OptionUpsertInput;
  where: OptionWhereUniqueInput;
};


export type MutationUpsertOrderArgs = {
  upsert: OrderUpsertInput;
  where: OrderWhereUniqueInput;
};


export type MutationUpsertOrderItemArgs = {
  upsert: OrderItemUpsertInput;
  where: OrderItemWhereUniqueInput;
};


export type MutationUpsertPersonArgs = {
  upsert: PersonUpsertInput;
  where: PersonWhereUniqueInput;
};


export type MutationUpsertProductArgs = {
  upsert: ProductUpsertInput;
  where: ProductWhereUniqueInput;
};


export type MutationUpsertReviewArgs = {
  upsert: ReviewUpsertInput;
  where: ReviewWhereUniqueInput;
};


export type MutationUpsertUnauthCartArgs = {
  upsert: UnauthCartUpsertInput;
  where: UnauthCartWhereUniqueInput;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  readonly id: Scalars['ID'];
  /** The Stage of an object */
  readonly stage: Stage;
};

export type Option = Node & {
  readonly __typename?: 'Option';
  readonly color?: Maybe<ProductColor>;
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<Option>;
  /** List of Option versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  /** System Locale field */
  readonly locale: Locale;
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<Option>;
  readonly product?: Maybe<Product>;
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  readonly size?: Maybe<ProductSize>;
  /** System stage field */
  readonly stage: Stage;
  /** Total amount of product variant in stock */
  readonly total: Scalars['Int'];
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


export type OptionCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type OptionCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type OptionDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


export type OptionHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type OptionLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean'];
  locales?: ReadonlyArray<Locale>;
};


export type OptionProductArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type OptionPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type OptionPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type OptionScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type OptionUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type OptionUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type OptionConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: OptionWhereUniqueInput;
};

/** A connection to a list of items. */
export type OptionConnection = {
  readonly __typename?: 'OptionConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<OptionEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type OptionCreateInput = {
  readonly cl9shfkzq1zk301t879hz487t?: InputMaybe<CartItemCreateManyInlineInput>;
  readonly cld8y7xd907ii01upgg80869c?: InputMaybe<OrderItemCreateManyInlineInput>;
  /** color input for default locale (en) */
  readonly color?: InputMaybe<ProductColor>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: InputMaybe<OptionCreateLocalizationsInput>;
  readonly product?: InputMaybe<ProductCreateOneInlineInput>;
  /** size input for default locale (en) */
  readonly size?: InputMaybe<ProductSize>;
  readonly total: Scalars['Int'];
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type OptionCreateLocalizationDataInput = {
  readonly color?: InputMaybe<ProductColor>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly size?: InputMaybe<ProductSize>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type OptionCreateLocalizationInput = {
  /** Localization input */
  readonly data: OptionCreateLocalizationDataInput;
  readonly locale: Locale;
};

export type OptionCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: InputMaybe<ReadonlyArray<OptionCreateLocalizationInput>>;
};

export type OptionCreateManyInlineInput = {
  /** Connect multiple existing Option documents */
  readonly connect?: InputMaybe<ReadonlyArray<OptionWhereUniqueInput>>;
  /** Create and connect multiple existing Option documents */
  readonly create?: InputMaybe<ReadonlyArray<OptionCreateInput>>;
};

export type OptionCreateOneInlineInput = {
  /** Connect one existing Option document */
  readonly connect?: InputMaybe<OptionWhereUniqueInput>;
  /** Create and connect one Option document */
  readonly create?: InputMaybe<OptionCreateInput>;
};

/** An edge in a connection. */
export type OptionEdge = {
  readonly __typename?: 'OptionEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Option;
};

/** Identifies documents */
export type OptionManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<OptionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<OptionWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<OptionWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<OptionWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<OptionWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<OptionWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly product?: InputMaybe<ProductWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly total?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  readonly total_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  readonly total_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  readonly total_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  readonly total_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  readonly total_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  readonly total_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  readonly total_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum OptionOrderByInput {
  ColorAsc = 'color_ASC',
  ColorDesc = 'color_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  TotalAsc = 'total_ASC',
  TotalDesc = 'total_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type OptionUpdateInput = {
  readonly cl9shfkzq1zk301t879hz487t?: InputMaybe<CartItemUpdateManyInlineInput>;
  readonly cld8y7xd907ii01upgg80869c?: InputMaybe<OrderItemUpdateManyInlineInput>;
  /** color input for default locale (en) */
  readonly color?: InputMaybe<ProductColor>;
  /** Manage document localizations */
  readonly localizations?: InputMaybe<OptionUpdateLocalizationsInput>;
  readonly product?: InputMaybe<ProductUpdateOneInlineInput>;
  /** size input for default locale (en) */
  readonly size?: InputMaybe<ProductSize>;
  readonly total?: InputMaybe<Scalars['Int']>;
};

export type OptionUpdateLocalizationDataInput = {
  readonly color?: InputMaybe<ProductColor>;
  readonly size?: InputMaybe<ProductSize>;
};

export type OptionUpdateLocalizationInput = {
  readonly data: OptionUpdateLocalizationDataInput;
  readonly locale: Locale;
};

export type OptionUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: InputMaybe<ReadonlyArray<OptionCreateLocalizationInput>>;
  /** Localizations to delete */
  readonly delete?: InputMaybe<ReadonlyArray<Locale>>;
  /** Localizations to update */
  readonly update?: InputMaybe<ReadonlyArray<OptionUpdateLocalizationInput>>;
  readonly upsert?: InputMaybe<ReadonlyArray<OptionUpsertLocalizationInput>>;
};

export type OptionUpdateManyInlineInput = {
  /** Connect multiple existing Option documents */
  readonly connect?: InputMaybe<ReadonlyArray<OptionConnectInput>>;
  /** Create and connect multiple Option documents */
  readonly create?: InputMaybe<ReadonlyArray<OptionCreateInput>>;
  /** Delete multiple Option documents */
  readonly delete?: InputMaybe<ReadonlyArray<OptionWhereUniqueInput>>;
  /** Disconnect multiple Option documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<OptionWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Option documents */
  readonly set?: InputMaybe<ReadonlyArray<OptionWhereUniqueInput>>;
  /** Update multiple Option documents */
  readonly update?: InputMaybe<ReadonlyArray<OptionUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Option documents */
  readonly upsert?: InputMaybe<ReadonlyArray<OptionUpsertWithNestedWhereUniqueInput>>;
};

export type OptionUpdateManyInput = {
  /** color input for default locale (en) */
  readonly color?: InputMaybe<ProductColor>;
  /** Optional updates to localizations */
  readonly localizations?: InputMaybe<OptionUpdateManyLocalizationsInput>;
  /** size input for default locale (en) */
  readonly size?: InputMaybe<ProductSize>;
  readonly total?: InputMaybe<Scalars['Int']>;
};

export type OptionUpdateManyLocalizationDataInput = {
  readonly color?: InputMaybe<ProductColor>;
  readonly size?: InputMaybe<ProductSize>;
};

export type OptionUpdateManyLocalizationInput = {
  readonly data: OptionUpdateManyLocalizationDataInput;
  readonly locale: Locale;
};

export type OptionUpdateManyLocalizationsInput = {
  /** Localizations to update */
  readonly update?: InputMaybe<ReadonlyArray<OptionUpdateManyLocalizationInput>>;
};

export type OptionUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: OptionUpdateManyInput;
  /** Document search */
  readonly where: OptionWhereInput;
};

export type OptionUpdateOneInlineInput = {
  /** Connect existing Option document */
  readonly connect?: InputMaybe<OptionWhereUniqueInput>;
  /** Create and connect one Option document */
  readonly create?: InputMaybe<OptionCreateInput>;
  /** Delete currently connected Option document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Option document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Option document */
  readonly update?: InputMaybe<OptionUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Option document */
  readonly upsert?: InputMaybe<OptionUpsertWithNestedWhereUniqueInput>;
};

export type OptionUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: OptionUpdateInput;
  /** Unique document search */
  readonly where: OptionWhereUniqueInput;
};

export type OptionUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: OptionCreateInput;
  /** Update document if it exists */
  readonly update: OptionUpdateInput;
};

export type OptionUpsertLocalizationInput = {
  readonly create: OptionCreateLocalizationDataInput;
  readonly locale: Locale;
  readonly update: OptionUpdateLocalizationDataInput;
};

export type OptionUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: OptionUpsertInput;
  /** Unique document search */
  readonly where: OptionWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type OptionWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type OptionWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<OptionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<OptionWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<OptionWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly color?: InputMaybe<ProductColor>;
  /** All values that are contained in given list. */
  readonly color_in?: InputMaybe<ReadonlyArray<InputMaybe<ProductColor>>>;
  /** All values that are not equal to given value. */
  readonly color_not?: InputMaybe<ProductColor>;
  /** All values that are not contained in given list. */
  readonly color_not_in?: InputMaybe<ReadonlyArray<InputMaybe<ProductColor>>>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<OptionWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<OptionWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<OptionWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly product?: InputMaybe<ProductWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly size?: InputMaybe<ProductSize>;
  /** All values that are contained in given list. */
  readonly size_in?: InputMaybe<ReadonlyArray<InputMaybe<ProductSize>>>;
  /** All values that are not equal to given value. */
  readonly size_not?: InputMaybe<ProductSize>;
  /** All values that are not contained in given list. */
  readonly size_not_in?: InputMaybe<ReadonlyArray<InputMaybe<ProductSize>>>;
  readonly total?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  readonly total_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  readonly total_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  readonly total_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  readonly total_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  readonly total_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  readonly total_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  readonly total_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type OptionWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<OptionWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<OptionWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<OptionWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<OptionWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References Option record uniquely */
export type OptionWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

export type Order = Node & {
  readonly __typename?: 'Order';
  readonly account?: Maybe<Account>;
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<Order>;
  readonly email?: Maybe<Scalars['String']>;
  /** List of Order versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  readonly orderItems: ReadonlyArray<OrderItem>;
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  /** System stage field */
  readonly stage: Stage;
  readonly stripeCheckoutId?: Maybe<Scalars['String']>;
  readonly stripePaymentIntentStatus?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


export type OrderAccountArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type OrderCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type OrderDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


export type OrderHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type OrderOrderItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  orderBy?: InputMaybe<OrderItemOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrderItemWhereInput>;
};


export type OrderPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type OrderScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type OrderUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type OrderConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: OrderWhereUniqueInput;
};

/** A connection to a list of items. */
export type OrderConnection = {
  readonly __typename?: 'OrderConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<OrderEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type OrderCreateInput = {
  readonly account?: InputMaybe<AccountCreateOneInlineInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly email?: InputMaybe<Scalars['String']>;
  readonly orderItems?: InputMaybe<OrderItemCreateManyInlineInput>;
  readonly stripeCheckoutId?: InputMaybe<Scalars['String']>;
  readonly stripePaymentIntentStatus?: InputMaybe<Scalars['String']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type OrderCreateManyInlineInput = {
  /** Connect multiple existing Order documents */
  readonly connect?: InputMaybe<ReadonlyArray<OrderWhereUniqueInput>>;
  /** Create and connect multiple existing Order documents */
  readonly create?: InputMaybe<ReadonlyArray<OrderCreateInput>>;
};

export type OrderCreateOneInlineInput = {
  /** Connect one existing Order document */
  readonly connect?: InputMaybe<OrderWhereUniqueInput>;
  /** Create and connect one Order document */
  readonly create?: InputMaybe<OrderCreateInput>;
};

/** An edge in a connection. */
export type OrderEdge = {
  readonly __typename?: 'OrderEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Order;
};

export type OrderItem = Node & {
  readonly __typename?: 'OrderItem';
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<OrderItem>;
  /** List of OrderItem versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  readonly option?: Maybe<Option>;
  readonly order?: Maybe<Order>;
  readonly price?: Maybe<Scalars['Int']>;
  readonly productName?: Maybe<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly quantity: Scalars['Int'];
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


export type OrderItemCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type OrderItemDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


export type OrderItemHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type OrderItemOptionArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type OrderItemOrderArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type OrderItemPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type OrderItemScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type OrderItemUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type OrderItemConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: OrderItemWhereUniqueInput;
};

/** A connection to a list of items. */
export type OrderItemConnection = {
  readonly __typename?: 'OrderItemConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<OrderItemEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type OrderItemCreateInput = {
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly option?: InputMaybe<OptionCreateOneInlineInput>;
  readonly order?: InputMaybe<OrderCreateOneInlineInput>;
  readonly price?: InputMaybe<Scalars['Int']>;
  readonly productName?: InputMaybe<Scalars['String']>;
  readonly quantity: Scalars['Int'];
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type OrderItemCreateManyInlineInput = {
  /** Connect multiple existing OrderItem documents */
  readonly connect?: InputMaybe<ReadonlyArray<OrderItemWhereUniqueInput>>;
  /** Create and connect multiple existing OrderItem documents */
  readonly create?: InputMaybe<ReadonlyArray<OrderItemCreateInput>>;
};

export type OrderItemCreateOneInlineInput = {
  /** Connect one existing OrderItem document */
  readonly connect?: InputMaybe<OrderItemWhereUniqueInput>;
  /** Create and connect one OrderItem document */
  readonly create?: InputMaybe<OrderItemCreateInput>;
};

/** An edge in a connection. */
export type OrderItemEdge = {
  readonly __typename?: 'OrderItemEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: OrderItem;
};

/** Identifies documents */
export type OrderItemManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<OrderItemWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<OrderItemWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<OrderItemWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<OrderItemWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<OrderItemWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<OrderItemWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly option?: InputMaybe<OptionWhereInput>;
  readonly order?: InputMaybe<OrderWhereInput>;
  readonly price?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  readonly price_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  readonly price_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  readonly price_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  readonly price_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  readonly price_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  readonly price_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  readonly price_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly productName?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly productName_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly productName_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly productName_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly productName_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly productName_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly productName_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly productName_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly productName_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly productName_starts_with?: InputMaybe<Scalars['String']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly quantity?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  readonly quantity_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  readonly quantity_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  readonly quantity_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  readonly quantity_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  readonly quantity_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  readonly quantity_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  readonly quantity_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum OrderItemOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PriceAsc = 'price_ASC',
  PriceDesc = 'price_DESC',
  ProductNameAsc = 'productName_ASC',
  ProductNameDesc = 'productName_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  QuantityAsc = 'quantity_ASC',
  QuantityDesc = 'quantity_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type OrderItemUpdateInput = {
  readonly option?: InputMaybe<OptionUpdateOneInlineInput>;
  readonly order?: InputMaybe<OrderUpdateOneInlineInput>;
  readonly price?: InputMaybe<Scalars['Int']>;
  readonly productName?: InputMaybe<Scalars['String']>;
  readonly quantity?: InputMaybe<Scalars['Int']>;
};

export type OrderItemUpdateManyInlineInput = {
  /** Connect multiple existing OrderItem documents */
  readonly connect?: InputMaybe<ReadonlyArray<OrderItemConnectInput>>;
  /** Create and connect multiple OrderItem documents */
  readonly create?: InputMaybe<ReadonlyArray<OrderItemCreateInput>>;
  /** Delete multiple OrderItem documents */
  readonly delete?: InputMaybe<ReadonlyArray<OrderItemWhereUniqueInput>>;
  /** Disconnect multiple OrderItem documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<OrderItemWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing OrderItem documents */
  readonly set?: InputMaybe<ReadonlyArray<OrderItemWhereUniqueInput>>;
  /** Update multiple OrderItem documents */
  readonly update?: InputMaybe<ReadonlyArray<OrderItemUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple OrderItem documents */
  readonly upsert?: InputMaybe<ReadonlyArray<OrderItemUpsertWithNestedWhereUniqueInput>>;
};

export type OrderItemUpdateManyInput = {
  readonly price?: InputMaybe<Scalars['Int']>;
  readonly productName?: InputMaybe<Scalars['String']>;
  readonly quantity?: InputMaybe<Scalars['Int']>;
};

export type OrderItemUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: OrderItemUpdateManyInput;
  /** Document search */
  readonly where: OrderItemWhereInput;
};

export type OrderItemUpdateOneInlineInput = {
  /** Connect existing OrderItem document */
  readonly connect?: InputMaybe<OrderItemWhereUniqueInput>;
  /** Create and connect one OrderItem document */
  readonly create?: InputMaybe<OrderItemCreateInput>;
  /** Delete currently connected OrderItem document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected OrderItem document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single OrderItem document */
  readonly update?: InputMaybe<OrderItemUpdateWithNestedWhereUniqueInput>;
  /** Upsert single OrderItem document */
  readonly upsert?: InputMaybe<OrderItemUpsertWithNestedWhereUniqueInput>;
};

export type OrderItemUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: OrderItemUpdateInput;
  /** Unique document search */
  readonly where: OrderItemWhereUniqueInput;
};

export type OrderItemUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: OrderItemCreateInput;
  /** Update document if it exists */
  readonly update: OrderItemUpdateInput;
};

export type OrderItemUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: OrderItemUpsertInput;
  /** Unique document search */
  readonly where: OrderItemWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type OrderItemWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type OrderItemWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<OrderItemWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<OrderItemWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<OrderItemWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<OrderItemWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<OrderItemWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<OrderItemWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly option?: InputMaybe<OptionWhereInput>;
  readonly order?: InputMaybe<OrderWhereInput>;
  readonly price?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  readonly price_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  readonly price_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  readonly price_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  readonly price_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  readonly price_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  readonly price_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  readonly price_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly productName?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly productName_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly productName_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly productName_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly productName_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly productName_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly productName_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly productName_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly productName_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly productName_starts_with?: InputMaybe<Scalars['String']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly quantity?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  readonly quantity_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  readonly quantity_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  readonly quantity_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  readonly quantity_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  readonly quantity_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  readonly quantity_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  readonly quantity_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type OrderItemWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<OrderItemWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<OrderItemWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<OrderItemWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<OrderItemWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References OrderItem record uniquely */
export type OrderItemWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

/** Identifies documents */
export type OrderManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<OrderWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<OrderWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<OrderWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly account?: InputMaybe<AccountWhereInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<OrderWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<OrderWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<OrderWhereStageInput>;
  readonly email?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly email_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly email_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly email_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly email_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly email_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly email_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly email_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly email_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly email_starts_with?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly orderItems_every?: InputMaybe<OrderItemWhereInput>;
  readonly orderItems_none?: InputMaybe<OrderItemWhereInput>;
  readonly orderItems_some?: InputMaybe<OrderItemWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly stripeCheckoutId?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly stripeCheckoutId_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly stripeCheckoutId_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly stripeCheckoutId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly stripeCheckoutId_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly stripeCheckoutId_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly stripeCheckoutId_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly stripeCheckoutId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly stripeCheckoutId_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly stripeCheckoutId_starts_with?: InputMaybe<Scalars['String']>;
  readonly stripePaymentIntentStatus?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly stripePaymentIntentStatus_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly stripePaymentIntentStatus_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly stripePaymentIntentStatus_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly stripePaymentIntentStatus_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly stripePaymentIntentStatus_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly stripePaymentIntentStatus_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly stripePaymentIntentStatus_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly stripePaymentIntentStatus_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly stripePaymentIntentStatus_starts_with?: InputMaybe<Scalars['String']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum OrderOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  StripeCheckoutIdAsc = 'stripeCheckoutId_ASC',
  StripeCheckoutIdDesc = 'stripeCheckoutId_DESC',
  StripePaymentIntentStatusAsc = 'stripePaymentIntentStatus_ASC',
  StripePaymentIntentStatusDesc = 'stripePaymentIntentStatus_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type OrderUpdateInput = {
  readonly account?: InputMaybe<AccountUpdateOneInlineInput>;
  readonly email?: InputMaybe<Scalars['String']>;
  readonly orderItems?: InputMaybe<OrderItemUpdateManyInlineInput>;
  readonly stripeCheckoutId?: InputMaybe<Scalars['String']>;
  readonly stripePaymentIntentStatus?: InputMaybe<Scalars['String']>;
};

export type OrderUpdateManyInlineInput = {
  /** Connect multiple existing Order documents */
  readonly connect?: InputMaybe<ReadonlyArray<OrderConnectInput>>;
  /** Create and connect multiple Order documents */
  readonly create?: InputMaybe<ReadonlyArray<OrderCreateInput>>;
  /** Delete multiple Order documents */
  readonly delete?: InputMaybe<ReadonlyArray<OrderWhereUniqueInput>>;
  /** Disconnect multiple Order documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<OrderWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Order documents */
  readonly set?: InputMaybe<ReadonlyArray<OrderWhereUniqueInput>>;
  /** Update multiple Order documents */
  readonly update?: InputMaybe<ReadonlyArray<OrderUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Order documents */
  readonly upsert?: InputMaybe<ReadonlyArray<OrderUpsertWithNestedWhereUniqueInput>>;
};

export type OrderUpdateManyInput = {
  readonly email?: InputMaybe<Scalars['String']>;
  readonly stripeCheckoutId?: InputMaybe<Scalars['String']>;
  readonly stripePaymentIntentStatus?: InputMaybe<Scalars['String']>;
};

export type OrderUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: OrderUpdateManyInput;
  /** Document search */
  readonly where: OrderWhereInput;
};

export type OrderUpdateOneInlineInput = {
  /** Connect existing Order document */
  readonly connect?: InputMaybe<OrderWhereUniqueInput>;
  /** Create and connect one Order document */
  readonly create?: InputMaybe<OrderCreateInput>;
  /** Delete currently connected Order document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Order document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Order document */
  readonly update?: InputMaybe<OrderUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Order document */
  readonly upsert?: InputMaybe<OrderUpsertWithNestedWhereUniqueInput>;
};

export type OrderUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: OrderUpdateInput;
  /** Unique document search */
  readonly where: OrderWhereUniqueInput;
};

export type OrderUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: OrderCreateInput;
  /** Update document if it exists */
  readonly update: OrderUpdateInput;
};

export type OrderUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: OrderUpsertInput;
  /** Unique document search */
  readonly where: OrderWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type OrderWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type OrderWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<OrderWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<OrderWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<OrderWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly account?: InputMaybe<AccountWhereInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<OrderWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<OrderWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<OrderWhereStageInput>;
  readonly email?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly email_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly email_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly email_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly email_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly email_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly email_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly email_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly email_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly email_starts_with?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly orderItems_every?: InputMaybe<OrderItemWhereInput>;
  readonly orderItems_none?: InputMaybe<OrderItemWhereInput>;
  readonly orderItems_some?: InputMaybe<OrderItemWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly stripeCheckoutId?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly stripeCheckoutId_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly stripeCheckoutId_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly stripeCheckoutId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly stripeCheckoutId_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly stripeCheckoutId_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly stripeCheckoutId_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly stripeCheckoutId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly stripeCheckoutId_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly stripeCheckoutId_starts_with?: InputMaybe<Scalars['String']>;
  readonly stripePaymentIntentStatus?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly stripePaymentIntentStatus_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly stripePaymentIntentStatus_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly stripePaymentIntentStatus_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly stripePaymentIntentStatus_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly stripePaymentIntentStatus_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly stripePaymentIntentStatus_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly stripePaymentIntentStatus_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly stripePaymentIntentStatus_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly stripePaymentIntentStatus_starts_with?: InputMaybe<Scalars['String']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type OrderWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<OrderWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<OrderWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<OrderWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<OrderWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References Order record uniquely */
export type OrderWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  readonly __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  readonly endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  readonly hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  readonly hasPreviousPage: Scalars['Boolean'];
  /** Number of items in the current page. */
  readonly pageSize?: Maybe<Scalars['Int']>;
  /** When paginating backwards, the cursor to continue. */
  readonly startCursor?: Maybe<Scalars['String']>;
};

export type Person = Node & {
  readonly __typename?: 'Person';
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<Person>;
  /** List of Person versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


export type PersonCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type PersonDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


export type PersonHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type PersonPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type PersonScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type PersonUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type PersonConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: PersonWhereUniqueInput;
};

/** A connection to a list of items. */
export type PersonConnection = {
  readonly __typename?: 'PersonConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<PersonEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type PersonCreateInput = {
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonCreateManyInlineInput = {
  /** Connect multiple existing Person documents */
  readonly connect?: InputMaybe<ReadonlyArray<PersonWhereUniqueInput>>;
  /** Create and connect multiple existing Person documents */
  readonly create?: InputMaybe<ReadonlyArray<PersonCreateInput>>;
};

export type PersonCreateOneInlineInput = {
  /** Connect one existing Person document */
  readonly connect?: InputMaybe<PersonWhereUniqueInput>;
  /** Create and connect one Person document */
  readonly create?: InputMaybe<PersonCreateInput>;
};

/** An edge in a connection. */
export type PersonEdge = {
  readonly __typename?: 'PersonEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Person;
};

/** Identifies documents */
export type PersonManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<PersonWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<PersonWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<PersonWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<PersonWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<PersonWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<PersonWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum PersonOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type PersonUpdateInput = {
  /** No fields in update input */
  readonly _?: InputMaybe<Scalars['String']>;
};

export type PersonUpdateManyInlineInput = {
  /** Connect multiple existing Person documents */
  readonly connect?: InputMaybe<ReadonlyArray<PersonConnectInput>>;
  /** Create and connect multiple Person documents */
  readonly create?: InputMaybe<ReadonlyArray<PersonCreateInput>>;
  /** Delete multiple Person documents */
  readonly delete?: InputMaybe<ReadonlyArray<PersonWhereUniqueInput>>;
  /** Disconnect multiple Person documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<PersonWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Person documents */
  readonly set?: InputMaybe<ReadonlyArray<PersonWhereUniqueInput>>;
  /** Update multiple Person documents */
  readonly update?: InputMaybe<ReadonlyArray<PersonUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Person documents */
  readonly upsert?: InputMaybe<ReadonlyArray<PersonUpsertWithNestedWhereUniqueInput>>;
};

export type PersonUpdateManyInput = {
  /** No fields in updateMany data input */
  readonly _?: InputMaybe<Scalars['String']>;
};

export type PersonUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: PersonUpdateManyInput;
  /** Document search */
  readonly where: PersonWhereInput;
};

export type PersonUpdateOneInlineInput = {
  /** Connect existing Person document */
  readonly connect?: InputMaybe<PersonWhereUniqueInput>;
  /** Create and connect one Person document */
  readonly create?: InputMaybe<PersonCreateInput>;
  /** Delete currently connected Person document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Person document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Person document */
  readonly update?: InputMaybe<PersonUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Person document */
  readonly upsert?: InputMaybe<PersonUpsertWithNestedWhereUniqueInput>;
};

export type PersonUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: PersonUpdateInput;
  /** Unique document search */
  readonly where: PersonWhereUniqueInput;
};

export type PersonUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: PersonCreateInput;
  /** Update document if it exists */
  readonly update: PersonUpdateInput;
};

export type PersonUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: PersonUpsertInput;
  /** Unique document search */
  readonly where: PersonWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type PersonWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type PersonWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<PersonWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<PersonWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<PersonWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<PersonWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<PersonWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<PersonWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type PersonWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<PersonWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<PersonWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<PersonWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<PersonWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References Person record uniquely */
export type PersonWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

export type Product = Node & {
  readonly __typename?: 'Product';
  readonly categories: ReadonlyArray<Category>;
  readonly collections: ReadonlyArray<Collection>;
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  readonly description: Scalars['String'];
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<Product>;
  /** List of Product versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  readonly images: ReadonlyArray<Asset>;
  /** System Locale field */
  readonly locale: Locale;
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<Product>;
  readonly name: Scalars['String'];
  readonly option: ReadonlyArray<Option>;
  readonly price: Scalars['Int'];
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly reviews: ReadonlyArray<Review>;
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  readonly slug: Scalars['String'];
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


export type ProductCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  orderBy?: InputMaybe<CategoryOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type ProductCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  orderBy?: InputMaybe<CollectionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CollectionWhereInput>;
};


export type ProductCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type ProductCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type ProductDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


export type ProductHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type ProductImagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetWhereInput>;
};


export type ProductLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean'];
  locales?: ReadonlyArray<Locale>;
};


export type ProductOptionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  orderBy?: InputMaybe<OptionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OptionWhereInput>;
};


export type ProductPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type ProductPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type ProductReviewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  orderBy?: InputMaybe<ReviewOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ReviewWhereInput>;
};


export type ProductScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type ProductUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type ProductUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export enum ProductColor {
  Black = 'BLACK',
  Pink = 'PINK',
  Purple = 'PURPLE'
}

export type ProductConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: ProductWhereUniqueInput;
};

/** A connection to a list of items. */
export type ProductConnection = {
  readonly __typename?: 'ProductConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<ProductEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type ProductCreateInput = {
  readonly categories?: InputMaybe<CategoryCreateManyInlineInput>;
  readonly collections?: InputMaybe<CollectionCreateManyInlineInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** description input for default locale (en) */
  readonly description: Scalars['String'];
  readonly images?: InputMaybe<AssetCreateManyInlineInput>;
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: InputMaybe<ProductCreateLocalizationsInput>;
  /** name input for default locale (en) */
  readonly name: Scalars['String'];
  readonly option?: InputMaybe<OptionCreateManyInlineInput>;
  /** price input for default locale (en) */
  readonly price: Scalars['Int'];
  readonly reviews?: InputMaybe<ReviewCreateManyInlineInput>;
  readonly slug: Scalars['String'];
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ProductCreateLocalizationDataInput = {
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly description: Scalars['String'];
  readonly name: Scalars['String'];
  readonly price: Scalars['Int'];
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ProductCreateLocalizationInput = {
  /** Localization input */
  readonly data: ProductCreateLocalizationDataInput;
  readonly locale: Locale;
};

export type ProductCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: InputMaybe<ReadonlyArray<ProductCreateLocalizationInput>>;
};

export type ProductCreateManyInlineInput = {
  /** Connect multiple existing Product documents */
  readonly connect?: InputMaybe<ReadonlyArray<ProductWhereUniqueInput>>;
  /** Create and connect multiple existing Product documents */
  readonly create?: InputMaybe<ReadonlyArray<ProductCreateInput>>;
};

export type ProductCreateOneInlineInput = {
  /** Connect one existing Product document */
  readonly connect?: InputMaybe<ProductWhereUniqueInput>;
  /** Create and connect one Product document */
  readonly create?: InputMaybe<ProductCreateInput>;
};

/** An edge in a connection. */
export type ProductEdge = {
  readonly __typename?: 'ProductEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Product;
};

/** Identifies documents */
export type ProductManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<ProductWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<ProductWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<ProductWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly categories_every?: InputMaybe<CategoryWhereInput>;
  readonly categories_none?: InputMaybe<CategoryWhereInput>;
  readonly categories_some?: InputMaybe<CategoryWhereInput>;
  readonly collections_every?: InputMaybe<CollectionWhereInput>;
  readonly collections_none?: InputMaybe<CollectionWhereInput>;
  readonly collections_some?: InputMaybe<CollectionWhereInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<ProductWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<ProductWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<ProductWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly images_every?: InputMaybe<AssetWhereInput>;
  readonly images_none?: InputMaybe<AssetWhereInput>;
  readonly images_some?: InputMaybe<AssetWhereInput>;
  readonly option_every?: InputMaybe<OptionWhereInput>;
  readonly option_none?: InputMaybe<OptionWhereInput>;
  readonly option_some?: InputMaybe<OptionWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly reviews_every?: InputMaybe<ReviewWhereInput>;
  readonly reviews_none?: InputMaybe<ReviewWhereInput>;
  readonly reviews_some?: InputMaybe<ReviewWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly slug?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly slug_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly slug_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly slug_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly slug_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly slug_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly slug_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly slug_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly slug_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly slug_starts_with?: InputMaybe<Scalars['String']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ProductOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PriceAsc = 'price_ASC',
  PriceDesc = 'price_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export enum ProductSize {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL',
  Xl = 'XL',
  Xs = 'XS'
}

export type ProductUpdateInput = {
  readonly categories?: InputMaybe<CategoryUpdateManyInlineInput>;
  readonly collections?: InputMaybe<CollectionUpdateManyInlineInput>;
  /** description input for default locale (en) */
  readonly description?: InputMaybe<Scalars['String']>;
  readonly images?: InputMaybe<AssetUpdateManyInlineInput>;
  /** Manage document localizations */
  readonly localizations?: InputMaybe<ProductUpdateLocalizationsInput>;
  /** name input for default locale (en) */
  readonly name?: InputMaybe<Scalars['String']>;
  readonly option?: InputMaybe<OptionUpdateManyInlineInput>;
  /** price input for default locale (en) */
  readonly price?: InputMaybe<Scalars['Int']>;
  readonly reviews?: InputMaybe<ReviewUpdateManyInlineInput>;
  readonly slug?: InputMaybe<Scalars['String']>;
};

export type ProductUpdateLocalizationDataInput = {
  readonly description?: InputMaybe<Scalars['String']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly price?: InputMaybe<Scalars['Int']>;
};

export type ProductUpdateLocalizationInput = {
  readonly data: ProductUpdateLocalizationDataInput;
  readonly locale: Locale;
};

export type ProductUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: InputMaybe<ReadonlyArray<ProductCreateLocalizationInput>>;
  /** Localizations to delete */
  readonly delete?: InputMaybe<ReadonlyArray<Locale>>;
  /** Localizations to update */
  readonly update?: InputMaybe<ReadonlyArray<ProductUpdateLocalizationInput>>;
  readonly upsert?: InputMaybe<ReadonlyArray<ProductUpsertLocalizationInput>>;
};

export type ProductUpdateManyInlineInput = {
  /** Connect multiple existing Product documents */
  readonly connect?: InputMaybe<ReadonlyArray<ProductConnectInput>>;
  /** Create and connect multiple Product documents */
  readonly create?: InputMaybe<ReadonlyArray<ProductCreateInput>>;
  /** Delete multiple Product documents */
  readonly delete?: InputMaybe<ReadonlyArray<ProductWhereUniqueInput>>;
  /** Disconnect multiple Product documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<ProductWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Product documents */
  readonly set?: InputMaybe<ReadonlyArray<ProductWhereUniqueInput>>;
  /** Update multiple Product documents */
  readonly update?: InputMaybe<ReadonlyArray<ProductUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Product documents */
  readonly upsert?: InputMaybe<ReadonlyArray<ProductUpsertWithNestedWhereUniqueInput>>;
};

export type ProductUpdateManyInput = {
  /** description input for default locale (en) */
  readonly description?: InputMaybe<Scalars['String']>;
  /** Optional updates to localizations */
  readonly localizations?: InputMaybe<ProductUpdateManyLocalizationsInput>;
  /** price input for default locale (en) */
  readonly price?: InputMaybe<Scalars['Int']>;
};

export type ProductUpdateManyLocalizationDataInput = {
  readonly description?: InputMaybe<Scalars['String']>;
  readonly price?: InputMaybe<Scalars['Int']>;
};

export type ProductUpdateManyLocalizationInput = {
  readonly data: ProductUpdateManyLocalizationDataInput;
  readonly locale: Locale;
};

export type ProductUpdateManyLocalizationsInput = {
  /** Localizations to update */
  readonly update?: InputMaybe<ReadonlyArray<ProductUpdateManyLocalizationInput>>;
};

export type ProductUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: ProductUpdateManyInput;
  /** Document search */
  readonly where: ProductWhereInput;
};

export type ProductUpdateOneInlineInput = {
  /** Connect existing Product document */
  readonly connect?: InputMaybe<ProductWhereUniqueInput>;
  /** Create and connect one Product document */
  readonly create?: InputMaybe<ProductCreateInput>;
  /** Delete currently connected Product document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Product document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Product document */
  readonly update?: InputMaybe<ProductUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Product document */
  readonly upsert?: InputMaybe<ProductUpsertWithNestedWhereUniqueInput>;
};

export type ProductUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: ProductUpdateInput;
  /** Unique document search */
  readonly where: ProductWhereUniqueInput;
};

export type ProductUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: ProductCreateInput;
  /** Update document if it exists */
  readonly update: ProductUpdateInput;
};

export type ProductUpsertLocalizationInput = {
  readonly create: ProductCreateLocalizationDataInput;
  readonly locale: Locale;
  readonly update: ProductUpdateLocalizationDataInput;
};

export type ProductUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: ProductUpsertInput;
  /** Unique document search */
  readonly where: ProductWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ProductWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ProductWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<ProductWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<ProductWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<ProductWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly categories_every?: InputMaybe<CategoryWhereInput>;
  readonly categories_none?: InputMaybe<CategoryWhereInput>;
  readonly categories_some?: InputMaybe<CategoryWhereInput>;
  readonly collections_every?: InputMaybe<CollectionWhereInput>;
  readonly collections_none?: InputMaybe<CollectionWhereInput>;
  readonly collections_some?: InputMaybe<CollectionWhereInput>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly description_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly description_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly description_starts_with?: InputMaybe<Scalars['String']>;
  readonly documentInStages_every?: InputMaybe<ProductWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<ProductWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<ProductWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly images_every?: InputMaybe<AssetWhereInput>;
  readonly images_none?: InputMaybe<AssetWhereInput>;
  readonly images_some?: InputMaybe<AssetWhereInput>;
  readonly name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly name_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly name_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly name_starts_with?: InputMaybe<Scalars['String']>;
  readonly option_every?: InputMaybe<OptionWhereInput>;
  readonly option_none?: InputMaybe<OptionWhereInput>;
  readonly option_some?: InputMaybe<OptionWhereInput>;
  readonly price?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  readonly price_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  readonly price_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  readonly price_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  readonly price_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  readonly price_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  readonly price_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  readonly price_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly reviews_every?: InputMaybe<ReviewWhereInput>;
  readonly reviews_none?: InputMaybe<ReviewWhereInput>;
  readonly reviews_some?: InputMaybe<ReviewWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly slug?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly slug_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly slug_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly slug_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly slug_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly slug_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly slug_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly slug_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly slug_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly slug_starts_with?: InputMaybe<Scalars['String']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ProductWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<ProductWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<ProductWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<ProductWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<ProductWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References Product record uniquely */
export type ProductWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly slug?: InputMaybe<Scalars['String']>;
};

export type PublishLocaleInput = {
  /** Locales to publish */
  readonly locale: Locale;
  /** Stages to publish selected locales to */
  readonly stages: ReadonlyArray<Stage>;
};

export type Query = {
  readonly __typename?: 'Query';
  /** Retrieve a single account */
  readonly account?: Maybe<Account>;
  /** Retrieve document version */
  readonly accountVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple accounts */
  readonly accounts: ReadonlyArray<Account>;
  /** Retrieve multiple accounts using the Relay connection interface */
  readonly accountsConnection: AccountConnection;
  /** Retrieve a single asset */
  readonly asset?: Maybe<Asset>;
  /** Retrieve document version */
  readonly assetVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple assets */
  readonly assets: ReadonlyArray<Asset>;
  /** Retrieve multiple assets using the Relay connection interface */
  readonly assetsConnection: AssetConnection;
  /** Retrieve a single cart */
  readonly cart?: Maybe<Cart>;
  /** Retrieve a single cartItem */
  readonly cartItem?: Maybe<CartItem>;
  /** Retrieve document version */
  readonly cartItemVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple cartItems */
  readonly cartItems: ReadonlyArray<CartItem>;
  /** Retrieve multiple cartItems using the Relay connection interface */
  readonly cartItemsConnection: CartItemConnection;
  /** Retrieve document version */
  readonly cartVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple carts */
  readonly carts: ReadonlyArray<Cart>;
  /** Retrieve multiple carts using the Relay connection interface */
  readonly cartsConnection: CartConnection;
  /** Retrieve multiple categories */
  readonly categories: ReadonlyArray<Category>;
  /** Retrieve multiple categories using the Relay connection interface */
  readonly categoriesConnection: CategoryConnection;
  /** Retrieve a single category */
  readonly category?: Maybe<Category>;
  /** Retrieve document version */
  readonly categoryVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single collection */
  readonly collection?: Maybe<Collection>;
  /** Retrieve document version */
  readonly collectionVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple collections */
  readonly collections: ReadonlyArray<Collection>;
  /** Retrieve multiple collections using the Relay connection interface */
  readonly collectionsConnection: CollectionConnection;
  /** Retrieve multiple currencies */
  readonly currencies: ReadonlyArray<Currency>;
  /** Retrieve multiple currencies using the Relay connection interface */
  readonly currenciesConnection: CurrencyConnection;
  /** Retrieve a single currency */
  readonly currency?: Maybe<Currency>;
  /** Retrieve document version */
  readonly currencyVersion?: Maybe<DocumentVersion>;
  /** Fetches an object given its ID */
  readonly node?: Maybe<Node>;
  /** Retrieve a single option */
  readonly option?: Maybe<Option>;
  /** Retrieve document version */
  readonly optionVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple options */
  readonly options: ReadonlyArray<Option>;
  /** Retrieve multiple options using the Relay connection interface */
  readonly optionsConnection: OptionConnection;
  /** Retrieve a single order */
  readonly order?: Maybe<Order>;
  /** Retrieve a single orderItem */
  readonly orderItem?: Maybe<OrderItem>;
  /** Retrieve document version */
  readonly orderItemVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple orderItems */
  readonly orderItems: ReadonlyArray<OrderItem>;
  /** Retrieve multiple orderItems using the Relay connection interface */
  readonly orderItemsConnection: OrderItemConnection;
  /** Retrieve document version */
  readonly orderVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple orders */
  readonly orders: ReadonlyArray<Order>;
  /** Retrieve multiple orders using the Relay connection interface */
  readonly ordersConnection: OrderConnection;
  /** Retrieve multiple people */
  readonly people: ReadonlyArray<Person>;
  /** Retrieve multiple people using the Relay connection interface */
  readonly peopleConnection: PersonConnection;
  /** Retrieve a single person */
  readonly person?: Maybe<Person>;
  /** Retrieve document version */
  readonly personVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single product */
  readonly product?: Maybe<Product>;
  /** Retrieve document version */
  readonly productVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple products */
  readonly products: ReadonlyArray<Product>;
  /** Retrieve multiple products using the Relay connection interface */
  readonly productsConnection: ProductConnection;
  /** Retrieve a single review */
  readonly review?: Maybe<Review>;
  /** Retrieve document version */
  readonly reviewVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple reviews */
  readonly reviews: ReadonlyArray<Review>;
  /** Retrieve multiple reviews using the Relay connection interface */
  readonly reviewsConnection: ReviewConnection;
  /** Retrieve a single scheduledOperation */
  readonly scheduledOperation?: Maybe<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations */
  readonly scheduledOperations: ReadonlyArray<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations using the Relay connection interface */
  readonly scheduledOperationsConnection: ScheduledOperationConnection;
  /** Retrieve a single scheduledRelease */
  readonly scheduledRelease?: Maybe<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases */
  readonly scheduledReleases: ReadonlyArray<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases using the Relay connection interface */
  readonly scheduledReleasesConnection: ScheduledReleaseConnection;
  /** Retrieve a single unauthCart */
  readonly unauthCart?: Maybe<UnauthCart>;
  /** Retrieve document version */
  readonly unauthCartVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple unauthCarts */
  readonly unauthCarts: ReadonlyArray<UnauthCart>;
  /** Retrieve multiple unauthCarts using the Relay connection interface */
  readonly unauthCartsConnection: UnauthCartConnection;
  /** Retrieve a single user */
  readonly user?: Maybe<User>;
  /** Retrieve multiple users */
  readonly users: ReadonlyArray<User>;
  /** Retrieve multiple users using the Relay connection interface */
  readonly usersConnection: UserConnection;
};


export type QueryAccountArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: AccountWhereUniqueInput;
};


export type QueryAccountVersionArgs = {
  where: VersionWhereInput;
};


export type QueryAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<AccountOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<AccountOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryAssetArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: AssetWhereUniqueInput;
};


export type QueryAssetVersionArgs = {
  where: VersionWhereInput;
};


export type QueryAssetsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryCartArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: CartWhereUniqueInput;
};


export type QueryCartItemArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: CartItemWhereUniqueInput;
};


export type QueryCartItemVersionArgs = {
  where: VersionWhereInput;
};


export type QueryCartItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<CartItemOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CartItemWhereInput>;
};


export type QueryCartItemsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<CartItemOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CartItemWhereInput>;
};


export type QueryCartVersionArgs = {
  where: VersionWhereInput;
};


export type QueryCartsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<CartOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CartWhereInput>;
};


export type QueryCartsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<CartOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CartWhereInput>;
};


export type QueryCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<CategoryOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<CategoryOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryCategoryArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: CategoryWhereUniqueInput;
};


export type QueryCategoryVersionArgs = {
  where: VersionWhereInput;
};


export type QueryCollectionArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: CollectionWhereUniqueInput;
};


export type QueryCollectionVersionArgs = {
  where: VersionWhereInput;
};


export type QueryCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<CollectionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CollectionWhereInput>;
};


export type QueryCollectionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<CollectionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CollectionWhereInput>;
};


export type QueryCurrenciesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<CurrencyOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CurrencyWhereInput>;
};


export type QueryCurrenciesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<CurrencyOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CurrencyWhereInput>;
};


export type QueryCurrencyArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: CurrencyWhereUniqueInput;
};


export type QueryCurrencyVersionArgs = {
  where: VersionWhereInput;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
};


export type QueryOptionArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: OptionWhereUniqueInput;
};


export type QueryOptionVersionArgs = {
  where: VersionWhereInput;
};


export type QueryOptionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<OptionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<OptionWhereInput>;
};


export type QueryOptionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<OptionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<OptionWhereInput>;
};


export type QueryOrderArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: OrderWhereUniqueInput;
};


export type QueryOrderItemArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: OrderItemWhereUniqueInput;
};


export type QueryOrderItemVersionArgs = {
  where: VersionWhereInput;
};


export type QueryOrderItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<OrderItemOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<OrderItemWhereInput>;
};


export type QueryOrderItemsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<OrderItemOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<OrderItemWhereInput>;
};


export type QueryOrderVersionArgs = {
  where: VersionWhereInput;
};


export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<OrderOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<OrderWhereInput>;
};


export type QueryOrdersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<OrderOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<OrderWhereInput>;
};


export type QueryPeopleArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<PersonOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<PersonWhereInput>;
};


export type QueryPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<PersonOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<PersonWhereInput>;
};


export type QueryPersonArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: PersonWhereUniqueInput;
};


export type QueryPersonVersionArgs = {
  where: VersionWhereInput;
};


export type QueryProductArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: ProductWhereUniqueInput;
};


export type QueryProductVersionArgs = {
  where: VersionWhereInput;
};


export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<ProductOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ProductWhereInput>;
};


export type QueryProductsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<ProductOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ProductWhereInput>;
};


export type QueryReviewArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: ReviewWhereUniqueInput;
};


export type QueryReviewVersionArgs = {
  where: VersionWhereInput;
};


export type QueryReviewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<ReviewOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ReviewWhereInput>;
};


export type QueryReviewsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<ReviewOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ReviewWhereInput>;
};


export type QueryScheduledOperationArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: ScheduledOperationWhereUniqueInput;
};


export type QueryScheduledOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type QueryScheduledOperationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type QueryScheduledReleaseArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: ScheduledReleaseWhereUniqueInput;
};


export type QueryScheduledReleasesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};


export type QueryScheduledReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};


export type QueryUnauthCartArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: UnauthCartWhereUniqueInput;
};


export type QueryUnauthCartVersionArgs = {
  where: VersionWhereInput;
};


export type QueryUnauthCartsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<UnauthCartOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UnauthCartWhereInput>;
};


export type QueryUnauthCartsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<UnauthCartOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UnauthCartWhereInput>;
};


export type QueryUserArgs = {
  locales?: ReadonlyArray<Locale>;
  stage?: Stage;
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: ReadonlyArray<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type Rgba = {
  readonly __typename?: 'RGBA';
  readonly a: Scalars['RGBATransparency'];
  readonly b: Scalars['RGBAHue'];
  readonly g: Scalars['RGBAHue'];
  readonly r: Scalars['RGBAHue'];
};

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type RgbaInput = {
  readonly a: Scalars['RGBATransparency'];
  readonly b: Scalars['RGBAHue'];
  readonly g: Scalars['RGBAHue'];
  readonly r: Scalars['RGBAHue'];
};

export type Review = Node & {
  readonly __typename?: 'Review';
  readonly content: Scalars['String'];
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<Review>;
  readonly email: Scalars['String'];
  readonly headline?: Maybe<Scalars['String']>;
  /** List of Review versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly product?: Maybe<Product>;
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly rating?: Maybe<Scalars['Int']>;
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


export type ReviewCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type ReviewDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


export type ReviewHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type ReviewProductArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type ReviewPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type ReviewScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type ReviewUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type ReviewConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: ReviewWhereUniqueInput;
};

/** A connection to a list of items. */
export type ReviewConnection = {
  readonly __typename?: 'ReviewConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<ReviewEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type ReviewCreateInput = {
  readonly content: Scalars['String'];
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly email: Scalars['String'];
  readonly headline?: InputMaybe<Scalars['String']>;
  readonly name: Scalars['String'];
  readonly product?: InputMaybe<ProductCreateOneInlineInput>;
  readonly rating?: InputMaybe<Scalars['Int']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ReviewCreateManyInlineInput = {
  /** Connect multiple existing Review documents */
  readonly connect?: InputMaybe<ReadonlyArray<ReviewWhereUniqueInput>>;
  /** Create and connect multiple existing Review documents */
  readonly create?: InputMaybe<ReadonlyArray<ReviewCreateInput>>;
};

export type ReviewCreateOneInlineInput = {
  /** Connect one existing Review document */
  readonly connect?: InputMaybe<ReviewWhereUniqueInput>;
  /** Create and connect one Review document */
  readonly create?: InputMaybe<ReviewCreateInput>;
};

/** An edge in a connection. */
export type ReviewEdge = {
  readonly __typename?: 'ReviewEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Review;
};

/** Identifies documents */
export type ReviewManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<ReviewWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<ReviewWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<ReviewWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly content?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly content_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly content_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly content_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly content_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly content_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly content_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly content_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly content_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly content_starts_with?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<ReviewWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<ReviewWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<ReviewWhereStageInput>;
  readonly email?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly email_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly email_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly email_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly email_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly email_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly email_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly email_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly email_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly email_starts_with?: InputMaybe<Scalars['String']>;
  readonly headline?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly headline_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly headline_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly headline_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly headline_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly headline_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly headline_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly headline_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly headline_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly headline_starts_with?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly name_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly name_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly name_starts_with?: InputMaybe<Scalars['String']>;
  readonly product?: InputMaybe<ProductWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly rating?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  readonly rating_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  readonly rating_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  readonly rating_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  readonly rating_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  readonly rating_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  readonly rating_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  readonly rating_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ReviewOrderByInput {
  ContentAsc = 'content_ASC',
  ContentDesc = 'content_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  RatingAsc = 'rating_ASC',
  RatingDesc = 'rating_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ReviewUpdateInput = {
  readonly content?: InputMaybe<Scalars['String']>;
  readonly email?: InputMaybe<Scalars['String']>;
  readonly headline?: InputMaybe<Scalars['String']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly product?: InputMaybe<ProductUpdateOneInlineInput>;
  readonly rating?: InputMaybe<Scalars['Int']>;
};

export type ReviewUpdateManyInlineInput = {
  /** Connect multiple existing Review documents */
  readonly connect?: InputMaybe<ReadonlyArray<ReviewConnectInput>>;
  /** Create and connect multiple Review documents */
  readonly create?: InputMaybe<ReadonlyArray<ReviewCreateInput>>;
  /** Delete multiple Review documents */
  readonly delete?: InputMaybe<ReadonlyArray<ReviewWhereUniqueInput>>;
  /** Disconnect multiple Review documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<ReviewWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Review documents */
  readonly set?: InputMaybe<ReadonlyArray<ReviewWhereUniqueInput>>;
  /** Update multiple Review documents */
  readonly update?: InputMaybe<ReadonlyArray<ReviewUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Review documents */
  readonly upsert?: InputMaybe<ReadonlyArray<ReviewUpsertWithNestedWhereUniqueInput>>;
};

export type ReviewUpdateManyInput = {
  readonly content?: InputMaybe<Scalars['String']>;
  readonly email?: InputMaybe<Scalars['String']>;
  readonly headline?: InputMaybe<Scalars['String']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly rating?: InputMaybe<Scalars['Int']>;
};

export type ReviewUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: ReviewUpdateManyInput;
  /** Document search */
  readonly where: ReviewWhereInput;
};

export type ReviewUpdateOneInlineInput = {
  /** Connect existing Review document */
  readonly connect?: InputMaybe<ReviewWhereUniqueInput>;
  /** Create and connect one Review document */
  readonly create?: InputMaybe<ReviewCreateInput>;
  /** Delete currently connected Review document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Review document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Review document */
  readonly update?: InputMaybe<ReviewUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Review document */
  readonly upsert?: InputMaybe<ReviewUpsertWithNestedWhereUniqueInput>;
};

export type ReviewUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: ReviewUpdateInput;
  /** Unique document search */
  readonly where: ReviewWhereUniqueInput;
};

export type ReviewUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: ReviewCreateInput;
  /** Update document if it exists */
  readonly update: ReviewUpdateInput;
};

export type ReviewUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: ReviewUpsertInput;
  /** Unique document search */
  readonly where: ReviewWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ReviewWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ReviewWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<ReviewWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<ReviewWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<ReviewWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly content?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly content_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly content_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly content_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly content_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly content_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly content_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly content_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly content_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly content_starts_with?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<ReviewWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<ReviewWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<ReviewWhereStageInput>;
  readonly email?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly email_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly email_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly email_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly email_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly email_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly email_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly email_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly email_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly email_starts_with?: InputMaybe<Scalars['String']>;
  readonly headline?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly headline_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly headline_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly headline_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly headline_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly headline_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly headline_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly headline_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly headline_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly headline_starts_with?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly name_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly name_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly name_starts_with?: InputMaybe<Scalars['String']>;
  readonly product?: InputMaybe<ProductWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly rating?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  readonly rating_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  readonly rating_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  readonly rating_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  readonly rating_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  readonly rating_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  readonly rating_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  readonly rating_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ReviewWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<ReviewWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<ReviewWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<ReviewWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<ReviewWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References Review record uniquely */
export type ReviewWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
export type RichText = {
  readonly __typename?: 'RichText';
  /** Returns HTMl representation */
  readonly html: Scalars['String'];
  /** Returns Markdown representation */
  readonly markdown: Scalars['String'];
  /** Returns AST representation */
  readonly raw: Scalars['RichTextAST'];
  /** Returns plain-text contents of RichText */
  readonly text: Scalars['String'];
};

/** Scheduled Operation system model */
export type ScheduledOperation = Node & {
  readonly __typename?: 'ScheduledOperation';
  readonly affectedDocuments: ReadonlyArray<ScheduledOperationAffectedDocument>;
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  /** Operation description */
  readonly description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<ScheduledOperation>;
  /** Operation error message */
  readonly errorMessage?: Maybe<Scalars['String']>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  /** Raw operation payload including all details, this field is subject to change */
  readonly rawPayload: Scalars['Json'];
  /** The release this operation is scheduled for */
  readonly release?: Maybe<ScheduledRelease>;
  /** System stage field */
  readonly stage: Stage;
  /** operation Status */
  readonly status: ScheduledOperationStatus;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


/** Scheduled Operation system model */
export type ScheduledOperationAffectedDocumentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** Scheduled Operation system model */
export type ScheduledOperationCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


/** Scheduled Operation system model */
export type ScheduledOperationPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationReleaseArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type ScheduledOperationAffectedDocument = Account | Asset | Cart | CartItem | Category | Collection | Currency | Option | Order | OrderItem | Person | Product | Review | UnauthCart;

export type ScheduledOperationConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: ScheduledOperationWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledOperationConnection = {
  readonly __typename?: 'ScheduledOperationConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<ScheduledOperationEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type ScheduledOperationCreateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  readonly connect?: InputMaybe<ReadonlyArray<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationCreateOneInlineInput = {
  /** Connect one existing ScheduledOperation document */
  readonly connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
};

/** An edge in a connection. */
export type ScheduledOperationEdge = {
  readonly __typename?: 'ScheduledOperationEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: ScheduledOperation;
};

/** Identifies documents */
export type ScheduledOperationManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly description_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly description_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly description_starts_with?: InputMaybe<Scalars['String']>;
  readonly errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly errorMessage_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly errorMessage_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly release?: InputMaybe<ScheduledReleaseWhereInput>;
  readonly status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  readonly status_in?: InputMaybe<ReadonlyArray<InputMaybe<ScheduledOperationStatus>>>;
  /** All values that are not equal to given value. */
  readonly status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  readonly status_not_in?: InputMaybe<ReadonlyArray<InputMaybe<ScheduledOperationStatus>>>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledOperationOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** System Scheduled Operation Status */
export enum ScheduledOperationStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type ScheduledOperationUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  readonly connect?: InputMaybe<ReadonlyArray<ScheduledOperationConnectInput>>;
  /** Disconnect multiple ScheduledOperation documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<ScheduledOperationWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledOperation documents */
  readonly set?: InputMaybe<ReadonlyArray<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationUpdateOneInlineInput = {
  /** Connect existing ScheduledOperation document */
  readonly connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
  /** Disconnect currently connected ScheduledOperation document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ScheduledOperationWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly description_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly description_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly description_starts_with?: InputMaybe<Scalars['String']>;
  readonly errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly errorMessage_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly errorMessage_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly release?: InputMaybe<ScheduledReleaseWhereInput>;
  readonly status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  readonly status_in?: InputMaybe<ReadonlyArray<InputMaybe<ScheduledOperationStatus>>>;
  /** All values that are not equal to given value. */
  readonly status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  readonly status_not_in?: InputMaybe<ReadonlyArray<InputMaybe<ScheduledOperationStatus>>>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledOperation record uniquely */
export type ScheduledOperationWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

/** Scheduled Release system model */
export type ScheduledRelease = Node & {
  readonly __typename?: 'ScheduledRelease';
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  /** Release description */
  readonly description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<ScheduledRelease>;
  /** Release error message */
  readonly errorMessage?: Maybe<Scalars['String']>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  /** Whether scheduled release should be run */
  readonly isActive: Scalars['Boolean'];
  /** Whether scheduled release is implicit */
  readonly isImplicit: Scalars['Boolean'];
  /** Operations to run with this release */
  readonly operations: ReadonlyArray<ScheduledOperation>;
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  /** Release date and time */
  readonly releaseAt?: Maybe<Scalars['DateTime']>;
  /** System stage field */
  readonly stage: Stage;
  /** Release Status */
  readonly status: ScheduledReleaseStatus;
  /** Release Title */
  readonly title?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


/** Scheduled Release system model */
export type ScheduledReleaseCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


/** Scheduled Release system model */
export type ScheduledReleaseDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


/** Scheduled Release system model */
export type ScheduledReleaseOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Scheduled Release system model */
export type ScheduledReleasePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


/** Scheduled Release system model */
export type ScheduledReleaseUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type ScheduledReleaseConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: ScheduledReleaseWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledReleaseConnection = {
  readonly __typename?: 'ScheduledReleaseConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<ScheduledReleaseEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type ScheduledReleaseCreateInput = {
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly errorMessage?: InputMaybe<Scalars['String']>;
  readonly isActive?: InputMaybe<Scalars['Boolean']>;
  readonly releaseAt?: InputMaybe<Scalars['DateTime']>;
  readonly title?: InputMaybe<Scalars['String']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScheduledReleaseCreateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  readonly connect?: InputMaybe<ReadonlyArray<ScheduledReleaseWhereUniqueInput>>;
  /** Create and connect multiple existing ScheduledRelease documents */
  readonly create?: InputMaybe<ReadonlyArray<ScheduledReleaseCreateInput>>;
};

export type ScheduledReleaseCreateOneInlineInput = {
  /** Connect one existing ScheduledRelease document */
  readonly connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  readonly create?: InputMaybe<ScheduledReleaseCreateInput>;
};

/** An edge in a connection. */
export type ScheduledReleaseEdge = {
  readonly __typename?: 'ScheduledReleaseEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: ScheduledRelease;
};

/** Identifies documents */
export type ScheduledReleaseManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly description_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly description_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly description_starts_with?: InputMaybe<Scalars['String']>;
  readonly errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly errorMessage_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly errorMessage_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly isActive?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  readonly isActive_not?: InputMaybe<Scalars['Boolean']>;
  readonly isImplicit?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  readonly isImplicit_not?: InputMaybe<Scalars['Boolean']>;
  readonly operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly releaseAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly releaseAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly releaseAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly releaseAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly releaseAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly releaseAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly releaseAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly releaseAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  readonly status_in?: InputMaybe<ReadonlyArray<InputMaybe<ScheduledReleaseStatus>>>;
  /** All values that are not equal to given value. */
  readonly status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  readonly status_not_in?: InputMaybe<ReadonlyArray<InputMaybe<ScheduledReleaseStatus>>>;
  readonly title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly title_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly title_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly title_starts_with?: InputMaybe<Scalars['String']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledReleaseOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  IsImplicitAsc = 'isImplicit_ASC',
  IsImplicitDesc = 'isImplicit_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  ReleaseAtAsc = 'releaseAt_ASC',
  ReleaseAtDesc = 'releaseAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** System Scheduled Release Status */
export enum ScheduledReleaseStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type ScheduledReleaseUpdateInput = {
  readonly description?: InputMaybe<Scalars['String']>;
  readonly errorMessage?: InputMaybe<Scalars['String']>;
  readonly isActive?: InputMaybe<Scalars['Boolean']>;
  readonly releaseAt?: InputMaybe<Scalars['DateTime']>;
  readonly title?: InputMaybe<Scalars['String']>;
};

export type ScheduledReleaseUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  readonly connect?: InputMaybe<ReadonlyArray<ScheduledReleaseConnectInput>>;
  /** Create and connect multiple ScheduledRelease documents */
  readonly create?: InputMaybe<ReadonlyArray<ScheduledReleaseCreateInput>>;
  /** Delete multiple ScheduledRelease documents */
  readonly delete?: InputMaybe<ReadonlyArray<ScheduledReleaseWhereUniqueInput>>;
  /** Disconnect multiple ScheduledRelease documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<ScheduledReleaseWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledRelease documents */
  readonly set?: InputMaybe<ReadonlyArray<ScheduledReleaseWhereUniqueInput>>;
  /** Update multiple ScheduledRelease documents */
  readonly update?: InputMaybe<ReadonlyArray<ScheduledReleaseUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple ScheduledRelease documents */
  readonly upsert?: InputMaybe<ReadonlyArray<ScheduledReleaseUpsertWithNestedWhereUniqueInput>>;
};

export type ScheduledReleaseUpdateManyInput = {
  readonly description?: InputMaybe<Scalars['String']>;
  readonly errorMessage?: InputMaybe<Scalars['String']>;
  readonly isActive?: InputMaybe<Scalars['Boolean']>;
  readonly releaseAt?: InputMaybe<Scalars['DateTime']>;
  readonly title?: InputMaybe<Scalars['String']>;
};

export type ScheduledReleaseUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: ScheduledReleaseUpdateManyInput;
  /** Document search */
  readonly where: ScheduledReleaseWhereInput;
};

export type ScheduledReleaseUpdateOneInlineInput = {
  /** Connect existing ScheduledRelease document */
  readonly connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  readonly create?: InputMaybe<ScheduledReleaseCreateInput>;
  /** Delete currently connected ScheduledRelease document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected ScheduledRelease document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single ScheduledRelease document */
  readonly update?: InputMaybe<ScheduledReleaseUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ScheduledRelease document */
  readonly upsert?: InputMaybe<ScheduledReleaseUpsertWithNestedWhereUniqueInput>;
};

export type ScheduledReleaseUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: ScheduledReleaseUpdateInput;
  /** Unique document search */
  readonly where: ScheduledReleaseWhereUniqueInput;
};

export type ScheduledReleaseUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: ScheduledReleaseCreateInput;
  /** Update document if it exists */
  readonly update: ScheduledReleaseUpdateInput;
};

export type ScheduledReleaseUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: ScheduledReleaseUpsertInput;
  /** Unique document search */
  readonly where: ScheduledReleaseWhereUniqueInput;
};

/** Identifies documents */
export type ScheduledReleaseWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly description_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly description_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly description_starts_with?: InputMaybe<Scalars['String']>;
  readonly errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly errorMessage_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly errorMessage_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly isActive?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  readonly isActive_not?: InputMaybe<Scalars['Boolean']>;
  readonly isImplicit?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  readonly isImplicit_not?: InputMaybe<Scalars['Boolean']>;
  readonly operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly releaseAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly releaseAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly releaseAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly releaseAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly releaseAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly releaseAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly releaseAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly releaseAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  readonly status_in?: InputMaybe<ReadonlyArray<InputMaybe<ScheduledReleaseStatus>>>;
  /** All values that are not equal to given value. */
  readonly status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  readonly status_not_in?: InputMaybe<ReadonlyArray<InputMaybe<ScheduledReleaseStatus>>>;
  readonly title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly title_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly title_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly title_starts_with?: InputMaybe<Scalars['String']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledRelease record uniquely */
export type ScheduledReleaseWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

/** Stage system enumeration */
export enum Stage {
  /** The Draft is the default stage for all your content. */
  Draft = 'DRAFT',
  /** The Published stage is where you can publish your content to. */
  Published = 'PUBLISHED'
}

export enum SystemDateTimeFieldVariation {
  Base = 'BASE',
  Combined = 'COMBINED',
  Localization = 'LOCALIZATION'
}

export type UnauthCart = Node & {
  readonly __typename?: 'UnauthCart';
  readonly cartItems?: Maybe<Scalars['Json']>;
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** User that created this document */
  readonly createdBy?: Maybe<User>;
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<UnauthCart>;
  /** List of UnauthCart versions */
  readonly history: ReadonlyArray<Version>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  readonly publishedBy?: Maybe<User>;
  readonly scheduledIn: ReadonlyArray<ScheduledOperation>;
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  readonly updatedBy?: Maybe<User>;
};


export type UnauthCartCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type UnauthCartDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};


export type UnauthCartHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type UnauthCartPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};


export type UnauthCartScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type UnauthCartUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<ReadonlyArray<Locale>>;
};

export type UnauthCartConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: UnauthCartWhereUniqueInput;
};

/** A connection to a list of items. */
export type UnauthCartConnection = {
  readonly __typename?: 'UnauthCartConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<UnauthCartEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type UnauthCartCreateInput = {
  readonly cartItems?: InputMaybe<Scalars['Json']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UnauthCartCreateManyInlineInput = {
  /** Connect multiple existing UnauthCart documents */
  readonly connect?: InputMaybe<ReadonlyArray<UnauthCartWhereUniqueInput>>;
  /** Create and connect multiple existing UnauthCart documents */
  readonly create?: InputMaybe<ReadonlyArray<UnauthCartCreateInput>>;
};

export type UnauthCartCreateOneInlineInput = {
  /** Connect one existing UnauthCart document */
  readonly connect?: InputMaybe<UnauthCartWhereUniqueInput>;
  /** Create and connect one UnauthCart document */
  readonly create?: InputMaybe<UnauthCartCreateInput>;
};

/** An edge in a connection. */
export type UnauthCartEdge = {
  readonly __typename?: 'UnauthCartEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: UnauthCart;
};

/** Identifies documents */
export type UnauthCartManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<UnauthCartWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<UnauthCartWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<UnauthCartWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<UnauthCartWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<UnauthCartWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<UnauthCartWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

export enum UnauthCartOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type UnauthCartUpdateInput = {
  readonly cartItems?: InputMaybe<Scalars['Json']>;
};

export type UnauthCartUpdateManyInlineInput = {
  /** Connect multiple existing UnauthCart documents */
  readonly connect?: InputMaybe<ReadonlyArray<UnauthCartConnectInput>>;
  /** Create and connect multiple UnauthCart documents */
  readonly create?: InputMaybe<ReadonlyArray<UnauthCartCreateInput>>;
  /** Delete multiple UnauthCart documents */
  readonly delete?: InputMaybe<ReadonlyArray<UnauthCartWhereUniqueInput>>;
  /** Disconnect multiple UnauthCart documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<UnauthCartWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing UnauthCart documents */
  readonly set?: InputMaybe<ReadonlyArray<UnauthCartWhereUniqueInput>>;
  /** Update multiple UnauthCart documents */
  readonly update?: InputMaybe<ReadonlyArray<UnauthCartUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple UnauthCart documents */
  readonly upsert?: InputMaybe<ReadonlyArray<UnauthCartUpsertWithNestedWhereUniqueInput>>;
};

export type UnauthCartUpdateManyInput = {
  readonly cartItems?: InputMaybe<Scalars['Json']>;
};

export type UnauthCartUpdateManyWithNestedWhereInput = {
  /** Update many input */
  readonly data: UnauthCartUpdateManyInput;
  /** Document search */
  readonly where: UnauthCartWhereInput;
};

export type UnauthCartUpdateOneInlineInput = {
  /** Connect existing UnauthCart document */
  readonly connect?: InputMaybe<UnauthCartWhereUniqueInput>;
  /** Create and connect one UnauthCart document */
  readonly create?: InputMaybe<UnauthCartCreateInput>;
  /** Delete currently connected UnauthCart document */
  readonly delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected UnauthCart document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single UnauthCart document */
  readonly update?: InputMaybe<UnauthCartUpdateWithNestedWhereUniqueInput>;
  /** Upsert single UnauthCart document */
  readonly upsert?: InputMaybe<UnauthCartUpsertWithNestedWhereUniqueInput>;
};

export type UnauthCartUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  readonly data: UnauthCartUpdateInput;
  /** Unique document search */
  readonly where: UnauthCartWhereUniqueInput;
};

export type UnauthCartUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: UnauthCartCreateInput;
  /** Update document if it exists */
  readonly update: UnauthCartUpdateInput;
};

export type UnauthCartUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  readonly data: UnauthCartUpsertInput;
  /** Unique document search */
  readonly where: UnauthCartWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type UnauthCartWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type UnauthCartWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<UnauthCartWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<UnauthCartWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<UnauthCartWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly createdBy?: InputMaybe<UserWhereInput>;
  readonly documentInStages_every?: InputMaybe<UnauthCartWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<UnauthCartWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<UnauthCartWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly publishedBy?: InputMaybe<UserWhereInput>;
  readonly scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  readonly scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type UnauthCartWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<UnauthCartWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<UnauthCartWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<UnauthCartWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<UnauthCartWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References UnauthCart record uniquely */
export type UnauthCartWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

export type UnpublishLocaleInput = {
  /** Locales to unpublish */
  readonly locale: Locale;
  /** Stages to unpublish selected locales from */
  readonly stages: ReadonlyArray<Stage>;
};

/** User system model */
export type User = Node & {
  readonly __typename?: 'User';
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime'];
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<User>;
  /** The unique identifier */
  readonly id: Scalars['ID'];
  /** Flag to determine if user is active or not */
  readonly isActive: Scalars['Boolean'];
  /** User Kind. Can be either MEMBER, PAT or PUBLIC */
  readonly kind: UserKind;
  /** The username */
  readonly name: Scalars['String'];
  /** Profile Picture url */
  readonly picture?: Maybe<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  /** System stage field */
  readonly stage: Stage;
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime'];
};


/** User system model */
export type UserDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: ReadonlyArray<Stage>;
};

export type UserConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  readonly where: UserWhereUniqueInput;
};

/** A connection to a list of items. */
export type UserConnection = {
  readonly __typename?: 'UserConnection';
  readonly aggregate: Aggregate;
  /** A list of edges. */
  readonly edges: ReadonlyArray<UserEdge>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

export type UserCreateManyInlineInput = {
  /** Connect multiple existing User documents */
  readonly connect?: InputMaybe<ReadonlyArray<UserWhereUniqueInput>>;
};

export type UserCreateOneInlineInput = {
  /** Connect one existing User document */
  readonly connect?: InputMaybe<UserWhereUniqueInput>;
};

/** An edge in a connection. */
export type UserEdge = {
  readonly __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: User;
};

/** System User Kind */
export enum UserKind {
  Member = 'MEMBER',
  Pat = 'PAT',
  Public = 'PUBLIC',
  Webhook = 'WEBHOOK'
}

/** Identifies documents */
export type UserManyWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<UserWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly documentInStages_every?: InputMaybe<UserWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<UserWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<UserWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly isActive?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  readonly isActive_not?: InputMaybe<Scalars['Boolean']>;
  readonly kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  readonly kind_in?: InputMaybe<ReadonlyArray<InputMaybe<UserKind>>>;
  /** All values that are not equal to given value. */
  readonly kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  readonly kind_not_in?: InputMaybe<ReadonlyArray<InputMaybe<UserKind>>>;
  readonly name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly name_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly name_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly name_starts_with?: InputMaybe<Scalars['String']>;
  readonly picture?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly picture_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly picture_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly picture_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly picture_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly picture_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly picture_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly picture_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly picture_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly picture_starts_with?: InputMaybe<Scalars['String']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
};

export enum UserOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  KindAsc = 'kind_ASC',
  KindDesc = 'kind_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PictureAsc = 'picture_ASC',
  PictureDesc = 'picture_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type UserUpdateManyInlineInput = {
  /** Connect multiple existing User documents */
  readonly connect?: InputMaybe<ReadonlyArray<UserConnectInput>>;
  /** Disconnect multiple User documents */
  readonly disconnect?: InputMaybe<ReadonlyArray<UserWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing User documents */
  readonly set?: InputMaybe<ReadonlyArray<UserWhereUniqueInput>>;
};

export type UserUpdateOneInlineInput = {
  /** Connect existing User document */
  readonly connect?: InputMaybe<UserWhereUniqueInput>;
  /** Disconnect currently connected User document */
  readonly disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** This contains a set of filters that can be used to compare values internally */
export type UserWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  readonly outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type UserWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<UserWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  readonly _search?: InputMaybe<Scalars['String']>;
  readonly createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly documentInStages_every?: InputMaybe<UserWhereStageInput>;
  readonly documentInStages_none?: InputMaybe<UserWhereStageInput>;
  readonly documentInStages_some?: InputMaybe<UserWhereStageInput>;
  readonly id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  readonly id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  readonly id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  readonly id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  readonly id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  readonly id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  readonly id_starts_with?: InputMaybe<Scalars['ID']>;
  readonly isActive?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  readonly isActive_not?: InputMaybe<Scalars['Boolean']>;
  readonly kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  readonly kind_in?: InputMaybe<ReadonlyArray<InputMaybe<UserKind>>>;
  /** All values that are not equal to given value. */
  readonly kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  readonly kind_not_in?: InputMaybe<ReadonlyArray<InputMaybe<UserKind>>>;
  readonly name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly name_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly name_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly name_starts_with?: InputMaybe<Scalars['String']>;
  readonly picture?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  readonly picture_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  readonly picture_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  readonly picture_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  readonly picture_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  readonly picture_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  readonly picture_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  readonly picture_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  readonly picture_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  readonly picture_starts_with?: InputMaybe<Scalars['String']>;
  readonly publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly publishedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  readonly updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type UserWhereStageInput = {
  /** Logical AND on all given filters. */
  readonly AND?: InputMaybe<ReadonlyArray<UserWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: InputMaybe<ReadonlyArray<UserWhereStageInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: InputMaybe<ReadonlyArray<UserWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  readonly compareWithParent?: InputMaybe<UserWhereComparatorInput>;
  /** Specify the stage to compare with */
  readonly stage?: InputMaybe<Stage>;
};

/** References User record uniquely */
export type UserWhereUniqueInput = {
  readonly id?: InputMaybe<Scalars['ID']>;
};

export type Version = {
  readonly __typename?: 'Version';
  readonly createdAt: Scalars['DateTime'];
  readonly id: Scalars['ID'];
  readonly revision: Scalars['Int'];
  readonly stage: Stage;
};

export type VersionWhereInput = {
  readonly id: Scalars['ID'];
  readonly revision: Scalars['Int'];
  readonly stage: Stage;
};

export enum _FilterKind {
  And = 'AND',
  Not = 'NOT',
  Or = 'OR',
  Contains = 'contains',
  ContainsAll = 'contains_all',
  ContainsNone = 'contains_none',
  ContainsSome = 'contains_some',
  EndsWith = 'ends_with',
  Eq = 'eq',
  EqNot = 'eq_not',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  Lt = 'lt',
  Lte = 'lte',
  NotContains = 'not_contains',
  NotEndsWith = 'not_ends_with',
  NotIn = 'not_in',
  NotStartsWith = 'not_starts_with',
  RelationalEvery = 'relational_every',
  RelationalNone = 'relational_none',
  RelationalSingle = 'relational_single',
  RelationalSome = 'relational_some',
  Search = 'search',
  StartsWith = 'starts_with'
}

export enum _MutationInputFieldKind {
  Enum = 'enum',
  Relation = 'relation',
  RichText = 'richText',
  RichTextWithEmbeds = 'richTextWithEmbeds',
  Scalar = 'scalar',
  Union = 'union',
  Virtual = 'virtual'
}

export enum _MutationKind {
  Create = 'create',
  Delete = 'delete',
  DeleteMany = 'deleteMany',
  Publish = 'publish',
  PublishMany = 'publishMany',
  SchedulePublish = 'schedulePublish',
  ScheduleUnpublish = 'scheduleUnpublish',
  Unpublish = 'unpublish',
  UnpublishMany = 'unpublishMany',
  Update = 'update',
  UpdateMany = 'updateMany',
  Upsert = 'upsert'
}

export enum _OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum _RelationInputCardinality {
  Many = 'many',
  One = 'one'
}

export enum _RelationInputKind {
  Create = 'create',
  Update = 'update'
}

export enum _RelationKind {
  Regular = 'regular',
  Union = 'union'
}

export enum _SystemDateTimeFieldVariation {
  Base = 'base',
  Combined = 'combined',
  Localization = 'localization'
}

export type CreateAccountMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateAccountMutation = { readonly __typename?: 'Mutation', readonly createAccount?: { readonly __typename?: 'Account', readonly id: string } | null };

export type CreateCartMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateCartMutation = { readonly __typename?: 'Mutation', readonly createCart?: { readonly __typename?: 'Cart', readonly id: string } | null };

export type ConnectAccountWithCartAndPublishMutationVariables = Exact<{
  accountId: Scalars['ID'];
  cartId: Scalars['ID'];
}>;


export type ConnectAccountWithCartAndPublishMutation = { readonly __typename?: 'Mutation', readonly updateAccount?: { readonly __typename?: 'Account', readonly id: string } | null, readonly publishAccount?: { readonly __typename?: 'Account', readonly id: string } | null, readonly publishCart?: { readonly __typename?: 'Cart', readonly id: string } | null };

export type GetAccountByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetAccountByEmailQuery = { readonly __typename?: 'Query', readonly account?: { readonly __typename?: 'Account', readonly id: string, readonly email: string, readonly password: string } | null };

export type GetCartIdByAccountIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCartIdByAccountIdQuery = { readonly __typename?: 'Query', readonly account?: { readonly __typename?: 'Account', readonly cart?: { readonly __typename?: 'Cart', readonly id: string } | null } | null };

export type GetProductsListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsListQuery = { readonly __typename?: 'Query', readonly products: ReadonlyArray<{ readonly __typename?: 'Product', readonly id: string, readonly slug: string, readonly name: string, readonly price: number, readonly images: ReadonlyArray<{ readonly __typename?: 'Asset', readonly url: string, readonly width?: number | null, readonly height?: number | null, readonly id: string }>, readonly option: ReadonlyArray<{ readonly __typename?: 'Option', readonly id: string }> }> };

export type GetProductOptionTotalQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProductOptionTotalQuery = { readonly __typename?: 'Query', readonly option?: { readonly __typename?: 'Option', readonly total: number } | null };

export type CartContentQueryWithOptionFragment = { readonly __typename?: 'Cart', readonly id: string, readonly cartItems: ReadonlyArray<{ readonly __typename?: 'CartItem', readonly id: string, readonly quantity: number, readonly option?: { readonly __typename?: 'Option', readonly id: string, readonly color?: ProductColor | null, readonly size?: ProductSize | null, readonly total: number, readonly product?: { readonly __typename?: 'Product', readonly id: string, readonly name: string, readonly price: number, readonly slug: string, readonly images: ReadonlyArray<{ readonly __typename?: 'Asset', readonly url: string }> } | null } | null }> };

export type GetCartItemsByCartIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCartItemsByCartIdQuery = { readonly __typename?: 'Query', readonly cart?: { readonly __typename?: 'Cart', readonly id: string, readonly cartItems: ReadonlyArray<{ readonly __typename?: 'CartItem', readonly id: string, readonly quantity: number, readonly option?: { readonly __typename?: 'Option', readonly id: string, readonly color?: ProductColor | null, readonly size?: ProductSize | null, readonly total: number, readonly product?: { readonly __typename?: 'Product', readonly id: string, readonly name: string, readonly price: number, readonly slug: string, readonly images: ReadonlyArray<{ readonly __typename?: 'Asset', readonly url: string }> } | null } | null }> } | null };

export type AddItemOptionToCartByCartIdMutationVariables = Exact<{
  cartId: Scalars['ID'];
  quantity: Scalars['Int'];
  productOptionId: Scalars['ID'];
}>;


export type AddItemOptionToCartByCartIdMutation = { readonly __typename?: 'Mutation', readonly updateCart?: { readonly __typename?: 'Cart', readonly id: string, readonly cartItems: ReadonlyArray<{ readonly __typename?: 'CartItem', readonly id: string, readonly quantity: number, readonly option?: { readonly __typename?: 'Option', readonly id: string, readonly color?: ProductColor | null, readonly size?: ProductSize | null, readonly total: number, readonly product?: { readonly __typename?: 'Product', readonly id: string, readonly name: string, readonly price: number, readonly slug: string, readonly images: ReadonlyArray<{ readonly __typename?: 'Asset', readonly url: string }> } | null } | null }> } | null };

export type RemoveItemFromCartByCartIdMutationVariables = Exact<{
  cartId: Scalars['ID'];
  itemId: Scalars['ID'];
}>;


export type RemoveItemFromCartByCartIdMutation = { readonly __typename?: 'Mutation', readonly updateCart?: { readonly __typename?: 'Cart', readonly id: string, readonly cartItems: ReadonlyArray<{ readonly __typename?: 'CartItem', readonly id: string, readonly quantity: number, readonly option?: { readonly __typename?: 'Option', readonly id: string, readonly color?: ProductColor | null, readonly size?: ProductSize | null, readonly total: number, readonly product?: { readonly __typename?: 'Product', readonly id: string, readonly name: string, readonly price: number, readonly slug: string, readonly images: ReadonlyArray<{ readonly __typename?: 'Asset', readonly url: string }> } | null } | null }> } | null };

export type UpdateItemQuantityByCartIdMutationVariables = Exact<{
  cartId: Scalars['ID'];
  itemId: Scalars['ID'];
  quantity: Scalars['Int'];
}>;


export type UpdateItemQuantityByCartIdMutation = { readonly __typename?: 'Mutation', readonly updateCart?: { readonly __typename?: 'Cart', readonly id: string, readonly cartItems: ReadonlyArray<{ readonly __typename?: 'CartItem', readonly id: string, readonly quantity: number, readonly option?: { readonly __typename?: 'Option', readonly id: string, readonly color?: ProductColor | null, readonly size?: ProductSize | null, readonly total: number, readonly product?: { readonly __typename?: 'Product', readonly id: string, readonly name: string, readonly price: number, readonly slug: string, readonly images: ReadonlyArray<{ readonly __typename?: 'Asset', readonly url: string }> } | null } | null }> } | null };

export type SetProductOptionTotalMutationVariables = Exact<{
  id: Scalars['ID'];
  total: Scalars['Int'];
}>;


export type SetProductOptionTotalMutation = { readonly __typename?: 'Mutation', readonly updateOption?: { readonly __typename?: 'Option', readonly id: string } | null, readonly publishOption?: { readonly __typename?: 'Option', readonly id: string } | null };

export type ClearCartItemsMutationVariables = Exact<{
  cartId: Scalars['ID'];
}>;


export type ClearCartItemsMutation = { readonly __typename?: 'Mutation', readonly updateCart?: { readonly __typename?: 'Cart', readonly id: string, readonly cartItems: ReadonlyArray<{ readonly __typename?: 'CartItem', readonly id: string, readonly quantity: number, readonly option?: { readonly __typename?: 'Option', readonly id: string, readonly color?: ProductColor | null, readonly size?: ProductSize | null, readonly total: number, readonly product?: { readonly __typename?: 'Product', readonly id: string, readonly name: string, readonly price: number, readonly slug: string, readonly images: ReadonlyArray<{ readonly __typename?: 'Asset', readonly url: string }> } | null } | null }> } | null };

export type GetProductsSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsSlugsQuery = { readonly __typename?: 'Query', readonly products: ReadonlyArray<{ readonly __typename?: 'Product', readonly slug: string }> };

export type GetProductDetailsBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetProductDetailsBySlugQuery = { readonly __typename?: 'Query', readonly product?: { readonly __typename?: 'Product', readonly id: string, readonly slug: string, readonly name: string, readonly price: number, readonly description: string, readonly images: ReadonlyArray<{ readonly __typename?: 'Asset', readonly url: string }> } | null };

export type GetProductBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetProductBySlugQuery = { readonly __typename?: 'Query', readonly product?: { readonly __typename?: 'Product', readonly id: string, readonly slug: string, readonly name: string, readonly price: number, readonly description: string, readonly images: ReadonlyArray<{ readonly __typename?: 'Asset', readonly url: string }>, readonly option: ReadonlyArray<{ readonly __typename?: 'Option', readonly total: number, readonly id: string, readonly color?: ProductColor | null, readonly size?: ProductSize | null }> } | null };

export type GetProductOptionsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetProductOptionsQuery = { readonly __typename?: 'Query', readonly option?: { readonly __typename?: 'Option', readonly id: string, readonly color?: ProductColor | null, readonly size?: ProductSize | null } | null };

export type CreateUnAuthCartMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateUnAuthCartMutation = { readonly __typename?: 'Mutation', readonly createUnauthCart?: { readonly __typename?: 'UnauthCart', readonly id: string } | null };

export type UnAuthCartContentFragment = { readonly __typename?: 'UnauthCart', readonly id: string, readonly cartItems?: any | null };

export type GetUnauthCartIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUnauthCartIdQuery = { readonly __typename?: 'Query', readonly unauthCart?: { readonly __typename?: 'UnauthCart', readonly id: string } | null };

export type GetUnauthCartQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUnauthCartQuery = { readonly __typename?: 'Query', readonly unauthCart?: { readonly __typename?: 'UnauthCart', readonly id: string, readonly cartItems?: any | null } | null };

export type UpdateUnauthCartByIdMutationVariables = Exact<{
  id: Scalars['ID'];
  cartItems: Scalars['Json'];
}>;


export type UpdateUnauthCartByIdMutation = { readonly __typename?: 'Mutation', readonly updateUnauthCart?: { readonly __typename?: 'UnauthCart', readonly id: string, readonly cartItems?: any | null } | null };

export type DeleteUnauthCartMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUnauthCartMutation = { readonly __typename?: 'Mutation', readonly deleteUnauthCart?: { readonly __typename?: 'UnauthCart', readonly id: string } | null };

export type CreateEmptyOrderMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateEmptyOrderMutation = { readonly __typename?: 'Mutation', readonly createOrder?: { readonly __typename?: 'Order', readonly id: string } | null };

export type GetOrderQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOrderQuery = { readonly __typename?: 'Query', readonly order?: { readonly __typename?: 'Order', readonly stripeCheckoutId?: string | null, readonly stripePaymentIntentStatus?: string | null } | null };

export type ConnectStripeCheckoutWithOrderMutationVariables = Exact<{
  orderId: Scalars['ID'];
  email: Scalars['String'];
  stripeCheckoutId: Scalars['String'];
  stripePaymentIntentStatus: Scalars['String'];
}>;


export type ConnectStripeCheckoutWithOrderMutation = { readonly __typename?: 'Mutation', readonly updateOrder?: { readonly __typename?: 'Order', readonly id: string } | null };

export type CreateOrderItemByOrderIdMutationVariables = Exact<{
  orderId: Scalars['ID'];
  quantity: Scalars['Int'];
  price: Scalars['Int'];
  productName: Scalars['String'];
  optionId: Scalars['ID'];
}>;


export type CreateOrderItemByOrderIdMutation = { readonly __typename?: 'Mutation', readonly createOrderItem?: { readonly __typename?: 'OrderItem', readonly id: string } | null };

export type UpdateOrderPaymentStatusMutationVariables = Exact<{
  orderId: Scalars['ID'];
  stripePaymentIntentStatus: Scalars['String'];
}>;


export type UpdateOrderPaymentStatusMutation = { readonly __typename?: 'Mutation', readonly updateOrder?: { readonly __typename?: 'Order', readonly id: string } | null };

export type GetOrderItemsByOrderIdQueryVariables = Exact<{
  orderId: Scalars['ID'];
}>;


export type GetOrderItemsByOrderIdQuery = { readonly __typename?: 'Query', readonly order?: { readonly __typename?: 'Order', readonly id: string, readonly email?: string | null, readonly stripePaymentIntentStatus?: string | null, readonly orderItems: ReadonlyArray<{ readonly __typename?: 'OrderItem', readonly id: string, readonly quantity: number, readonly price?: number | null, readonly productName?: string | null, readonly option?: { readonly __typename?: 'Option', readonly id: string, readonly color?: ProductColor | null, readonly size?: ProductSize | null } | null }> } | null };

export const CartContentQueryWithOptionFragmentDoc = gql`
    fragment cartContentQueryWithOption on Cart {
  id
  cartItems {
    id
    quantity
    option {
      id
      color
      size
      total
      product {
        id
        name
        price
        images {
          url
        }
        slug
      }
    }
  }
}
    `;
export const UnAuthCartContentFragmentDoc = gql`
    fragment unAuthCartContent on UnauthCart {
  id
  cartItems
}
    `;
export const CreateAccountDocument = gql`
    mutation CreateAccount($email: String!, $password: String!) {
  createAccount(data: {email: $email, password: $password}) {
    id
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const CreateCartDocument = gql`
    mutation CreateCart {
  createCart(data: {}) {
    id
  }
}
    `;
export type CreateCartMutationFn = Apollo.MutationFunction<CreateCartMutation, CreateCartMutationVariables>;

/**
 * __useCreateCartMutation__
 *
 * To run a mutation, you first call `useCreateCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCartMutation, { data, loading, error }] = useCreateCartMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateCartMutation(baseOptions?: Apollo.MutationHookOptions<CreateCartMutation, CreateCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCartMutation, CreateCartMutationVariables>(CreateCartDocument, options);
      }
export type CreateCartMutationHookResult = ReturnType<typeof useCreateCartMutation>;
export type CreateCartMutationResult = Apollo.MutationResult<CreateCartMutation>;
export type CreateCartMutationOptions = Apollo.BaseMutationOptions<CreateCartMutation, CreateCartMutationVariables>;
export const ConnectAccountWithCartAndPublishDocument = gql`
    mutation ConnectAccountWithCartAndPublish($accountId: ID!, $cartId: ID!) {
  updateAccount(where: {id: $accountId}, data: {cart: {connect: {id: $cartId}}}) {
    id
  }
  publishAccount(to: PUBLISHED, where: {id: $accountId}) {
    id
  }
  publishCart(to: PUBLISHED, where: {id: $cartId}) {
    id
  }
}
    `;
export type ConnectAccountWithCartAndPublishMutationFn = Apollo.MutationFunction<ConnectAccountWithCartAndPublishMutation, ConnectAccountWithCartAndPublishMutationVariables>;

/**
 * __useConnectAccountWithCartAndPublishMutation__
 *
 * To run a mutation, you first call `useConnectAccountWithCartAndPublishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectAccountWithCartAndPublishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectAccountWithCartAndPublishMutation, { data, loading, error }] = useConnectAccountWithCartAndPublishMutation({
 *   variables: {
 *      accountId: // value for 'accountId'
 *      cartId: // value for 'cartId'
 *   },
 * });
 */
export function useConnectAccountWithCartAndPublishMutation(baseOptions?: Apollo.MutationHookOptions<ConnectAccountWithCartAndPublishMutation, ConnectAccountWithCartAndPublishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectAccountWithCartAndPublishMutation, ConnectAccountWithCartAndPublishMutationVariables>(ConnectAccountWithCartAndPublishDocument, options);
      }
export type ConnectAccountWithCartAndPublishMutationHookResult = ReturnType<typeof useConnectAccountWithCartAndPublishMutation>;
export type ConnectAccountWithCartAndPublishMutationResult = Apollo.MutationResult<ConnectAccountWithCartAndPublishMutation>;
export type ConnectAccountWithCartAndPublishMutationOptions = Apollo.BaseMutationOptions<ConnectAccountWithCartAndPublishMutation, ConnectAccountWithCartAndPublishMutationVariables>;
export const GetAccountByEmailDocument = gql`
    query GetAccountByEmail($email: String!) {
  account(where: {email: $email}, stage: DRAFT) {
    id
    email
    password
  }
}
    `;

/**
 * __useGetAccountByEmailQuery__
 *
 * To run a query within a React component, call `useGetAccountByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetAccountByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetAccountByEmailQuery, GetAccountByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountByEmailQuery, GetAccountByEmailQueryVariables>(GetAccountByEmailDocument, options);
      }
export function useGetAccountByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountByEmailQuery, GetAccountByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountByEmailQuery, GetAccountByEmailQueryVariables>(GetAccountByEmailDocument, options);
        }
export type GetAccountByEmailQueryHookResult = ReturnType<typeof useGetAccountByEmailQuery>;
export type GetAccountByEmailLazyQueryHookResult = ReturnType<typeof useGetAccountByEmailLazyQuery>;
export type GetAccountByEmailQueryResult = Apollo.QueryResult<GetAccountByEmailQuery, GetAccountByEmailQueryVariables>;
export const GetCartIdByAccountIdDocument = gql`
    query GetCartIdByAccountId($id: ID!) {
  account(where: {id: $id}) {
    cart {
      id
    }
  }
}
    `;

/**
 * __useGetCartIdByAccountIdQuery__
 *
 * To run a query within a React component, call `useGetCartIdByAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartIdByAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartIdByAccountIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCartIdByAccountIdQuery(baseOptions: Apollo.QueryHookOptions<GetCartIdByAccountIdQuery, GetCartIdByAccountIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCartIdByAccountIdQuery, GetCartIdByAccountIdQueryVariables>(GetCartIdByAccountIdDocument, options);
      }
export function useGetCartIdByAccountIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCartIdByAccountIdQuery, GetCartIdByAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCartIdByAccountIdQuery, GetCartIdByAccountIdQueryVariables>(GetCartIdByAccountIdDocument, options);
        }
export type GetCartIdByAccountIdQueryHookResult = ReturnType<typeof useGetCartIdByAccountIdQuery>;
export type GetCartIdByAccountIdLazyQueryHookResult = ReturnType<typeof useGetCartIdByAccountIdLazyQuery>;
export type GetCartIdByAccountIdQueryResult = Apollo.QueryResult<GetCartIdByAccountIdQuery, GetCartIdByAccountIdQueryVariables>;
export const GetProductsListDocument = gql`
    query GetProductsList {
  products(where: {option_some: {id_not: "null"}}) {
    id
    slug
    name
    price
    images(first: 1) {
      url
      width
      height
      id
    }
    option {
      id
    }
  }
}
    `;

/**
 * __useGetProductsListQuery__
 *
 * To run a query within a React component, call `useGetProductsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsListQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsListQuery, GetProductsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsListQuery, GetProductsListQueryVariables>(GetProductsListDocument, options);
      }
export function useGetProductsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsListQuery, GetProductsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsListQuery, GetProductsListQueryVariables>(GetProductsListDocument, options);
        }
export type GetProductsListQueryHookResult = ReturnType<typeof useGetProductsListQuery>;
export type GetProductsListLazyQueryHookResult = ReturnType<typeof useGetProductsListLazyQuery>;
export type GetProductsListQueryResult = Apollo.QueryResult<GetProductsListQuery, GetProductsListQueryVariables>;
export const GetProductOptionTotalDocument = gql`
    query GetProductOptionTotal($id: ID!) {
  option(where: {id: $id}) {
    total
  }
}
    `;

/**
 * __useGetProductOptionTotalQuery__
 *
 * To run a query within a React component, call `useGetProductOptionTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductOptionTotalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductOptionTotalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductOptionTotalQuery(baseOptions: Apollo.QueryHookOptions<GetProductOptionTotalQuery, GetProductOptionTotalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductOptionTotalQuery, GetProductOptionTotalQueryVariables>(GetProductOptionTotalDocument, options);
      }
export function useGetProductOptionTotalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductOptionTotalQuery, GetProductOptionTotalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductOptionTotalQuery, GetProductOptionTotalQueryVariables>(GetProductOptionTotalDocument, options);
        }
export type GetProductOptionTotalQueryHookResult = ReturnType<typeof useGetProductOptionTotalQuery>;
export type GetProductOptionTotalLazyQueryHookResult = ReturnType<typeof useGetProductOptionTotalLazyQuery>;
export type GetProductOptionTotalQueryResult = Apollo.QueryResult<GetProductOptionTotalQuery, GetProductOptionTotalQueryVariables>;
export const GetCartItemsByCartIdDocument = gql`
    query GetCartItemsByCartId($id: ID!) {
  cart(where: {id: $id}, stage: DRAFT) {
    ...cartContentQueryWithOption
  }
}
    ${CartContentQueryWithOptionFragmentDoc}`;

/**
 * __useGetCartItemsByCartIdQuery__
 *
 * To run a query within a React component, call `useGetCartItemsByCartIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartItemsByCartIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartItemsByCartIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCartItemsByCartIdQuery(baseOptions: Apollo.QueryHookOptions<GetCartItemsByCartIdQuery, GetCartItemsByCartIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCartItemsByCartIdQuery, GetCartItemsByCartIdQueryVariables>(GetCartItemsByCartIdDocument, options);
      }
export function useGetCartItemsByCartIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCartItemsByCartIdQuery, GetCartItemsByCartIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCartItemsByCartIdQuery, GetCartItemsByCartIdQueryVariables>(GetCartItemsByCartIdDocument, options);
        }
export type GetCartItemsByCartIdQueryHookResult = ReturnType<typeof useGetCartItemsByCartIdQuery>;
export type GetCartItemsByCartIdLazyQueryHookResult = ReturnType<typeof useGetCartItemsByCartIdLazyQuery>;
export type GetCartItemsByCartIdQueryResult = Apollo.QueryResult<GetCartItemsByCartIdQuery, GetCartItemsByCartIdQueryVariables>;
export const AddItemOptionToCartByCartIdDocument = gql`
    mutation AddItemOptionToCartByCartId($cartId: ID!, $quantity: Int!, $productOptionId: ID!) {
  updateCart(
    where: {id: $cartId}
    data: {cartItems: {create: {quantity: $quantity, option: {connect: {id: $productOptionId}}}}}
  ) {
    ...cartContentQueryWithOption
  }
}
    ${CartContentQueryWithOptionFragmentDoc}`;
export type AddItemOptionToCartByCartIdMutationFn = Apollo.MutationFunction<AddItemOptionToCartByCartIdMutation, AddItemOptionToCartByCartIdMutationVariables>;

/**
 * __useAddItemOptionToCartByCartIdMutation__
 *
 * To run a mutation, you first call `useAddItemOptionToCartByCartIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemOptionToCartByCartIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemOptionToCartByCartIdMutation, { data, loading, error }] = useAddItemOptionToCartByCartIdMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *      quantity: // value for 'quantity'
 *      productOptionId: // value for 'productOptionId'
 *   },
 * });
 */
export function useAddItemOptionToCartByCartIdMutation(baseOptions?: Apollo.MutationHookOptions<AddItemOptionToCartByCartIdMutation, AddItemOptionToCartByCartIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemOptionToCartByCartIdMutation, AddItemOptionToCartByCartIdMutationVariables>(AddItemOptionToCartByCartIdDocument, options);
      }
export type AddItemOptionToCartByCartIdMutationHookResult = ReturnType<typeof useAddItemOptionToCartByCartIdMutation>;
export type AddItemOptionToCartByCartIdMutationResult = Apollo.MutationResult<AddItemOptionToCartByCartIdMutation>;
export type AddItemOptionToCartByCartIdMutationOptions = Apollo.BaseMutationOptions<AddItemOptionToCartByCartIdMutation, AddItemOptionToCartByCartIdMutationVariables>;
export const RemoveItemFromCartByCartIdDocument = gql`
    mutation RemoveItemFromCartByCartId($cartId: ID!, $itemId: ID!) {
  updateCart(where: {id: $cartId}, data: {cartItems: {delete: {id: $itemId}}}) {
    ...cartContentQueryWithOption
  }
}
    ${CartContentQueryWithOptionFragmentDoc}`;
export type RemoveItemFromCartByCartIdMutationFn = Apollo.MutationFunction<RemoveItemFromCartByCartIdMutation, RemoveItemFromCartByCartIdMutationVariables>;

/**
 * __useRemoveItemFromCartByCartIdMutation__
 *
 * To run a mutation, you first call `useRemoveItemFromCartByCartIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveItemFromCartByCartIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeItemFromCartByCartIdMutation, { data, loading, error }] = useRemoveItemFromCartByCartIdMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useRemoveItemFromCartByCartIdMutation(baseOptions?: Apollo.MutationHookOptions<RemoveItemFromCartByCartIdMutation, RemoveItemFromCartByCartIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveItemFromCartByCartIdMutation, RemoveItemFromCartByCartIdMutationVariables>(RemoveItemFromCartByCartIdDocument, options);
      }
export type RemoveItemFromCartByCartIdMutationHookResult = ReturnType<typeof useRemoveItemFromCartByCartIdMutation>;
export type RemoveItemFromCartByCartIdMutationResult = Apollo.MutationResult<RemoveItemFromCartByCartIdMutation>;
export type RemoveItemFromCartByCartIdMutationOptions = Apollo.BaseMutationOptions<RemoveItemFromCartByCartIdMutation, RemoveItemFromCartByCartIdMutationVariables>;
export const UpdateItemQuantityByCartIdDocument = gql`
    mutation UpdateItemQuantityByCartId($cartId: ID!, $itemId: ID!, $quantity: Int!) {
  updateCart(
    where: {id: $cartId}
    data: {cartItems: {update: {where: {id: $itemId}, data: {quantity: $quantity}}}}
  ) {
    ...cartContentQueryWithOption
  }
}
    ${CartContentQueryWithOptionFragmentDoc}`;
export type UpdateItemQuantityByCartIdMutationFn = Apollo.MutationFunction<UpdateItemQuantityByCartIdMutation, UpdateItemQuantityByCartIdMutationVariables>;

/**
 * __useUpdateItemQuantityByCartIdMutation__
 *
 * To run a mutation, you first call `useUpdateItemQuantityByCartIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemQuantityByCartIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemQuantityByCartIdMutation, { data, loading, error }] = useUpdateItemQuantityByCartIdMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *      itemId: // value for 'itemId'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useUpdateItemQuantityByCartIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateItemQuantityByCartIdMutation, UpdateItemQuantityByCartIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateItemQuantityByCartIdMutation, UpdateItemQuantityByCartIdMutationVariables>(UpdateItemQuantityByCartIdDocument, options);
      }
export type UpdateItemQuantityByCartIdMutationHookResult = ReturnType<typeof useUpdateItemQuantityByCartIdMutation>;
export type UpdateItemQuantityByCartIdMutationResult = Apollo.MutationResult<UpdateItemQuantityByCartIdMutation>;
export type UpdateItemQuantityByCartIdMutationOptions = Apollo.BaseMutationOptions<UpdateItemQuantityByCartIdMutation, UpdateItemQuantityByCartIdMutationVariables>;
export const SetProductOptionTotalDocument = gql`
    mutation SetProductOptionTotal($id: ID!, $total: Int!) {
  updateOption(where: {id: $id}, data: {total: $total}) {
    id
  }
  publishOption(where: {id: $id}) {
    id
  }
}
    `;
export type SetProductOptionTotalMutationFn = Apollo.MutationFunction<SetProductOptionTotalMutation, SetProductOptionTotalMutationVariables>;

/**
 * __useSetProductOptionTotalMutation__
 *
 * To run a mutation, you first call `useSetProductOptionTotalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetProductOptionTotalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setProductOptionTotalMutation, { data, loading, error }] = useSetProductOptionTotalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      total: // value for 'total'
 *   },
 * });
 */
export function useSetProductOptionTotalMutation(baseOptions?: Apollo.MutationHookOptions<SetProductOptionTotalMutation, SetProductOptionTotalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetProductOptionTotalMutation, SetProductOptionTotalMutationVariables>(SetProductOptionTotalDocument, options);
      }
export type SetProductOptionTotalMutationHookResult = ReturnType<typeof useSetProductOptionTotalMutation>;
export type SetProductOptionTotalMutationResult = Apollo.MutationResult<SetProductOptionTotalMutation>;
export type SetProductOptionTotalMutationOptions = Apollo.BaseMutationOptions<SetProductOptionTotalMutation, SetProductOptionTotalMutationVariables>;
export const ClearCartItemsDocument = gql`
    mutation ClearCartItems($cartId: ID!) {
  updateCart(where: {id: $cartId}, data: {cartItems: {set: []}}) {
    ...cartContentQueryWithOption
  }
}
    ${CartContentQueryWithOptionFragmentDoc}`;
export type ClearCartItemsMutationFn = Apollo.MutationFunction<ClearCartItemsMutation, ClearCartItemsMutationVariables>;

/**
 * __useClearCartItemsMutation__
 *
 * To run a mutation, you first call `useClearCartItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearCartItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearCartItemsMutation, { data, loading, error }] = useClearCartItemsMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *   },
 * });
 */
export function useClearCartItemsMutation(baseOptions?: Apollo.MutationHookOptions<ClearCartItemsMutation, ClearCartItemsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearCartItemsMutation, ClearCartItemsMutationVariables>(ClearCartItemsDocument, options);
      }
export type ClearCartItemsMutationHookResult = ReturnType<typeof useClearCartItemsMutation>;
export type ClearCartItemsMutationResult = Apollo.MutationResult<ClearCartItemsMutation>;
export type ClearCartItemsMutationOptions = Apollo.BaseMutationOptions<ClearCartItemsMutation, ClearCartItemsMutationVariables>;
export const GetProductsSlugsDocument = gql`
    query GetProductsSlugs {
  products(where: {option_some: {id_not: "null"}}) {
    slug
  }
}
    `;

/**
 * __useGetProductsSlugsQuery__
 *
 * To run a query within a React component, call `useGetProductsSlugsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsSlugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsSlugsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsSlugsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsSlugsQuery, GetProductsSlugsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsSlugsQuery, GetProductsSlugsQueryVariables>(GetProductsSlugsDocument, options);
      }
export function useGetProductsSlugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsSlugsQuery, GetProductsSlugsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsSlugsQuery, GetProductsSlugsQueryVariables>(GetProductsSlugsDocument, options);
        }
export type GetProductsSlugsQueryHookResult = ReturnType<typeof useGetProductsSlugsQuery>;
export type GetProductsSlugsLazyQueryHookResult = ReturnType<typeof useGetProductsSlugsLazyQuery>;
export type GetProductsSlugsQueryResult = Apollo.QueryResult<GetProductsSlugsQuery, GetProductsSlugsQueryVariables>;
export const GetProductDetailsBySlugDocument = gql`
    query GetProductDetailsBySlug($slug: String) {
  product(where: {slug: $slug}) {
    id
    slug
    name
    price
    description
    images {
      url
    }
  }
}
    `;

/**
 * __useGetProductDetailsBySlugQuery__
 *
 * To run a query within a React component, call `useGetProductDetailsBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductDetailsBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductDetailsBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetProductDetailsBySlugQuery(baseOptions?: Apollo.QueryHookOptions<GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables>(GetProductDetailsBySlugDocument, options);
      }
export function useGetProductDetailsBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables>(GetProductDetailsBySlugDocument, options);
        }
export type GetProductDetailsBySlugQueryHookResult = ReturnType<typeof useGetProductDetailsBySlugQuery>;
export type GetProductDetailsBySlugLazyQueryHookResult = ReturnType<typeof useGetProductDetailsBySlugLazyQuery>;
export type GetProductDetailsBySlugQueryResult = Apollo.QueryResult<GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables>;
export const GetProductBySlugDocument = gql`
    query GetProductBySlug($slug: String) {
  product(where: {slug: $slug}) {
    id
    slug
    name
    price
    description
    images {
      url
    }
    option {
      total
      id
      color
      size
    }
  }
}
    `;

/**
 * __useGetProductBySlugQuery__
 *
 * To run a query within a React component, call `useGetProductBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetProductBySlugQuery(baseOptions?: Apollo.QueryHookOptions<GetProductBySlugQuery, GetProductBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductBySlugQuery, GetProductBySlugQueryVariables>(GetProductBySlugDocument, options);
      }
export function useGetProductBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductBySlugQuery, GetProductBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductBySlugQuery, GetProductBySlugQueryVariables>(GetProductBySlugDocument, options);
        }
export type GetProductBySlugQueryHookResult = ReturnType<typeof useGetProductBySlugQuery>;
export type GetProductBySlugLazyQueryHookResult = ReturnType<typeof useGetProductBySlugLazyQuery>;
export type GetProductBySlugQueryResult = Apollo.QueryResult<GetProductBySlugQuery, GetProductBySlugQueryVariables>;
export const GetProductOptionsDocument = gql`
    query GetProductOptions($id: ID) {
  option(where: {id: $id}) {
    id
    color
    size
  }
}
    `;

/**
 * __useGetProductOptionsQuery__
 *
 * To run a query within a React component, call `useGetProductOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductOptionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductOptionsQuery, GetProductOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductOptionsQuery, GetProductOptionsQueryVariables>(GetProductOptionsDocument, options);
      }
export function useGetProductOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductOptionsQuery, GetProductOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductOptionsQuery, GetProductOptionsQueryVariables>(GetProductOptionsDocument, options);
        }
export type GetProductOptionsQueryHookResult = ReturnType<typeof useGetProductOptionsQuery>;
export type GetProductOptionsLazyQueryHookResult = ReturnType<typeof useGetProductOptionsLazyQuery>;
export type GetProductOptionsQueryResult = Apollo.QueryResult<GetProductOptionsQuery, GetProductOptionsQueryVariables>;
export const CreateUnAuthCartDocument = gql`
    mutation CreateUnAuthCart {
  createUnauthCart(data: {}) {
    id
  }
}
    `;
export type CreateUnAuthCartMutationFn = Apollo.MutationFunction<CreateUnAuthCartMutation, CreateUnAuthCartMutationVariables>;

/**
 * __useCreateUnAuthCartMutation__
 *
 * To run a mutation, you first call `useCreateUnAuthCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUnAuthCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUnAuthCartMutation, { data, loading, error }] = useCreateUnAuthCartMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateUnAuthCartMutation(baseOptions?: Apollo.MutationHookOptions<CreateUnAuthCartMutation, CreateUnAuthCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUnAuthCartMutation, CreateUnAuthCartMutationVariables>(CreateUnAuthCartDocument, options);
      }
export type CreateUnAuthCartMutationHookResult = ReturnType<typeof useCreateUnAuthCartMutation>;
export type CreateUnAuthCartMutationResult = Apollo.MutationResult<CreateUnAuthCartMutation>;
export type CreateUnAuthCartMutationOptions = Apollo.BaseMutationOptions<CreateUnAuthCartMutation, CreateUnAuthCartMutationVariables>;
export const GetUnauthCartIdDocument = gql`
    query GetUnauthCartId($id: ID!) {
  unauthCart(where: {id: $id}, stage: DRAFT) {
    id
  }
}
    `;

/**
 * __useGetUnauthCartIdQuery__
 *
 * To run a query within a React component, call `useGetUnauthCartIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnauthCartIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnauthCartIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUnauthCartIdQuery(baseOptions: Apollo.QueryHookOptions<GetUnauthCartIdQuery, GetUnauthCartIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnauthCartIdQuery, GetUnauthCartIdQueryVariables>(GetUnauthCartIdDocument, options);
      }
export function useGetUnauthCartIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnauthCartIdQuery, GetUnauthCartIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnauthCartIdQuery, GetUnauthCartIdQueryVariables>(GetUnauthCartIdDocument, options);
        }
export type GetUnauthCartIdQueryHookResult = ReturnType<typeof useGetUnauthCartIdQuery>;
export type GetUnauthCartIdLazyQueryHookResult = ReturnType<typeof useGetUnauthCartIdLazyQuery>;
export type GetUnauthCartIdQueryResult = Apollo.QueryResult<GetUnauthCartIdQuery, GetUnauthCartIdQueryVariables>;
export const GetUnauthCartDocument = gql`
    query GetUnauthCart($id: ID!) {
  unauthCart(where: {id: $id}, stage: DRAFT) {
    ...unAuthCartContent
  }
}
    ${UnAuthCartContentFragmentDoc}`;

/**
 * __useGetUnauthCartQuery__
 *
 * To run a query within a React component, call `useGetUnauthCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnauthCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnauthCartQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUnauthCartQuery(baseOptions: Apollo.QueryHookOptions<GetUnauthCartQuery, GetUnauthCartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnauthCartQuery, GetUnauthCartQueryVariables>(GetUnauthCartDocument, options);
      }
export function useGetUnauthCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnauthCartQuery, GetUnauthCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnauthCartQuery, GetUnauthCartQueryVariables>(GetUnauthCartDocument, options);
        }
export type GetUnauthCartQueryHookResult = ReturnType<typeof useGetUnauthCartQuery>;
export type GetUnauthCartLazyQueryHookResult = ReturnType<typeof useGetUnauthCartLazyQuery>;
export type GetUnauthCartQueryResult = Apollo.QueryResult<GetUnauthCartQuery, GetUnauthCartQueryVariables>;
export const UpdateUnauthCartByIdDocument = gql`
    mutation UpdateUnauthCartById($id: ID!, $cartItems: Json!) {
  updateUnauthCart(where: {id: $id}, data: {cartItems: $cartItems}) {
    ...unAuthCartContent
  }
}
    ${UnAuthCartContentFragmentDoc}`;
export type UpdateUnauthCartByIdMutationFn = Apollo.MutationFunction<UpdateUnauthCartByIdMutation, UpdateUnauthCartByIdMutationVariables>;

/**
 * __useUpdateUnauthCartByIdMutation__
 *
 * To run a mutation, you first call `useUpdateUnauthCartByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUnauthCartByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUnauthCartByIdMutation, { data, loading, error }] = useUpdateUnauthCartByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *      cartItems: // value for 'cartItems'
 *   },
 * });
 */
export function useUpdateUnauthCartByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUnauthCartByIdMutation, UpdateUnauthCartByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUnauthCartByIdMutation, UpdateUnauthCartByIdMutationVariables>(UpdateUnauthCartByIdDocument, options);
      }
export type UpdateUnauthCartByIdMutationHookResult = ReturnType<typeof useUpdateUnauthCartByIdMutation>;
export type UpdateUnauthCartByIdMutationResult = Apollo.MutationResult<UpdateUnauthCartByIdMutation>;
export type UpdateUnauthCartByIdMutationOptions = Apollo.BaseMutationOptions<UpdateUnauthCartByIdMutation, UpdateUnauthCartByIdMutationVariables>;
export const DeleteUnauthCartDocument = gql`
    mutation DeleteUnauthCart($id: ID!) {
  deleteUnauthCart(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteUnauthCartMutationFn = Apollo.MutationFunction<DeleteUnauthCartMutation, DeleteUnauthCartMutationVariables>;

/**
 * __useDeleteUnauthCartMutation__
 *
 * To run a mutation, you first call `useDeleteUnauthCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUnauthCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUnauthCartMutation, { data, loading, error }] = useDeleteUnauthCartMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUnauthCartMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUnauthCartMutation, DeleteUnauthCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUnauthCartMutation, DeleteUnauthCartMutationVariables>(DeleteUnauthCartDocument, options);
      }
export type DeleteUnauthCartMutationHookResult = ReturnType<typeof useDeleteUnauthCartMutation>;
export type DeleteUnauthCartMutationResult = Apollo.MutationResult<DeleteUnauthCartMutation>;
export type DeleteUnauthCartMutationOptions = Apollo.BaseMutationOptions<DeleteUnauthCartMutation, DeleteUnauthCartMutationVariables>;
export const CreateEmptyOrderDocument = gql`
    mutation CreateEmptyOrder {
  createOrder(data: {}) {
    id
  }
}
    `;
export type CreateEmptyOrderMutationFn = Apollo.MutationFunction<CreateEmptyOrderMutation, CreateEmptyOrderMutationVariables>;

/**
 * __useCreateEmptyOrderMutation__
 *
 * To run a mutation, you first call `useCreateEmptyOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmptyOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmptyOrderMutation, { data, loading, error }] = useCreateEmptyOrderMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateEmptyOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateEmptyOrderMutation, CreateEmptyOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEmptyOrderMutation, CreateEmptyOrderMutationVariables>(CreateEmptyOrderDocument, options);
      }
export type CreateEmptyOrderMutationHookResult = ReturnType<typeof useCreateEmptyOrderMutation>;
export type CreateEmptyOrderMutationResult = Apollo.MutationResult<CreateEmptyOrderMutation>;
export type CreateEmptyOrderMutationOptions = Apollo.BaseMutationOptions<CreateEmptyOrderMutation, CreateEmptyOrderMutationVariables>;
export const GetOrderDocument = gql`
    query GetOrder($id: ID!) {
  order(where: {id: $id}) {
    stripeCheckoutId
    stripePaymentIntentStatus
  }
}
    `;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const ConnectStripeCheckoutWithOrderDocument = gql`
    mutation ConnectStripeCheckoutWithOrder($orderId: ID!, $email: String!, $stripeCheckoutId: String!, $stripePaymentIntentStatus: String!) {
  updateOrder(
    where: {id: $orderId}
    data: {email: $email, stripeCheckoutId: $stripeCheckoutId, stripePaymentIntentStatus: $stripePaymentIntentStatus, account: {connect: {email: $email}}}
  ) {
    id
  }
}
    `;
export type ConnectStripeCheckoutWithOrderMutationFn = Apollo.MutationFunction<ConnectStripeCheckoutWithOrderMutation, ConnectStripeCheckoutWithOrderMutationVariables>;

/**
 * __useConnectStripeCheckoutWithOrderMutation__
 *
 * To run a mutation, you first call `useConnectStripeCheckoutWithOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectStripeCheckoutWithOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectStripeCheckoutWithOrderMutation, { data, loading, error }] = useConnectStripeCheckoutWithOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      email: // value for 'email'
 *      stripeCheckoutId: // value for 'stripeCheckoutId'
 *      stripePaymentIntentStatus: // value for 'stripePaymentIntentStatus'
 *   },
 * });
 */
export function useConnectStripeCheckoutWithOrderMutation(baseOptions?: Apollo.MutationHookOptions<ConnectStripeCheckoutWithOrderMutation, ConnectStripeCheckoutWithOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectStripeCheckoutWithOrderMutation, ConnectStripeCheckoutWithOrderMutationVariables>(ConnectStripeCheckoutWithOrderDocument, options);
      }
export type ConnectStripeCheckoutWithOrderMutationHookResult = ReturnType<typeof useConnectStripeCheckoutWithOrderMutation>;
export type ConnectStripeCheckoutWithOrderMutationResult = Apollo.MutationResult<ConnectStripeCheckoutWithOrderMutation>;
export type ConnectStripeCheckoutWithOrderMutationOptions = Apollo.BaseMutationOptions<ConnectStripeCheckoutWithOrderMutation, ConnectStripeCheckoutWithOrderMutationVariables>;
export const CreateOrderItemByOrderIdDocument = gql`
    mutation CreateOrderItemByOrderId($orderId: ID!, $quantity: Int!, $price: Int!, $productName: String!, $optionId: ID!) {
  createOrderItem(
    data: {order: {connect: {id: $orderId}}, quantity: $quantity, price: $price, productName: $productName, option: {connect: {id: $optionId}}}
  ) {
    id
  }
}
    `;
export type CreateOrderItemByOrderIdMutationFn = Apollo.MutationFunction<CreateOrderItemByOrderIdMutation, CreateOrderItemByOrderIdMutationVariables>;

/**
 * __useCreateOrderItemByOrderIdMutation__
 *
 * To run a mutation, you first call `useCreateOrderItemByOrderIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderItemByOrderIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderItemByOrderIdMutation, { data, loading, error }] = useCreateOrderItemByOrderIdMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      quantity: // value for 'quantity'
 *      price: // value for 'price'
 *      productName: // value for 'productName'
 *      optionId: // value for 'optionId'
 *   },
 * });
 */
export function useCreateOrderItemByOrderIdMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderItemByOrderIdMutation, CreateOrderItemByOrderIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderItemByOrderIdMutation, CreateOrderItemByOrderIdMutationVariables>(CreateOrderItemByOrderIdDocument, options);
      }
export type CreateOrderItemByOrderIdMutationHookResult = ReturnType<typeof useCreateOrderItemByOrderIdMutation>;
export type CreateOrderItemByOrderIdMutationResult = Apollo.MutationResult<CreateOrderItemByOrderIdMutation>;
export type CreateOrderItemByOrderIdMutationOptions = Apollo.BaseMutationOptions<CreateOrderItemByOrderIdMutation, CreateOrderItemByOrderIdMutationVariables>;
export const UpdateOrderPaymentStatusDocument = gql`
    mutation UpdateOrderPaymentStatus($orderId: ID!, $stripePaymentIntentStatus: String!) {
  updateOrder(
    where: {id: $orderId}
    data: {stripePaymentIntentStatus: $stripePaymentIntentStatus}
  ) {
    id
  }
}
    `;
export type UpdateOrderPaymentStatusMutationFn = Apollo.MutationFunction<UpdateOrderPaymentStatusMutation, UpdateOrderPaymentStatusMutationVariables>;

/**
 * __useUpdateOrderPaymentStatusMutation__
 *
 * To run a mutation, you first call `useUpdateOrderPaymentStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderPaymentStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderPaymentStatusMutation, { data, loading, error }] = useUpdateOrderPaymentStatusMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      stripePaymentIntentStatus: // value for 'stripePaymentIntentStatus'
 *   },
 * });
 */
export function useUpdateOrderPaymentStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderPaymentStatusMutation, UpdateOrderPaymentStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderPaymentStatusMutation, UpdateOrderPaymentStatusMutationVariables>(UpdateOrderPaymentStatusDocument, options);
      }
export type UpdateOrderPaymentStatusMutationHookResult = ReturnType<typeof useUpdateOrderPaymentStatusMutation>;
export type UpdateOrderPaymentStatusMutationResult = Apollo.MutationResult<UpdateOrderPaymentStatusMutation>;
export type UpdateOrderPaymentStatusMutationOptions = Apollo.BaseMutationOptions<UpdateOrderPaymentStatusMutation, UpdateOrderPaymentStatusMutationVariables>;
export const GetOrderItemsByOrderIdDocument = gql`
    query GetOrderItemsByOrderId($orderId: ID!) {
  order(where: {id: $orderId}, stage: DRAFT) {
    id
    email
    stripePaymentIntentStatus
    orderItems {
      id
      quantity
      price
      productName
      option {
        id
        color
        size
      }
    }
  }
}
    `;

/**
 * __useGetOrderItemsByOrderIdQuery__
 *
 * To run a query within a React component, call `useGetOrderItemsByOrderIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderItemsByOrderIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderItemsByOrderIdQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetOrderItemsByOrderIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrderItemsByOrderIdQuery, GetOrderItemsByOrderIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderItemsByOrderIdQuery, GetOrderItemsByOrderIdQueryVariables>(GetOrderItemsByOrderIdDocument, options);
      }
export function useGetOrderItemsByOrderIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderItemsByOrderIdQuery, GetOrderItemsByOrderIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderItemsByOrderIdQuery, GetOrderItemsByOrderIdQueryVariables>(GetOrderItemsByOrderIdDocument, options);
        }
export type GetOrderItemsByOrderIdQueryHookResult = ReturnType<typeof useGetOrderItemsByOrderIdQuery>;
export type GetOrderItemsByOrderIdLazyQueryHookResult = ReturnType<typeof useGetOrderItemsByOrderIdLazyQuery>;
export type GetOrderItemsByOrderIdQueryResult = Apollo.QueryResult<GetOrderItemsByOrderIdQuery, GetOrderItemsByOrderIdQueryVariables>;