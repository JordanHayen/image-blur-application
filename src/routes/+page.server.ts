import { LOGGLY_TOKEN } from "$env/static/private";

console.log(LOGGLY_TOKEN);

export async function load({ params }) {
	return {
		post: {
            logglyToken: LOGGLY_TOKEN
        }
	};
}