import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productsData from "./data.json" assert { type: "json" };

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

let products = [...productsData];
let trends = [
  {
    date: "12/2/2024, 8:16:37 PM",
    trendTitle: "AMD's Ryzen 7 9800X3D Continues To Remain Overpriced",
    comments:
      "You are always welcome to try your luck with a standalone purchase of the 9800X3D, but you will probably come to the conclusion that this route can become extremely expensive very quickly.",
  },
];

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/trends", (req, res) => {
  res.send(trends);
});

app.post("/api/trends", (req, res) => {
  const data = req.body;
  trends.push(data);
  res.status(201).json({ message: "Trends added successfully", product: data });
});

function getCategoryCount(type) {
  return products
    .filter((i) => i.category == type)
    .reduce((acc, i) => (acc = acc + i.qty), 0);
}

app.get("/api/dashboardCard", (req, res) => {
  const cpuCount = getCategoryCount("CPU");
  const gpuCount = getCategoryCount("GPU");
  const ramCount = getCategoryCount("RAM");
  const ssdCount = getCategoryCount("SSD");
  const hddCount = getCategoryCount("HDD");
  const motherboardCount = getCategoryCount("Motherboard");
  const psuCount = getCategoryCount("PSU");
  const monitorCount = getCategoryCount("Monitor");
  const coolingCount = getCategoryCount("Cooling");
  const casesCount = getCategoryCount("Case");

  res.json({
    cpu: cpuCount,
    gpu: gpuCount,
    ram: ramCount,
    ssd: ssdCount,
    hdd: hddCount,
    motherboard: motherboardCount,
    psu: psuCount,
    monitor: monitorCount,
    cooling: coolingCount,
    case: casesCount,
  });
});

app.post("/api/products", (req, res) => {
  const data = req.body;
  products.push(data);
  res
    .status(201)
    .json({ message: "Product added successfully", product: data });
});

app.delete("/api/product/:id", (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10);
  const initialLength = products.length;

  products = products.filter((i) => i.id !== parsedId);
  if (products.length < initialLength) {
    res.status(200).json({ message: "Product deleted successfully", products });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.put("/api/product/:id", (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10);
  const newObj = req.body;
  products = products.map((i) => (i.id == parsedId ? newObj : i));
});

app.listen(process.env.PORT, () => {
  console.log(`Listening at PORT: ${process.env.PORT}`);
});
