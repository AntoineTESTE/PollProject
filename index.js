// requires
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const polls = [
    {
        id: 2,
        question: "Question 1?",
        answers: ["Réponse 1", "Réponse 2", "Réponse 3"],
        votes: [1, 0, 0, 2, 1, 0, 1, 1]
    },
    {
        id: 3,
        question: "Question 2?",
        answers: ["Réponse 1", "Réponse 2", "Réponse 3"],
        votes: [1, 0, 0, 2, 1, 0, 1, 1]
    },
    {
        id: 1,
        question: "Question 3?",
        answers: ["Réponse 1", "Réponse 2", "Réponse 3"],
        votes: [1, 0, 0, 2, 1, 0, 1, 1]
    }
];


// Liste des sondages
app.get('/polls', function (req, res) {
    res.send(polls);
});




// Récupérer un sondage et ses résultats

app.get('/polls/:id', function (req, res) {
    // On extrait le paramètre id et on le transforme en nombre
    const id = parseInt(req.params.id, 10);
    // On compare l'id demandé avec celui du post
    const poll = polls.find(p => p.id === id);
    // Si trouvé, on renvoie le sondage
    if (typeof (poll) !== 'undefined') {
        res.send(poll);
        // Sinon on envoie 404
    } else {
        res.sendStatus(404);
    }
});




// Creation d'un sondage

app.post('/polls', function (req, res) {

    const question = req.body.question;
    const answers = req.body.answers;
    // On vérifie si la question est de type "string"
    if (typeof (question) !== 'string') {
        return res.sendStatus(400);
    }
    // On vérifie si answers est un tableau et si son contenu est une chaine de caractères
    if (!Array.isArray(answers) ||
            answers.some(a => typeof (a) !== 'string') ||
            answers.lenght < 2 ){
        return res.sendStatus(400);
    } else {
        // On creer un nouvel identifiant unique, supérieur à tus les autres
        const id = polls.reduce((max, p) => max > p.id ? max : p.id, 0) + 1;
        // On creer un nouveau sondage
        const poll = {
            "id": id,
            "question": question,
            "answers": answers,
            "votes": []
        };
        polls.push(poll);
        res.send(201, polls);
    }
});




// Voter pour une réponse d'un poll

app.get('/polls/:id/answers/:id2', function (req, res) {
    const id = parseInt(req.params.id);
    const id2 = parseInt(req.params.id2);
    const poll = polls[id];
    app.post('/polls/:id/answers', function (req, res) {
        const answer = poll.answers[id2];
        poll.votes.push(answer);
        res.send('tu as voté pour la réponse : ' + answer);
    });
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});