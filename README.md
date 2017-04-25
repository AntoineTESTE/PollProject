# SONDAGES :

===

### CREER un nouveau sondage
`POST /POLLS`

parameters : 
- Question : string
- Answers : string[]

Answer : `201 Created`
Error : `400 Bad Request` : paramètres incorrects




### Lister les sondages :
`GET /POLLS`

Answer with success: `200 OK`
Liste des sondages (id et question) en JSON :
```
[{"id:1, "question": "Question ?"},...]
```



### Recupérer un sondage et ses résultats :
`GET /POLLS/:id/`

Answer with success: `200 OK`
Sondage en JSON :
```
{"id:1, "question": "Question ?, "answers": ["Réponse 1", "Réponse 2", "Réponse 3"]}, "votes" : [0,0,1,1]}
```

Error : `404 Page Not Found` : sondage non trouvé




### Voter pour une réponse d'un sondage :

`POST /POLLS/:id/votes`

parameters : 
- Answers : index de la réponse (number)


Answer: `201 Created`
Error : `400 Bad Request` : paramètres incorrects
        `404 Page Not Found` : sondage non trouvé