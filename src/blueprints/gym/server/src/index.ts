import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

interface LocationWithTimezone {
  location: string;
}

const getLocationsWithTimezones = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let locations: LocationWithTimezone[] = [
    {
      location: "Germany",
    },
    {
      location: "China",
    },
    {
      location: "Argentina",
    },
    {
      location: "Japan",
    },
  ];

  response.status(200).json(locations);
};

app.get("/timezones", getLocationsWithTimezones);

// start the express server
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
