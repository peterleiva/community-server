import { IFieldResolver } from "@graphql-tools/utils";
import { PageInfo, EdgeConnection } from "lib/connection/types";
import { PostParticipantResult } from "./thread";
import { UserDocument, UserModel } from "modules/user";

export const pageInfo: IFieldResolver<
	PostParticipantResult,
	unknown,
	unknown,
	PageInfo
> = function pageInfo(source) {
	const { interactions, page } = source;

	const startCursor = page?.[0].updatedAt;
	const endCursor = page?.[interactions.length - 1].updatedAt;
	const hasNextPage = interactions.some(i => i.updatedAt > endCursor);
	const hasPreviousPage = interactions.some(i => i.updatedAt < startCursor);

	return {
		startCursor,
		endCursor,
		hasNextPage,
		hasPreviousPage,
	};
};

export const interactions: IFieldResolver<
	PostParticipantResult,
	unknown,
	unknown,
	number
> = function interactions(source) {
	return source.interactions.length;
};

export const edges: IFieldResolver<
	PostParticipantResult,
	unknown,
	unknown,
	Promise<EdgeConnection<UserDocument>>
> = async function edges({ page }) {
	const authors = page.map(async ({ author, updatedAt }) => {
		const node = (await UserModel.findById(
			author._id
		).exec()) as NonNullable<UserDocument>;
		const cursor = updatedAt;

		return {
			node,
			cursor,
		};
	});

	return Promise.all(authors);
};

export const PostParticipantsConnection = {
	edges,
	pageInfo,
	interactions,
};
