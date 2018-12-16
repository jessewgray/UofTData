# 1a. Display the first and last names of all actors from the table `actor`.

SELECT first_name, last_name FROM sakila.actor;

# 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column `Actor Name`.

SELECT CONCAT(first_name, last_name) AS Actor_Name FROM sakila.actor;

# 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?

SELECT actor_id, first_name, last_name FROM sakila.actor
	WHERE first_name = 'Joe';

# 2b. Find all actors whose last name contain the letters `GEN`:

SELECT last_name FROM sakila.actor
	WHERE last_name LIKE '%GEN%';

# 2c. Find all actors whose last names contain the letters `LI`. This time, order the rows by last name and first name, in that order:

SELECT last_name, first_name FROM sakila.actor
	WHERE last_name LIKE '%LI%'
    ORDER BY last_name, first_name;

# 2d. Using `IN`, display the `country_id` and `country` columns of the following countries: Afghanistan, Bangladesh, and China: 

SELECT country_id, country FROM sakila.country
	WHERE country = 'Afghanistan' OR country = 'Bangladesh' OR country = 'China';

#or

SELECT country_id, country FROM sakila.country
	WHERE (country) IN ('Afghanistan','Bangladesh','China');

# 3a. You want to keep a description of each actor. You don't think you will be performing queries on a description, so create a column in the table `actor` named `description` and use the data type `BLOB` (Make sure to research the type `BLOB`, as the difference between it and `VARCHAR` are significant).


ALTER TABLE sakila.actor
	ADD COLUMN description BLOB AFTER last_name;
    
# 3b. Very quickly you realize that entering descriptions for each actor is too much effort. Delete the `description` column.

ALTER TABLE sakila.actor 
	DROP COLUMN description;

#* 4a. List the last names of actors, as well as how many actors have that last name.

SELECT DISTINCT last_name, count(last_name) FROM sakila.actor
	GROUP BY last_name;

#* 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors.

SELECT last_name, COUNT(last_name) AS countit FROM sakila.actor
	GROUP BY last_name HAVING countit >= 2;
    

#* 4c. The actor `HARPO WILLIAMS` was accidentally entered in the `actor` table as `GROUCHO WILLIAMS`. Write a query to fix the record.

UPDATE sakila.actor
	SET first_name = 'HARPO'
    WHERE first_name = 'GROUCHO' AND last_name = 'WILLIAMS';

#* 4d. Perhaps we were too hasty in changing `GROUCHO` to `HARPO`. It turns out that `GROUCHO` was the correct name after all! In a single query, if the first name of the actor is currently `HARPO`, change it to `GROUCHO`.
    
UPDATE sakila.actor
	SET first_name = 'GROUCHO'
    WHERE first_name = 'HARPO' AND last_name = 'WILLIAMS';
    
# 5a. You cannot locate the schema of the `address` table. Which query would you use to re-create it?

SHOW CREATE TABLE sakila.address;

# 6a. Use `JOIN` to display the first and last names, as well as the address, of each staff member. Use the tables `staff` and `address`:

SELECT address.address_id, address.address, staff.first_name, staff.last_name
	FROM sakila.address
    INNER JOIN sakila.staff
    ON staff.address_id = address.address_id;
    
# 6b. Use `JOIN` to display the total amount rung up by each staff member in August of 2005. Use tables `staff` and `payment`.

SELECT s.staff_id, s.first_name, s.last_name, SUM(p.amount)
	FROM sakila.staff AS s
    LEFT JOIN sakila.payment AS p
    ON s.staff_id = p.staff_id
    WHERE p.payment_date LIKE "%2005-08%"
    GROUP BY s.staff_id;

# 6c. List each film and the number of actors who are listed for that film. Use tables `film_actor` and `film`. Use inner join.

SELECT film.title, COUNT(film_actor.actor_id)
	FROM sakila.film
    INNER JOIN sakila.film_actor
    ON film.film_id = film_actor.film_id
    GROUP BY film.film_id;
	
# 6d. How many copies of the film `Hunchback Impossible` exist in the inventory system?

SELECT film.title, COUNT(inventory.inventory_id)
	FROM sakila.film
    LEFT JOIN sakila.inventory
    ON film.film_id = inventory.film_id
	WHERE title = "Hunchback Impossible"
    GROUP BY film.title;

# 6e. Using the tables `payment` and `customer` and the `JOIN` command, list the total paid by each customer. List the customers alphabetically by last name:

 SELECT customer.customer_id, customer.first_name, customer.last_name, SUM(payment.amount)
	FROM sakila.customer
    LEFT JOIN sakila.payment
    ON payment.customer_id = customer.customer_id
    GROUP BY customer.customer_id
    ORDER BY customer.last_name;
 
 
# 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters `K` and `Q` have also soared in popularity. 
#Use subqueries to display the titles of movies starting with the letters `K` and `Q` whose language is English.

#no subquery
SELECT film.title, film.language_id 
FROM sakila.film
WHERE (film.language_id = 1) AND (film.title LIKE "Q%") OR (film.title LIKE "K%");

#subquery   
SELECT film.title
	FROM sakila.film
	WHERE (film.title LIKE "Q%") OR (film.title LIKE "K%") AND film.language_id IN (
		SELECT language.language_id
		FROM sakila.language
		WHERE language.name = 'English'
);

  
# 7b. Use subqueries to display all actors who appear in the film `Alone Trip`.

SELECT * FROM sakila.actor
	WHERE actor_id
		IN (SELECT film_actor.actor_id FROM sakila.film
		LEFT JOIN sakila.film_actor
		ON film_actor.film_id = film.film_id
		WHERE film.title = "ALONE TRIP");


# 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information.

SELECT customer.first_name, customer.last_name, customer.email  FROM sakila.customer
	LEFT JOIN sakila.address
    ON address.address_id = customer.address_id
    LEFT JOIN sakila.city
    ON city.city_id = address.city_id
    LEFT JOIN sakila.country
    ON country.country_id = city.country_id
    WHERE country = 'Canada';


# 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies categorized as _family_ films.

SELECT film.title FROM sakila.film
	WHERE film.film_id IN (
		SELECT film_category.film_id FROM sakila.film_category
        WHERE film_category.category_id IN (
			SELECT category.category_id FROM sakila.category
            WHERE category.name = 'Family'
        )
    );

# 7e. Display the most frequently rented movies in descending order (film, inventory and rental).

SELECT title, count(rental_id) FROM sakila.film
	LEFT JOIN sakila.inventory
    ON film.film_id = inventory.film_id
    LEFT JOIN sakila.rental
    ON inventory.inventory_id = rental.inventory_id
    GROUP BY film.title
    ORDER BY count(rental_id) DESC;


# 7f. Write a query to display how much business, in dollars, each store brought in. (payment, rental, inventory and store)

SELECT sum(payment.amount) FROM sakila.payment
	WHERE payment.staff_id IN (
		SELECT staff.staff_id FROM sakila.staff
			WHERE staff.store_id IN (
				SELECT store.store_id FROM sakila.store
					WHERE store.store_id = 1
                    GROUP BY store.store_id
            )
    )
    
UNION
    
    SELECT sum(payment.amount) FROM sakila.payment
	WHERE payment.staff_id IN (
		SELECT staff.staff_id FROM sakila.staff
			WHERE staff.store_id IN (
				SELECT store.store_id FROM sakila.store
					WHERE store.store_id = 2
                    GROUP BY store.store_id
            )
    );
    
    

   
# 7g. Write a query to display for each store its store ID, city, and country.

SELECT store.store_id, city.city, country.country FROM sakila.store
	LEFT JOIN sakila.address
    ON store.address_id = address.address_id
    LEFT JOIN sakila.city
    ON address.city_id = city.city_id
    LEFT JOIN sakila.country
    ON city.country_id = country.country_id;
	

# 7h. List the top five genres in gross revenue in descending order. (**Hint**: you may need to use the following tables: category, film_category, inventory, payment, and rental.)


SELECT category.name, sum(payment.amount) AS revenue FROM sakila.payment
	LEFT JOIN sakila.rental
    ON rental.rental_id = payment.rental_id
    LEFT JOIN sakila.inventory
    ON inventory.inventory_id = rental.inventory_id
    LEFT JOIN sakila.film_category 
    ON film_category.film_id = inventory.film_id
    LEFT JOIN sakila.category
    ON category.category_id = film_category.category_id
	GROUP BY category.name 
    ORDER BY revenue DESC
    LIMIT 5;

# 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view.

CREATE VIEW sakila.sevenhview AS 
	SELECT category.name, sum(payment.amount) AS revenue FROM sakila.payment
	LEFT JOIN sakila.rental
    ON rental.rental_id = payment.rental_id
    LEFT JOIN sakila.inventory
    ON inventory.inventory_id = rental.inventory_id
    LEFT JOIN sakila.film_category 
    ON film_category.film_id = inventory.film_id
    LEFT JOIN sakila.category
    ON category.category_id = film_category.category_id
	GROUP BY category.name 
    ORDER BY revenue DESC
    LIMIT 5;	

# 8b. How would you display the view that you created in 8a?

SELECT * FROM sakila.sevenhview;

# 8c. You find that you no longer need the view `top_five_genres`. Write a query to delete it.

DROP VIEW sakila.sevenhview;

