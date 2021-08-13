//const IMAIL_CLI = require('./lib/kernel');
const process = require('process');
const commander = require('commander');
const axios = require('axios');

boot();

async function boot() {
	console.log("please enter a service number ....\n");
	console.log("[1] Login to system");
	console.log("[2] Get Store list");
	console.log("[3] Get a Store using ID");
	console.log("[4] Search Store");
	console.log("[5] Close Application\n");

    const sno = await promptly.prompt('Service Number: ');
    console.log(sno);
    if (sno == 1) {
    	makeLogin();
    }
};

async function makeLogin() {

 	console.log("Please enter your email");
 	const email = await promptly.prompt('Email: ');

 	console.log("\nPlease enter your password");
 	const password = await promptly.password('Password: ');

 	const params = new URLSearchParams()
	params.append('email', email)
	params.append('password', password)

	const url = 'http://127.0.0.1:5000/api/oauth';

	const config = {
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  }
	}

	axios.post(url, params, config)
	  .then((result) => {	    
	    if (result.data.status == 0) {
	    	console.log('\n Login details are incorrect. try again...');
	    	makeLogin();
	    }
	    else
	    {
	    	console.log('\n Login successfull...');
	    	console.log(result.data);
	    	boot();
	    }
	  })
	  .catch((err) => {
	    console.log(err);
	  })
}

function exitApp() {
	process.exit(0);
}