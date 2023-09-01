
const bull = require('bull');
const forgotPassProcess = require('../workers/forgot_password_worker').forgotPassProcess;


const redis = require('redis');

const client = redis.createClient({
  
       url : 'rediss://red-cjnhp2mqdesc73akndd0:IV45AYUZJRHAHPshEIQ2TU28Nvcu2azO@oregon-redis.render.com:6379'
});
// rediss://red-cjnhp2mqdesc73akndd0:IV45AYUZJRHAHPshEIQ2TU28Nvcu2azO@oregon-redis.render.com:6379s




// client.on('error', (err) => {
//     console.log('Redis Error ::::', err);
// })

async function check() {

    await client.connect();

    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");

   await client.set('framework', 'ReactJS', function (err) {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxx');
        if (err) throw err;
        client.get('framework', function (err, msg) {
            if (err) throw err;
            console.log(msg);
            client.quit();
        })
    });


}

check();





console.log(client, "77777777777777777777777777777777777777777777");




const queue = new bull('findEmail', {
   redis:'rediss://red-cjnhp2mqdesc73akndd0:IV45AYUZJRHAHPshEIQ2TU28Nvcu2azO@oregon-redis.render.com:6379'
});

queue.process(forgotPassProcess);






module.exports.forgotPass = async (data) => {
    console.log(data);
    await queue.add(data, {

    });
};

module.exports.queue = queue;


// module.exports.connect = async function () {
//     await check();
//     return client.connect();
// }