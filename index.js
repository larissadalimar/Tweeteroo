import express from 'express'
import cors from 'cors'

const users = []

const tweets = []

const app = express()

app.use(cors())
app.use(express.json())

app.post("/sign-up", (req, res) => {

	const { username, avatar } = req.body

	if(!username || !avatar){
		return res.status(409).send("Todos os campos são obrigatórios")
	}

	users.push({
		username,
		avatar
	})

	res.send("OK")
})

app.post("/tweets", (req, res) => {

	const { username, tweet } = req.body

	const user = users.find(user => user.username === username)

	tweets.push({
		username,
		avatar: user.avatar,
		tweet
	})

	res.send("OK")
})

app.get("/tweets", (req, res) => {
	res.send(tweets.slice(-10))
})


app.listen(5000, console.log("Running in port 5000"))