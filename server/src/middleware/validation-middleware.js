
export default (schema) => {
    return async (req, res, next) => {
        const validBody = await schema.isValid(req.body);
        if (!validBody) {
            return res.status(400).json({"error": "Malformed request"});
        } else {
            next();
        }
    }
}
