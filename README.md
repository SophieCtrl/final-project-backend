# Supplement Tracker API

## Description

The Supplement Tracker API is a backend service for managing users, supplements, and brands. It provides endpoints for user authentication, supplement management, and brand management.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/final-project-backend.git
   cd final-project-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGODB_URI=your_mongodb_uri
   TOKEN_SECRET=your_jwt_secret
   PORT=5005
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage

### Authentication Routes

- **POST /auth/signup**: Register a new user.
- **POST /auth/login**: Login a user and return a JWT.
- **GET /auth/verify**: Verify the JWT token.

### User Routes

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Login a user and return a JWT.
- **GET /api/users/profile**: Get the authenticated user's profile.
- **PUT /api/users/profile**: Update the authenticated user's profile.
- **POST /api/users/supplements**: Add a supplement to the user's list.
- **PUT /api/users/supplements/:supplementId**: Update supplement details for the user.
- **DELETE /api/users/supplements/:supplementId**: Delete a supplement from the user's list.

### Supplement Routes

- **POST /api/supplements**: Add a new supplement (authenticated users only).
- **GET /api/supplements**: Get all supplements.
- **GET /api/supplements/:id**: Get a supplement by ID.
- **PUT /api/supplements/:id**: Update a supplement (authenticated users only).
- **DELETE /api/supplements/:id**: Delete a supplement (authenticated users only).
- **GET /api/supplements/filters**: Get all filter options.
- **GET /api/supplements/:supplementId/brands**: Get all brands for a specific supplement.
- **POST /api/supplements/:supplementId/brands**: Create a brand (authenticated users only).

### Models

#### User Model

```javascript
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  age: { type: Number, required: true },
  nutritionalType: { type: String, required: true },
  goals: { type: [String], default: [] },
  symptoms: { type: [String], default: [] },
  personal_supplements: [
    {
      supplement: { type: Schema.Types.ObjectId, ref: "Supplement" },
      dosage: { type: Number },
      frequency: { type: String },
      time: { type: String },
      _id: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
    },
  ],
});
```

#### Supplement Model

```javascript
const supplementSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  contained_vitamins: [String],
  contained_minerals: [String],
  effect: { type: String, required: true },
  side_effects: { type: String },
  enhance_effect: [String],
  reduce_effect: [String],
  maximum_dosis: { type: String, required: true },
  dosis_per_kg: { type: String, required: true },
  nutritional_type: [String],
  goals: [String],
  symptoms: [String],
  brands: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});
```

#### Brand Model

```javascript
const brandSchema = new Schema({
  brand: { type: String, required: true },
  form: {
    type: String,
    required: true,
    enum: ["pills", "capsules", "powder", "drops"],
  },
  size: { type: String, required: true, default: "180 pills" },
  dosage_mg: { type: Number, required: true },
  additional_ingrediens: [String],
  vegan: { type: Boolean, required: true },
  parent_supplement: {
    type: Schema.Types.ObjectId,
    ref: "Supplement",
    required: true,
  },
});
```

### JWT Middleware

```javascript
const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
```

## Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

## License

This project is licensed under the MIT License.
