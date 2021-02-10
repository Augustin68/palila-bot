const Discord = require('discord.js')
const fs = require('fs')

const name = "Vquidab"

const description = "Incrémente le compteur de V. Tout les 5.000 V, envoie un gif d'arnaud qui dab"

function init(client) {

	client.on('message', message => {

		const config = require(`../guilds/${message.guild.id}/config.json`);

		if (!config.Vquidab) return;

		if (!fs.readdirSync(`./guilds/${message.guild.id}`).includes('nbV.json')) {
			fs.writeFileSync(`./guilds/${message.guild.id}/nbV.json`, JSON.stringify({ nbV: 0, nbVLimite: 500 }));
			console.log(`[${name}.js] Création du fichier de configuration pour le nombre de V pour le serveur ${message.guild.name}`);
		}

		let { nbV, nbVLimite } = require(`../guilds/${message.guild.id}/nbV.json`);

		let bidule = message.content.toLowerCase().split("v");
		nbre_de_fois_trouve = bidule.length - 1;

		if (nbre_de_fois_trouve < 0)
			nbre_de_fois_trouve = 0;

		nbV += nbre_de_fois_trouve;

		if (nbV >= nbVLimite) {
			nbV = nbV % nbVLimite;
			message.channel.send(":v:", { files: ['./resources/Vquidab.gif'] });
		}

		fs.writeFileSync(`./guilds/${message.guild.id}/nbV.json`, JSON.stringify({ nbV: nbV, nbVLimite: nbVLimite }));

		delete require.cache[require.resolve(`../guilds/${message.guild.id}/nbV.json`)];

	});
}



module.exports = { name, description, init };