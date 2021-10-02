var api = `https://mighty-oasis-08080.herokuapp.com/api/`
var ArticleApi = api + `articles`;
var tagsUrl = api + `tags`;
var localStoragekey = "api_user";
var userVerify = api + `/user`;
var userProfile = api + `/:username`
export {api,ArticleApi,tagsUrl, localStoragekey, userVerify, userProfile};