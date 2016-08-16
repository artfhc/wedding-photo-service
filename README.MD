# wedding-photo-service

## Setup
   install dependencies:
     $ cd wedding-photo-service && npm install

   run the app:
     $ DEBUG=wedding-photo-service:* npm start

## Problems with SASS
   npm rebuild node-sass

## How to use i18n in templates

Allow i18n function to be used in templates

Sample route:

```javascript
/* GET template 1  */
router.get('/lens', function(req, res, next) {
  res.render('lens/index', {
    layout: 'lens/layout', 
    title: 'Express',
    i18n: req.t,
    pageData: {
      images: imagesData
    }
  });
});
```

Sample locale file:
```json
{
  "common:hello": "Hello {{name}}!"
}
```

Template Syntax: 
```jade
#{ i18n("common:hello", {name: 'Arthur'}) } 
```
=> Hello Arthur

