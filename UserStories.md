Sample from debonairbnb




# User Stories

## Patrons (User)

### Sign Up

* As an unregistered patron, I want to be able to sign up for the website.
    * I would like to enter  my details (patron name, e-mail address, etc.) in an organized form.
    * I should be logged  into the website immediately after successful sign-up.
  * If my registration information is invalid
    * The form should let me know what was wrong in a clear way, and keep any data that was correct on the form.

### Log in

* As a registered and unauthorized patron, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my credential and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-in form.
  * When I fail to log in because of invalid credentials and/or password:
    * I would like the website to inform me of the validations I failed to pass in a secure way.

### Demo User

* As a grader/recruiter I should be able to log in easily via a demo user button to view the site's functionality.

### Log Out

* As a logged in patron, I want to be able to  log out of the website when I am finished with an easy to find button to protect my data and user information.

## Estates (Spots)

### Create Estates

* As a logged in patron
  * I should be able to create a new Estate to rent out to other Patrons with a clearly laid out form
  * When I'm on the new Estate form, I should be able to upload photos of my Estate for other Patrons to view before booking and provide all the relevant details (such as availability, location).

### Viewing Estates

* As a logged in or logged out patron, I want to be able to view a selection of Estates.
* Default view for the homepage will be the top 16 estates based off critiques.
  * When I'm on the `/estates` page - (home page will act as the /estates page)
    * I should see a selection of estates (possibly organized by type or category)
      * So that I can easily find other estates  to charter.
   * I should be able to search  for estates by location and availability.

* As a logged in _or_ logged out patron, I want to be able to view a specific estate and review its attributes.
    * I can view the location in greater detail, see the description, amenities etc.
    * I can view the availability and  make a booking.

### Updating Estates

* As a hosting patron, I can update the details and availability of my estate whenever I like.
  * I can click edit access a form to make the changes that I need.

### Deleting Estates

* As a hosting patron, if I no longer wish to charter my estate I can delete my listing.
  * When viewing or editing my estate
    * I can click "Delete" to permanently delete a estate
      * with confirmation so that I do not accidentally delete an estate!

## Charters (Bookings)

### Create Bookings

* As a logged in patron viewing an estate, I should be able to charter the estate for blocks of time where it is available.

### Viewing Bookings

* As a logged in or logged out patron, I should be able to see all of my bookings on the `/charters` route.
* As a hosting patron, I should be able to see all of my outstanding and upcoming charters.

### Updating Bookings

* As a patron, I can update the dates of my charter if the estate has availability.  

### Deleting Booking

* As a hosting patron, I can cancel charters when I can no longer host my estate for a future engagement.
* As a patron chartering an estate, I can cancel my charter if I can no longer make it during a particular time period. 
   * I understand that there may be  penalties associated for canceling my charter close to the booking.

## Critiques (Reviews)

### Creating Critiques

* As a logged out patron, I will be redirected to the login page upon attempt to write a critique on an estate.
* As a logged in patron, I can leave a critique on an estate by navigating to the estate page and filling out the form on the estate page.

### Viewing Critiques

* As a patron, I can see all critiques posted on every estate, regardless of log in state.

### Updating Critiques

* As a logged in patron, I can edit any critique I have left on any estate by navigating to the estate page and clicking on the "polish" button near my critique.

### Deleting Critiques

* As a logged in patron, I can delete any critique I have left on any estate by navigating to the estate page and clicking on the "expunge" button near my critique.

## Estate Search

* There will be a search bar in the main navigation bar on every page, there will be a date range selector to the right of the search bar.
* Clicking search will refresh the home page with results.
   * A patron can click the search bar with nothing filled in for all results
   * A patron can select specific dates, and results will be filtered by estates available for only those dates
   * A patron can search by location, or estate name, and results will filtered by the query.
   * When a patron's search returns no results, there is a message saying that no results were found.
   * Patrons will be able to filter results shown by the type selector, refreshing the results below

## Bonus Features

### Messages

* On the patron's charter page, there will be an option to send a message to the host patron.
* A live chat window will pop up beneath the confirmed charter booking
* A hosting patron will have the option to send a message for all bookings, the messages will display underneath the charter in their `charters` page

