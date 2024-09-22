#!/bin/bash

# MongoDB connection string - modify as needed
MONGO_URI="mongodb://localhost:27017/sample_guides"

# Create a temporary JavaScript file for MongoDB commands
cat << EOF > create_planets.js
// Create the planets collection with schema validation
db.createCollection("planets", {
   validator: {
      \$jsonSchema: {
         bsonType: "object",
         required: ["name", "orderFromSun", "hasRings", "mainAtmosphere", "surfaceTemperatureC"],
         properties: {
            name: {
               bsonType: "string",
               description: "Name of the planet - Required."
            },
            orderFromSun: {
               bsonType: "number",
               description: "Order from the Sun - Required."
            },
            hasRings: {
               bsonType: "bool",
               description: "Whether the planet has rings - Required."
            },
            mainAtmosphere: {
               bsonType: "array",
               description: "Main components of the planet's atmosphere - Required."
            },
            surfaceTemperatureC: {
               bsonType: "object",
               required: ["min", "max", "mean"],
               properties: {
                  min: { bsonType: "number" },
                  max: { bsonType: "number" },
                  mean: { bsonType: "number" }
               },
               description: "Surface temperature in Celsius - Required."
            }
         }
      }
   }
});

// Insert data for all 8 planets
db.planets.insertMany([
   {
      name: "Mercury",
      orderFromSun: 1,
      hasRings: false,
      mainAtmosphere: ["Oxygen", "Sodium", "Hydrogen"],
      surfaceTemperatureC: { min: -180, max: 430, mean: 167 }
   },
   {
      name: "Venus",
      orderFromSun: 2,
      hasRings: false,
      mainAtmosphere: ["Carbon Dioxide", "Nitrogen"],
      surfaceTemperatureC: { min: 460, max: 480, mean: 464 }
   },
   {
      name: "Earth",
      orderFromSun: 3,
      hasRings: false,
      mainAtmosphere: ["Nitrogen", "Oxygen"],
      surfaceTemperatureC: { min: -89, max: 57, mean: 15 }
   },
   {
      name: "Mars",
      orderFromSun: 4,
      hasRings: false,
      mainAtmosphere: ["Carbon Dioxide", "Nitrogen", "Argon"],
      surfaceTemperatureC: { min: -140, max: 20, mean: -63 }
   },
   {
      name: "Jupiter",
      orderFromSun: 5,
      hasRings: true,
      mainAtmosphere: ["Hydrogen", "Helium"],
      surfaceTemperatureC: { min: -145, max: -110, mean: -110 }
   },
   {
      name: "Saturn",
      orderFromSun: 6,
      hasRings: true,
      mainAtmosphere: ["Hydrogen", "Helium"],
      surfaceTemperatureC: { min: -178, max: -218, mean: -140 }
   },
   {
      name: "Uranus",
      orderFromSun: 7,
      hasRings: true,
      mainAtmosphere: ["Hydrogen", "Helium", "Methane"],
      surfaceTemperatureC: { min: -224, max: -216, mean: -195 }
   },
   {
      name: "Neptune",
      orderFromSun: 8,
      hasRings: true,
      mainAtmosphere: ["Hydrogen", "Helium", "Methane"],
      surfaceTemperatureC: { min: -218, max: -200, mean: -200 }
   }
]);

print("Planets collection created and populated with all 8 planets successfully.");
EOF

# Run the MongoDB commands using mongosh
mongosh "$MONGO_URI" --file create_planets.js

# Clean up the temporary file
rm create_planets.js

echo "Script execution completed."