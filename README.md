# owl-question-box
owl-question-box is a [NodeCG](http://github.com/nodecg/nodecg) bundle. 
It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `~1.1.0`
You will need to have an appropriate version of NodeCG installed to use it.

## Usage

To access the question from your graphic, you can query the `selected-question` replicant from this bundle.
```js
const selectedMessage = nodecg.Replicant('selected-question', 'owl-question-box');
selectedMessage.on('change', newVal => {
    this.message = newVal;
});
```
You can find an example use of this in my [owl-layout bundle](https://github.com/bitowl/owl-layout/tree/master/graphics/elements/owl-current-question).

## Adding new sources
Messages that can be send to this question box should have the following structure:
```js
{
    id: "some-unique-identifier",
    platform: "twitch",
    user: "bitowl",
    avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/94b65b31-cea1-440b-b06f-cfe4e4522b5a-profile_image-70x70.png",
    text: "This is an example message."
}
```

You can send them to this bundle either from a dashboard panel or a graphic using:
```js
nodecg.sendMessageToBundle('add-question', 'owl-question-box', question);
```
Or you can send them from an extension using:
```js
const addQuestionToBox = nodecg.extensions['owl-question-box'];
addQuestionToBox(question);
```