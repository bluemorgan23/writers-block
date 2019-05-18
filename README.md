
# The Writer's Block

The Writer's Block is a text-analysis utility that allows a user to determine score of a group of text based on the vocabulary selections. For example, if a user is preparing a work email, he/she could paste the content into the application to make sure that the text scores as a "business" level. If the text scores a "Casual" grade, the user can find synoynm replacements for certan words that the application systematically choses. The idea is that the application will be a second pair of eyes to look over your writing to make sure you are using strong word choices. The repititive user will have the benefit of learning many new words over time, which demonstrates the educational benefits of the application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

In order to use this application, after cloning down the repository, the user must follow these steps: 

1. Go into the `api` directory of the application. Create a `database.json` file, and copy/paste the `database.json.example` file contents into the newly created file.

2. In Bash/Terminal, run a JSON-Server on 5002 and use the new database.json file
     `json-server -p 5002 -w database.json`

3. Once the JSON-Server is running, open up a new tab in the Bash/Terminal and make sure you are in the root directory of The Writer's Block application. Once you are sure of this, type `npm install ` , and then, `npm start`

4. Now the application should initiatilize. The user will be presented with a login screen. If the user is not already registered (on the local JSON-Server...), he/she can create an account on the register page.

5. The user will now see the welcome page that explains how to use the application. The short version is that the user can enter a grouping of text to receive a score based on the vocabulary used. The user can utilize the application to find synonyms for words that fall below the "average word score" of the entire text group. The idea is that the vocabulary of the text will be enhanced by using the application.


## Built With

* ReactJS
* ReactStrap
* React-Icons
* React-Loading-Screens

## Authors

* **Chris Morgan** -(https://github.com/bluemorgan23)


## Acknowledgments

* Hat tip to Nashville Software School for guiding me in my pursuit of knowledge.