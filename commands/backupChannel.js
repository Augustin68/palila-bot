const { Worker } = require('worker_threads');

const name = "backupchannel"

const synthax = `${name}`

const description = "Permet de télécharger sur le serveur du bot toutes les images et videos du channels"

const explication = "Cette commande permet de télécharger toutes les images et vidéos envoyés sur ce channel en plus des vidéos YouTube et Twitter"

async function execute(message, args) {

	const worker = new Worker(`${__dirname}/../resources/downloader.js`);

	worker.on('online', () => {

		const param = { msgID: message.id, channelID: message.channel.id, guildID: message.guild.id }

		worker.postMessage(param);
	});

	worker.on('exit', code => {
		if (code !== 0)
			console.error(`[${name}.js] Erreur : le thread de download a retourné le code ${code}`);
		else
			console.log(`[${name}.js] Le thread s'est correctement arrété`);
	});

}

module.exports = { name, synthax, description, explication, execute };