const fs = require("fs");
const csv = require("csv");
const file = fs.readFileSync("data.csv", "utf8");

fetch("http://localhost:1337/graphql", {
  method: "POST",

  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
    query: `{
  news{
    data{
      attributes{
        title
        body
      }
    }
  }
}`,
  }),
})
  .then((data) => data.json())
  .then((data) => data.data.news.data)
  .then((current) => console.log("current", current));
csv.parse(file, { columns: true }, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  data.map((el) => {
    fetch("http://localhost:1337/graphql", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `
        mutation news{ createNew(data:{title:"${el.Title}",body:"${el.Body}"}){
            data{
                attributes{
                    title
                }
            }
        }}
    `,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
    //   console.log(data);
  });
});
// Process the parsed data here
