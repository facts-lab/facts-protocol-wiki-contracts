/*
*  https://github.com/CommunityXYZ/community-js/blob/master/src/utils.ts#L23
*/
export function _isValidArweaveAddress(address) {
    if (address && typeof address === 'string' && address.length === 43) {
        return /[a-z0-9_-]{43}/i.test(address);
    }
    return false;
}
