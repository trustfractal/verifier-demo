export default (req, res) => {
  console.log(req);

  if (req.method === "POST") {
    setTimeout(() => {
      res.status(200).json(req.body);
    }, 500);
  }
};
