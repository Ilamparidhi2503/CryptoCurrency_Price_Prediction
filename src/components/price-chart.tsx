import React from "react";
import { Card, CardBody, CardHeader, Button, ButtonGroup } from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts";

interface PriceChartProps {
  title: string;
  data: Array<{
    date: string;
    price: number;
    prediction?: number;
  }>;
  timeframe: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";
  onTimeframeChange: (timeframe: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL") => void;
  showPrediction?: boolean;
}

export function PriceChart({
  title,
  data,
  timeframe,
  onTimeframeChange,
  showPrediction = false,
}: PriceChartProps) {
  const formatPrice = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (timeframe === "1D") {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const timeframes = ["1D", "1W", "1M", "3M", "1Y", "ALL"] as const;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">{title}</h3>
          {showPrediction && (
            <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-tiny text-primary">
              <Icon icon="lucide:sparkles" className="h-3 w-3" />
              AI Prediction
            </div>
          )}
        </div>
        <ButtonGroup size="sm" variant="flat" aria-label="Select timeframe">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              className={timeframe === tf ? "bg-primary/20" : ""}
              onPress={() => onTimeframeChange(tf)}
            >
              {tf}
            </Button>
          ))}
        </ButtonGroup>
      </CardHeader>
      <CardBody className="h-[300px] pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0967d2" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0967d2" stopOpacity={0} />
              </linearGradient>
              {showPrediction && (
                <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7828c8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7828c8" stopOpacity={0} />
                </linearGradient>
              )}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(100, 116, 139, 0.2)" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              minTickGap={30}
            />
            <YAxis
              tickFormatter={formatPrice}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={["dataMin - 1000", "dataMax + 1000"]}
              width={60}
            />
            <RechartsTooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              labelFormatter={(label) => formatDate(label as string)}
              contentStyle={{
                backgroundColor: "var(--heroui-content1)",
                border: "1px solid var(--heroui-default-200)",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#0967d2"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              activeDot={{ r: 6 }}
              name="Price"
            />
            {showPrediction && (
              <Area
                type="monotone"
                dataKey="prediction"
                stroke="#7828c8"
                strokeWidth={2}
                strokeDasharray="5 5"
                fillOpacity={0.5}
                fill="url(#colorPrediction)"
                activeDot={{ r: 6 }}
                name="Prediction"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
