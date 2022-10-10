# Starter files for vite with react and tailwindcss

### *clone the repo and do `npm install` and do `npm update` if necesary*


### dependancies 
- **tailwindcss**
- **dayjs for time formating**
- **react-query for server state management**
- **uniqid**
- **react-icons**


### [costom components](src\components\Shared)

### [resct-query](src\main.tsx) :
is preconfigured feel free to omit the defaultConfig if you want default behaviour

tailwind is configured with a few custom classes
```css
.flex-center{
  @apply flex justify-center items-center
}
.flex-center-col{
  @apply flex flex-col justify-center items-center
}
.scroll-bar {
  @apply scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-green-500;
}

```

## pocketbase authentication with google oauth

# Intro
In this article i'll try to port over an app i made in firebase to pocketbase

## 1 : Authentication
In 2022 provider sign-ins should be the main auth option given the ease of use for the user and developer . 
The users get to login with one click while the dev doesn't have to worry about verifying , storing and managing the user passwords.
Firebase gives us a simple way to implement this (especially in google since firebase creates you a service account with the client secret an client token configured by default ) but it can also be done in pocketbase woth a little amnual work.


#### 1 - setup your google service account
> for this tutorial i used 
- http://localhost:3000/redirect as the redirect url and
- http://localhost:3000 for authorised origins

![client secret and id screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jmsqpaj5hgxq826u50mh.png)


[official docs](https://developers.google.com/identity/protocols/oauth2) <br>
[video demonstration up to 1:55](https://www.youtube.com/watch?v=0KoZSVnTnkA)

#### [article link ](https://dev.to/tigawanna/react-authentication-with-pocketbase-google-oauth-react-router-react-query-a5j)




