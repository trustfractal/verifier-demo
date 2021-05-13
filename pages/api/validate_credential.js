export default (req, res) => {
  if (req.method === "POST") {
    setTimeout(() => {
      res.status(200).json(req.body);
    }, 500);
  }
};
