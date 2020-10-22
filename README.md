# Coding-Yabe-Sei

#### A multi-purpose discord bot that has, moderation, fun, games, and learning commands!

![Node CI](https://github.com/IllusionMan1212/Yabe/workflows/Node%20CI/badge.svg)

## [Invite](https://discord.com/api/oauth2/authorize?client_id=755708845744980051&permissions=470150262&scope=bot)
Here's the [Link](https://discord.com/api/oauth2/authorize?client_id=755708845744980051&permissions=470150262&scope=bot) to invite yabe to your server, she currently requires permissions that aren't really used, but we plan on making use of such perms.

## Features
#### Moderation
The Usual
- Kick (requires for the user doing the kicking to have `Kick Members` permission, `yabe kick <@user> <reason for kick> (optional)`)
- Ban (requires for the user doing the banning to have `Ban Members` permission, `yabe ban <@user> <reason for ban> (optional)`)
- Remove (requires for the user deleting the messages to have `Manage Messages` permission, `yabe rem <number of message to delete>`)

#### Fun
- Meme (random meme from the internet, `yabe meme`)
- Slap (slaps the user you mention, `yabe slap <@user to slap>`)
- Smug (posts a random smug anime girl, `yabe smug`)
and many more

#### Games
- 8ball (ask yabe a question and she'll give you your desired answer, `yabe 8ball <question>`)
- Roll (rolls )
- Flip

## Honorable mentions

##### - Translate:
Yabe can translate any piece of text you provide from almost all languages you can think of, just do `yabe translate list` for a list of supported languages and their respective ISO-639-1 codes, and `yabe help translate` on how to use the command.

## Support

##### If you require assistance with anything, or have any questions about yabe you can make an issue on our [github here](https://github.com/illusionman1212/Yabe/issues), or join our [support server](https://discord.gg/yS3CFbV) and have a chat with the devs.

---

## TO DO LIST

idk yet, we'll figure it out as we go

## Development

1. Clone repository
1. `npm install`
1. Copy `.env-template` and rename to `.env`
1. Fill out `.env`
  - [Provision a testing application](https://discordapp.com/developers/applications/me)
1. Visit `discordapp.com/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=0`, replacing the placeholder with your real Client ID.
