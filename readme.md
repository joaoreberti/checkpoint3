# Checkpoint n°3 - JS - **4h**

For this exercise you have 4 hours ahead of you. This checkpoint is not an exam, it will allow us to validate your skills, so try to do it as much as possible on your side.
This checkpoint is very consistent, if you can't do everything it doesn't matter, do your best;)

**!!! FIRST STEP REQUIRED BEFORE STARTING THE FIRST EXERCISE!!!!!**

-----------------------------------
* Clone this project
* Create a "first_name_city" branch, which will contain your progress (first_name_city will be replaced by your campus city, your first and last name...)

## Prerequisites (tools installed)

- NodeJS
- NPM
- MySQL
- Postman or curl


## A playlist application with Express

![Give Life Back to Music](https://laughingsquid.com/wp-content/uploads/2013/05/givelifebacktomusic5.gif)

Being a music lover, you want to create an application that allows you to manage playlists.

The goal here is to create the backend with Node/Express.

Here are the user stories that tell you which routes you will have to implement on your backend, and which SQL queries will have to be executed:

- as a user, I want to be able to create a new playlist.
- as a user, I want to be able to see a playlist by entering its id in the url.
- as a user, I want to create and assign a song to a playlist.
- as a user, I want to list all the songs from a playlist.
- as a user, I want to be able to delete a playlist.
- as a user, I want to be able to modify a playlist.
- as a user, I want to delete a song from a playlist.
- as a user, I want to edit a song from a playlist.

You will have to respect the following rules on your roads:
- The body of the **HTTP requests** must be in the **JSON format**
- The body of the **HTTP responses** must be in the **JSON format**
- HTTP requests for **reading** must **return the element(s)** back into the HTTP response
- HTTP requests for **creation and modification** must **return the created/modified element** in the HTTP response
- HTTP requests for **deletion** must not **return any element** in the HTTP response

**Complies with REST principles, especially with regard to naming different routes and HTTP return codes.**
- [http-status-codes](https://restfulapi.net/http-status-codes/)
- [REST best practices](https://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/)

Be sure to group the routes using the Express router and test the API with Postman.

You can find, down below, the schema of the database.

![BDD Schema](https://github.com/WildCodeSchool/checkpoint-3-node/blob/master/checkpoint3_js_db_schema.png)

#### Bonus

Create a route that allows you to search the database for playlists and songs according to the following criteria:

- the title of a playlist
- the kind (genre) of a playlist
- the artist of a track

The **parameters** must be entered in the **url**, all parameters are **optional** and they can be placed in **any order**.

#### Super Bonus

After all this work, there are still many things to do! We would like to be able to manage:

- the users
- the favorite playlists for each user

It will therefore be necessary to do the following things:

###### SQL

- create a `user` table containing at least the fields:
    - `id`
    - `first_name`
    - `last_name`
    - `email`
    - `password`
- add an `owner_id` field to the `playlist` table, to link a playlist to the user who created it
- create a `user_playlist` table, allowing to link a playlist to a user, to put it in favorites

##### Express Application

Here are the user stories of these additional features:

- as a user, I want to create my profile
- as a user, I want to add a playlist (including other users) to my favorites
- as a user, I want to remove a playlist from my favorites

And one last one (a super-super-bonus): as a user, I want to be able to find all the playlists containing songs by a certain artist.
