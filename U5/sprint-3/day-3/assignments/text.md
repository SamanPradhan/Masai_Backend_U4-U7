REGULAR EXPRESSIONS

1. Write a regular expression to match all email addresses of the form username@domain.com, where the username can contain lowercase and uppercase letters, digits, and the special characters \_ (underscore),. (period), and - (hyphen), and the domain can contain lowercase and uppercase letters of more or equal length 2.
   ans:^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$

2. Write a regular expression to match all credit card numbers of the form XXXX-XXXX-XXXX-XXXX, where X can be any digit.
   ans: ^[0-9]{4}\-+[0-9]{4}\-+[0-9]{4}\-+[0-9]{4}$

3. Write a regular expression to match all hexadecimal color codes of the form #RRGGBB or #RGB, where R, G, and B represent red, green, and blue.
   ans: ^#[a-fA-F0-9]{6}$
4. Write a regular expression to match all IP addresses of the form xxx.xxx.xxx.xxx, where each xxx can be any number between 0 and 255.
   ans:

   (([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])

5. Write a regular expression to match all YouTube video URLs of the form https://www.youtube.com/watch?v=VIDEO_ID, where VIDEO\*ID is a string of 11 alphanumeric characters.
   ans: ^https:\/\/www\.youtube\.com/\watch?v=[0-9a-zA-Z_-]{11}$
6. Write a regular expression to match all HTML comments in a string, such as <!-- Comment text --> and extract the comment text.
   ans: <!-- (.*? -->
