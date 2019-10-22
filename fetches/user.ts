import fetch from 'node-fetch';
import getUrl, { headers } from './getUrl';

const user = async ({
    username,
}: {
    username: string;
}) => {
    const url = getUrl({ pathname: `/users/${username}` });
    return fetch(url, { headers });
};

export default user;
