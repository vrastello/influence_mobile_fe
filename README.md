#README

## How to set up:
   * simply clone and run `npm start` in root directory
   * used React version 18.2.0
   * This will run on localhost port 3000
   * I pointed front end at local host port 3002, so please use that for server set up

### Bonus Features (beyond MVP requirements):
* Used React for front end
* Included Rspec tests on back end
* JWT authentication, using session storage on FE and secret key on BE
  * protected routing, redirects to login if no token
  * if token bad user will recieve error message
  * if user enters invalid url path, default page not found activated
* User roles
  * admin and regular users
  * buttons dynamic on front end depending on role
  * admins have access to admin portal
  * user only has access to offers page
  * if user attempts to access admin url path they will be authenticated as admin on back end
  * if not admin recieve redirect and error message
* Validation on login and registration form
  * rails validation errors will display on FE
  * invalid user and password will display on FE
* Error messages and success messages (with 5 sec timeout!)
  * if BE action is success, user recieves notification
  * if any BE error, it will be caught and user recieves notification
  * login and registration do not have error message time out, so user can review issues
* Logout button
  * logs user out and removes token from session storage  
* Play hours feature
  * in addition to viewing offers users can click dynamic form to log play hours
  * This is to simulate user clicking offer to play game
    * also simulate inflluence mobile collecting data on offer, gender, age range and play hours
    * logging play hours updates play hours for offer detail table
        * that match users age, gender and offer
* Admin portal
  * Lists all offers (instead of user page with selected offers)
  * offer detail view, admin can click on individual offer listing graph icon and see total play hours per age and gender groups
  * Admin has access to interactive table, with sorting search, filters, density toggle and full screen mode
    * I didn't reinvent wheel but implemented technology from npm package for the table.
* Added some architecture for future extensibility
  * thought process was for overall idea, not just short term project
  * wanted to simulate real project
  * please see project notes on decisions made for architecture
* Used/modified Css and Sass templates found online to make it look nice
  * I used these templates rather than doing my own custom css and sass
  * just being upfront that the css and scss files are not something I did on my own.
  * everything else is mine...I can do css and scss if needed but for speed/small scale project chose to use template.
  

