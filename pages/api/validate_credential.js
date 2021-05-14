import RequestValidator from "../../services/RequestValidator";
import { notFound, badRequest, send } from "../../utils";

const validateVerificationRequest = async (req, res) => {
  const { request, signedNonce } = req.body;

  if (!request) return badRequest(res, "Missing verification request");

  if (!signedNonce) return badRequest(res, "Missing signed nonce");

  const valid = await RequestValidator.perform(request, signedNonce);

  return send(res, 200, { request, signedNonce, valid });
};

export default (req, res) => {
  switch (req.method) {
    case "POST":
      return validateVerificationRequest(req, res);
    default:
      return notFound(res);
  }
};
