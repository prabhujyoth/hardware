import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import gpuSvg from "./assets/gpu-2.svg";
import cpuSvg from "./assets/cpu.svg";
import ramSvg from "./assets/ram.svg";
import ssdSvg from "./assets/ssd.svg";
import hddSvg from "./assets/hdd.svg";
import motherboardSvg from "./assets/motherboard.svg";
import psuSvg from "./assets/psu.svg";
import monitorSvg from "./assets/monitor.svg";
import coolingSvg from "./assets/cooling.svg";
import caseSvg from "./assets/case.svg";

import { BarChart, PieChart } from "@mui/x-charts";

export default function Dashboard() {
  const [cardValues, setCardValues] = useState({});
  const [trends, setTrends] = useState([]);
  //get card counts
  async function getData() {
    try {
      await axios.get("/api/dashboardCard").then((res) => {
        setCardValues(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }
  // trends
  async function getTrends() {
    try {
      await axios.get("/api/trends").then((res) => {
        setTrends(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }

  //on component mount, get rows
  useEffect(() => {
    getData();
    getTrends();
  }, []);
  return (
    <div>
      <Box sx={{ p: 1 }} className="flex flex-col gap-2">
        <div className="flex flex-col">
          <Typography variant="h6">Quantity</Typography>
          <div className="card-container flex-wrap gap-2">
            <div className="card justify-between p-9 bg-pink-100 flex w-64 h-32 rounded">
              <div className="flex flex-col">
                <h2 className="font-semibold		text-4xl		">{cardValues.gpu || 0}</h2>
                <p>GPUs</p>
              </div>
              <img src={gpuSvg} alt="" className="w-1/2" />
            </div>
            <div className="card justify-between  p-9 bg-orange-100 flex w-64 h-32 rounded">
              <div className="flex flex-col">
                <h2 className="font-semibold		text-4xl		">{cardValues.cpu || 0}</h2>
                <p>CPUs</p>
              </div>
              <img src={cpuSvg} alt="" className="w-1/2" />
            </div>
            <div className="card justify-between p-9 bg-green-100 flex w-64 h-32 rounded">
              <div className="flex flex-col">
                <h2 className="font-semibold		text-4xl		">{cardValues.ram || 0}</h2>
                <p>RAMs</p>
              </div>
              <img src={ramSvg} alt="" className="w-1/2" />
            </div>
            <div className="card justify-between p-9 bg-blue-100 flex w-64 h-32 rounded">
              <div className="flex flex-col">
                <h2 className="font-semibold		text-4xl		">{cardValues.ssd || 0}</h2>
                <p>SSDs</p>
              </div>
              <img src={ssdSvg} alt="" className="w-1/2" />
            </div>
            <div className="card justify-between p-9 bg-red-100 flex w-64 h-32 rounded">
              <div className="flex flex-col">
                <h2 className="font-semibold		text-4xl		">{cardValues.hdd || 0}</h2>
                <p>HDDs</p>
              </div>
              <img src={hddSvg} alt="" className="w-1/2" />
            </div>
            <div className="card justify-between p-9 bg-purple-100 flex w-64 h-32 rounded">
              <div className="flex flex-col">
                <h2 className="font-semibold		text-4xl		">
                  {cardValues.motherboard || 0}
                </h2>
                <p>Motherboards</p>
              </div>
              <img src={motherboardSvg} alt="" className="w-1/2" />
            </div>
            <div className="card justify-between p-9 bg-cyan-100 flex w-64 h-32 rounded">
              <div className="flex flex-col">
                <h2 className="font-semibold		text-4xl		">{cardValues.psu || 0}</h2>
                <p>PSUs</p>
              </div>
              <img src={psuSvg} alt="" className="w-1/2" />
            </div>
            <div className="card justify-between p-9 bg-violet-100 flex w-64 h-32 rounded">
              <div className="flex flex-col">
                <h2 className="font-semibold		text-4xl		">
                  {cardValues.monitor || 0}
                </h2>
                <p>Monitors</p>
              </div>
              <img src={monitorSvg} alt="" className="w-1/2" />
            </div>
            <div className="card justify-between p-9 bg-blue-100 flex w-64 h-32 rounded">
              <div className="flex flex-col">
                <h2 className="font-semibold		text-4xl		">
                  {cardValues.cooling || 0}
                </h2>
                <p>Coolings</p>
              </div>
              <img src={coolingSvg} alt="" className="w-1/2" />
            </div>
            <div className="card justify-between p-9 bg-emerald-100 flex w-64 h-32 rounded">
              <div className="flex flex-col">
                <h2 className="font-semibold		text-4xl		">
                  {cardValues.case || 0}
                </h2>
                <p>Cases</p>
              </div>
              <img src={caseSvg} alt="" className="w-1/2" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="flex flex-col flex-1 border p-2 rounded">
            <Typography variant="h6">Most used Storage</Typography>
            <PieChart
              series={[
                {
                  data: [
                    { id: 2, value: cardValues.hdd || 0, label: "HDD" },
                    { id: 3, value: cardValues.ssd || 0, label: "SSD" },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </div>
          <div className="flex border p-2 flex-1 flex-col rounded">
            <Typography variant="h6">CPU to GPU Ratio</Typography>
            <BarChart
              xAxis={[{ scaleType: "band", data: ["CPU", "GPU"] }]}
              series={[{ data: [cardValues.cpu, cardValues.gpu] }]}
              width={500}
              height={300}
            />
          </div>
          <div className="flex border p-2 flex-1 flex-col rounded">
            <Typography variant="h6" className="mb-2">
              Latest Trends
            </Typography>
            <div className="trend-container overflow-auto">
              {trends &&
                trends.map((i) => {
                  return (
                    <div class="flex flex-col">
                      <p className="text-sm">{i.date}</p>
                      <h2 className="text-base font-semibold product-primary">
                        {i.trendTitle}
                      </h2>
                      <p className="text-sm">{i.comments}</p>
                      <hr />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
