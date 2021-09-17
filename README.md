# Not Face Blind
**https://not-face-blind.herokuapp.com/**

**Not Face Blind** is a simple web application that detects faces in images. In order to use the application, users must register, and login upon subsequent visits to the site. However, **USER DATA IS NOT USED FOR ANYTHING**. Feel free to use fake information. The website is secure, fully responsive, and mobile-friendly too! Thanks for visiting.

*This is the **front-end** repository. For the API, see: [not-face-blind-api](https://github.com/spencerericfong/not-face-blind-api). Note: I accidentally broke the API so the app is basically down, you can't log in or register to view the actual app. The homepage is still ok though.*

---

The front-end of this project was built in Javascript, using **React.js**. For the website styling and design, I used the CSS toolkit [**Tachyons**](https://tachyons.io/), along with minimal amounts of traditional CSS. The face detection service is provided freely by [**Clarifai**](https://www.clarifai.com/). The site itself is hosted and deployed by [**Heroku**](https://heroku.com/).

---

*Unfortunately, there is a minor issue with the site on some mobile devices where uploaded images appear in the incorrect orientation. This is not an application issue, but a browser issue where the browser incorrectly reads or ignores the image file's EXIF data, which contains information about the correct image orientation. However, the application functionality is unaffected and will still work as intended. Sorry for the inconvenience!*
