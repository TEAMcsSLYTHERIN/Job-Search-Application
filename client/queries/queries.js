allUserData = `{
  user(UserName: "Draco") {
    id
    firstName
    lastName
    password
    email
    phone
    applications {
    	companyName
      title
      dateApplied
      link
      description
      notes
      notification
      ContactId
      UserId
      contact {
        firstName
        lastName
        email
        phone
      }
    }
  }
}`;



module.exports = {
  allUserData
}