const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const httpsSucess = 200

const app = express()

var mailchim_key = process.env.MAILCHIMP_KEY
var listId = process.env.LIST_ID

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/", function(req,res) {
  res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req,res){
  const fname = req.body.fname
  const lname = req.body.lname
  const email = req.body.email
  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  };
  const jsonData= JSON.stringify(data)

  const url = "https://" + mailchim_key.split("-")[1] +".api.mailchimp.com/3.0/lists/" + listId
  const options = {
    method:"POST",
    auth: "bru:" + mailchim_key

  }


  const request = https.request(url, options, function (response,r) {
    if( response.statusCode === httpsSucess) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  console.log(typeof request);
  request.write(jsonData)
  request.end();
})


app.post("/failure", function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("listenning on port 3000")
})
