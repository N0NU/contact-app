const contactlist = require("./contact-list.json");
const fs = require("fs");
const accountSid = "AC4c9bb06fdb393f494c4e9a94274e531b";
const authToken = "7898e17d7ff7043bebaaff81daaf912e";
const client = require("twilio")(accountSid, authToken);

//get contact list from json
exports.getContacts = function(req, res) {
  res.send(contactlist);
};
// sending data
exports.sendMessage = function(req, res) {
  client.messages
    .create({
      body: req.body.message,
      from: "+19402360793",
      to: req.body.phone
    })
    .then(message => {
      //   console.log(message);
    });
  assigingValues(req.body);
};

function assigingValues(values) {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  var data = {
    name: values.name,
    message: values.message,
    time: dateTime
  };
  //   console.log(mes, 'mes')
  console.log(data, "data");

  if (!fs.existsSync("messageList.json")) {
    content = '{"message_list":[]}';
    fs.writeFileSync("messageList.json", content, "utf8");
    writeDataToJson(data);
  } else {
    writeDataToJson(data);
  }
}

function writeDataToJson(dataa) {
  fs.readFile("messageList.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      obj.message_list.push(dataa);
      json = JSON.stringify(obj);
      fs.writeFile("messageList.json", json, "utf8", function(err, result) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}

exports.getSentMessagesList = function(req, res) {
  fs.readFile("messageList.json", "utf8", function readFileCallback(err, data) {
    res.send(data);
  });
};
