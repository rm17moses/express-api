////////////////////////////////////////CLASS WORKSHOP
import express from "express";
const app = express();

//Needed for POST to function
app.use(express.json())
app.use(express.static('public'));

/*
app.get("/", function (req, res) {
    res.send('Hello from my API')
})
*/

const greetings = {
    'English': 'Hello'
}

//Call the API - http://localhost:4009/api/greet?username=Moses (Dynamic - uses question marks)
app.get("/api/greet", function (req, res) {
    //console.log(req.query);
    const username = req.query.username;
    const language = req.query.language;

    if (!greetings[language]) {
        return res.json({
            error: 'Invalid language supplied: ' + `${language}`
        })
    }

    const greeting = greetings[language];
    res.json({
        message: `${greeting}, ${username}`
    })

    // res.json({
    //     message: `Hello, ${username}!`
    // })
});

//POST

app.post("/api/greet", function (req, res) {

    //add entry to greeting map
    const language = req.body.language;
    greetings[language] = req.body.greeting;

    res.json({
        status: 'Success',
        message: `Added a greeting for ${language}`
    });

});

//Call the API - http://localhost:4009/api/greet/Moses (Not dynamic - uses colons)
app.get("/api/greet/:username", function (req, res) {
    console.log(req.params);
    const username = req.params.username;
    res.json({
        message: `Hello, ${username}!`
    })
});


const PORT = process.env.PORT ||  4009;

app.listen(PORT, function () {
    console.log(`App started on port ${PORT}!`)
});