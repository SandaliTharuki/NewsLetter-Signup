const express = require("express")
const bodyParser = require("body-parser")
const request = require("request");
const { userInfo } = require("os");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsondata = JSON.stringify(data);

// 73a37fc6d1
    const url = "https://us7.api.mailchimp.com/3.0/lists/73a37fc6d1";

    const options = {
        method: "POST",
        auth: "sandali123:c762c6dcfe34c8d6dc0ef6d4010119a9-us7"
    }

    const request = https.request(url, options, function(response){
       
            if(response.statusCode == 200){
                // res.send("Successfully subscribed!");
                res.sendFile(__dirname + "/success.html");
            }else
            // res.send("Something went wrong!");
            res.sendFile(__dirname + "/failure.html");
        
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsondata);
    request.end();
    // console.log(firstName, lastName, email);
});


app.post("/failure",function(req, res){
    res.redirect("/");
})


// {"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"visibility":"pub","double_optin":false,"marketing_permissions":false}

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});

// API key
// c762c6dcfe34c8d6dc0ef6d4010119a9-us7

// unique id
// 73a37fc6d1