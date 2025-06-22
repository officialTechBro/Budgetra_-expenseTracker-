
npm init -y

# Backend Dependences install
npm i express jsonwebtoken mongoose dotenv cors bcryptjs multer xlsx
npm i nodemon --save-dev


## Error Messages
| HTTP Code                   | Use in Express                                           |
| --------------------------- | -------------------------------------------------------- |
| `200 OK`                    | `res.status(200).json({ message: "Success" });`          |
| `201 Created`               | `res.status(201).json({ message: "Resource created" });` |
| `204 No Content`            | `res.status(204).send();`                                |
| `400 Bad Request`           | `res.status(400).json({ message: "Bad input" });`        |
| `401 Unauthorized`          | `res.status(401).json({ message: "Unauthorized" });`     |
| `403 Forbidden`             | `res.status(403).json({ message: "Forbidden" });`        |
| `404 Not Found`             | `res.status(404).json({ message: "Not found" });`        |
| `409 Conflict`              | `res.status(409).json({ message: "Conflict" });`         |
| `422 Unprocessable Entity`  | `res.status(422).json({ message: "Validation error" });` |
| `500 Internal Server Error` | `res.status(500).json({ message: "Server error" });`     |
