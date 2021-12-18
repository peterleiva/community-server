import { gql, type QueryOptions } from "@apollo/client/core";
import { Factory } from "fishery";

const timestamps = `
	createdAt
	updatedAt
`;

const user = `
	id
	name {
		first
		last
		nick
	}

	${timestamps}
`;
const post = `
	id
	message
	author {
		${user}
	}
	likes

	${timestamps}
`;

export const GET_THREADS = gql`
	{
		threads {
			edges {
				node {
					id
					title
					post {
						${post}
					}

					participants {
						interactions

						edges {
							node {
								${user}
							}
						}
					}
					lastActivity
					replies

					${timestamps}
				}
			}
			total
		}
	}
`;

export const QueryOptionsFactory = Factory.define<QueryOptions>(() => {
	return {
		query: GET_THREADS,
		fetchPolicy: "no-cache",
	};
});
