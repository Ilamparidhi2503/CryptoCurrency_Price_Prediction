import React from "react";
import { Card, CardBody, CardHeader, Tabs, Tab } from "@heroui/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";

interface ModelAccuracyChartProps {
  trainingData: Array<{
    epoch: number;
    accuracy: number;
    val_accuracy: number;
    loss: number;
    val_loss: number;
  }>;
}

export function ModelAccuracyChart({ trainingData }: ModelAccuracyChartProps) {
  const [selected, setSelected] = React.useState<string>("accuracy");

  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-lg font-medium">Model Training Metrics</h3>
      </CardHeader>
      <CardBody>
        <Tabs 
          aria-label="Model metrics" 
          selectedKey={selected} 
          onSelectionChange={(key) => setSelected(key as string)}
        >
          <Tab key="accuracy" title="Accuracy">
            <div className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trainingData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(100, 116, 139, 0.2)" />
                  <XAxis 
                    dataKey="epoch" 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                    domain={[0, 1]}
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartsTooltip
                    formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, ""]}
                    contentStyle={{
                      backgroundColor: "var(--heroui-content1)",
                      border: "1px solid var(--heroui-default-200)",
                      borderRadius: "8px",
                      padding: "8px 12px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    name="Training Accuracy"
                    stroke="#0967d2"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="val_accuracy"
                    name="Validation Accuracy"
                    stroke="#7828c8"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tab>
          <Tab key="loss" title="Loss">
            <div className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trainingData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(100, 116, 139, 0.2)" />
                  <XAxis 
                    dataKey="epoch" 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartsTooltip
                    formatter={(value: number) => [`${value.toFixed(4)}`, ""]}
                    contentStyle={{
                      backgroundColor: "var(--heroui-content1)",
                      border: "1px solid var(--heroui-default-200)",
                      borderRadius: "8px",
                      padding: "8px 12px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="loss"
                    name="Training Loss"
                    stroke="#f31260"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="val_loss"
                    name="Validation Loss"
                    stroke="#f5a524"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}