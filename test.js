const mailchimpClient = require("@mailchimp/mailchimp_marketing")

mailchimpClient.setConfig({
  apiKey: "127f6ee223591cbb103f30b3135c7434-us14",
  server: "us14",
});

const run = async () => {
  const response = await mailchimpClient.lists.addListMember("5cd8524216", {
    email_address: "Ebony_Brekke@gmail.com",
    status: "pending",
  });
  console.log(response);
};

run();
