document.onkeydown = updateKey;
document.onkeyup = resetKey;

var server_port = 65432;
var server_addr = "10.0.0.130";   // the IP address of your Raspberry PI

function client(){
    const net = require('net');
    var input = document.getElementById("message").value;

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${input}`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        document.getElementById("echo_from_server").innerHTML = data;
        console.log(data.toString());
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });
}

function send_data(input){
    const net = require('net');

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${input}`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        document.getElementById("direction").innerHTML = data;
        //console.log(data.toString());
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });
}

function read_temp(input){
    const net = require('net');

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${input}`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        document.getElementById("temperature").innerHTML = data;
        console.log(data.toString());
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });
}

function read_speed(input){
    const net = require('net');

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${input}`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        document.getElementById("speed").innerHTML = data;
        console.log(data.toString());
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });
}

function obstacle_scanning(input){
    const net = require('net');

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${input}`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        document.getElementById("obstacle").innerHTML = data;
        console.log(data.toString());
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });
}


// for detecting which key is been pressed w,a,s,d
function updateKey(e) {

    e = e || window.event;

    if (e.keyCode == '104') {
        // up (NumPad 8)
        document.getElementById("upArrow").style.color = "green";
        send_data("forward");
    }
    else if (e.keyCode == '98') {
        // down (2)
        document.getElementById("downArrow").style.color = "green";
        send_data("backward");
    }
    else if (e.keyCode == '100') {
        // left (4)
        document.getElementById("leftArrow").style.color = "green";
        send_data("turn_left");
    }
    else if (e.keyCode == '102') {
        // right (6)
        document.getElementById("rightArrow").style.color = "green";
        send_data("turn_right");
    }
    else if (e.keyCode == '107') {
        // speed up (NumPad +)
        read_speed("speed_up");
    }
    else if (e.keyCode == '109') {
        // speed down (NumPad -)
        read_speed("slow_down");
    }
    else if (e.keyCode == '101') {
        // stop (NumPad 5)
        send_data("stop");
    }
    else if (e.keyCode == '96') {
        // read pi temp (NumPad 0)
        read_temp("read_temp")
    }
    else if (e.keyCode == '103') {
        // read pi temp (NumPad 7)
        obstacle_scanning("scanning")
    }
}

// reset the key to the start state 
function resetKey(e) {

    e = e || window.event;

    document.getElementById("upArrow").style.color = "grey";
    document.getElementById("downArrow").style.color = "grey";
    document.getElementById("leftArrow").style.color = "grey";
    document.getElementById("rightArrow").style.color = "grey";
}



// function update_data(){
//     // get the element from html
//     var name = document.getElementById("message").value;
//     // update the content in html
//     document.getElementById("greet").innerHTML = "Hello " + name + " !";
//     // send the data to the server 
//     //to_server(name);
//     client();
// }

// update data for every 50ms
function update_data(){
        client();
}
