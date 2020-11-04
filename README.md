# CRM- Model: Dog Grooming Business. 
Using Express.js, mySQL, & Node.js.
(DB Interaction: (CRU*D*)).



						 Getting started:
- **Step 1:**
Start Node.js.

- **Step 2:**
Navigate to the 'public' folder that contains the 'server.js' file.

- **Step 3:**
Enter the following command:
`node server.js`
or
`nodemon server.js`
(If you have it installed)

- **Step 4:**
Should see a log in the command prompt.

- **Final Step:**
Open web browser navigate to: **localhost:4000**.
Once logged in you can view a members only page that allows users to alter things in a separate database.

**To Do:**
- [] General refactoring.
- [] error handling.
- [] UI improvement.

*Note: I am using my own SQL DB. If you have different DB-names, replace these 2 databases:* 

DB1: Identities(Username/PW) database:
`host     : 'localhost',
	user     : 'root',
	password : 'admin',
	database : 'nodelogin'`.

DB2: Customer Interaction database:
  All same, but with this change->:
   `database : 'customers'`.
  
