# Recipe Finder
Website created by CSE341 team 6 as final project to reinforce learning Node.js
_______________________________________________________________________________________________________________
To run this on your local machine (localhost:5000) you need to create a .env file at the root level and add your
individual information - your sendgrid api key, mongo database, your email and a spoonaculari api key (free)

SENDGRID_API_KEY=
MONGODB_URL=
JWT_SECRET=MY_SECRET_KEY
SENDEMAIL = 
SPOONACULAR_API_KEY=
___________________________________________________________________________________________________________

Location: (Need to add a Heroku server location)

The functionalities present in the website are:

- Search for a recipe by its name or ingredients. (Spoonacular API)
- Create a new user's account.
- Receive a welcome email upon creating a new account. (Sendgrid)
- Log in an existing account. 
- Read description, preparing instructions, and see ingredient images of recipes.
- Mark recipes as favorites.
- Manage your favorite recipes list.
- Manage your account (change password and delete account).



## Recipes information source

Recipes are retrieved using API fetch from the [Spoonacular food and recipes API](https://spoonacular.com/food-api).





## Technologies

#### Front-end:

- HTML5
- CSS3
- JavaScript


#### Back-end:

- Node.js
- MongoDB
- Mongoose
- Handlebars
- JSON Web Tokens



## External APIs

- [Spoonacular API](https://spoonacular.com/food-api)
- [Sendgrid email API](https://sendgrid.com/solutions/email-api/)



## Assets credits

- Logo: Kina Michie




## Notice

This application is intended for learning and entertainment purposes. **We do not endorse or recommend any recipe listed on the website**.