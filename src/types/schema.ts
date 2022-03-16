import {
	GraphQLResolveInfo,
	GraphQLScalarType,
	GraphQLScalarTypeConfig,
} from "graphql";
import { UserDocument } from "modules/user/schema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/**
	 * An __Avatar__ (also known as a profile picture or userpic) is a graphical
	 * representation of a user or the user's character or persona.
	 */
	Avatar: any;
	BigInt: any;
	Byte: any;
	Currency: any;
	/**
	 * The __Cursor__ is an opaque string used to navigate between pages,
	 * according to [__GraphQL Cursor Connections Specification__
	 * ](https://relay.dev/graphql/connections.htm#sec-Cursor)
	 */
	Cursor: any;
	DID: any;
	Date: any;
	DateTime: any;
	Duration: any;
	EmailAddress: any;
	GUID: any;
	HSL: any;
	HSLA: any;
	HexColorCode: any;
	Hexadecimal: any;
	IBAN: any;
	IPv4: any;
	IPv6: any;
	ISBN: any;
	ISO8601Duration: any;
	JSON: any;
	JSONObject: any;
	JWT: any;
	Latitude: any;
	LocalDate: any;
	LocalEndTime: any;
	LocalTime: any;
	Long: any;
	Longitude: any;
	MAC: any;
	NegativeFloat: any;
	NegativeInt: any;
	NonEmptyString: any;
	NonNegativeFloat: any;
	NonNegativeInt: any;
	NonPositiveFloat: any;
	NonPositiveInt: any;
	ObjectID: any;
	PhoneNumber: any;
	Port: any;
	PositiveFloat: any;
	PositiveInt: any;
	PostalCode: any;
	RGB: any;
	RGBA: any;
	SafeInt: any;
	Time: any;
	Timestamp: any;
	URL: any;
	USCurrency: any;
	UUID: any;
	UnsignedFloat: any;
	UnsignedInt: any;
	UtcOffset: any;
	Void: any;
};

/**
 * Enable backward pagination, slicing can be done with *last*. The *before* is a
 * opaque cursor returned by *pageInfo*'s *startCursor* node
 */
export type BackwardPageInput = {
	/** number of the page or last edges before this cursor */
	before?: InputMaybe<Scalars["Cursor"]>;
	/** at most last edges */
	last?: InputMaybe<Scalars["NonNegativeInt"]>;
};

/**
 * *Connection* is in compliance with
 * [*GraphQL Cursor Connections Specification*
 * ](https://relay.dev/graphql/connections.htm#sec-Connection-Types)
 * to consistenly handle pagination best practices with support for slicing
 * and *metadata* about the
 * connection itself
 */
export type Connection = {
	/** relationship between two node on the graph */
	edges: Array<Edge>;
	/** additional information about the connection itself */
	pageInfo: PageInfo;
};

/**
 * The concept of an [*edge*
 * ](https://relay.dev/graphql/connections.htm#sec-Edge-Types) also proves
 * useful if there is information that is specific to the edge, rather than to
 * one node, which means information about a connection instance.
 */
export type Edge = {
	/** Opaque cursor used to navigate through pages */
	cursor: Scalars["Cursor"];
	/**
	 * This field must return either a Scalar, Enum, Object, Interface, Union, or
	 * a Non-Null wrapper around one of those types. Notably, this field cannot
	 * return a list.
	 */
	node: Node;
};

/**
 * Enable forward pagination, slicing can be done with *first*. The *after* is a
 * opaque cursor returned by **pageInfo**'s **endCursor** node
 */
export type ForwardPageInput = {
	/** number of the page or edges after this cursor */
	after?: InputMaybe<Scalars["Cursor"]>;
	/** at most first edges */
	first?: InputMaybe<Scalars["NonNegativeInt"]>;
};

/**
 * Naming is a way to calling users. Community users must have a nickname but
 * not necessary it has first or last names specified
 */
export type Naming = {
	__typename?: "Naming";
	/** user first name */
	first?: Maybe<Scalars["String"]>;
	/** user last name */
	last?: Maybe<Scalars["String"]>;
	/** user nickname */
	nick: Scalars["String"];
};

/** Regular node which is returned by Edge type, it must have at least ID type */
export type Node = {
	id: Scalars["ID"];
};

/**
 * [**PageInfo**
 * ](https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo)
 * is metadata information about **Connection** used to navigate providing
 * intel about more previous or next pages. For example, *endCursor* can be used
 * in to forwarding pagination argument
 */
export type PageInfo = {
	__typename?: "PageInfo";
	/** corresponds the last node, also known as the last connection's edge */
	endCursor: Scalars["Cursor"];
	/**
	 * indicate whether more edges exist following the set defined by the clients
	 * arguments
	 */
	hasNextPage: Scalars["Boolean"];
	/**
	 * indicate whether more edges exist prior to the set defined by the clients
	 * arguments
	 */
	hasPreviousPage: Scalars["Boolean"];
	/** corresponds the last node, also known as the first connection's edge */
	startCursor: Scalars["Cursor"];
};

/**
 * Enable forward and backward pagination, slicing can be done with *first*
 * and *last*. Opaque cursor is defined by *after* and *before* returned by
 * **pageInfo**'s **endCursor** and *startCursor* node respectively.
 */
export type PageInput = {
	/** number of the page or edges after this cursor */
	after?: InputMaybe<Scalars["Cursor"]>;
	/** number of the page or last edges before this cursor */
	before?: InputMaybe<Scalars["Cursor"]>;
	/** at most first edges */
	first?: InputMaybe<Scalars["NonNegativeInt"]>;
	/** at most last edges */
	last?: InputMaybe<Scalars["NonNegativeInt"]>;
};

/**
 * An *Post* is an user-submitted message enclosed into a block containing the
 * user's details and the date and time it was submitted. Posts are contained in
 * threads, where they appear as blocks one after another. The first post starts
 * the thread; this may be called the OP (original post). Posts that follow in
 * the thread are meant to continue discussion about that post, or respond to
 * other replies; it is not uncommon for discussions to be derailed.
 */
export type Post = Node &
	Timestamps & {
		__typename?: "Post";
		/** post's author */
		author: User;
		/** post' creation time */
		createdAt: Scalars["DateTime"];
		/** post identifier */
		id: Scalars["ID"];
		/** amount of users who liked the post */
		likes: Scalars["NonNegativeInt"];
		/** summarize the discussion proposed, detailed information about a topic */
		message?: Maybe<Scalars["String"]>;
		/** posts which replies to this one */
		replies: PostRepliesConnection;
		/** post' last update time */
		updatedAt: Scalars["DateTime"];
	};

/**
 * An *Post* is an user-submitted message enclosed into a block containing the
 * user's details and the date and time it was submitted. Posts are contained in
 * threads, where they appear as blocks one after another. The first post starts
 * the thread; this may be called the OP (original post). Posts that follow in
 * the thread are meant to continue discussion about that post, or respond to
 * other replies; it is not uncommon for discussions to be derailed.
 */
export type PostRepliesArgs = {
	page?: InputMaybe<ForwardPageInput>;
};

/**
 * The **PostParticipantsConnection** represents an endpoint of an edge. It
 * defines **totalCount** metadata to count the number of distinct users
 */
export type PostParticipantsConnection = Connection & {
	__typename?: "PostParticipantsConnection";
	/** user' edges */
	edges: Array<PostParticipantsEdge>;
	/** total number of post's participants edges */
	interactions: Scalars["NonNegativeInt"];
	/** page information */
	pageInfo: PageInfo;
};

/**
 * The **PostParticipantsEdge** is a connection between two nodes, each user
 * edge endpoint doens't have any metadata and returns simple User node
 */
export type PostParticipantsEdge = Edge & {
	__typename?: "PostParticipantsEdge";
	/** user's edge cursor */
	cursor: Scalars["Cursor"];
	/** node is a plain User type */
	node: User;
};

/**
 * **PostRepliesConnection** represents self relationship between posts
 * indicading a reply. A post can be a reply of another posts
 */
export type PostRepliesConnection = Connection & {
	__typename?: "PostRepliesConnection";
	/** post's edges */
	edges: Array<PostReplyEdge>;
	/** page information */
	pageInfo: PageInfo;
};

/**
 * **PostReplyEdge** implements Edge's connection pattern, representing an
 * endpoint from a relationship in any direction
 */
export type PostReplyEdge = Edge & {
	__typename?: "PostReplyEdge";
	/** post's cursor */
	cursor: Scalars["Cursor"];
	/** node presents a simple post */
	node: Post;
};

export type Query = {
	__typename?: "Query";
	/**
	 * Get a list of all threads (also known as original posts), that's a thread
	 * starter which originates a conversation. That list represents all top-level
	 * posts which can be paginated by the user
	 */
	threads: ThreadConnection;
};

export type QueryThreadsArgs = {
	page?: InputMaybe<ForwardPageInput>;
};

/**
 * A thread (sometimes called a topic) is a collection of posts, although this
 * is typically configurable: Options for newest to oldest and for a threaded
 * view (a tree-like view applying logical reply structure before chronological
 * order) can be available. A thread is defined by a title and an opening post
 * (common abbreviation OP, which can also be used to refer to the original
 * poster), which opens whatever dialogue or makes whatever announcement the
 * poster wished. A thread can contain any number of posts, including multiple
 * posts from the same members, even if they are one after the other.
 */
export type Thread = Node &
	Timestamps & {
		__typename?: "Thread";
		/** creation time */
		createdAt: Scalars["DateTime"];
		id: Scalars["ID"];
		/** newest reply */
		lastActivity: Scalars["DateTime"];
		/**
		 * all unique participants of the thread, which means all its op's replies
		 * and its entire subtree
		 */
		participants: PostParticipantsConnection;
		/** Original post of the thread, also known as thread starter */
		post: Post;
		/** quantity of replies under original post */
		replies: Scalars["NonNegativeInt"];
		/**
		 * A brief introduction to the discussion, it intends to engage people around
		 * a conversation
		 */
		title: Scalars["String"];
		/** last update time */
		updatedAt: Scalars["DateTime"];
	};

/**
 * A thread (sometimes called a topic) is a collection of posts, although this
 * is typically configurable: Options for newest to oldest and for a threaded
 * view (a tree-like view applying logical reply structure before chronological
 * order) can be available. A thread is defined by a title and an opening post
 * (common abbreviation OP, which can also be used to refer to the original
 * poster), which opens whatever dialogue or makes whatever announcement the
 * poster wished. A thread can contain any number of posts, including multiple
 * posts from the same members, even if they are one after the other.
 */
export type ThreadParticipantsArgs = {
	page?: InputMaybe<ForwardPageInput>;
};

/**
 * Thread connection implements Connection defining edges, pageInfo and has the
 * total number of threads in the community. The total number of threads refers
 * to the quantity of raised topics, or beginning of an conversation
 */
export type ThreadConnection = Connection & {
	__typename?: "ThreadConnection";
	/** connections between thread and posts */
	edges: Array<ThreadEdge>;
	/** additional information about the pagination */
	pageInfo: PageInfo;
	/** number of threads in total */
	total: Scalars["NonNegativeInt"];
};

/** Thread edge implements Edge defining node and cursor but has specific metadata */
export type ThreadEdge = Edge & {
	__typename?: "ThreadEdge";
	/** opaque cursor */
	cursor: Scalars["Cursor"];
	/** node is a simple thread */
	node: Thread;
};

/**
 * The **Timestamps** is metadata information about a particular object. It
 * tells when it was created and last updated. Notice: updatedAt doesn't store
 * historical data only the last update date
 */
export type Timestamps = {
	/** create date and time */
	createdAt: Scalars["DateTime"];
	/** last update date and time */
	updatedAt: Scalars["DateTime"];
};

/**
 * Refers to utilizers of the system. At first people can initiate an
 * *original post (OP)*, beginning a topic or just join a conversation through
 * posting in the threads. Users in this system are used to provide customized
 * experience in the application. They aren't tracked in any form
 */
export type User = Node &
	Timestamps & {
		__typename?: "User";
		/** user avatar, a image representing its persona */
		avatar?: Maybe<Scalars["Avatar"]>;
		/** creation date and time */
		createdAt: Scalars["DateTime"];
		/** user identifier */
		id: Scalars["ID"];
		/** user names */
		name: Naming;
		/** last update date and time */
		updatedAt: Scalars["DateTime"];
	};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> {
	subscribe: SubscriptionSubscribeFn<
		{ [key in TKey]: TResult },
		TParent,
		TContext,
		TArgs
	>;
	resolve?: SubscriptionResolveFn<
		TResult,
		{ [key in TKey]: TResult },
		TContext,
		TArgs
	>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((
			...args: any[]
	  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
	TResult = {},
	TParent = {},
	TContext = {},
	TArgs = {}
> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Avatar: ResolverTypeWrapper<Scalars["Avatar"]>;
	BackwardPageInput: BackwardPageInput;
	BigInt: ResolverTypeWrapper<Scalars["BigInt"]>;
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
	Byte: ResolverTypeWrapper<Scalars["Byte"]>;
	Connection:
		| ResolversTypes["PostParticipantsConnection"]
		| ResolversTypes["PostRepliesConnection"]
		| ResolversTypes["ThreadConnection"];
	Currency: ResolverTypeWrapper<Scalars["Currency"]>;
	Cursor: ResolverTypeWrapper<Scalars["Cursor"]>;
	DID: ResolverTypeWrapper<Scalars["DID"]>;
	Date: ResolverTypeWrapper<Scalars["Date"]>;
	DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
	Duration: ResolverTypeWrapper<Scalars["Duration"]>;
	Edge:
		| ResolversTypes["PostParticipantsEdge"]
		| ResolversTypes["PostReplyEdge"]
		| ResolversTypes["ThreadEdge"];
	EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
	ForwardPageInput: ForwardPageInput;
	GUID: ResolverTypeWrapper<Scalars["GUID"]>;
	HSL: ResolverTypeWrapper<Scalars["HSL"]>;
	HSLA: ResolverTypeWrapper<Scalars["HSLA"]>;
	HexColorCode: ResolverTypeWrapper<Scalars["HexColorCode"]>;
	Hexadecimal: ResolverTypeWrapper<Scalars["Hexadecimal"]>;
	IBAN: ResolverTypeWrapper<Scalars["IBAN"]>;
	ID: ResolverTypeWrapper<Scalars["ID"]>;
	IPv4: ResolverTypeWrapper<Scalars["IPv4"]>;
	IPv6: ResolverTypeWrapper<Scalars["IPv6"]>;
	ISBN: ResolverTypeWrapper<Scalars["ISBN"]>;
	ISO8601Duration: ResolverTypeWrapper<Scalars["ISO8601Duration"]>;
	JSON: ResolverTypeWrapper<Scalars["JSON"]>;
	JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
	JWT: ResolverTypeWrapper<Scalars["JWT"]>;
	Latitude: ResolverTypeWrapper<Scalars["Latitude"]>;
	LocalDate: ResolverTypeWrapper<Scalars["LocalDate"]>;
	LocalEndTime: ResolverTypeWrapper<Scalars["LocalEndTime"]>;
	LocalTime: ResolverTypeWrapper<Scalars["LocalTime"]>;
	Long: ResolverTypeWrapper<Scalars["Long"]>;
	Longitude: ResolverTypeWrapper<Scalars["Longitude"]>;
	MAC: ResolverTypeWrapper<Scalars["MAC"]>;
	Naming: ResolverTypeWrapper<Naming>;
	NegativeFloat: ResolverTypeWrapper<Scalars["NegativeFloat"]>;
	NegativeInt: ResolverTypeWrapper<Scalars["NegativeInt"]>;
	Node:
		| ResolversTypes["Post"]
		| ResolversTypes["Thread"]
		| ResolversTypes["User"];
	NonEmptyString: ResolverTypeWrapper<Scalars["NonEmptyString"]>;
	NonNegativeFloat: ResolverTypeWrapper<Scalars["NonNegativeFloat"]>;
	NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
	NonPositiveFloat: ResolverTypeWrapper<Scalars["NonPositiveFloat"]>;
	NonPositiveInt: ResolverTypeWrapper<Scalars["NonPositiveInt"]>;
	ObjectID: ResolverTypeWrapper<Scalars["ObjectID"]>;
	PageInfo: ResolverTypeWrapper<PageInfo>;
	PageInput: PageInput;
	PhoneNumber: ResolverTypeWrapper<Scalars["PhoneNumber"]>;
	Port: ResolverTypeWrapper<Scalars["Port"]>;
	PositiveFloat: ResolverTypeWrapper<Scalars["PositiveFloat"]>;
	PositiveInt: ResolverTypeWrapper<Scalars["PositiveInt"]>;
	Post: ResolverTypeWrapper<
		Omit<Post, "author" | "replies"> & {
			author: ResolversTypes["User"];
			replies: ResolversTypes["PostRepliesConnection"];
		}
	>;
	PostParticipantsConnection: ResolverTypeWrapper<
		Omit<PostParticipantsConnection, "edges"> & {
			edges: Array<ResolversTypes["PostParticipantsEdge"]>;
		}
	>;
	PostParticipantsEdge: ResolverTypeWrapper<
		Omit<PostParticipantsEdge, "node"> & { node: ResolversTypes["User"] }
	>;
	PostRepliesConnection: ResolverTypeWrapper<
		Omit<PostRepliesConnection, "edges"> & {
			edges: Array<ResolversTypes["PostReplyEdge"]>;
		}
	>;
	PostReplyEdge: ResolverTypeWrapper<
		Omit<PostReplyEdge, "node"> & { node: ResolversTypes["Post"] }
	>;
	PostalCode: ResolverTypeWrapper<Scalars["PostalCode"]>;
	Query: ResolverTypeWrapper<{}>;
	RGB: ResolverTypeWrapper<Scalars["RGB"]>;
	RGBA: ResolverTypeWrapper<Scalars["RGBA"]>;
	SafeInt: ResolverTypeWrapper<Scalars["SafeInt"]>;
	String: ResolverTypeWrapper<Scalars["String"]>;
	Thread: ResolverTypeWrapper<
		Omit<Thread, "participants" | "post"> & {
			participants: ResolversTypes["PostParticipantsConnection"];
			post: ResolversTypes["Post"];
		}
	>;
	ThreadConnection: ResolverTypeWrapper<
		Omit<ThreadConnection, "edges"> & {
			edges: Array<ResolversTypes["ThreadEdge"]>;
		}
	>;
	ThreadEdge: ResolverTypeWrapper<
		Omit<ThreadEdge, "node"> & { node: ResolversTypes["Thread"] }
	>;
	Time: ResolverTypeWrapper<Scalars["Time"]>;
	Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
	Timestamps:
		| ResolversTypes["Post"]
		| ResolversTypes["Thread"]
		| ResolversTypes["User"];
	URL: ResolverTypeWrapper<Scalars["URL"]>;
	USCurrency: ResolverTypeWrapper<Scalars["USCurrency"]>;
	UUID: ResolverTypeWrapper<Scalars["UUID"]>;
	UnsignedFloat: ResolverTypeWrapper<Scalars["UnsignedFloat"]>;
	UnsignedInt: ResolverTypeWrapper<Scalars["UnsignedInt"]>;
	User: ResolverTypeWrapper<UserDocument>;
	UtcOffset: ResolverTypeWrapper<Scalars["UtcOffset"]>;
	Void: ResolverTypeWrapper<Scalars["Void"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Avatar: Scalars["Avatar"];
	BackwardPageInput: BackwardPageInput;
	BigInt: Scalars["BigInt"];
	Boolean: Scalars["Boolean"];
	Byte: Scalars["Byte"];
	Connection:
		| ResolversParentTypes["PostParticipantsConnection"]
		| ResolversParentTypes["PostRepliesConnection"]
		| ResolversParentTypes["ThreadConnection"];
	Currency: Scalars["Currency"];
	Cursor: Scalars["Cursor"];
	DID: Scalars["DID"];
	Date: Scalars["Date"];
	DateTime: Scalars["DateTime"];
	Duration: Scalars["Duration"];
	Edge:
		| ResolversParentTypes["PostParticipantsEdge"]
		| ResolversParentTypes["PostReplyEdge"]
		| ResolversParentTypes["ThreadEdge"];
	EmailAddress: Scalars["EmailAddress"];
	ForwardPageInput: ForwardPageInput;
	GUID: Scalars["GUID"];
	HSL: Scalars["HSL"];
	HSLA: Scalars["HSLA"];
	HexColorCode: Scalars["HexColorCode"];
	Hexadecimal: Scalars["Hexadecimal"];
	IBAN: Scalars["IBAN"];
	ID: Scalars["ID"];
	IPv4: Scalars["IPv4"];
	IPv6: Scalars["IPv6"];
	ISBN: Scalars["ISBN"];
	ISO8601Duration: Scalars["ISO8601Duration"];
	JSON: Scalars["JSON"];
	JSONObject: Scalars["JSONObject"];
	JWT: Scalars["JWT"];
	Latitude: Scalars["Latitude"];
	LocalDate: Scalars["LocalDate"];
	LocalEndTime: Scalars["LocalEndTime"];
	LocalTime: Scalars["LocalTime"];
	Long: Scalars["Long"];
	Longitude: Scalars["Longitude"];
	MAC: Scalars["MAC"];
	Naming: Naming;
	NegativeFloat: Scalars["NegativeFloat"];
	NegativeInt: Scalars["NegativeInt"];
	Node:
		| ResolversParentTypes["Post"]
		| ResolversParentTypes["Thread"]
		| ResolversParentTypes["User"];
	NonEmptyString: Scalars["NonEmptyString"];
	NonNegativeFloat: Scalars["NonNegativeFloat"];
	NonNegativeInt: Scalars["NonNegativeInt"];
	NonPositiveFloat: Scalars["NonPositiveFloat"];
	NonPositiveInt: Scalars["NonPositiveInt"];
	ObjectID: Scalars["ObjectID"];
	PageInfo: PageInfo;
	PageInput: PageInput;
	PhoneNumber: Scalars["PhoneNumber"];
	Port: Scalars["Port"];
	PositiveFloat: Scalars["PositiveFloat"];
	PositiveInt: Scalars["PositiveInt"];
	Post: Omit<Post, "author" | "replies"> & {
		author: ResolversParentTypes["User"];
		replies: ResolversParentTypes["PostRepliesConnection"];
	};
	PostParticipantsConnection: Omit<PostParticipantsConnection, "edges"> & {
		edges: Array<ResolversParentTypes["PostParticipantsEdge"]>;
	};
	PostParticipantsEdge: Omit<PostParticipantsEdge, "node"> & {
		node: ResolversParentTypes["User"];
	};
	PostRepliesConnection: Omit<PostRepliesConnection, "edges"> & {
		edges: Array<ResolversParentTypes["PostReplyEdge"]>;
	};
	PostReplyEdge: Omit<PostReplyEdge, "node"> & {
		node: ResolversParentTypes["Post"];
	};
	PostalCode: Scalars["PostalCode"];
	Query: {};
	RGB: Scalars["RGB"];
	RGBA: Scalars["RGBA"];
	SafeInt: Scalars["SafeInt"];
	String: Scalars["String"];
	Thread: Omit<Thread, "participants" | "post"> & {
		participants: ResolversParentTypes["PostParticipantsConnection"];
		post: ResolversParentTypes["Post"];
	};
	ThreadConnection: Omit<ThreadConnection, "edges"> & {
		edges: Array<ResolversParentTypes["ThreadEdge"]>;
	};
	ThreadEdge: Omit<ThreadEdge, "node"> & {
		node: ResolversParentTypes["Thread"];
	};
	Time: Scalars["Time"];
	Timestamp: Scalars["Timestamp"];
	Timestamps:
		| ResolversParentTypes["Post"]
		| ResolversParentTypes["Thread"]
		| ResolversParentTypes["User"];
	URL: Scalars["URL"];
	USCurrency: Scalars["USCurrency"];
	UUID: Scalars["UUID"];
	UnsignedFloat: Scalars["UnsignedFloat"];
	UnsignedInt: Scalars["UnsignedInt"];
	User: UserDocument;
	UtcOffset: Scalars["UtcOffset"];
	Void: Scalars["Void"];
};

export interface AvatarScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Avatar"], any> {
	name: "Avatar";
}

export interface BigIntScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["BigInt"], any> {
	name: "BigInt";
}

export interface ByteScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Byte"], any> {
	name: "Byte";
}

export type ConnectionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Connection"] = ResolversParentTypes["Connection"]
> = {
	__resolveType: TypeResolveFn<
		"PostParticipantsConnection" | "PostRepliesConnection" | "ThreadConnection",
		ParentType,
		ContextType
	>;
	edges?: Resolver<Array<ResolversTypes["Edge"]>, ParentType, ContextType>;
	pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
};

export interface CurrencyScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Currency"], any> {
	name: "Currency";
}

export interface CursorScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Cursor"], any> {
	name: "Cursor";
}

export interface DidScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["DID"], any> {
	name: "DID";
}

export interface DateScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
	name: "Date";
}

export interface DateTimeScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
	name: "DateTime";
}

export interface DurationScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Duration"], any> {
	name: "Duration";
}

export type EdgeResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Edge"] = ResolversParentTypes["Edge"]
> = {
	__resolveType: TypeResolveFn<
		"PostParticipantsEdge" | "PostReplyEdge" | "ThreadEdge",
		ParentType,
		ContextType
	>;
	cursor?: Resolver<ResolversTypes["Cursor"], ParentType, ContextType>;
	node?: Resolver<ResolversTypes["Node"], ParentType, ContextType>;
};

export interface EmailAddressScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
	name: "EmailAddress";
}

export interface GuidScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["GUID"], any> {
	name: "GUID";
}

export interface HslScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["HSL"], any> {
	name: "HSL";
}

export interface HslaScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["HSLA"], any> {
	name: "HSLA";
}

export interface HexColorCodeScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["HexColorCode"], any> {
	name: "HexColorCode";
}

export interface HexadecimalScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Hexadecimal"], any> {
	name: "Hexadecimal";
}

export interface IbanScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["IBAN"], any> {
	name: "IBAN";
}

export interface IPv4ScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["IPv4"], any> {
	name: "IPv4";
}

export interface IPv6ScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["IPv6"], any> {
	name: "IPv6";
}

export interface IsbnScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["ISBN"], any> {
	name: "ISBN";
}

export interface Iso8601DurationScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["ISO8601Duration"], any> {
	name: "ISO8601Duration";
}

export interface JsonScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
	name: "JSON";
}

export interface JsonObjectScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["JSONObject"], any> {
	name: "JSONObject";
}

export interface JwtScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["JWT"], any> {
	name: "JWT";
}

export interface LatitudeScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Latitude"], any> {
	name: "Latitude";
}

export interface LocalDateScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["LocalDate"], any> {
	name: "LocalDate";
}

export interface LocalEndTimeScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["LocalEndTime"], any> {
	name: "LocalEndTime";
}

export interface LocalTimeScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["LocalTime"], any> {
	name: "LocalTime";
}

export interface LongScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Long"], any> {
	name: "Long";
}

export interface LongitudeScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Longitude"], any> {
	name: "Longitude";
}

export interface MacScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["MAC"], any> {
	name: "MAC";
}

export type NamingResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Naming"] = ResolversParentTypes["Naming"]
> = {
	first?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	last?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	nick?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface NegativeFloatScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["NegativeFloat"], any> {
	name: "NegativeFloat";
}

export interface NegativeIntScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["NegativeInt"], any> {
	name: "NegativeInt";
}

export type NodeResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = {
	__resolveType: TypeResolveFn<
		"Post" | "Thread" | "User",
		ParentType,
		ContextType
	>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
};

export interface NonEmptyStringScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["NonEmptyString"], any> {
	name: "NonEmptyString";
}

export interface NonNegativeFloatScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["NonNegativeFloat"], any> {
	name: "NonNegativeFloat";
}

export interface NonNegativeIntScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["NonNegativeInt"], any> {
	name: "NonNegativeInt";
}

export interface NonPositiveFloatScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["NonPositiveFloat"], any> {
	name: "NonPositiveFloat";
}

export interface NonPositiveIntScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["NonPositiveInt"], any> {
	name: "NonPositiveInt";
}

export interface ObjectIdScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["ObjectID"], any> {
	name: "ObjectID";
}

export type PageInfoResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = {
	endCursor?: Resolver<ResolversTypes["Cursor"], ParentType, ContextType>;
	hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	hasPreviousPage?: Resolver<
		ResolversTypes["Boolean"],
		ParentType,
		ContextType
	>;
	startCursor?: Resolver<ResolversTypes["Cursor"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PhoneNumberScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["PhoneNumber"], any> {
	name: "PhoneNumber";
}

export interface PortScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Port"], any> {
	name: "Port";
}

export interface PositiveFloatScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["PositiveFloat"], any> {
	name: "PositiveFloat";
}

export interface PositiveIntScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["PositiveInt"], any> {
	name: "PositiveInt";
}

export type PostResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Post"] = ResolversParentTypes["Post"]
> = {
	author?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
	createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	likes?: Resolver<ResolversTypes["NonNegativeInt"], ParentType, ContextType>;
	message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	replies?: Resolver<
		ResolversTypes["PostRepliesConnection"],
		ParentType,
		ContextType,
		Partial<PostRepliesArgs>
	>;
	updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostParticipantsConnectionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["PostParticipantsConnection"] = ResolversParentTypes["PostParticipantsConnection"]
> = {
	edges?: Resolver<
		Array<ResolversTypes["PostParticipantsEdge"]>,
		ParentType,
		ContextType
	>;
	interactions?: Resolver<
		ResolversTypes["NonNegativeInt"],
		ParentType,
		ContextType
	>;
	pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostParticipantsEdgeResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["PostParticipantsEdge"] = ResolversParentTypes["PostParticipantsEdge"]
> = {
	cursor?: Resolver<ResolversTypes["Cursor"], ParentType, ContextType>;
	node?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostRepliesConnectionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["PostRepliesConnection"] = ResolversParentTypes["PostRepliesConnection"]
> = {
	edges?: Resolver<
		Array<ResolversTypes["PostReplyEdge"]>,
		ParentType,
		ContextType
	>;
	pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostReplyEdgeResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["PostReplyEdge"] = ResolversParentTypes["PostReplyEdge"]
> = {
	cursor?: Resolver<ResolversTypes["Cursor"], ParentType, ContextType>;
	node?: Resolver<ResolversTypes["Post"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PostalCodeScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["PostalCode"], any> {
	name: "PostalCode";
}

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
	threads?: Resolver<
		ResolversTypes["ThreadConnection"],
		ParentType,
		ContextType,
		Partial<QueryThreadsArgs>
	>;
};

export interface RgbScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["RGB"], any> {
	name: "RGB";
}

export interface RgbaScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["RGBA"], any> {
	name: "RGBA";
}

export interface SafeIntScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["SafeInt"], any> {
	name: "SafeInt";
}

export type ThreadResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Thread"] = ResolversParentTypes["Thread"]
> = {
	createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	lastActivity?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
	participants?: Resolver<
		ResolversTypes["PostParticipantsConnection"],
		ParentType,
		ContextType,
		Partial<ThreadParticipantsArgs>
	>;
	post?: Resolver<ResolversTypes["Post"], ParentType, ContextType>;
	replies?: Resolver<ResolversTypes["NonNegativeInt"], ParentType, ContextType>;
	title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadConnectionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["ThreadConnection"] = ResolversParentTypes["ThreadConnection"]
> = {
	edges?: Resolver<
		Array<ResolversTypes["ThreadEdge"]>,
		ParentType,
		ContextType
	>;
	pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
	total?: Resolver<ResolversTypes["NonNegativeInt"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadEdgeResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["ThreadEdge"] = ResolversParentTypes["ThreadEdge"]
> = {
	cursor?: Resolver<ResolversTypes["Cursor"], ParentType, ContextType>;
	node?: Resolver<ResolversTypes["Thread"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Time"], any> {
	name: "Time";
}

export interface TimestampScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Timestamp"], any> {
	name: "Timestamp";
}

export type TimestampsResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Timestamps"] = ResolversParentTypes["Timestamps"]
> = {
	__resolveType: TypeResolveFn<
		"Post" | "Thread" | "User",
		ParentType,
		ContextType
	>;
	createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
	updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
};

export interface UrlScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["URL"], any> {
	name: "URL";
}

export interface UsCurrencyScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["USCurrency"], any> {
	name: "USCurrency";
}

export interface UuidScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["UUID"], any> {
	name: "UUID";
}

export interface UnsignedFloatScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["UnsignedFloat"], any> {
	name: "UnsignedFloat";
}

export interface UnsignedIntScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["UnsignedInt"], any> {
	name: "UnsignedInt";
}

export type UserResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
	avatar?: Resolver<Maybe<ResolversTypes["Avatar"]>, ParentType, ContextType>;
	createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	name?: Resolver<ResolversTypes["Naming"], ParentType, ContextType>;
	updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UtcOffsetScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["UtcOffset"], any> {
	name: "UtcOffset";
}

export interface VoidScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
	name: "Void";
}

export type Resolvers<ContextType = any> = {
	Avatar?: GraphQLScalarType;
	BigInt?: GraphQLScalarType;
	Byte?: GraphQLScalarType;
	Connection?: ConnectionResolvers<ContextType>;
	Currency?: GraphQLScalarType;
	Cursor?: GraphQLScalarType;
	DID?: GraphQLScalarType;
	Date?: GraphQLScalarType;
	DateTime?: GraphQLScalarType;
	Duration?: GraphQLScalarType;
	Edge?: EdgeResolvers<ContextType>;
	EmailAddress?: GraphQLScalarType;
	GUID?: GraphQLScalarType;
	HSL?: GraphQLScalarType;
	HSLA?: GraphQLScalarType;
	HexColorCode?: GraphQLScalarType;
	Hexadecimal?: GraphQLScalarType;
	IBAN?: GraphQLScalarType;
	IPv4?: GraphQLScalarType;
	IPv6?: GraphQLScalarType;
	ISBN?: GraphQLScalarType;
	ISO8601Duration?: GraphQLScalarType;
	JSON?: GraphQLScalarType;
	JSONObject?: GraphQLScalarType;
	JWT?: GraphQLScalarType;
	Latitude?: GraphQLScalarType;
	LocalDate?: GraphQLScalarType;
	LocalEndTime?: GraphQLScalarType;
	LocalTime?: GraphQLScalarType;
	Long?: GraphQLScalarType;
	Longitude?: GraphQLScalarType;
	MAC?: GraphQLScalarType;
	Naming?: NamingResolvers<ContextType>;
	NegativeFloat?: GraphQLScalarType;
	NegativeInt?: GraphQLScalarType;
	Node?: NodeResolvers<ContextType>;
	NonEmptyString?: GraphQLScalarType;
	NonNegativeFloat?: GraphQLScalarType;
	NonNegativeInt?: GraphQLScalarType;
	NonPositiveFloat?: GraphQLScalarType;
	NonPositiveInt?: GraphQLScalarType;
	ObjectID?: GraphQLScalarType;
	PageInfo?: PageInfoResolvers<ContextType>;
	PhoneNumber?: GraphQLScalarType;
	Port?: GraphQLScalarType;
	PositiveFloat?: GraphQLScalarType;
	PositiveInt?: GraphQLScalarType;
	Post?: PostResolvers<ContextType>;
	PostParticipantsConnection?: PostParticipantsConnectionResolvers<ContextType>;
	PostParticipantsEdge?: PostParticipantsEdgeResolvers<ContextType>;
	PostRepliesConnection?: PostRepliesConnectionResolvers<ContextType>;
	PostReplyEdge?: PostReplyEdgeResolvers<ContextType>;
	PostalCode?: GraphQLScalarType;
	Query?: QueryResolvers<ContextType>;
	RGB?: GraphQLScalarType;
	RGBA?: GraphQLScalarType;
	SafeInt?: GraphQLScalarType;
	Thread?: ThreadResolvers<ContextType>;
	ThreadConnection?: ThreadConnectionResolvers<ContextType>;
	ThreadEdge?: ThreadEdgeResolvers<ContextType>;
	Time?: GraphQLScalarType;
	Timestamp?: GraphQLScalarType;
	Timestamps?: TimestampsResolvers<ContextType>;
	URL?: GraphQLScalarType;
	USCurrency?: GraphQLScalarType;
	UUID?: GraphQLScalarType;
	UnsignedFloat?: GraphQLScalarType;
	UnsignedInt?: GraphQLScalarType;
	User?: UserResolvers<ContextType>;
	UtcOffset?: GraphQLScalarType;
	Void?: GraphQLScalarType;
};
