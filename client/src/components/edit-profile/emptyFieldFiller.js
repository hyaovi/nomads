import isEmpty from "../../validations/isEmpty";
//if profile field does not exist, mkae it empty
function emptyFieldFiller(profile) {
  profile.company = !isEmpty(profile.company) ? profile.company : "";
  profile.website = !isEmpty(profile.website) ? profile.website : "";
  profile.location = !isEmpty(profile.location) ? profile.location : "";
  profile.githubusername = !isEmpty(profile.githubusername)
    ? profile.githubusername
    : "";
  profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
  profile.social = !isEmpty(profile.social) ? profile.social : {};
  profile.twitter = !isEmpty(profile.social.twitter)
    ? profile.social.twitter
    : "";
  profile.facebook = !isEmpty(profile.social.facebook)
    ? profile.social.facebook
    : "";
  profile.linkedin = !isEmpty(profile.social.linkedin)
    ? profile.social.linkedin
    : "";
  profile.youtube = !isEmpty(profile.social.youtube)
    ? profile.social.youtube
    : "";
  profile.instagram = !isEmpty(profile.social.instagram)
    ? profile.social.instagram
    : "";
  return profile;
}
export default emptyFieldFiller;
