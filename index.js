const { Integrity } = require('@multiplierx/hub-integrity')
require('dotenv').config()

/* Database Connection */
const DB_HOST               = process.env.DB_HOST
const DB_USER               = process.env.DB_USER
const DB_PASSWORD           = process.env.DB_PASSWORD
const DB_DATABASE           = process.env.DB_DATABASE

/* Github Settings */
const GITHUB_PERSONAL_TOKEN = process.env.GITHUB_PERSONAL_TOKEN
const GITHUB_REPO           = process.env.GITHUB_REPO
const GITHUB_OWNER          = process.env.GITHUB_OWNER
const GITHUB_LABELS         = process.env.GITHUB_LABELS.split(',')
const GITHUB_ASSIGNEES      = process.env.GITHUB_ASSIGNEES.split(',')

/* Scheduler Settings */
const CRONTIME              = process.env.CRONTIME || '*/30 * * * *'

console.log('\nDatabase Connection:', JSON.stringify({ DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE }, null, 2))
console.log('\nGithub Settings:',     JSON.stringify({ GITHUB_OWNER, GITHUB_REPO, GITHUB_LABELS, GITHUB_ASSIGNEES, GITHUB_PERSONAL_TOKEN }, null, 2))
console.log('\nScheduler Settings:',  JSON.stringify({ CRONTIME }, null, 2))

;(async () => {
    const integrity =  new  Integrity({
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_DATABASE
	}, {
		token: GITHUB_PERSONAL_TOKEN,
		repo:  GITHUB_REPO,
		owner: GITHUB_OWNER
	}, {
		labels: GITHUB_LABELS,
		assignees: GITHUB_ASSIGNEES
	})
	
	await integrity.schedule(CRONTIME)
})()